import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((userInfo) => {
            setUserInfo(userInfo);
            setRedirect(true);
          });
        } else {
          console.log('response: ', response);
          response.json().then((error) => {
            alert(error.e);
          });
        }
      })
      .catch((error) => alert(error));
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          // This sets the value of the input field to the current value of the username state variable, which will be initially set to an empty string if not defined.
          // this attribute will display the value enter by the user in the input box
          value={username}
          //This sets the function to be executed when the input field's value is changed by the user. In this case, it sets the username state variable to the current value of the input field using the setUsername function. The (ev) => setUsername(ev.target.value) is a callback function that takes an event object (which represents the user's input) and updates the state with the new value.
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
