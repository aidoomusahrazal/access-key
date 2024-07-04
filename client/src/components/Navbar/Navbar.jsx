import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <h1>School</h1>
      </div>
      <div className={styles.middle}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/keys" className={styles.link}>Keys</Link>
        <Link to="/generate-keys" className={styles.link}>Generate Keys</Link>
      </div>
      <div className={styles.right}>
        {isLoggedIn ? (
          <button onClick={handleSignOut} className={styles.button}>Sign Out</button>
        ) : (
          <>
            <Link to="/login">
              <button className={`${styles.button} ${styles.signIn}`}>Sign In</button>
            </Link>
            <Link to="/register">
              <button className={styles.button}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
