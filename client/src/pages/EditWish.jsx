import React, { useState } from "react";
import Axios from 'axios';
import { Link, useLocation, useParams } from "react-router-dom";

// const CLIENT_URL = 'http://localhost:3000';
// const BACKEND_URL = 'http://localhost:3001';

const CLIENT_URL = 'http://18.141.207.124/';
const BACKEND_URL = 'http://18.141.207.124/api';

function EditWish({ email }) {
  const wishID = useParams().id;
  const [wishTitle, setWishTitle] = useState(null);
  const [wishBody, setWishBody] = useState(null);

  const [editMessage, setEditMessage] = useState("");

  const check = () => {
    console.log(wishID);
  }

  const editWish = () => {
    Axios.post(`${BACKEND_URL}/wish/editwish`, {
      wishID: wishID,
      wishTitle: wishTitle,
      wishBody: wishBody,
    }).then((response) => {
      console.log(response);
      if (response.data === "ER_DUP_ENTRY") {
        setEditMessage("There is already a wish with this title!");
      } else if (response.data === 'ER_BAD_NULL_ERROR') {
        setEditMessage("Your wish title and wish can't be empty!");
      } else {
        setEditMessage(response.data.message);
      }
    });
  };

  return (
    <div className="makeWishesPage">
      <div className="makeWishWrapper">  
        <h1>Edit</h1>
        <textarea
          placeholder="New Wish Title"
          rows={1}
          cols={25}
          onChange={(event) => {
            setWishTitle(event.target.value);
          }}
        />
        <br></br>
        <textarea
          placeholder={"Enter your new wish here!"}
          rows={10}
          cols={50}
          onChange={(event) => {
            setWishBody(event.target.value);
          }}
        />
        <br></br>
        <div className="makeWishButtonsWrapper">
          <Link className='makeWishButton' onClick={editWish}>Edit</Link>
          <Link className='makeWishButton' to={'/viewyourwishes'}>Your Wishes</Link>
        </div>
        <h4>{editMessage}</h4>
      </div>
    </div>
  );
}

export default EditWish;
