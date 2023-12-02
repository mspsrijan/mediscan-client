import { Helmet } from "react-helmet";
import Banner from "./Banner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MediScan</title>
      </Helmet>
      <Banner></Banner>
    </>
  );
};

export default Home;
