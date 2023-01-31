import {React, useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Delete from '../images/delete.png';
import Edit from '../images/edit.png';

export default function ViewWishesPage({email}) {

  const [wishes, setWishes] = useState([]);
  const navigate = useNavigate();

  const getWishes = () => {
    Axios.get("http://localhost:3001/wish/getwishes").then((response) => {
      setWishes(response.data);
    });
  };

  const deleteWish = (event, wishID) => {
    event.preventDefault();
    console.log(wishID);
    Axios.post('http://localhost:3001/wish/deletewish', {
      wishID: wishID,
    }).then((response) => {
      console.log(response);
      getWishes();
    });
  }

  const editWish = (event, wish) => {
    event.preventDefault();
    navigate(`/editwish/${wish.wishID}`);
  }

  useEffect(() => {
    getWishes();
  }, []);

  return (
    <div className="viewYourWishesPage">
      <div className="wishes">
        <div className='wishHeader'>Look at everyone's wishes!</div>
          <div className="scrollableArea">
            {wishes.map((wish) => { 
              return (
                <Link className="wishWrapper" to={`/${wish.wishID}`} key={wish.wishID}>
                  <div className="wishWrapperLeft">
                    <div className="wishTitle">{wish.title}</div>
                    <div className="wishBody">{wish.body}</div>
                  </div>
                  {(wish.email===email)? (<div className="wishWrapperRight">
                    <div className="deleteButtonWrapper" onClick={(event)=>{deleteWish(event, wish.wishID)}}>
                      <img className="deleteButton" src={Delete}/>
                    </div>
                    <div className="editButtonWrapper">
                      <img src={Edit}  className="editButton" onClick={(event)=>{editWish(event, wish)}}/>
                    </div>
                  </div>) : (<div className="wishWrapperRightEmpty"></div>) }
                </Link>
              )}
              )}
          </div>
        <Link className="toMakeWish" to={'/makewish'}>Add a wish</Link>
      </div>
    </div>
  );
}