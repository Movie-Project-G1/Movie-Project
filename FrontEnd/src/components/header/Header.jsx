import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "../../assets/avatar.png";

import axios from "axios";
import "./style.scss";
// import "./header.css";

import { toast } from "react-toastify";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/moviehub-logo-.png";
import { useCookies } from "react-cookie";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, removeCookie] = useCookies([]);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");

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
      console.log(data);
      const { status, user, id } = data;
      setUser(user);
      setUserId(id);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else if (type === "tv") {
      navigate("/explore/tv");
    } else {
      navigate("/blogs");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>

          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>

          <li className="menuItem" onClick={() => navigationHandler("blogs")}>
            Blog
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>

          {user ? (
            <>
              <div className="dropdown">
                <button className="dropbtn">
                  <img src={Avatar} alt="" />
                  <i class="fa fa-caret-down" />
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">
                    <li>Profile</li>
                  </Link>
                  <button
                    onClick={() => {
                      removeCookie("token");
                      navigate("/signup");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <li className="menuItem">
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Join us
                </button>
              </li>
            </>
          )}
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
