import React, { useState } from 'react';
import styles from './SignupComponent.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/register", { name, email, password });
      console.log(response);

      if (response.data.error) {
        setMessage(response.data.error);
      } else {
        setMessage("Signup successful");

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
      <p className={styles.title}>Sign Up</p>
      <form onSubmit={handleSubmit} className={styles.form}>
      {message && <p style={{ color: "red" }}>{message}</p>}
        <input onChange={(e) => {setName(e.target.value)}} type="text" className={styles.input} placeholder="Full Name" />
        <input onChange={(e) => {setEmail(e.target.value)}}  type="email" className={styles.input} placeholder="Email" />
        <input onChange={(e) => {setPassword(e.target.value)}}  type="password" className={styles.input} placeholder="Password" />
        {/* <p className={styles.pageLink}>
          <span className={styles.pageLinkLabel}>Forgot Password?</span>
        </p> */}
        <button type='submit' className={styles.formBtn}>Sign Up</button>
      </form>
      <p className={styles.signUpLabel}>
        Already have an account?<Link to="/login" className={styles.signUpLink}>Sign in</Link>
      </p>
      
    </div>
</div>
  );
}

export default SignupComponent;