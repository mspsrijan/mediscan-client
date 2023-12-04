import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Dna } from "react-loader-spinner";

const Banner = () => {
  const [activeBanner, setActiveBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    AxiosPublic.get("/active-banner").then((res) => {
      setActiveBanner(res.data[0]);
      setLoading(false);
    });
  }, [AxiosPublic]);

  return loading ? (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperClass="dna-wrapper mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
    />
  ) : (
    <section className="pt-8 flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="w-full md:w-1/2">
        <h1>{activeBanner.title}</h1>
        <p className="mt-2 text-lg md:text-xl font-medium">
          {activeBanner.description}
        </p>
        <p className="mt-8 font-medium uppercase leading-6 tracking-tight">
          Unlock a &nbsp;
          <span className="font-bold underline">
            {activeBanner.couponDiscount}% Discount
          </span>
          &nbsp; on Your First Diagnostic Session!
          <br />
          Use Code
          <span className="font-bold"> {activeBanner.couponCode} </span> at
          Checkout.
        </p>

        <Link to="/all-tests">
          <button className="mt-8 btn ">All Tests</button>
        </Link>
      </div>
      <div className="w-full md:w-1/2">
        <img src={activeBanner.image} alt="" />
      </div>
    </section>
  );
};

export default Banner;
