import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./blogs.css";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

export const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [addBlog, setAddBlog] = useState("");
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  console.log(userId);
  const [refresh, setRefresh] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // console.log(userId);
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
      setUsername(user);
      setUserId(id);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const [blogInfo, setBlogInfo] = useState({
    title: " ",
    content: " ",
    // Add more input fields as needed
  });

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setBlogInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(blogInfo.title);
    e.preventDefault();
    axios
      .post(`http://localhost:8800/addblog/${userId}`, blogInfo)
      .then((response) => {
        console.log("blog added successfully");
        console.log(response.data);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error, "error in add the blog");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8800/getAllBlogs")
      .then((response) => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  // Function to format time difference as "X time ago"
  const formatTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const commentTime = new Date(createdAt);
    const timeDiff = currentTime.getTime() - commentTime.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (timeDiff < minute) {
      const seconds = Math.round(timeDiff / 1000);
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < hour) {
      const minutes = Math.round(timeDiff / minute);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < day) {
      const hours = Math.round(timeDiff / hour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < month) {
      const days = Math.round(timeDiff / day);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < year) {
      const months = Math.round(timeDiff / month);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.round(timeDiff / year);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Our Blog</h1>
        <h1 className="title title-large">Our Blog</h1>
        <div id="img-1" className="img-container">
          <img
            className="img"
            src="https://wallpaperaccess.com/full/37945.jpg"
          />
        </div>
        <div className="img-container second-animation">
          <img
            className="img"
            src="https://wallpaperaccess.com/full/37951.jpg"
          />
        </div>
        <div className="img-container third-animation">
          <img
            className="img"
            src="https://wallpaperaccess.com/full/37958.jpg"
          />
        </div>
        <div className="img-container fourth-animation">
          <img
            className="img nba"
            src="https://wallpaperaccess.com/full/37963.jpg"
          />
        </div>
        <div className="img-container fifth-animation">
          <img
            className="img"
            src="https://wallpaperaccess.com/full/37970.jpg"
          />
        </div>
        <div id="img-6" className="img-container sixth-animation">
          <img
            className="img"
            src="https://wallpaperaccess.com/full/5198.jpg"
          />
        </div>
        <div id="img-7" className="img-container seventh-animation">
          <img
            className="img"
            src="https://wallpaperaccess.com/full/38004.jpg"
          />
        </div>
      </div>

      <section className="bg-[#000000] dark:bg-gray-900 pt-10">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white dark:text-white">
              Our Blog
            </h2>
            <p className="font-light text-gray-200 sm:text-xl dark:text-gray-400">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              onChange={handleChange}
              // value={blogInfo.title}
              type="text"
              placeholder="add title to your article"
              className="w-full px-3 my-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label for="content" class="sr-only">
                  Your article....
                </label>
                <textarea
                  name="content"
                  onChange={handleChange}
                  id="content"
                  rows="4"
                  class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                  required
                  // value={blogInfo.content}
                ></textarea>
              </div>
              <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Post Blog
                </button>
              </div>
            </div>
          </form>
          <div className="grid gap-8 lg:grid-cols-2">
            {blogs &&
              blogs.map((data) => (
                <article
                  key={data._id}
                  className="p-6 bg-[#173d77] rounded-lg border border-gray-200 shadow-md  shadow-gray-400 dark:bg-gray-800 dark:border-gray-700 "
                >
                  <div className="flex justify-between items-center mb-5 text-gray-500">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg
                        className="mr-1 w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Tutorial
                    </span>
                    <span className="text-sm">
                      {" "}
                      {formatTimeAgo(data.createdAt)}
                    </span>
                  </div>
                  <Link to={`/blogDetails/${data._id}`}>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray dark:text-white">
                      {data.title}
                    </h2>
                  </Link>
                  <p className="mb-5  font-light text-gray-300 dark:text-gray-400">
                    {data.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-7 h-7 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                        alt="Jese Leos avatar"
                      />
                      <span className="font-medium dark:text-white">
                        {data.author.username}
                      </span>
                    </div>
                    <Link
                      to={`/blogDetails/${data._id}`}
                      className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                    >
                      Read more
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
