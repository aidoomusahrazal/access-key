import React, { useState } from 'react';
import styles from './ForgetPasswordComponent.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordComponent = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  console.log(email)


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/forget-password", { email }  );

      if (response.data.error) {
        setMessage(response.data.error);
      } else {

        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response ? error.response.data.error : "An error occurred");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <p className={styles.title}>Enter your Email</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          {message && <p style={{ color: "red" }}>{message}</p>}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={styles.input}
            placeholder="Email"
          />
          <p className={styles.pageLink}>
            <span className={styles.pageLinkLabel}>Forgot Password?</span>
          </p>
          <button type="submit" className={styles.formBtn}>Reset Password</button>
        </form>
        <p className={styles.signUpLabel}>
          Don't have an account? <Link to="/register" className={styles.signUpLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPasswordComponent;