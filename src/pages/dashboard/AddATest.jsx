import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddATest = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const AxiosSecure = useAxiosSecure();

  const handleAddTest = async (e) => {
    e.preventDefault();

    const selectedDateWithTime = new Date(selectedDate);
    selectedDateWithTime.setUTCHours(23, 59, 0, 0);

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const image = form.get("image");
    const details = form.get("details");
    const date = selectedDateWithTime;
    const price = parseInt(form.get("price"), 10);
    const slots = parseInt(form.get("slots"), 10);

    const imgBbFormData = new FormData();
    imgBbFormData.append("key", import.meta.env.VITE_IMAGE_HOSTING_KEY);
    imgBbFormData.append("image", image);

    const imgBbResponse = await AxiosPublic.post(
      "https://api.imgbb.com/1/upload",
      imgBbFormData
    );

    const imageUrl = imgBbResponse.data.data.url;

    const newTest = {
      name,
      image: imageUrl,
      details,
      date,
      price,
      slots,
      reservations: 0,
    };

    AxiosSecure.post("/tests", newTest).then((res) => {
      if (res.data.insertedId) {
        e.target.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#0B8FAC",
          title: "Test added successfully!",
          showCancelButton: true,
          confirmButtonColor: "#0B8FAC",
          cancelButtonColor: "#23232E",
          confirmButtonText: "Add Another?",
          customClass: "font-montserrat",
        }).then((result) => {
          if (result.isConfirmed) {
            e.target.reset();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/dashboard/all-tests");
          }
        });
      }
    });
  };

  return (
    <section className="dashboard-section">
      <Helmet>
        <title>MediScan | Add A Test</title>
      </Helmet>
      <div className="mx-auto max-w-[700px]">
        <div className="text-center">
          <h4>Add A Test</h4>
        </div>

        <div className="mt-8 p-4 lg:p-12 border border-slate-100 rounded-xl shadow-sm dark:bg-slate-800 dark:border-slate-800">
          <form onSubmit={handleAddTest} encType="multipart/form-data">
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Test Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm mb-2">
                  Test Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpeg"
                  required
                  className="block w-full  text-sm cursor-pointer"
                  aria-describedby="file_input_help"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  JPG or PNG.
                </p>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm mb-2">
                  Test Details
                </label>
                <textarea
                  name="details"
                  id="details"
                  className="block w-full py-3 px-4 border border-slate-300 rounded-lg text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div>
                  <label htmlFor="date" className="block text-sm mb-2">
                    Test Date
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MM/dd/yyyy"
                    className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                  />
                </div>

                <div className="flex-grow">
                  <label htmlFor="price" className="block text-sm mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                    required
                  />
                </div>

                <div className="flex-grow">
                  <label htmlFor="slots" className="block text-sm mb-2">
                    Slots
                  </label>
                  <input
                    type="number"
                    id="slots"
                    name="slots"
                    min="0"
                    className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="mt-4 w-full btn !py-2.5">
                Add Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddATest;
