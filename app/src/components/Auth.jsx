import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./Auth.module.css";
import { AuthContext } from '../contexts/AuthContext';
import { registerUser } from '../api/auth';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const grantType = 'password';

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const registerHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email: regEmail, username, password: regPassword });
      await login({grant_type: grantType, username: regEmail, password: regPassword});
      navigate('/resumes');
    } catch (err) {
      setRegError(err.message);
    }
  };

  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({grant_type: grantType, username: loginEmail, password: loginPassword});
      navigate('/resumes');
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <div className={styles.container}>

      <h1 className={`${styles.heading} ${styles.headingFadeIn}`}>Resumé Vault</h1>

      <form onSubmit={loginHandleSubmit}>
        <input type="email" placeholder="Email" name="loginEmail" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
        <input type="password" placeholder="Password" name="loginPassword" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
        <button type="submit">Авторизоваться</button>
        {loginError && <p>{loginError}</p>}
      </form>

      <div className={styles.divider}>или</div>

      <form onSubmit={registerHandleSubmit}>
        <input type="email" placeholder="Email" name="regEmail" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
        <input type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" name="regPassword" value={regPassword} onChange={e => setRegPassword(e.target.value)} />
        <button type="submit">Зарегистрироваться</button>
        {regError && <p>{regError}</p>}
      </form>

    </div>
  );
}
