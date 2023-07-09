import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./blogs.css";

export const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);

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
  }, []);

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
          <div className="blogs__title">
            <p>
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 ">
            {blogs &&
              blogs.map((data) => (
                <article
                  key={data._id}
                  className="Blogs_card p-6 bg-[#173d73] rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
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
                    <h2 className="blog_text mb-2 text-2xl font-bold tracking-tight text-white">
                      <a href="#">{data.title}</a>
                    </h2>
                  </Link>
                  <p className="blog_text  text-gray-500 dark:text-gray-400">
                    {data.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-7 h-7 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                        alt="Jese Leos avatar"
                      />
                      <span className="font-medium text-white">
                        {data.author.username}
                      </span>
                    </div>
                    <Link
                      to={`/blogDetails/${data._id}`}
                      className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline text-white"
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
