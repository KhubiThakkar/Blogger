import { useState } from 'react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.status === 200) {
        alert('Registration Successful');
      } else {
        response.json().then((error) => {
          alert(error.e);
        });
      }
    }).catch(error => alert(error))
    
  }

  return (
    <div>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder="username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
