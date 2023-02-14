import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ViewWish(wish) {

  const backHandler = () => {
    // window.location.reload();
    console.log(wishTitle);
  };

  useEffect(()=>{
    const wishTitle = wish.title;
    const wishPoster = wish.email;
    const wishBody = wish.body;
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
