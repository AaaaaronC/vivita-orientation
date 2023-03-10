import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MakeWishPage from "./pages/MakeWishPage";
import ViewWishesPage from "./pages/ViewWishesPage";
import ViewYourWishesPage from "./pages/ViewYourWishesPage";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

// const CLIENT_URL = "http://localhost:3000";
// const BACKEND_URL = "http://localhost:3001";

const CLIENT_URL = "http://18.141.207.124";
const BACKEND_URL = "http://18.141.207.124";

function App() {
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null);
  const [wishes, setWishes] = useState([]);

  const getWishes = () => {
    Axios.get(`${BACKEND_URL}/wish/getwishes`).then((response) => {
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
      url: `${BACKEND_URL}/auth/getuser`,
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
            element={<ViewWishesPage email={email} />}
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
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
