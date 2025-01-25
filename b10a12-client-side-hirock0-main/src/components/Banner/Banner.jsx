import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        pagination={true}
        autoplay={{
          delay: 2000,
        }}
        loop={true}
        modules={[Pagination, Navigation, Autoplay]}
      >
        <SwiperSlide>
          <section
            className="h-[500px] bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://cdn.pixabay.com/photo/2016/12/22/18/20/skyline-1925943_960_720.jpg')",
            }}
          >
            <h1 className="text-white text-4xl md:text-6xl font-bold">
              Find Your Dream Home
            </h1>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section
            className="h-[500px] bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://cdn.pixabay.com/photo/2019/07/13/16/30/architecture-4335215_960_720.jpg')",
            }}
          >
            <h1 className="text-white text-4xl md:text-6xl font-bold">
              Find Your Dream Home
            </h1>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
