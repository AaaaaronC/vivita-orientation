import React from 'react'
import { useParams } from "react-router-dom";

function SingleWishPage({email, wishes}) {
    const params = useParams();
    const wishID = params.id;
    const wish = wishes.find((wish)=>wish.wishID == wishID);

    // console.log(wish);

    return (
        <div className="singleWishPage">
            <div className="singleWishTitle">{wish.title}</div>
            <div className="singleWishEmail"> by {wish.email}</div>
            <br></br>
            <div className="wishBodyWrapper">
                <div className="singleWishBody">{wish.body}</div>   
            </div>
        </div>
    )
}

export default SingleWishPage
