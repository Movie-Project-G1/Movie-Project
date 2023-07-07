import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "../../assets/avatar.png";
import "./Blog.css";

export const Blog = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:8800",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <div className="home_page">
        <div className="profile__card">
          <div className="logout_">
            <button onClick={Logout}>
              <i className="fa-solid fa-right-from-bracket" />
            </button>
          </div>
          <div className="img_">
            <img src={Avatar} alt="" />
          </div>
          <div className="info_">
            <h1>{username}</h1>
            <h4>example@gmail.com</h4>
          </div>
          <button className="Button_">MY Blogs</button>
          <div className="card__box">
            <h2>if u want read more of my blog </h2>
            <i className="fa-solid fa-arrow-down" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
