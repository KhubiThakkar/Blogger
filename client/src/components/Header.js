import { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  // const [ redirect, setRedirect ] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/profile`, {
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((Info) => {
            setUserInfo(Info);
          });
        } else {
          response.json().then((err) => {
            alert(err.e);
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function logout() {
    fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
      credentials: 'include',
      method: 'POST'
    }).then((response) => {
      if (response.status === 200) {
        setUserInfo(null);
        // setRedirect(true);
      } else {
        response.json().then((err) => {
          alert(err.e);
        });
      }
    });
  }

  const username = userInfo?.username;
  // if (redirect) {
  //   console.log('-----redirect------');
  //   return <Navigate to={'/'} />;
  // }
  return (
    <header>
      <Link to={'/'} className="logo">
        Daily Blogger
      </Link>

      {username && (
        <nav>
          <span>Hello, {username}</span>
          <Link to={'/about'}>About Me</Link>
          <Link to={'/create'}>Create Blog</Link>
          <a onClick={logout}>
            Logout
          </a>
        </nav>
      )}

      {!username && (
        <nav>
          <Link to={'/about'}>About Me</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </nav>
      )}
    </header>
  );
}
