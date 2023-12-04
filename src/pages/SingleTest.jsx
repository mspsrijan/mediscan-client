import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Dna } from "react-loader-spinner";
import Modal from "react-modal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

Modal.setAppElement("#root");

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const SingleTest = () => {
  const AxiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [testDetails, setTestDetails] = useState(null);
  const { user } = useContext(AuthContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Book Now");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [isCouponError, setIsCouponError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosSecure.get(`/test/${id}`);
        setTestDetails(res.data);

        const currentDate = new Date().toISOString().split("T")[0];
        if (
          new Date(res.data.date) < new Date(currentDate) ||
          res.data.slots <= 0
        ) {
          setIsButtonDisabled(true);
          setButtonText("Not Available");
        }

        setDiscountedPrice(res.data.price);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchData();
  }, [AxiosSecure, id, user]);

  const { name, details, image, date, price, slots } = testDetails || {};
  const formattedDate = testDetails ? new Date(date).toLocaleDateString() : "";

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCouponCode = () => {
    const couponDiscounts = {
      health20: 0.2,
      diag10: 0.1,
    };

    const lowercaseCouponCode = couponCode.toLowerCase();
    if (couponDiscounts.hasOwnProperty(lowercaseCouponCode)) {
      setDiscountedPrice(price - price * couponDiscounts[lowercaseCouponCode]);
      setIsCouponError(false);
    } else {
      setDiscountedPrice(price);
      setIsCouponError(true);
    }
  };

  if (!user || !testDetails) {
    return (
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
      />
    );
  }

  const handleBooking = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 10,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
      width: "100%",
      padding: "3rem",
      borderRadius: "0.5rem",
      background: "white",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      fontFamily: "'Montserrat', sans-serif",
    },
    closeBtn: {
      position: "absolute",
      top: "0",
      right: "10px",
      cursor: "pointer",
      fontSize: "1.5rem",
      color: "gray",
    },
  };

  return (
    <section>
      <Helmet>
        <title>MediScan | {name || "Test"}</title>
      </Helmet>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
        <div className="w-full md:w-1/2">
          <img src={image} alt="" />
        </div>
        <div className="w-full md:w-1/2">
          <h3>{name}</h3>
          <p className="text-xl font-semibold">${price}</p>
          <p className="my-4">{details}</p>
          <p className="text-lg">
            Date: <span className="font-medium">{formattedDate}</span>
          </p>
          <p className="text-lg">
            Available Slots: <span className="font-medium">{slots}</span>
          </p>
          <button
            className={`mt-8 btn ${isButtonDisabled ? "btn-disabled" : ""}`}
            onClick={handleBooking}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Book Now Modal"
        style={modalStyles}
      >
        <button onClick={closeModal} style={modalStyles.closeBtn}>
          &times;
        </button>
        <h6>Checkout</h6>
        <p className="mt-4">Patient Name: {user?.displayName}</p>
        <p>Patient Email: {user?.email}</p>
        <p className="mb-4">Price: ${price}</p>

        <div className="mt-8 max-w-[400px] flex gap-2">
          <input
            type="text"
            id="couponCode"
            name="couponCode"
            value={couponCode}
            onChange={handleCouponCodeChange}
            placeholder="Have a coupon?"
            className="py-2 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
          />

          <button className="btn !py-[4px]" onClick={applyCouponCode}>
            Apply
          </button>
        </div>

        {isCouponError && (
          <p className="text-red-500 mt-2">Invalid Coupon Code</p>
        )}

        {discountedPrice !== price && (
          <p className="mt-4">
            Discounted Price: ${discountedPrice.toFixed(2)}
          </p>
        )}

        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={discountedPrice}
            testName={name}
            testId={id}
            appointmentDate={date}
            closeModal={closeModal}
          />
        </Elements>
      </Modal>
    </section>
  );
};

export default SingleTest;
