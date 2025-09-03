import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./AuthForm.module.css";
import { AuthContext } from '../contexts/AuthContext';
import { registerUser } from '../api/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);

  const grantType = 'password';
  const navigate = useNavigate();

  const registerHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, username, password });
      await login({grant_type: grantType, username: email, password});
      navigate('/resumes');
    } catch (err) {
      setError(err.message);
    }
  };

  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({grant_type: grantType, username: email, password});
      navigate('/resumes');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>

      <h1 className={`${styles.heading} ${styles.headingFadeIn}`}>Resumé Vault</h1>

      <form onSubmit={loginHandleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Авторизоваться</button>
        {error && <p>{error}</p>}
      </form>

      <div className={styles.divider}>или</div>

      <form onSubmit={registerHandleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Зарегистрироваться</button>
        {error && <p>{error}</p>}
      </form>

    </div>
  );
}
