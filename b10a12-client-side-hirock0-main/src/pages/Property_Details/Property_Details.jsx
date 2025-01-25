import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { usePublicAxios } from "../../utils/AxiosInstance/PublicAxiosInstance";
import { useUsers } from "../../utils/TanstackQuery/TanstackQuery";
import swal from "sweetalert";
import Loading from "../Loading/Loading";

const Property_Details = () => {
  const { data: loggedUser, isLoading } = useUsers();
  const axios = usePublicAxios();
  const property = useLoaderData()[0];
  const [reviewsData, setReviewsData] = useState(property?.reviews);

  const [newReview, setNewReview] = useState("");
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  const addToWishlist = async () => {
    const listData = {
      userId: loggedUser?.id,
      userName: loggedUser?.name,
      userImage: loggedUser?.image,
      userEmail: loggedUser?.email,
      propertyTitle: property?.title,
      propertyId: property?._id,
      agentEmail: property?.email,
      agentImage: property?.image,
      agentName: property?.name,
      propertyImage: property?.propertyImage,
      priceRangeMax: property?.priceRangeMax,
      priceRangeMin: property?.priceRangeMin,
      location: property?.location,
      offerStatus: "pending",
      offerValue: null,
    };
    const response = await axios.post("/api/propertise/whishlist", listData);

    if (response?.data?.success) {
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
  };

  const handleAddReview = async () => {
    if (!newReview.trim()) {
      swal({
        title: "Please enter a review before submitting.",
        icon: "warning",
      });

      return;
    }

    const newReviewData = {
      userId: loggedUser?.id,
      propertyId: property?._id,
      agentEmail: property?.email,
      agentName: property?.name,
      propertyTitle: property?.title,
      userEmail: loggedUser?.email,
      userImage: loggedUser?.image,
      userName: loggedUser?.name,
      review: newReview,
    };

    const response = await axios.post("/api/user/add_review", newReviewData);
    if (response?.data?.success) {
      swal({
        title: response?.data?.message,
        icon: "success",
      });
      setReviewsData([newReviewData, ...reviewsData]);
    } else {
      swal({
        title: response?.data?.message,
        icon: "warning",
      });
    }
  };

  if (!property) return <p>Loading...</p>;

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full container mx-auto px-5 py-12 ">
          {/* Property Details Section */}
          <section
            className="mb-12 bg-slate-100 rounded-md shadow-md overflow-hidden  flex max-md:flex-col-reverse items-center justify-center gap-5 p-5 max-sm:p-3"
            data-aos="fade-up"
          >
            <div className=" w-1/2 max-md:w-full">
              <h2 className="text-3xl font-bold">{property?.title}</h2>
              <p className="text-gray-600 mt-4">{property?.description}</p>
              <p className="text-gray-800 mt-2">
                <strong>Price Range:</strong> {property?.priceRangeMax}
              </p>
              <p className="text-gray-800 mt-2">
                <strong>Agent:</strong> {property?.name}
              </p>
              <button className="btn btn-primary mt-4" onClick={addToWishlist}>
                Add to Wishlist
              </button>
            </div>
            <div className="">
              <img src={property?.propertyImage} alt="" />
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mb-12" data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-4">Reviews</h3>
            {reviewsData?.length > 0 ? (
              <ul className="space-y-4 h-52 overflow-y-scroll">
                {reviewsData
                  ?.sort((a, b) => b.timeStamp - a.timeStamp)
                  ?.map((review, index) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-100 rounded-lg shadow-md"
                    >
                      <div className="flex items-center gap-2 ">
                        <img src={review?.userImage} alt="userName"  className=" w-8 rounded-full"/>
                        <span className="font-bold">{review?.userName}</span>
                      </div>
                      <p className="mt-2 text-gray-800">{review?.review}</p>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No reviews yet. Be the first to review this property!</p>
            )}
            <button
              className="btn btn-secondary mt-4"
              onClick={() =>
                document.getElementById("review-modal")?.showModal()
              }
            >
              Add a Review
            </button>
          </section>

          {/* Add Review Modal */}
          <dialog id="review-modal" className="modal">
            <form
              method="dialog"
              className="modal-box"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddReview();
                document.getElementById("review-modal")?.close();
              }}
            >
              <h3 className="font-bold text-lg">Add a Review</h3>
              <textarea
                className="textarea textarea-bordered w-full mt-4"
                placeholder="Write your review here..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              ></textarea>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("review-modal")?.close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </main>
  );
};

export default Property_Details;
