import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const OfferPropertyCard = ({ property, onPay }) => {
  const handlePay = () => {
    onPay(property._id);
  };

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="">
      <div
        data-aos="fade-up"
        className="card w-full lg:w-96 bg-base-100 shadow-xl m-4"
      >
        <figure>
          <img
            src={property?.propertyImage}
            alt={property?.propertyTitle}
            className="h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{property?.propertyTitle}</h2>
          <p className="text-sm text-gray-500">{property?.location}</p>
          <p className="text-sm">Agent: {property?.agentName}</p>
          <p className="text-sm">Offered Amount: ${property?.offerValue}</p>
          <div className="badge badge-outline my-2">
            <h1>Status: {property?.offerStatus}</h1>
          </div>
          <div className="card-actions justify-end">
            {property?.offerStatus === "accepted" && (
              <button onClick={handlePay} className="btn btn-primary">
                Pay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPropertyCard;
