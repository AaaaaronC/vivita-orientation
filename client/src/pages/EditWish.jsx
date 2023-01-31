import React, { useState } from "react";
import Axios from 'axios';
import { Link, useLocation, useParams } from "react-router-dom";

function EditWish({ email }) {
  const wishID = useParams().id;
  const [wishTitle, setWishTitle] = useState(null);
  const [wishBody, setWishBody] = useState(null);

  const [editMessage, setEditMessage] = useState("");

  const check = () => {
    console.log(wishID);
  }

  const editWish = () => {
    Axios.post("http://localhost:3001/wish/editwish", {
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
