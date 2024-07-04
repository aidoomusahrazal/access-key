import React from 'react';
import styles from './SideNav.module.css';

const SideNav = ({ setCurrentRoute }) => {
  return (
    <div className={styles.sidenav}>
      <h1>Admin Dashboard</h1>
      <button className={styles.navButton} onClick={() => setCurrentRoute('keys')}>Keys</button>
      <button className={styles.navButton} onClick={() => setCurrentRoute('check-key')}>Check Key</button>
    </div>
  );
};

export default SideNav;
