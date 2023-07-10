import { useEffect} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteData } from "../../Redux/actions/dataAction";
export const TableOfUsers = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);


  useEffect(() => {
    const endpoint = "http://localhost:8800/getusers"; // Replace with your desired endpoint
    dispatch(fetchData(endpoint));
  }, [dispatch]);

  console.log(userData);

  const handleDelete = (id) => {
    // console.log(id, name);
    Swal.fire({
      title: `do you want to remove this user ?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` user has been removed `, "", "success");

        const endpoint = `http://localhost:8800/deleteuser/${id}`; // Replace with your desired endpoint
        dispatch(deleteData(endpoint));
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  const tableRows = userData?.map((user) => {
    return (
      <tr key={user._id} className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {user._id}
        </th>
        <td className="px-4 py-3">{user.username}</td>
        <td className="px-4 py-3">{user.email}</td>
        <td className="px-4 py-3">{user.createdAt}</td>

        <td className="px-4 py-3 flex items-center justify-end">
          <div id="" className="bg-white flex gap-2 rounded ">
            <div className="tooltip tooltip-error text-white" data-tip="Delete">
              <button
                onClick={() => handleDelete(user._id)}
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
        <h1 className="text-[30px] font-bold py-3">Users</h1>
        {/* Start coding here */}
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-zebra">
              <thead className="text-xs text-white uppercase bg-[#222] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    User ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
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
                  <tr className="p-3 text-lg">
                    <td>
                    There are no users

                    </td>
                    </tr>
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
