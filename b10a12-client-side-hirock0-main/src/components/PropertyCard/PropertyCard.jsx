import { useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import swal from "sweetalert";
import { usePublicAxios } from "../../utils/AxiosInstance/PublicAxiosInstance";
import { useQueryClient } from "@tanstack/react-query";
const PropertyCard = ({ property }) => {
  const queryClient = useQueryClient();
  const axios = usePublicAxios();
  const onDeleteHandler = async (id) => {
    try {
      const response = await axios.get(`/api/agent/delete_propertise/${id}`);
      if (response?.data?.success) {
        queryClient.setQueryData(["agentAddedPropertises"], (oldData) => {
          if (!oldData) return [];
          return oldData.filter((item) => item._id !== id);
        });
        swal({
          title: response?.data?.message,
          icon: "success",
        });
      } else {
        swal({
          title: response?.data?.message,
          icon: "warning",
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 400,
      easing: "ease",
      once: false,
      anchorPlacement: "top-bottom",
    });
  }, []);
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 space-y-4"
      data-aos="fade-up"
    >
      <img
        src={property.propertyImage}
        alt={property.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold">{property.title}</h2>
      <p className="text-gray-600">Location: {property.location}</p>
      <div className="flex items-center space-x-4">
        <img
          src={property.image}
          alt={property.name}
          className="w-10 h-10 rounded-full"
        />
        <p className="text-gray-700">{property.name}</p>
      </div>
      <p>
        <span className="font-semibold">Verification Status:</span>
        <span
          className={`px-2 py-1 rounded ${
            property.status === "verified"
              ? "bg-green-100 text-green-600"
              : property.status === "rejected"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {property.status}
        </span>
      </p>
      <p>
        <span className="font-semibold">Price Range:</span> $
        {property.priceRangeMax}- ${property.priceRangeMin}
      </p>
      <div className="flex justify-between mt-4">
        {property.status !== "rejected" && (
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <AiFillEdit className="mr-2" /> Update
          </button>
        )}
        <button
          onClick={() => onDeleteHandler(property?._id)}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <AiFillDelete className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
