import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useHomePagePropertise } from "../../utils/TanstackQuery/TanstackQuery";
import Loading from "../../pages/Loading/Loading";

const Advertisement = () => {
  const { data: homePagePropertise, isLoading } = useHomePagePropertise();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="">
      <div className="">
        <section className="">
          <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homePagePropertise?.map((ad, index) => (
                <div
                  className="card hover:scale-105 bg-white shadow-xl p-4 rounded-lg"
                  key={index}
                >
                  <div className="">
                    <img
                      src={ad.propertyImage}
                      alt={ad.location}
                      className="h-48 max-md:h-52 w-full object-contain rounded-lg mb-4"
                    />
                  </div>
                  <div className=" h-60 bg-slate-200 p-2 rounded-md flex flex-col justify-between">
                    <div className="">
                      <h3 className="font-bold">Property Name: {ad.title}</h3>
                      <h3 className=" font-bold">Location: {ad.location}</h3>
                    </div>
                    <div className="">
                      <div className=" flex items-center gap-5">
                        <p className="text-gray-600">${ad.priceRangeMax}</p>
                        <h1>-</h1>
                        <p className="text-gray-600">${ad.priceRangeMin}</p>
                      </div>
                      <p className="flex items-center gap-2">
                        <FaCheckCircle
                          className={`${
                            ad.isVerified ? "text-green-500" : "text-gray-500"
                          }`}
                        />
                        {ad.isVerified ? "Verified" : "Not Verified"}
                      </p>
                    </div>
                    <Link to={`/property_details/${ad?._id}`}>
                      <button className="btn btn-primary mt-4 w-full">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Advertisement;
