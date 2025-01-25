import { AiOutlineDelete } from "react-icons/ai";
import AOS from "aos";
import { useEffect } from "react";
import swal from "sweetalert";
import { usePublicAxios } from "../../utils/AxiosInstance/PublicAxiosInstance";
const ReviewCard = ({
  propertyId,
  review,
  index,
  setReviewsArray,
  reviewsArray,
}) => {
  const axios = usePublicAxios();
  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.post("/api/user/delete_review", {
        propertyId: propertyId,
        rewiewId: reviewId,
      });
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        setReviewsArray(reviewsArray?.filter((item, idx) => idx !== index));
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
    AOS.init();
  }, []);

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4"
      data-aos="fade-up"
    >
      <img
        src={review?.userImage}
        alt={review?.userName}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{review?.userName}</h3>
        <p className="text-gray-600">{review?.userEmail}</p>
        <p className="text-gray-800 mt-2">{review?.review}</p>
      </div>
      <button
        onClick={() => {
          handleDelete(review?._id);
        }}
        className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        <AiOutlineDelete className="mr-2" /> Delete
      </button>
    </div>
  );
};

export default ReviewCard;
