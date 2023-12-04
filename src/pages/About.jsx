import { Helmet } from "react-helmet";
import medicalTestFour from "../assets/medical-test-4.png";
import medicalTestFive from "../assets/medical-test-5.png";

const About = () => {
  return (
    <>
      <section>
        <Helmet>
          <title>MediScan | About</title>
        </Helmet>
        <div className="mx-auto">
          <div className="text-center">
            <h3>About Us</h3>
          </div>
        </div>
      </section>
      <section className="flex flex-col-reverse md:flex-row gap-10 lg:gap-20 items-center">
        <div className="w-full md:w-1/2 ">
          <div className="flex flex-col gap-2 max-w-lg">
            <p className="font-medium text-lg">
              Shaping the Future of Healthcare
            </p>
            <h5>Visionary Health Innovators</h5>
            <p className="mt-4">
              At Visionary Health Innovators, we are driven by a vision to
              revolutionize healthcare management. Our commitment lies in
              integrating cutting-edge technology with compassionate care,
              ensuring a seamless and personalized experience for every
              individual on their wellness journey.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img src={medicalTestFour} alt="" />
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-10 lg:gap-20 items-center">
        <div className="w-full md:w-1/2">
          <img src={medicalTestFive} alt="" />
        </div>
        <div className="w-full md:w-1/2 ">
          <div className="flex flex-col gap-2 max-w-lg">
            <p className="font-medium text-lg">Your Wellness, Our Priority</p>
            <h5>Unrivaled Commitment to Care</h5>
            <p className="mt-4">
              Discover the essence of care at Unrivaled Commitment to Care. Our
              unwavering dedication to your wellness is reflected in every
              aspect of our services. From state-of-the-art diagnostics to
              personalized health solutions, we are here to prioritize your
              well-being..
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
