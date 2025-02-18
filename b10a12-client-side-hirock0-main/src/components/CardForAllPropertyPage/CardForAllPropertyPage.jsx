import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardForAllPropertyPage = ({ property }) => {
  return (
    <div className="hover:scale-105">
      <div
        className="card  bg-white shadow-lg rounded-lg p-4"
        data-aos="fade-up"
      >
        {/* Property Image */}
        <img
          src={property?.propertyImage}
          alt={property?.title}
          className="h-48 w-full object-contain rounded-lg mb-4"
        />
        {/* Property Details */}
        <h3 className="text-xl font-bold">{property?.title}</h3>
        <p className="text-gray-600">Location: {property?.location}</p>
        <p className="flex items-center gap-2">
          <FaCheckCircle
            className={`${
              property?.isVerified ? "text-green-500" : "text-gray-500"
            }`}
          />
          {property.isVerified ? "Verified" : "Not Verified"}
        </p>
        <p className="text-gray-600">
          ${property.priceRangeMin} - ${property.priceRangeMax}
        </p>
        {/* Agent Details */}
        <div className="flex items-center gap-4 mt-4">
          <img
            src={property?.image}
            alt={property?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <p className="text-gray-800">{property?.name}</p>
        </div>
        {/* Details Button */}
        <Link to={`/property_details/${property?._id}`}>
          <button className="btn btn-primary mt-4 w-full">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default CardForAllPropertyPage;
