import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import womanWithKidConslutingDoctor from "../assets/woman-with-kid-consulting-doctor.png";

const Login = () => {
  const { user, signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    setLoginSuccess("");
    setLoginError("");

    signIn(email, password)
      .then(() => {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Success!",
          text: "Redirecting to dashboard...",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#0B8FAC",
          customClass: "font-montserrat",
        });
      })
      .then(() => {
        if (location?.state?.from) {
          navigate(location.state.from);
        }
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setLoginError(
            "Invalid credentials. Please check your email and password and try again."
          );
        } else {
          setLoginError(error.message);
        }
      });
  };

  return (
    <section className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
      <Helmet>
        <title>MediScan | Login</title>
      </Helmet>
      <div className="md:w-2/3 lg:w-1/2 flex justify-center">
        <div className="w-full max-w-md p-8 border border-slate-100 rounded-xl shadow-sm dark:bg-slate-800 dark:border-slate-800">
          <div className="text-center">
            <h4 className="">Sign in</h4>
            <p className="mt-2 text-sm text-slate-800 dark:text-slate-400">
              Don't have an account yet? &nbsp;
              <Link
                to="/registration"
                className="text-msBlue hover:underline font-medium dark:text-slate-300"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleLogin}>
              <div className="grid gap-y-4">
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

                <button type="submit" className="mt-4 w-full btn !py-2.5">
                  Sign in
                </button>
              </div>

              {loginError && (
                <div
                  className="mt-4 px-6 py-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-slate-900 dark:text-red-400"
                  role="alert"
                >
                  <p>{loginError}</p>
                </div>
              )}

              {loginSuccess && (
                <div
                  className="mt-4 px-6 py-4 text-sm text-center text-msBlue rounded-lg bg-msBlue/20 dark:bg-slate-900 dark:text-blue-300"
                  role="alert"
                >
                  <p>{loginSuccess}</p>
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

export default Login;
