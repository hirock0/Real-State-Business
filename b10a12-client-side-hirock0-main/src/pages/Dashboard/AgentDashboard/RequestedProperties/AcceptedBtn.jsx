import swal from "sweetalert";
import { usePublicAxios } from "../../../../utils/AxiosInstance/PublicAxiosInstance";
import { useState } from "react";
const AcceptedBtn = ({ id, offer, flag, index }) => {
  const axios = usePublicAxios();

  const[idx,setIdx]=useState(null)


  const handleAcceptOrReject = async () => {
    try {
      const response = await axios.post(
        "/api/agent/accept_or_rejected_propertise",
        {
          id: id,
          flag: flag,
        }
      );
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        setIdx(index)
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
    <div>
      <button
        disabled={offer?.offerStatus === "accepted" || index === idx}
        className=" btn btn-accent"
        onClick={handleAcceptOrReject}
      >
        Accept
      </button>
    </div>
  );
};

export default AcceptedBtn;
