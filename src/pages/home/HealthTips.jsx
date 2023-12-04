import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const HealthTips = () => {
  const [healthTips, setHealthTips] = useState([]);
  const AxiosPublic = useAxiosPublic();
  useEffect(() => {
    AxiosPublic.get("/health-tips").then((res) => {
      setHealthTips(res.data);
    });
  }, [AxiosPublic]);

  return (
    <section>
      <div className="relative my-12 max-w-4xl mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {healthTips.map((healthTip) => (
            <SwiperSlide key={healthTip._id}>
              <div className="flex flex-col gap-4 px-4 text-center">
                <h4>{healthTip.title}</h4>
                <p className="italic">{healthTip.short_description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-next absolute top-1/2 !-right-4 lg:!-right-12 transform -translate-y-1/2 !text-msLightBlue after:!text-xl"></div>
        <div className="swiper-button-prev absolute top-1/2 !-left-4 lg:!-left-12 transform -translate-y-1/2 !text-msLightBlue after:!text-xl"></div>
      </div>
    </section>
  );
};

export default HealthTips;
