import Axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Delete from "../images/delete.png";
import Edit from "../images/edit.png";

// const CLIENT_URL = "http://localhost:3000";
// const BACKEND_URL = "http://localhost:3001";

const CLIENT_URL = "http://18.141.207.124";
const BACKEND_URL = "http://18.141.207.124";

export default function ViewYourWishesPage({ email }) {
  const [wishes, setWishes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [wishID, setWishID] = useState(null);
  const [wish, setWish] = useState(null);

  const [wishTitle, setWishTitle] = useState(null);
  const [wishBody, setWishBody] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const getWishes = () => {
    Axios.get(`${BACKEND_URL}/wish/getwishes`).then((response) => {
      setWishes(response.data);
    });
  };

  const deleteWish = (event, wishID) => {
    event.preventDefault();
    event.stopPropagation();
    Axios.post(`${BACKEND_URL}/wish/deletewish`, {
      wishID: wishID,
    }).then((response) => {
      console.log(response);
      getWishes();
    });
  };

  const editWish = () => {
    Axios.post(`${BACKEND_URL}/wish/editwish`, {
      wishID: wishID,
      wishTitle: wishTitle,
      wishBody: wishBody,
    }).then((response) => {
      if (response.data === "ER_DUP_ENTRY") {
        setEditMessage("There is already a wish with this title!");
      } else if (response.data === "ER_BAD_NULL_ERROR") {
        setEditMessage("Your wish title and wish can't be empty!");
      } else {
        // window.location.reload();
        setEditMode(false);
        getWishes();
      }
    });
  };

  const toggleEditMode = (event, wish) => {
    event.stopPropagation();
    event.preventDefault();
    setWishID(wish.wishID);
    setEditMode(true);
  };

  const toggleViewMode = (event, wish) => {
    setWish(wish);
    setViewMode(true);
  };

  const backHandler = () => {
    setViewMode(false);
    setEditMode(false);
  };

  useEffect(() => {
    getWishes();
  }, []);

  return (
    <div className="viewYourWishesPage">
      <div className="wishes">
        <div className="wishHeader">Here are your wishes!</div>
        <div className="scrollableArea">
          {wishes.map((wish) => {
            if (email === wish.email) {
              return (
                <Link
                  className="wishWrapper"
                  onClick={(event) => {
                    toggleViewMode(event, wish);
                  }}
                  key={wish.wishID}
                >
                  <div className="wishWrapperLeft">
                    <div className="wishTitle">{wish.title}</div>
                    <div className="wishBody">{wish.body}</div>
                  </div>
                  {wish.email === email ? (
                    <div className="wishWrapperRight">
                      <div
                        className="deleteButtonWrapper"
                        onClick={(event) => {
                          deleteWish(event, wish.wishID);
                        }}
                      >
                        <img className="deleteButton" src={Delete} />
                      </div>
                      <div className="editButtonWrapper">
                        <img
                          src={Edit}
                          className="editButton"
                          onClick={(event) => {
                            toggleEditMode(event, wish);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="wishWrapperRightEmpty"></div>
                  )}
                </Link>
              );
            }
          })}
        </div>
        <Link className="toMakeWish" to={"/makewish"}>
          Add a wish
        </Link>
      </div>
      {editMode && wishID && (
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
      )}
      {viewMode && wish && (
        <div className="viewWishOverlay">
          <div className="viewWishWrapper">
            <div className="viewWishTitle">{wish.title}</div>
            <div className="viewWishPoster">{wish.email}</div>
            <div className="viewWishBodyWrapper">
              <div className="viewWishBody">{wish.body}</div>
            </div>
            <div className="viewWishButtonsWrapper">
              <Link className="viewWishButton" onClick={backHandler}>
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
