import { Helmet } from "react-helmet";
import { FaQuoteLeft, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Testimonials = () => {
  return (
    <>
      <section>
        <Helmet>
          <title>MediScan | Testimonials</title>
        </Helmet>
        <div className="mx-auto">
          <div className="text-center">
            <h3>Testimonials</h3>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20">
        <div>
          <h5>Happy Stories</h5>
          <p className="mt-4">
            Creating Vibrant Smiles for Healthy Lifestyles!
          </p>
        </div>

        <div className="flex flex-col gap-4 shadow-lg px-8 py-8">
          <FaQuoteLeft className="text-2xl text-msBlue"></FaQuoteLeft>
          <p className="italic">
            The personalized recommendations and efficient management at
            MediScan have made my health journey truly seamless. The team's
            dedication to excellence and the advanced diagnostic services have
            exceeded my expectations. I trust them with my well-being.
          </p>
          <div className="flex text-[#F0AD4E]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h5 className="text-base font-semibold uppercase">Sarah Johnson</h5>
          <p className="-mt-4">Business Analyst</p>
        </div>

        <div className="flex flex-col gap-4 shadow-lg px-8 py-8">
          <FaQuoteLeft className="text-2xl text-msBlue"></FaQuoteLeft>
          <p className="italic">
            As a healthcare professional, I appreciate the precision and
            accuracy of the diagnostic tests provided by MediScan. The insights
            generated have been invaluable in guiding my patients' treatment
            plans. It's a reliable partner in patient care.
          </p>
          <div className="flex text-[#F0AD4E]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h5 className="text-base font-semibold uppercase">
            Dr. Michael Rodriguez
          </h5>
          <p className="-mt-4">General Practitioner</p>
        </div>
        <div className="flex flex-col gap-4 shadow-lg px-8 py-8">
          <FaQuoteLeft className="text-2xl text-msBlue"></FaQuoteLeft>
          <p className="italic">
            Navigating my health has never been easier! The recommendations from
            MediScan have been a game-changer. From personalized tips to timely
            reminders for tests, it's like having a health companion. I highly
            recommend their services.
          </p>
          <div className="flex text-[#F0AD4E]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h5 className="text-base font-semibold uppercase">Emily Martinez</h5>
          <p className="-mt-4">IT Specialist</p>
        </div>
        <div className="flex flex-col gap-4 shadow-lg px-8 py-8">
          <FaQuoteLeft className="text-2xl text-msBlue"></FaQuoteLeft>
          <p className="italic">
            The advanced diagnostic capabilities and the collaborative approach
            at MediScan have impressed me. It's a valuable resource in my
            practice, providing accurate results and enhancing the overall
            quality of patient care.
          </p>
          <div className="flex text-[#F0AD4E]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h5 className="text-base font-semibold uppercase">
            Dr. Anthony Williams
          </h5>
          <p className="-mt-4">Cardiologist</p>
        </div>
        <div className="flex flex-col gap-4 shadow-lg px-8 py-8">
          <FaQuoteLeft className="text-2xl text-msBlue"></FaQuoteLeft>
          <p className="italic">
            I am genuinely grateful for the personalized care and attention I
            received at MediScan. The recommendations were tailored to my
            lifestyle, making health management accessible and straightforward.
            A reliable partner in my journey to better health.
          </p>
          <div className="flex text-[#F0AD4E]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h5 className="text-base font-semibold uppercase">Jennifer Lee</h5>
          <p className="-mt-4">Educator</p>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
