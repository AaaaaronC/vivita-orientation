import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

// const CLIENT_URL = "http://localhost:3000";
// const BACKEND_URL = "http://localhost:3001";

const CLIENT_URL = "http://18.141.207.124";
const BACKEND_URL = "http://18.141.207.124";

function EditWish(wishID) {
  const [wishTitle, setWishTitle] = useState(null);
  const [wishBody, setWishBody] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const editWish = () => {
    Axios.post(`${BACKEND_URL}/wish/editwish`, {
      wishID: wishID.wishID,
      wishTitle: wishTitle,
      wishBody: wishBody,
    }).then((response) => {
      if (response.data === "ER_DUP_ENTRY") {
        setEditMessage("There is already a wish with this title!");
      } else if (response.data === "ER_BAD_NULL_ERROR") {
        setEditMessage("Your wish title and wish can't be empty!");
      } else {
        window.location.reload();
      }
    });
  };

  const backHandler = () => {
    window.location.reload(false);
  };

  return (
    <div className="editWishOverlay">
      <div className="editWishWrapper">
        <h1>Edit</h1>
        <h4>
          If you do not wish to change your wish title/body, leave it blank!
        </h4>
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
        <div className="editWishButtonsWrapper">
          <Link className="editWishButton" onClick={editWish}>
            Edit
          </Link>
          <Link className="editWishButton" onClick={backHandler}>
            Back
          </Link>
        </div>
        <h4>{editMessage}</h4>
      </div>
    </div>
  );
}

export default EditWish;
