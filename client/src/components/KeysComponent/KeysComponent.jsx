import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './KeysComponent.module.css';

const KeysComponent = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchKeys = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/get-access-keys', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setKeys(response.data.accessKeys);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchKeys();
  }, [token]);

  const handleRevokeKey = async (keyId) => {
    try {
      await axios.get(`http://localhost:4000/api/revoke-access-key/${keyId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the list of keys to remove the revoked key
      setKeys(keys.filter((key) => key.id !== keyId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.keyComponent}>
      <h2>Keys Generated</h2>
      {keys.length === 0 ? (
        <div>No keys generated.</div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Key</th>
                <th>Status</th>
                <th>Date of Procurement</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => (
                <tr key={key.id}>
                  <td>{key.key}</td>
                  <td>{key.keyStatus}</td>
                  <td>{new Date(key.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(key.expiresAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={styles.revokeButton}
                      onClick={() => handleRevokeKey(key._id)}
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default KeysComponent;
