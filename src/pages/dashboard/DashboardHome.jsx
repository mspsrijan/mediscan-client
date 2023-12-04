import { useContext, useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

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
        <title>MediScan | Dashboard</title>
      </Helmet>
      <div className="mx-auto">
        <div className="text-center">
          <h4>MediScan Dashboard</h4>
        </div>

        <div className="mt-12 flex flex-col justify-center items-center gap-4">
          <img
            src={user.photoURL}
            alt=""
            className="w-20 h-20 object-cover rounded-full"
          />
          <p className="text-lg font-medium">
            Welcome, <span>{user.displayName}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
