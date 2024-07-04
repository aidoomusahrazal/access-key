import React, { useState } from 'react';
import axios from 'axios';
import styles from './CheckKey.module.css';

const CheckKey = () => {
  const [email, setEmail] = useState('');
  const [keyDetails, setKeyDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckKey = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/get-access-key/${email}`);
      setKeyDetails(response.data.accessKey);
      setError(null);

      console.log(response.data.accessKey)
    } catch (err) {
      setKeyDetails([]);
      setError(err.response.data.error || 'No active key found for this email');
    }
  };

  return (
    <div className={styles.checkKeyContainer}>
      <form onSubmit={handleCheckKey} className={styles.checkKeyForm}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.checkKeyButton}>Check Key</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      { keyDetails && (
        <table className={styles.keyDetailsTable}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Date of Procurement</th>
              <th>Status</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td>{keyDetails.key}</td>
                <td>{new Date(keyDetails.createdAt).toLocaleDateString()}</td>
                <td>{keyDetails.keyStatus}</td>
                <td>{new Date(keyDetails.expiresAt).toLocaleDateString()}</td>
              </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckKey;
