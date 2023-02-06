import { React, useState } from "react";
import Axios from "axios";

// const CLIENT_URL = 'http://localhost:3000';
// const BACKEND_URL = 'http://localhost:3001';

const CLIENT_URL = 'http://18.141.207.124/';
const BACKEND_URL = 'http://18.141.207.124/api';


const bcrypt = require('bcryptjs');

function Register() {
  const [regMessage, setRegMessage] = useState(null);
  const [regUsername, setRegUsername] = useState(null);
  const [regPassword, setRegPassword] = useState(null);
  const [regEmail, setRegEmail] = useState(null);

  const login = () => {
    Axios({
      method: 'post',
      data: {
        username: regUsername,
        password: regPassword,
      },
      withCredentials: true,
      url: `${BACKEND_URL}/auth/login`
    }).then(window.open(CLIENT_URL, "_self"));
  }

  const register = async () => {
    const hashedRegPassword = await bcrypt.hash(regPassword, 10);
    Axios.post(`${BACKEND_URL}/auth/register`, {
      regUsername: regUsername,
      regEmail: regEmail,
      regPassword: hashedRegPassword
    }).then((response) => {
      console.log(response);
      if (response.data === "ER_DUP_ENTRY") {
        setRegMessage("Username/Email already in use!");
      } else if (response.data === "ER_BAD_NULL_ERROR") {
        setRegMessage("All fields must be filled!");
      } else {
        login()
      }
    });
  };

  return (
    <div className="registerPage">
      <div className="registerWrapper">
        <h1 className="registerTitle">Registration</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setRegUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(event) => {
            setRegEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setRegPassword(event.target.value);
          }}
        />
        <button className="registerButton" onClick={register}>
          Register
        </button>
        <h4>{regMessage}</h4>
      </div>
    </div>
  );
}

export default Register;
