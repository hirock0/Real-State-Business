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
      img: "https://cdn.pixabay.com/photo/2020/02/27/17/17/building-4885295_960_720.jpg",
    },
    {
      title: "Comfortable & Beautiful",
      img: "https://cdn.pixabay.com/photo/2020/11/13/14/46/building-5738714_960_720.jpg",
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
              className="bg-cover bg-center"
              style={{
                backgroundImage: `url(${item?.img})`,
              }}
            >
              <div className=" h-[600px] max-lg:h-[550px] max-md:h-[450px] max-sm:h-[350px]  flex flex-col items-center justify-center bg-slate-800/50">
                <h1 className="text-white text-4xl md:text-6xl font-bold">
                  {item?.title}
                </h1>
                <div className=" mt-5 flex items-center justify-center">
                  <Link to={"/all_properties"}>
                    <button className="btn btn-primary shadow-md">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
