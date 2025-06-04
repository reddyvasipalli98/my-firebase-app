import React from 'react';
import { BiBook, BiTrendingUp, BiHome } from 'react-icons/bi';
import { MdStars } from 'react-icons/md';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ activePage, onPageChange }) => {
    const { isDark, toggleTheme } = useTheme();

    const menuItems = [
        { id: 'home', label: 'Home', icon: <BiHome /> },
        { id: 'my-books', label: 'My Books', icon: <BiBook /> },
        { id: 'trending', label: 'Trending', icon: <BiTrendingUp /> },
        { id: 'editors-picks', label: 'Editors Picks', icon: <MdStars /> }
    ];

    return (
        <nav className="vertical-navbar">
            <div className="nav-content">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => onPageChange(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                        {activePage === item.id && <div className="active-indicator" />}
                    </button>
                ))}
                
                <button 
                    className="nav-item theme-toggle" 
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    <span className="nav-icon">
                        {isDark ? <RiSunLine /> : <RiMoonLine />}
                    </span>
                    <span className="nav-label">
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar; 