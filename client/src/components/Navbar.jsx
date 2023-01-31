import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

const CLIENT_URL = 'http://localhost:3000';
const BACKEND_URL_AUTH = 'http://localhost:3001/auth';

export default function navbar({user}) {

  const logout = () => {
      Axios({
        method: 'post',
        withCredentials: true,
        url: `${BACKEND_URL_AUTH}/logout`
      }).then(window.open(CLIENT_URL, '_self'));
  };

  const toHome = () => {
    window.open(CLIENT_URL, '_self');
  }

  return (
    <div className="navbar">
      <span className="logo">
        <div className="link" onClick={toHome}>
          Wishmaker
        </div>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem Selectable" onClick={logout}>Logout</li>
          <li className="listItem">Username: {user.username}</li>
          <li className="listItem">Email: {user.email}</li>
        </ul>
      ) : (<Link className="link" to={'./login'}>Login</Link>)
      }
    </div>
  )
}
