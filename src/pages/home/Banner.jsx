import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Dna } from "react-loader-spinner";

const Banner = () => {
  const [activeBanner, setActiveBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const AxiosSecure = useAxiosSecure();

  useEffect(() => {
    AxiosSecure.get("/active-banner").then((res) => {
      setActiveBanner(res.data[0]);
      setLoading(false);
    });
  }, [AxiosSecure]);

  console.log(activeBanner);

  return loading ? (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
    />
  ) : (
    <section className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="w-full md:w-1/2">
        <h1>{activeBanner.title}</h1>
        <p className="text-lg md:text-xl font-medium">
          {activeBanner.description}
        </p>
        <p className="mt-8 font-medium uppercase leading-6 tracking-tight">
          Unlock a &nbsp;
          <span className="font-bold underline">
            {activeBanner.couponDiscount}% Discount
          </span>
          &nbsp; on Your First Diagnostic Session! Use Code
          <span className="font-bold"> {activeBanner.couponCode} </span> at
          Checkout.
        </p>

        <Link to="/all-tests">
          <button className="mt-4 btn ">All Tests</button>
        </Link>
      </div>
      <div className="w-full md:w-1/2">
        <img src={activeBanner.image} alt="" />
      </div>
    </section>
  );
};

export default Banner;
