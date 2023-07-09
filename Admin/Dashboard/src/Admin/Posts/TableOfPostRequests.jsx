import { useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { fetchData, approvedData } from "../../Redux/actions/requestAction";
export const TableOfPostRequests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((state) => state.request.data);
  const isLoading = useSelector((state) => state.request.isLoading);
  const error = useSelector((state) => state.request.error);

  useEffect(() => {
    const endpoint = "http://localhost:8800/getAllBlogsRequests"; // Replace with your desired endpoint
    dispatch(fetchData(endpoint));
  }, [dispatch]);

  console.log('request', requestData);

  const handleAccept = (id) => {
    // console.log(id, name);
    Swal.fire({
      title: `Do you want to Accept this post ?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` Post has been accepted `, "", "success");

        const endpoint = `http://localhost:8800/blogRequest/${id}`; // Replace with your desired endpoint
        dispatch(approvedData(endpoint));
      } else Swal.fire(" Cancelled", "", "error");
    });
  };
//   const handleAccepted = (id) => {
//     axios
//       .put("http://localhost:5500/admin/hotel/hotels/request/accept/" + id)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => console.log(error.message));
//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Added Successfully ",
//       showConfirmButton: false,
//       timer: 1800,
//     });
//   };

  const tableRows = requestData?.map((request) => {
    return (
      <tr key={request._id} className="border-b dark:border-gray-700">
        

        <td className="px-4 py-3">{request.title}</td>
        <td className="px-4 py-3">{request.content}</td>
        <td className="px-4 py-3">{request.createdAt}</td>

        <td className="px-4 py-3 flex items-center justify-end">
          <div id="" className="bg-white flex gap-2 rounded ">
          <div
              className="tooltip tooltip-success text-white "
              data-tip="Accept"
            >
              <button
                onClick={() => handleAccept(request._id)}
                className="btn bg-white hover:bg-green-200 shadow-lg hover:shadow-xl border-none "
              >
                <CiCircleCheck className="text-green-500 text-[20px]" />
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
        <h1 className="text-[30px] font-bold py-3">Requests</h1>
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
                  <div className="p-3 text-lg">There are no Requests</div>
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
