import React, { useState } from 'react';
import styles from './LoginComponent.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/login", { email, password }  );
      console.log(response);

      if (response.data.error) {
        setMessage(response.data.error);
      } else {
        setMessage("Login successful");
        const userEmail = response.data.user.email

        localStorage.setItem('email', userEmail)
        localStorage.setItem('token', response.data.token)
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
        <p className={styles.title}>Welcome back</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          {message && <p style={{ color: "red" }}>{message}</p>}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={styles.input}
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={styles.input}
            placeholder="Password"
          />
          <p className={styles.pageLink}>
            <button onClick={() => {navigate("/forget-password")}} className={styles.pageLinkLabel}>Forgot Password?</button>
          </p>
          <button type="submit" className={styles.formBtn}>Log in</button>
        </form>
        <p className={styles.signUpLabel}>
          Don't have an account? <Link to="/register" className={styles.signUpLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;