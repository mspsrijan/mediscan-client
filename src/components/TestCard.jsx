import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const TestCard = ({ test }) => {
  const { _id, name, details, image, date, price, slots } = test;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const formattedDate = new Date(date).toLocaleDateString();

  const handleDetailsClick = () => {
    if (user) {
      navigate(`/test/${_id}`);
    } else {
      Swal.fire({
        title: "Login Required",
        text: "Please login to view test details.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "#0B8FAC",
        cancelButtonColor: "#23232E",
        customClass: "font-montserrat",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: `/test/${_id}` } });
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col border rounded-lg shadow-sm border-slate-100 dark:bg-slate-800 dark:border-slate-700">
        <img
          src={image}
          alt={name}
          className="mx-auto w-full h-56 object-cover"
        />
        <div className="p-4 md:p-8 flex flex-col gap-2 ">
          <h6 className="tracking-tight">{name}</h6>
          <p className="flex-grow">{details}</p>
          <div className="font-medium my-2 ">
            <p>Date: {formattedDate}</p>
            <p>Price: {price}</p>
            <p>Available Slots: {slots}</p>
          </div>
          <button
            onClick={handleDetailsClick}
            className="mt-4 btn btn-sm btn-outline max-w-[200px]"
          >
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default TestCard;
