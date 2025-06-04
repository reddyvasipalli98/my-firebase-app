import React from 'react';
import './Home.css';

const Home = ({ user }) => {
    return (
        <div className="home-container">
            <div className="welcome-card">
                <div className="avatar">
                    {user.email[0].toUpperCase()}
                </div>
                <h1 className="welcome-title">
                    Welcome back!
                </h1>
                <p className="user-email">{user.email}</p>
                <div className="welcome-message">
                    <p>We're glad to see you here. Your journey begins now.</p>
                </div>
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-icon">📅</span>
                        <span className="stat-label">Member since</span>
                        <span className="stat-value">
                            {new Date(user.metadata.creationTime).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon">🕒</span>
                        <span className="stat-label">Last login</span>
                        <span className="stat-value">
                            {new Date(user.metadata.lastSignInTime).toLocaleTimeString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home; 