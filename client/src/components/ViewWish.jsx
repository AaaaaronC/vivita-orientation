import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ViewWish(wish) {

  const backHandler = () => {
    // window.location.reload();
    console.log(wish);
  };

  return (
    <div className="viewWishOverlay">
      <div className="viewWishWrapper">
        <div className="viewWishTitle">{wish.title}</div>
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
