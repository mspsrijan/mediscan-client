import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import womanWithKidConslutingDoctor from "../assets/woman-with-kid-consulting-doctor.png";

const Registration = () => {
  const { user, createUser, updateUser } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [upazillas, setUpazillas] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await fetch("/districts.json");
      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error("Error fetching districts data:", error);
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrictId(e.target.value);
    fetchUpazillas();
  };

  const fetchUpazillas = async () => {
    try {
      const response = await fetch("/upazillas.json");
      const data = await response.json();
      console.log(data);
      setUpazillas(data);
    } catch (error) {
      console.error("Error fetching upazillas data:", error);
    }
  };

  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    const getDistrictNameById = (districtId) => {
      const selectedDistrict = districts.find(
        (district) => district.id === districtId
      );
      return selectedDistrict ? selectedDistrict.name : "";
    };

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const avatar = form.get("avatar");
    const bloodGroup = form.get("bloodGroup");
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    const districtId = form.get("district");
    const district = getDistrictNameById(districtId);
    const upazilla = form.get("upazilla");

    if (password.length < 6) {
      setRegistrationError("Password should be at least 6 characters ");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegistrationError(
        "Your password should contain atleast one capital letter."
      );
      return;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      setRegistrationError(
        "Your password should contain atleast one special character."
      );
      return;
    } else if (password !== confirmPassword) {
      setRegistrationError("Passwords do not match");
      return;
    }

    const imgBbFormData = new FormData();
    imgBbFormData.append("key", import.meta.env.VITE_IMAGE_HOSTING_KEY);
    imgBbFormData.append("image", avatar);

    const imgBbResponse = await axiosPublic.post(
      "https://api.imgbb.com/1/upload",
      imgBbFormData
    );

    const imageUrl = imgBbResponse.data.data.url;

    setRegistrationSuccess("");
    setRegistrationError("");

    createUser(email, password)
      .then(() => {
        updateUser(name, imageUrl);
      })
      .then(() => {
        const newUser = {
          name,
          email,
          avatar: imageUrl,
          bloodGroup,
          district,
          upazilla,
          isActive: true,
        };
        axiosPublic.post("/users", newUser);
      })
      .then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration Success!",
          text: "Redirecting to dashboard...",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#0B8FAC",
          customClass: "font-montserrat",
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setRegistrationError(
            "Email is already in use. Please use a different email."
          );
        } else {
          setRegistrationError(error.message);
        }
      });
  };
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
      <Helmet>
        <title>MediScan | Registration</title>
      </Helmet>
      <div className="md:w-2/3 lg:w-1/2 flex justify-center">
        <div className="w-full max-w-lg p-8 border border-slate-100 rounded-xl shadow-sm dark:bg-slate-800 dark:border-slate-800">
          <div className="text-center">
            <h4 className="">Register</h4>
            <p className="mt-2 text-sm text-slate-800 dark:text-slate-400">
              Already have an account? &nbsp;
              <Link
                to="/login"
                className="text-msBlue hover:underline font-medium dark:text-slate-300"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleRegistration} encType="multipart/form-data">
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">
                    Name
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
                  <label htmlFor="avatar" className="block text-sm mb-2">
                    Upload Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/png, image/jpeg"
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

                <div className="flex-grow">
                  <label htmlFor="bloodGroup" className="block text-sm mb-2">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    id="bloodGroup"
                    onChange={handleDistrictChange}
                    className="block w-full py-3 px-4 bg-white border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                    required
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <div>
                    <label htmlFor="password" className="block text-sm mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-grow">
                    <label htmlFor="district" className="block text-sm mb-2">
                      District
                    </label>
                    <select
                      name="district"
                      id="district"
                      onChange={handleDistrictChange}
                      className="block w-full py-3 px-4 bg-white border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                      required
                    >
                      <option value="">Select your district</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-grow">
                    <label htmlFor="upazilla" className="block text-sm mb-2">
                      Upazila
                    </label>
                    <select
                      name="upazilla"
                      id="upazilla"
                      className="block w-full py-3 px-4 bg-white border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                      required
                    >
                      <option value="">Select your upazilla</option>
                      {upazillas
                        .filter(
                          (upazilla) =>
                            upazilla.district_id === selectedDistrictId
                        )
                        .map((upazilla) => (
                          <option key={upazilla.id} value={upazilla.name}>
                            {upazilla.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="mt-4 w-full btn !py-2.5">
                  Sign Up
                </button>
              </div>

              {registrationError && (
                <div
                  className="mt-4 px-6 py-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-slate-900 dark:text-red-400"
                  role="alert"
                >
                  <p>{registrationError}</p>
                </div>
              )}

              {registrationSuccess && (
                <div
                  className="mt-4 px-6 py-4 text-sm text-center text-msBlue rounded-lg bg-msBlue/20 dark:bg-slate-900 dark:text-blue-300"
                  role="alert"
                >
                  <p>{registrationSuccess}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-[600px] md:w-1/3 lg:w-1/2">
        <img src={womanWithKidConslutingDoctor} alt="" />
      </div>
    </section>
  );
};

export default Registration;
