import ReviewCard from "../../../../components/ReviewCard/ReviewCard";
import { useEffect, useState } from "react";
import { usePublicAxios } from "../../../../utils/AxiosInstance/PublicAxiosInstance";
const ManageReviews = () => {
  const axios = usePublicAxios();
  const [reviewsArray, setReviewsArray] = useState([]);
  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const response = await axios.get(`/api/propertise/get_all_reviews`);
        setReviewsArray(response?.data?.getReviews);
      } catch (error) {
        return error?.response?.data?.getReviews;
      }
    };
    unsubscribe();
    return () => unsubscribe();
  }, []);
  return (
    <main>
      <div className="">
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Manage Reviews
          </h1>
          <div className="grid grid-cols-1 gap-6">
            {reviewsArray?.map((review, index) => (
              <ReviewCard
                key={index}
                propertyId={review?._id}
                review={review?.reviews}
                index={index}
                setReviewsArray={setReviewsArray}
                reviewsArray={reviewsArray}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageReviews;
