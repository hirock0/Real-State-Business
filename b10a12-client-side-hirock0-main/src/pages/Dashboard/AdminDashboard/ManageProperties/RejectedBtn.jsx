import swal from "sweetalert";
import { useState } from "react";
import { usePublicAxios } from "../../../../utils/AxiosInstance/PublicAxiosInstance";
import { useContextApi } from "../../../../utils/ContextApi/ContextApiProvider";
const RejectedBtn = ({ id, isReject, isVerify, index }) => {
  const axios = usePublicAxios();
  const [loading, setLoading] = useState(false);
  const [rejectFlag, setRejectFlag] = useState(isReject);
  const { indexFlag, setRejectIndexFlag } = useContextApi();

  const onRejected = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/admin/reject_propertise/${id}`);
      if (response?.data?.success) {
        setRejectFlag(true);
        setRejectIndexFlag(index);
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  return (
    <div className={`${(indexFlag === index || isVerify) && "hidden"}`}>
      <button
        disabled={(rejectFlag || isReject) && true}
        onClick={onRejected}
        className={` bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600`}
      >
        {!loading ? (
          !rejectFlag ? (
            "Reject"
          ) : (
            "Rejected"
          )
        ) : (
          <div className=" loading loading-spinner loading-md"></div>
        )}
      </button>
    </div>
  );
};

export default RejectedBtn;
