import React, { useState } from 'react';
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.message
                .replace('Firebase:', '')
                .replace('Error', '')
                .trim());
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2l8 7 8-7Z"/>
                        <path d="M2 6l8 7 8-7M2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6"/>
                    </svg>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <div className="auth-switch">
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                </button>
            </div>
        </div>
    );
};

export default Auth; 