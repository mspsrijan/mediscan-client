import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <section className="max-w-5xl min-h-screen text-center flex flex-col justify-center">
      <Helmet>
        <title>MediScan</title>
      </Helmet>
      <h1 className="mb-4 text-7xl lg:text-9xl font-extrabold">404</h1>
    </section>
  );
};

export default Home;
