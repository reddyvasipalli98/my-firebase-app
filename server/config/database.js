const sql = require('mssql');
require('dotenv').config();

// For Google Cloud SQL, the connection name format is: project-id:region:instance-name
const isCloudSQL = process.env.DB_HOST.includes(':');
const isIPAddress = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(process.env.DB_HOST);

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: isCloudSQL 
        ? `/cloudsql/${process.env.DB_HOST}`
        : process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: !isIPAddress, // Disable encryption if using IP address
        trustServerCertificate: true,
        enableArithAbort: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1.2'
        }
    },
    port: parseInt(process.env.DB_PORT) || 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

console.log('Attempting to connect to Google Cloud SQL Server with config:', {
    ...config,
    password: '***', // Hide password in logs
    connectionType: isIPAddress ? 'IP Address' : (isCloudSQL ? 'Cloud SQL Proxy' : 'Hostname'),
    encryption: config.options.encrypt ? 'Enabled' : 'Disabled'
});

// Create a pool that we can reuse
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect()
    .then(() => {
        console.log('Successfully connected to Google Cloud SQL Server database.');
        return pool;
    })
    .catch(err => {
        console.error('Error connecting to Google Cloud SQL Server database:', err);
        console.error('Please ensure you have:');
        console.error('1. Enabled public IP access or set up Cloud SQL Proxy');
        console.error('2. Added your client IP to authorized networks');
        console.error('3. Configured the correct instance connection name or IP');
        console.error('4. Set up the correct username and password');
        if (isIPAddress) {
            console.error('Note: Using IP address with encryption disabled to avoid TLS warning');
        }
        throw err;
    });

module.exports = {
    pool,
    poolConnect
}; 