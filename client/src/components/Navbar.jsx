import React from "react";
import { Link } from "react-router-dom";

const CLIENT_URL = "http://18.141.207.124";
const BACKEND_URL = "http://18.141.207.124";


export default function navbar({user}) {

  const logout = () => {
      window.open(`${BACKEND_URL}/auth/logout`, '_self');
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
