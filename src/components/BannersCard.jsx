import Swal from "sweetalert2";
import { HiMiniTrash } from "react-icons/hi2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const BannersCard = ({ banner, handleDelete }) => {
  const { _id, name, image, title, description, couponCode, couponDiscount } =
    banner;
  const AxiosSecure = useAxiosSecure();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    AxiosSecure.get("/active-banner").then((res) => {
      setIsActive(res.data[0]?._id === _id);
    });
  }, [AxiosSecure, _id]);

  const handleSelect = (id) => {
    AxiosSecure.patch(`/banner/${id}`, banner).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#0B8FAC",
          title: "Banner activated successfully!",
          showConfirmButton: false,
          timer: 1500,
          customClass: "font-montserrat",
        });
      }
    });
  };

  const onDelete = () => {
    if (isActive) {
      Swal.fire({
        icon: "error",
        title: "Cannot delete active banner",
        customClass: "font-montserrat",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B8FAC",
        cancelButtonColor: "#23232E",
        confirmButtonText: "Yes, delete it!",
        customClass: "font-montserrat",
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(_id);
        }
      });
    }
  };

  return (
    <>
      <input
        type="radio"
        id={`banner-${_id}`}
        name="banners"
        value={_id}
        onChange={() => handleSelect(_id)}
        defaultChecked={isActive}
        className="sr-only"
      />
      <label
        htmlFor={`banner-${_id}`}
        className="cursor-pointer block p-4 md:p-8 border-2 border-slate-100 rounded-lg dark:bg-slate-800 dark:border-slate-700 "
      >
        <div className="relative flex flex-wrap flex-col gap-2">
          <button
            onClick={onDelete}
            className="absolute top-0 right-0 bg-slate-100 hover:bg-slate-200 duration-300 p-2.5 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            <HiMiniTrash />
          </button>
          <h6 className="text-center">{name}</h6>
          <img
            src={image}
            alt={name}
            className="mx-auto max-w-full h-60 object-cover py-4"
          />

          <p className="font-medium">Title: {title}</p>
          <p>Description: {description}</p>
          <p>Coupon Code: {couponCode}</p>
          <p>Discount Amount: {couponDiscount}%</p>
        </div>
      </label>
      <style>
        {`
          #banner-${_id}:checked + label {
            border: 2px solid #7BC1B7;
          }
        `}
      </style>
    </>
  );
};

export default BannersCard;
