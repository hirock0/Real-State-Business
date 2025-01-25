import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePublicAxios } from "../../../../utils/AxiosInstance/PublicAxiosInstance";
import { useUsers } from "../../../../utils/TanstackQuery/TanstackQuery";
import swal from "sweetalert";
const MyReviews = () => {
  const axios = usePublicAxios();
  const { data: loggedUser, isLoading } = useUsers();
  const [rewiewsArray, setReviewsArray] = useState([]);
  const handleDelete = async (reviewId, propertyId, idx) => {
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
        setReviewsArray(rewiewsArray?.filter((item, index) => index !== idx));
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
    const unsubscribe = async () => {
      try {
        const response = await axios.get(
          `/api/user/get_user_reviews/${loggedUser?.email}`
        );
        setReviewsArray(response?.data?.userReviews);
      } catch (error) {
        throw new Error(error);
      }
    };
    unsubscribe();
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Reviews</h1>

      {isLoading ? (
        <p className="text-center">Loading reviews...</p>
      ) : rewiewsArray?.sort(
          (a, b) => b.userReviews.timeStamp - a.userReviews.timeStamp
        )?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewiewsArray?.map((review, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title">
                  {review?.userReviews?.propertyTitle}
                </h2>
                <p className="text-gray-500">
                  <strong>Agent:</strong> {review?.userReviews?.agentName}
                </p>
                <p className="text-gray-500">time</p>
                <p className="text-gray-700 mt-2">
                  {review?.userReviews?.review}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-error flex items-center gap-2"
                    onClick={() =>
                      handleDelete(
                        review?.userReviews?._id,
                        review?.userReviews?.propertyId,
                        index
                      )
                    }
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews added yet.</p>
      )}
    </div>
  );
};

export default MyReviews;
