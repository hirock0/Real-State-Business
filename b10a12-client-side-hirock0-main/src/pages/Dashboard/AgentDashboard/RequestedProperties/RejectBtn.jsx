import swal from "sweetalert";
import { usePublicAxios } from "../../../../utils/AxiosInstance/PublicAxiosInstance";
import { useState } from "react";
const RejectBtn = ({ id, offer, flag, index }) => {
  const [idx, setIdx] = useState(null);
  const axios = usePublicAxios();
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
        setIdx(index);
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
        onClick={handleAcceptOrReject}
        disabled={offer?.offerStatus === "rejected" || index === idx}
        className=" btn btn-error"
      >
        Reject
      </button>
    </div>
  );
};

export default RejectBtn;
