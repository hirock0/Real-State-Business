import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const Banner = () => {
  const bannerImages = [
    {
      title: "Find Your Dream Home",
      img: "https://cdn.pixabay.com/photo/2016/12/22/18/20/skyline-1925943_960_720.jpg",
    },
    {
      title: "Luxary Home",
      img: "https://cdn.pixabay.com/photo/2019/07/13/16/30/architecture-4335215_960_720.jpg",
    },
  ];
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
        {bannerImages?.map((item, index) => (
          <SwiperSlide key={index}>
            <section
              className="h-[500px] bg-cover bg-center flex flex-col items-center justify-center"
              style={{
                backgroundImage: `url(${item?.img})`,
              }}
            >
              <h1 className="text-white text-4xl md:text-6xl font-bold">
                {item?.title}
              </h1>
              <div className=" mt-5 flex items-center justify-center">
                <Link to={""}>
                  <button className="btn btn-primary shadow-md">
                    See More
                  </button>
                </Link>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
