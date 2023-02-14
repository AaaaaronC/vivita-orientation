import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ViewWish(wish) {

  var wishTitle = wish.title;
  var wishPoster = wish.email;
  var wishBody = wish.body;

  const backHandler = () => {
    // window.location.reload();
    console.log(wishTitle);
  };

  useEffect(()=>{
    wishTitle = wish.title;
    wishPoster = wish.email;
    wishBody = wish.body;
  })

  return (
    <div className="viewWishOverlay">
      <div className="viewWishWrapper">
        <div className="viewWishTitle">{wishTitle}</div>
        <div className="viewWishPoster">wish email</div>
        <div className="viewWishBody">wish body</div>
        <div className="viewWishButtonsWrapper">
          <Link className="viewWishButton" onClick={backHandler}>Back</Link>
        </div>
      </div>
    </div>
  )
}

export default ViewWish;
