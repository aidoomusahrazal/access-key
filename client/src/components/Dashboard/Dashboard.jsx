import React, { useState, useEffect } from 'react';
import SideNav from './../SideNav/SideNav';
import AdminLogin from './../AdminLogIn/AdminLogIn';
import KeysComponent from './../KeysComponent/KeysComponent';
import CheckKey from './../CheckKey/CheckKey';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [currentRoute, setCurrentRoute] = useState('keys'); // Default route
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if admin is logged in by checking localStorage or any other method you use for authentication
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    // Save token to localStorage
    localStorage.setItem('adminToken', token);
    setIsAdminLoggedIn(true);
  };

  if (!isAdminLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  let content;
  switch (currentRoute) {
    case 'keys':
      content = <KeysComponent />;
      break;
    case 'check-key':
      content = <CheckKey />;
      break;
    default:
      content = <KeysComponent />;
      break;
  }

  return (
    <div className={styles.dashboard}>
      <SideNav setCurrentRoute={setCurrentRoute} />
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
};

export default Dashboard;