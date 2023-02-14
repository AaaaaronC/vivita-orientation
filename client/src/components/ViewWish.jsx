import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ViewWish(wish) {

  const backHandler = () => {
    window.location.reload();
  };

  return (
    <div className="viewWishOverlay">
      <div className="viewWishWrapper">
        <h1 className="viewWishTitle">{wish.title}</h1>
        <h4 className="viewWishPoster">{wish.email}</h4>
        <h4 className="viewWishBody">{wish.body}</h4>
        <Link className="viewWishButton" onClick={backHandler}>Back</Link>
      </div>
    </div>
  )
}

export default ViewWish;
