const { pool, poolConnect } = require('../config/database');
const sql = require('mssql');

class Book {

    static async save(bookData) {
        const { title, author, comments, date, userId } = bookData;
        
        try {
            await poolConnect;
            
            const result = await pool.request()
                .input('title', sql.NVarChar(100), title)
                .input('author', sql.NVarChar(50), author)
                .input('comments', sql.NVarChar(sql.MAX), comments)
                .input('date', sql.Date, new Date(date))
                .input('userId', sql.NVarChar(100), userId)
                .query(`
                    INSERT INTO mybooks (id, userid, title, author, comments)
                    OUTPUT INSERTED.*
                    VALUES (123, @userId, @title, @author, @comments)
                `);

            return result.recordset[0];
        } catch (error) {
            console.error('Error saving book:', error);
            throw error;
        }
    }

    static async getByUserId(userId) {
        try {
            await poolConnect;
            
            const result = await pool.request()
                .input('userId', sql.NVarChar(100), userId)
                .query('SELECT * FROM mybooks WHERE user_id = @userId ORDER BY date DESC');

            return result.recordset;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }

    static async getAllBooks(){
        try {
            await poolConnect;
            
            const result = await pool.request()
                .query('SELECT * FROM mybooks');

            return result.recordset;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }
}


module.exports = Book; 