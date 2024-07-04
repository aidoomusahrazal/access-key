import React, { useState } from 'react';
import styles from './NewPasswordComponent.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const NewPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const {token} = useParams()

//   console.log(email)


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/api/reset-password/${token}`, { password }  );

      console.log(response)

      if (response.data.error) {
        setMessage(response.data.error);
      } else {
        setMessage("Password reset successful");
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response ? error.response.data.error : "An error occurred");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Enter New Password</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          {message && <p style={{ color: "red" }}>{message}</p>}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={styles.input}
            placeholder="New Password"
          />
          <button type="submit" className={styles.formBtn}>New Password</button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordComponent;