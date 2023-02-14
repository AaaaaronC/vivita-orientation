import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ViewWish(wishes, wishID) {
  const wish = wishes.find((wish) => wish.wishID == wishID);
  return (
    <div className="viewWishOverlay">
      <div className="viewWishWrapper">
        <h1 className="wishTitle">{wish.title}</h1>
        <h4 className="wishPoster">{wish.email}</h4>
      </div>
    </div>
  )
}

export default ViewWish;
