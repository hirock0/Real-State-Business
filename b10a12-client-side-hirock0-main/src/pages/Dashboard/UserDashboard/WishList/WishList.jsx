import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePublicAxios } from "../../../../utils/AxiosInstance/PublicAxiosInstance";
import { useLoaderData } from "react-router-dom";
import swal from "sweetalert";
import { FaDollarSign } from "react-icons/fa";
import AOS from "aos";
const Wishlist = () => {
  const axios = usePublicAxios();
  const wishlistData = useLoaderData();
  const [wishlistStateData, setWishlistStateData] = useState(wishlistData);
  const [offerAmount, setOfferAmount] = useState(0);
  const [propertiseId, setPropertseId] = useState("");
  const [idx, setIdx] = useState(null);
  const [btnFlag, setBtnFlag] = useState(false);
  const [propertyDetail, setPropertyDetail] = useState({});
  const [popupFlag, setPopupFlag] = useState(false);

  const handleOffer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/propertise/create_offer", {
        id: propertiseId,
        offerAmount: offerAmount,
      });
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });

        setBtnFlag(true);
      } else {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        setBtnFlag(false);
      }
    } catch (error) {
      setBtnFlag(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (popupFlag) {
      window.document.body.style.overflow = " hidden";
    } else {
      window.document.body.style.overflow = " auto";
    }
  }, [popupFlag]);
  useEffect(() => {
    AOS.init();
  }, []);

  const removeFromWishlist = async (id) => {
    try {
      const response = await axios.delete(
        `/api/propertise/delete_whishlist_propertise/${id}`
      );
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        const deletedData = wishlistStateData.filter(
          (item) => item?._id !== id
        );
        setWishlistStateData(deletedData);
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

  return (
    <main>
      <div className="">
        <div className=" my-5 text-3xl max-md:text-2xl font-semibold max-sm:text-xl text-center">
          <h1>Whishlist</h1>
        </div>
        <div className="">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            {wishlistStateData.length > 0 ? (
              wishlistStateData
                ?.sort((a, b) => b.timeStamp - a.timeStamp)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4 mb-4"
                  >
                    <img
                      src={item?.propertyImage}
                      alt={item?.title}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{item?.title}</h3>
                      <p className="text-gray-600">{item?.location}</p>
                      <p className="text-gray-600">
                        Agent: {item?.agentName}
                        <img
                          src={item?.agentImage}
                          alt={item?.agentName}
                          className="inline-block w-8 h-8 rounded-full ml-2"
                        />
                      </p>
                      <p
                        className={`text-sm ${
                          item?.offerStatus !== "pending"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item?.offerStatus === "pending" && "pending"}
                        {item?.offerStatus === "rejected" && "rejected"}
                        {item?.offerStatus === "accepted" && "accepted"}
                      </p>
                      <p className="text-gray-800">
                        ${item?.priceRangeMax} - ${item?.priceRangeMin}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setPropertseId(item?._id), setIdx(index);
                          setPropertyDetail(item);
                          setPopupFlag(true);
                        }}
                        disabled={
                          item?.offerValue !== null ||
                          (btnFlag && index === idx)
                        }
                      >
                        {item?.offerValue === null
                          ? "Make an Offer"
                          : "Offer created"}
                      </button>

                      <button
                        className="btn btn-error"
                        onClick={() => removeFromWishlist(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p>No properties in wishlist</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      <div
        className={`${
          !popupFlag ? "hidden" : "block"
        } fixed left-0 right-0 top-0 bottom-0 bg-white z-50`}
      >
        <div className=" container mx-auto px-5 py-5 h-full ">
          <div className=" flex justify-end text-white">
            <button
              onClick={() => {
                setPopupFlag(false), setPropertyDetail({});
              }}
              className=" btn btn-error text-white"
            >
              Cancel
            </button>
          </div>
          <div className=" overflow-y-scroll  mt-5  flex items-center justify-center text-white ">
            <div className=" w-full h-[90vh]">
              <div
                className=" flex items-center justify-center w-full bg-gray-100"
                data-aos="fade-up"
              >
                <div className="w-full  bg-white rounded-lg p-6">
                  <h2 className="text-2xl text-black font-semibold text-center mb-6">
                    Make an Offer
                  </h2>

                  <form className="space-y-4 px-5 text-black">
                    {/* Property Title */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Property Title
                      </label>
                      <input
                        type="text"
                        value={propertyDetail?.propertyTitle}
                        readOnly
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
                      />
                    </div>

                    {/* Property Location */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Property Location
                      </label>
                      <input
                        type="text"
                        value={propertyDetail?.location}
                        readOnly
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
                      />
                    </div>

                    {/* Agent Name */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Agent Name
                      </label>
                      <input
                        type="text"
                        value={propertyDetail?.agentName}
                        readOnly
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
                      />
                    </div>

                    {/* Offer Amount */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Offer Amount
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                          <FaDollarSign />
                        </span>
                        <input
                          type="number"
                          value={offerAmount}
                          name="offerPrice"
                          onChange={(e) => setOfferAmount(e.target.value)}
                          className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                          placeholder="Write your Amount"
                          required
                        />
                      </div>
                    </div>

                    {/* Buyer Email */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Buyer Email
                      </label>
                      <input
                        type="email"
                        readOnly
                        value={propertyDetail?.userEmail}
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
                      />
                    </div>

                    {/* Buyer Name */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Buyer Name
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={propertyDetail?.userName}
                        className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
                      />
                    </div>

                    {/* Buying Date */}
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Buying Date
                      </label>
                      <input
                        type="text"
                        value={new Date().toLocaleDateString()}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        required
                        readOnly
                      />
                    </div>

                    {/* Offer Button */}
                    <button
                      type="submit"
                      onClick={handleOffer}
                      className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      Submit Offer
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
