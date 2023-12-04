import { Helmet } from "react-helmet";
import { FaEnvelope, FaPhoneAlt, FaRocketchat } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <section>
        <Helmet>
          <title>MediScan | Contact</title>
        </Helmet>
        <div className="mx-auto mb-8">
          <div className="text-center">
            <h3>Contact Us</h3>
          </div>
        </div>

        <div className="mt-20 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20">
          <div className="mx-auto text-center">
            <div className="w-16 h-16 text-white bg-msLightBlue p-5 rounded-full mx-auto">
              <FaRocketchat className="text-2xl" />
            </div>
            <h6 className="mt-6">Email Us</h6>
            <p className="mt-2">
              Email us for general queries, including marketing and partnership
              opportunities.
            </p>
            <p className="mt-4 text-lg font-medium">test@test.com</p>
            <p className="text-lg font-medium">test@test.com</p>
          </div>

          <div className="mx-auto text-center">
            <div className="w-16 h-16 text-white bg-msLightBlue p-5 rounded-full mx-auto">
              <FaPhoneAlt className="text-2xl" />
            </div>
            <h6 className="mt-6">Call Us</h6>
            <p className="mt-2">
              Call us to speak to a member of our team. We are always happy to
              help.
            </p>
            <p className="mt-4 text-lg font-medium">+1(123)-456-789</p>
            <p className="text-lg font-medium">+1(123)-456-789</p>
          </div>

          <div className="mx-auto text-center">
            <div className="w-16 h-16 text-white bg-msLightBlue p-5 rounded-full mx-auto">
              <FaEnvelope className="text-2xl" />
            </div>
            <h6 className="mt-6">Address</h6>
            <p className="mt-2">
              Send your thoughts the classic way. Pen a letter and mail it to
              our office.
            </p>
            <p className="mt-4 text-lg font-medium">
              House no# 999, Test street, Test-12345, Test Country
            </p>
          </div>
        </div>
      </section>
      <div className="iframe-container mt-10">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12693.073793899262!2d90.88429676169748!3d23.01486186395369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754ea97f2ae3461%3A0x7caf3e3a39c5c8d6!2zUG9kZGFyIEJhemFyIOCmquCni-CmpuCnjeCmpuCmvuCmsCDgpqzgpr7gppzgpr7gprA!5e0!3m2!1sen!2sbd!4v1699867748442!5m2!1sen!2sbd"
          className="w-full h-[300px] md:h-[400px] lg:h-[600px]"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
