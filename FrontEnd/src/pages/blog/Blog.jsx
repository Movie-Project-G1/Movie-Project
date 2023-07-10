import { useEffect, useState } from "react";
import "flowbite";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "../../assets/avatar.png";
import "./Blog.css";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
export const Blog = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [refresh, setRefresh] = useState(true);
  console.log(userId);
  console.log(username);
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
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  console.log(username);
  //! ----------------------------------add comment------------------------------------------------
  const [commentText, setCommentText] = useState();

  const handleSubmitAddComment = (e) => {
    e.preventDefault();
    const commentData = {
      user: userId,
      blog: blogDetails._id,
      text: commentText,
    };
    axios
      .post("http://localhost:8800/addComment", commentData)
      .then((response) => {
        console.log("comment added successfully");
        console.log(response.data);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error, "error in add the comment");
      });
  };

  //! ----------------------------------get blog details------------------------------------------------

  const [blogDetails, setBlogDetails] = useState();
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:8800/getBlog/${id}`)
      .then((response) => {
        setBlogDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  //! ---------------------------------get blog comments -----------------------------------------------
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (blogDetails && blogDetails._id) {
      axios
        .get(`http://localhost:8800/getComments/${blogDetails._id}`)
        .then((response) => {
          setComments(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [blogDetails, refresh]);
  console.log(comments);
  const handleDeleteComment = (idComment) => {
    axios
    .put(`http://localhost:8800/deleteComment/${idComment}`)
    .then((response) => {
      console.log(response.data);
      setRefresh(!refresh)
    })
    .catch((error) => {
      console.error(error);
    });
  }

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
      <main className="pt-20 pb-16 lg:pt-16 lg:pb-24 bg-[#072958] dark:bg-gray-900 ">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl text-white">
          {blogDetails && (
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-white dark:text-white">
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Jese Leos"
                    />
                    <div>
                      <a
                        href="#"
                        rel="author"
                        className="text-xl font-bold text-white dark:text-white"
                      >
                        {blogDetails.author.username}
                      </a>
                      {/* <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      Graphic Designer, educator &amp; CEO Flowbite
                    </p> */}
                      <p className="text-base font-light text-gray-400 dark:text-gray-400">
                        <time
                          pubdate=""
                          dateTime="2022-02-08"
                          title="February 8th, 2022"
                        >
                          {formatTimeAgo(blogDetails.createdAt)}
                          {/* {new Date(blogDetails.createdAt).toLocaleString()} */}
                        </time>
                      </p>
                    </div>
                  </div>
                </address>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-200 lg:mb-6 lg:text-4xl dark:text-white">
                  {blogDetails.title}
                </h1>
              </header>
              <p className="lead text-gray-400">{blogDetails.content}</p>

              <section className="not-format">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-white dark:text-white">
                    Discussion ({comments.length})
                  </h2>
                </div>
                <form className="mb-6" onSubmit={handleSubmitAddComment}>
                  <div className="py-2 px-4 mb-4 bg-gray-200 rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      onChange={(e) => setCommentText(e.target.value)}
                      id="comment"
                      rows={6}
                      className="px-0 w-full text-sm bg-gray-200 text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a comment..."
                      required=""
                      defaultValue={""}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center border-2 py-2.5 px-4 text-xs font-medium text-center bg-[#173d73] text-white  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Post comment
                  </button>
                </form>
                {comments &&
                  comments.map((comment, index) => (
                    <article
                      key={comment._id}
                      className="p-6 mb-6 text-base bg-[#173d73] rounded-lg dark:bg-gray-900"
                    >
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-white dark:text-white">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                              alt="Michael Gough"
                            />
                            {comment.user.username}
                          </p>
                          <p className="text-sm text-gray-400 dark:text-gray-400">
                            <time
                              pubdate=""
                              dateTime="2022-02-08"
                              title="February 8th, 2022"
                            >
                              {formatTimeAgo(comment.createdAt)}
                            </time>
                          </p>
                        </div>
                        {comment.user._id == userId ? (
                          <div role="button" onClick={()=>handleDeleteComment(comment._id)} className="p-3">
                          <BsTrash className=" text-red-600"/>
                          </div>
                        ) : (
                          <>
                            <MdOutlineReportGmailerrorred className="text-red-600" />
                          </>
                        )}
                      </footer>
                      <p className="text-gray-400">{comment.text}</p>
                    </article>
                  ))}
              </section>
            </article>
          )}
        </div>
      </main>
    </>
  );
};
