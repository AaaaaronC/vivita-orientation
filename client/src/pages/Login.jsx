import { React, useState } from "react";
import Google from "../images/google.png";
import Facebook from "../images/facebook.png";
import { Link } from "react-router-dom";
import Axios from 'axios';
 
// const CLIENT_URL = 'http://localhost:3000';
// const BACKEND_URL = 'http://localhost:3001';

const CLIENT_URL = 'http://18.141.207.124/';
const BACKEND_URL = 'http://18.141.207.124/api';

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginMessage, setLoginMessage] = useState(null);
  
  const google = () => {
    window.open(`${BACKEND_URL}/auth/google`, "_self");
  };

  const login = () => {
    Axios({
      method: 'post',
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: `${BACKEND_URL}/auth/login`
    }).then((response)=>{
      if (!response.data) {
        setLoginMessage('Wrong username/password!');
      } else {
        window.open(CLIENT_URL, "_self");
      }
    });
  }

  return (
    <div className="loginPage">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook">
            <img src={Facebook} alt="" className="icon"/>
            Facebook
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button className="submit" onClick={login}>Login</button>
          <Link className="registerPrompt" to="/register">
            No account yet? Register now!
          </Link>
          <h4>{loginMessage}</h4>
        </div>
      </div>
    </div>
  );
}
