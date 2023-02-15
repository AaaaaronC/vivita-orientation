import React, { useState } from "react";
import Axios from "axios";
import {Link} from 'react-router-dom';

// const CLIENT_URL = "http://localhost:3000";
// const BACKEND_URL = "http://localhost:3001";

const CLIENT_URL = "http://18.141.207.124";
const BACKEND_URL = "http://18.141.207.124";

export default function MakeWishPage({email}) {

  const [wishTitle, setWishTitle] = useState(null);
  const [wishBody, setWishBody] = useState(null);

  const [submitMessage, setSubmitMessage] = useState("");

  const makeWish = () => {
    Axios.post(`${BACKEND_URL}/wish/makewish`, {
      email: email,
      wishTitle: wishTitle,
      wishBody: wishBody,
    }).then((response) => {
      console.log(response);
      if (response.data === "ER_DUP_ENTRY") {
        setSubmitMessage("You already made a wish with this title!");
      } else if (response.data === 'ER_BAD_NULL_ERROR') {
        setSubmitMessage("Your wish title and wish can't be empty!");
      } else if (response.data === 'ER_DATA_TOO_LONG') {
        setSubmitMessage("Your wish title/body is too long!");
      } else {
        setSubmitMessage(response.data.message);
      }
    });
  };

  return (
    <div className="makeWishesPage">
      <div className="makeWishWrapper">  
        <h1>Make a Wish!</h1>
        <textarea
          placeholder="Wish Title"
          rows={1}
          cols={25}
          onChange={(event) => {
            setWishTitle(event.target.value);
          }}
        />
        <br></br>
        <textarea
          placeholder="Enter your wish here!"
          rows={10}
          cols={50}
          onChange={(event) => {
            setWishBody(event.target.value);
          }}
        />
        <br></br>
        <div className="makeWishButtonsWrapper">
          <Link className='makeWishButton' onClick={makeWish}> Submit wish </Link>
          <Link className='makeWishButton' to={'/viewyourwishes'}>View wishes</Link>
        </div>
        <h4>{submitMessage}</h4>
      </div>
    </div>
  );
}
