import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './KeyComponent.module.css'; // Import your CSS module
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const KeyComponent = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('token');

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

        console.log(response)

        setKeys(response.data.accessKeys);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchKeys();
  }, [token]);

  const handleGenerateKey = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/get-access-key', { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the response contains an error
      if (response.status === 200) {
     
            // Update the list of keys with the newly generated key
            setKeys([...keys, response.data.accessKey]);
            Swal.fire( "Key generated successfully" )
      } 
    } catch (err) {
      setError(err);
      if ( err.response.status === 400 ) {
        Swal.fire( err.response.data.message )
      }
    }
  };

  if (!token) {
    return <div>Please log in to see your keys.</div>;
  }

  if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.keyComponent}>
      <h2>Your Keys</h2>
      {message && <div className={styles.message}>{message}</div>}
      {keys.length === 0 ? (
        <div>
          You have no keys. <Link to="/generate-keys">Generate a key</Link>.
        </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Key</th>
                <th>Status</th>
                <th>Date of Procurement</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => (
                <tr key={key.id}>
                  <td>{key.key}</td>
                  <td>{key.keyStatus}</td>
                  <td>{new Date(key.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(key.expiresAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <form onSubmit={handleGenerateKey} className={styles.generateKeyForm}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.generateKeyButton}>Generate Key</button>
          </form>
        </>
      )}
    </div>
  );
};

export default KeyComponent;