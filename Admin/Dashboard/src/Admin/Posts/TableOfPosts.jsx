import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData } from "../../Redux/actions/postsAction";
export const TableOfPosts = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.posts.data);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    const endpoint = "http://localhost:8800/getAllBlogs"; // Replace with your desired endpoint
    dispatch(fetchData(endpoint));
  }, [dispatch]);

  console.log('posts', postsData);

  const handleDelete = (id) => {
    // console.log(id, name);
    Swal.fire({
      title: `Do you want to remove this post ?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` post has been removed `, "", "success");

        const endpoint = `http://localhost:8800/deleteBlog/${id}`; // Replace with your desired endpoint
        dispatch(deleteData(endpoint));
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  const tableRows = postsData?.map((post) => {
    return (
      <tr key={post._id} className="border-b dark:border-gray-700">
       
        <td className="px-4 py-3">{post.title}</td>
        <td className="px-4 py-3">{post.content}</td>
        <td className="px-4 py-3">{post.createdAt}</td>

        <td className="px-4 py-3 flex items-center justify-end">
          <div id="" className="bg-white flex gap-2 rounded ">
            <div className="tooltip tooltip-error text-white" data-tip="Delete">
              <button
                onClick={() => handleDelete(post._id)}
                className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
              >
                <AiOutlineDelete className="text-red-500 text-[15px]" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  });

  if (isLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="w-full dark:bg-gray-900 mt-5 ">
      <div className="">
        <h1 className="text-[30px] font-bold py-3">Posts</h1>
        {/* Start coding here */}
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-zebra">
              <thead className="text-xs text-white uppercase bg-[#222] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  
                  <th scope="col" className="px-4 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    content
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows?.length === 0 ? (
                  <div className="p-3 text-lg">There are no posts</div>
                ) : (
                  tableRows
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
