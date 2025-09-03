import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const data = await registerUser({ email, username, password });
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
    <div>
      <form onSubmit={registerHandleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
      <div>или</div>
      <form onSubmit={loginHandleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
