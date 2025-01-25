import { useState } from "react";
import { usePublicAxios } from "../../../../utils/AxiosInstance/PublicAxiosInstance";
import swal from "sweetalert";
import { useContextApi } from "../../../../utils/ContextApi/ContextApiProvider";
const VerifyBtn = ({ id, isVerify, isReject, index }) => {
  const axios = usePublicAxios();
  const [loading, setLoading] = useState(false);
  const [verifyFlag, setVerifyFlag] = useState(isVerify);
  const { setIndexFlag, rejectIndexFlag } = useContextApi();
  const onVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/admin/verify_propertise/${id}`);
      if (response?.data?.success) {
        setVerifyFlag(true);
        setIndexFlag(index);
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
    <div>
      <button
        disabled={(index == rejectIndexFlag || isReject || verifyFlag) && true}
        onClick={() => onVerify()}
        className={` ${
          (index === rejectIndexFlag || verifyFlag || isReject) && "opacity-50"
        } ${
          isReject && "opacity-50"
        } bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600`}
      >
        {!loading ? (
          !verifyFlag ? (
            "Verify"
          ) : (
            "Verified"
          )
        ) : (
          <div className=" loading loading-spinner loading-md"></div>
        )}
      </button>
    </div>
  );
};

export default VerifyBtn;
