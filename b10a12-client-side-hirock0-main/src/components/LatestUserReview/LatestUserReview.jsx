import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useHomePagePropertise } from "../../utils/TanstackQuery/TanstackQuery";
import Loading from "../../pages/Loading/Loading";

const LatestUserReview = () => {
  const { data: homePagePropertise, isLoading } = useHomePagePropertise();
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="my-12 px-6">
      <h2 className="text-2xl font-bold mb-6" data-aos="fade-up">
        Latest User Reviews
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homePagePropertise?.map((property, index) => (
            <div
              className="card bg-gray-100 shadow-md p-4 rounded-lg"
              key={index}
              data-aos="fade-up"
            >
              <div className="flex items-center gap-4">
                <img
                  src={property.propertyImage}
                  alt={property.propertyName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h3 className="font-bold">{property.name}</h3>
              </div>
              <p className="text-gray-600 mt-2">
                <strong>Property:</strong> {property.title}
              </p>
              <div className=" scrollBar  overflow-y-scroll h-32 px-5">
                <ul className="mt-2 list-outside list-disc space-y-2">
                  {property?.reviews
                    ?.sort((a, b) => b.timeStamp - a.timeStamp)
                    ?.map((item, idx) => (
                      <li key={idx} className=" flex items-center gap-2">
                        <img
                          src={item?.userImage}
                          alt="user"
                          className=" w-8 rounded-full"
                        />
                        <span>{item?.review}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestUserReview;
