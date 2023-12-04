import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import BannersCard from "../../components/BannersCard";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const SiteBanners = () => {
  const AxiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState();

  useEffect(() => {
    setLoading(true);
    AxiosSecure.get("/banners").then((res) => {
      setBanners(res.data);
      setLoading(false);
    });
  }, [AxiosSecure]);

  const handleDelete = async (id) => {
    await AxiosSecure.delete(`/banners/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        const updatedBanners = banners.filter((banner) => banner._id !== id);
        setBanners(updatedBanners);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Banner has been deleted`,
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#0B8FAC",
          customClass: "font-montserrat",
        });
      }
    });
  };

  return loading ? (
    <div className="dashboard-section">
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
      />
    </div>
  ) : (
    <section className="dashboard-section">
      <Helmet>
        <title>MediScan | Site Banners</title>
      </Helmet>
      <div className="mx-auto">
        <div className="text-center">
          <h4>Site Banners</h4>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <BannersCard
              key={banner._id}
              banner={banner}
              handleDelete={handleDelete}
            ></BannersCard>
          ))}
        </div>
      </div>
      <Link to="/dashboard/add-banner">
        <button className="btn mt-8 mx-auto flex justify-center">
          Add A Banner
        </button>
      </Link>
    </section>
  );
};

export default SiteBanners;
