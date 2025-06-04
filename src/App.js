import React, { useState, useEffect } from 'react';
import { auth } from './firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './components/Auth';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Trending from './components/Trending';
import MyBooks from './components/MyBooks';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'my-books':
        return <MyBooks />;
      case 'trending':
        return <Trending />;
      case 'editors-picks':
        return <div>Editors Picks Page</div>;
      case 'home':
      default:
        return <Home user={user} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="App">
        {user ? (
          <div className="app-layout">
            <Navbar activePage={currentPage} onPageChange={setCurrentPage} />
            <main className="main-content">
              <nav className="app-nav">
                <button className="sign-out-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </nav>
              {renderPage()}
            </main>
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
