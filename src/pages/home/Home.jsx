import { Helmet } from "react-helmet";
import Banner from "./Banner";
import HealthTips from "./HealthTips";
import { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TestCard from "../../components/TestCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [featuredTests, setFeaturedTests] = useState([]);
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    setLoading(true);
    AxiosPublic.get("/tests").then((res) => {
      const sortedTests = res.data.sort(
        (a, b) => b.reservations - a.reservations
      );
      const limitedTests = sortedTests.slice(0, 3);
      setFeaturedTests(limitedTests);
      setLoading(false);
    });
  }, [AxiosPublic]);

  return (
    <>
      <Helmet>
        <title>MediScan</title>
      </Helmet>
      <Banner />
      <section>
        <h3 className="text-center mb-2">Featured Tests</h3>
        <p className="text-center mb-16 max-w-3xl mx-auto">
          Discover precision and innovation in our featured tests. From advanced
          diagnostics to specialized screenings, explore curated insights for a
          proactive approach to your well-being.
        </p>
        {loading ? (
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTests.map((test) => (
              <TestCard key={test._id} test={test} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/all-tests">
            <button className="btn">See All Tests</button>
          </Link>
        </div>
      </section>
      <HealthTips />
    </>
  );
};

export default Home;
