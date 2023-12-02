import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddBanner = () => {
  const AxiosPublic = useAxiosPublic();
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleAddBanner = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("bannerName");
    const image = form.get("bannerImage");
    const title = form.get("bannerTitle");
    const description = form.get("bannerDescription");
    const couponCode = form.get("couponCode");
    const couponDiscount = parseInt(form.get("couponDiscount"), 10);

    const imgBbFormData = new FormData();
    imgBbFormData.append("key", import.meta.env.VITE_IMAGE_HOSTING_KEY);
    imgBbFormData.append("image", image);

    const imgBbResponse = await AxiosPublic.post(
      "https://api.imgbb.com/1/upload",
      imgBbFormData
    );

    const imageUrl = imgBbResponse.data.data.url;

    const newBanner = {
      name,
      image: imageUrl,
      title,
      description,
      couponCode,
      couponDiscount,
      isActive: false,
    };

    AxiosSecure.post("/banners", newBanner).then((res) => {
      if (res.data.insertedId) {
        e.target.reset();
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#4440DA",
          title: "Banner added successfully!",
          showCancelButton: true,
          confirmButtonColor: "#4440DA",
          cancelButtonColor: "#23232E",
          confirmButtonText: "Add Another",
          customClass: "font-montserrat",
        }).then((result) => {
          if (result.isConfirmed) {
            e.target.reset();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/dashboard/site-banners");
          }
        });
      }
    });
  };

  return (
    <section className="dashboard-section">
      <Helmet>
        <title>MediScan | Add Banner</title>
      </Helmet>
      <div className="mx-auto max-w-[700px]">
        <div className="text-center">
          <h4>Add A Banner</h4>
        </div>

        <div className="mt-8 p-4 lg:p-12 border border-slate-100 rounded-xl shadow-sm dark:bg-slate-800 dark:border-slate-800">
          <form onSubmit={handleAddBanner} encType="multipart/form-data">
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="bannerName" className="block text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="bannerName"
                  id="bannerName"
                  className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                  required
                />
              </div>

              <div>
                <label htmlFor="bannerImage" className="block text-sm mb-2">
                  Banner Image
                </label>
                <input
                  type="file"
                  name="bannerImage"
                  id="bannerImage"
                  accept="image/png, image/jpeg"
                  required
                  className="block w-full  text-sm cursor-pointer"
                  aria-describedby="file_input_help"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  JPG or PNG.
                </p>
              </div>

              <div>
                <label htmlFor="bannerTitle" className="block text-sm mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  name="bannerTitle"
                  id="bannerTitle"
                  className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bannerDescription"
                  className="block text-sm mb-2"
                >
                  Banner Description
                </label>
                <textarea
                  name="bannerDescription"
                  id="bannerDescription"
                  className="block w-full py-3 px-4 border border-slate-300 rounded-lg text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow">
                  <label htmlFor="couponCode" className="block text-sm mb-2">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    id="couponCode"
                    name="couponCode"
                    className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                    required
                  />
                </div>

                <div className="flex-grow">
                  <label
                    htmlFor="couponDiscount"
                    className="block text-sm mb-2"
                  >
                    Coupon Discount
                  </label>
                  <input
                    type="number"
                    id="couponDiscount"
                    name="couponDiscount"
                    min="0"
                    max="100"
                    className="block w-full py-3 px-4 border border-slate-300 rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="mt-4 w-full btn !py-2.5">
                Add Banner
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBanner;
