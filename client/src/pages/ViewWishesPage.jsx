import {React, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Delete from '../images/delete.png';
import Edit from '../images/edit.png';
import EditWish from '../components/EditWish';
import ViewWish from '../components/ViewWish';

// const CLIENT_URL = "http://localhost:3000";
// const BACKEND_URL = "http://localhost:3001";

const CLIENT_URL = "http://18.141.207.124";
const BACKEND_URL = "http://18.141.207.124";

export default function ViewWishesPage({email}) {

  const [wishes, setWishes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [wishID, setWishID] = useState(null);
  const [wish, setWish] = useState(null);

  const getWishes = () => {
    Axios.get(`${BACKEND_URL}/wish/getwishes`).then((response) => {
      setWishes(response.data);
    });
  };

  const deleteWish = (event, wishID) => {
    event.preventDefault();
    Axios.post(`${BACKEND_URL}/wish/deletewish`, {
      wishID: wishID,
    }).then((response) => {
      console.log(response);
      getWishes();
    });
  }

  const editWish = (event, wish) => {
    event.preventDefault();
    setWishID(wish.wishID)
    setEditMode(true);
  }

  const viewWish = (event, wish) => {
    setWish(wish);
    setViewMode(true);
    console.log('viewing', wish);
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
                <Link className="wishWrapper" onClick={(event)=>{viewWish(event, wish)}} key={wish.wishID}>
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
      {(editMode && wishID) && <EditWish wishID = {wishID}/>}
      {(viewMode && wish) && <ViewWish wish = {wish}/>}
    </div>
  );
}