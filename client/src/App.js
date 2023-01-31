import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MakeWishPage from "./pages/MakeWishPage";
import ViewWishesPage from "./pages/ViewWishesPage";
import ViewYourWishesPage from "./pages/ViewYourWishesPage";
import SingleWishPage from "./pages/SingleWishPage";
import Register from "./pages/Register";
import EditWish from "./pages/EditWish";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [wishes, setWishes] = useState([]);

  const getWishes = () => {
    Axios.get("http://localhost:3001/wish/getwishes").then((response) => {
      setWishes(response.data);
    });
  };

  const getUser = () => {
    Axios({
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
      url: "http://localhost:3001/auth/getuser",
    }).then((res) => {
      if (res.data) {
        setUser(res.data);
        setEmail(res.data.email);
      }
    });
  };

  useEffect(() => {
    getUser();
    getWishes();
    console.log(user);
  }, []);

  return (
    <BrowserRouter>
      <div className="background">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/makewish"
            element={
              user ? <MakeWishPage email={email} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewwishes"
            element={<ViewWishesPage email={email} wishes={wishes} />}
          />
          <Route
            path="/viewyourwishes"
            element={
              user ? (
                <ViewYourWishesPage email={email} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/:id"
            element={<SingleWishPage email={email} wishes={wishes} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="editwish/:id" element={<EditWish email={email} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
