import { AiOutlineDelete, AiOutlineWarning } from "react-icons/ai";
import AOS from "aos";
import { useEffect, useState } from "react";
import { usePublicAxios } from "../../utils/AxiosInstance/PublicAxiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";
const UserTable = ({ item }) => {
  const axios = usePublicAxios();
  const queryClient = useQueryClient();
  const [adminFlag, setAdminFlag] = useState(false);
  const [agentFlag, setAgentFlag] = useState(false);
  const [fraudFlag, setFraudFlag] = useState(false);
  const onMakeAdmin = async (id) => {
    try {
      const response = await axios.patch(`/api/admin/convert_admin/${id}`);
      if (response?.data?.success) {
        setAdminFlag(true);
        setAgentFlag(false);
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
  const onMakeAgent = async (id) => {
    try {
      const response = await axios.patch(`/api/admin/convert_agent/${id}`);
      if (response?.data?.success) {
        setAdminFlag(false);
        setAgentFlag(true);
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
  const onMakeFraud = async (id) => {
    try {
      const response = await axios.patch(`/api/admin/convert_fraud/${id}`);
      if (response?.data?.success) {
        setFraudFlag(true);
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

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/delete_user/${id}`);
      if (response?.data?.success) {
        queryClient.setQueryData(["allUsers"], (oldData) => {
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
    AOS.init();
  }, []);

  return (
    <tr className=" border-y  " data-aos="fade-up">
      <td className="border-l  ">{item.name}</td>
      <td className=" border-x ">{item.email}</td>

      <td className="border-r ">
        <div className=" w-full bg-lime-300 px-4 py-2 font-semibold ">
          {item.role == "user" &&
            `${
              !adminFlag && !agentFlag
                ? "user"
                : `${(adminFlag && "admin") || (agentFlag && "agent")}`
            }`}
          {item.role == "agent" && `${!adminFlag ? "agent" : "admin"}`}
          {item.role == "admin" && "admin"}
          {item.role == "fraud" && "fraud"}
        </div>
      </td>

      <td className="border-r ">
        {item.role == "agent" && (
          <button
            disabled={fraudFlag | ((item.role === "fraud") | adminFlag)}
            onClick={() => onMakeAdmin(item?._id)}
            className={` ${
              adminFlag || fraudFlag ? "opacity-50" : "hover:bg-blue-600"
            } bg-blue-500 w-full text-white px-4 py-2 rounded`}
          >
            Make Admin
          </button>
        )}

        {item.role == "user" && (
          <div className={`${fraudFlag && "hidden"} flex items-center gap-2`}>
            <button
              onClick={() => onMakeAdmin(item?._id)}
              disabled={adminFlag | (item.role === "fraud")}
              className={` ${
                adminFlag ? "opacity-50" : "hover:bg-blue-600"
              } bg-blue-500 w-full text-white px-4 py-2 rounded `}
            >
              Make Admin
            </button>
            <button
              disabled={agentFlag | (item.role === "fraud")}
              onClick={() => onMakeAgent(item?._id)}
              className={`  ${
                agentFlag ? "opacity-50" : "hover:bg-blue-600"
              } bg-blue-500 w-full text-white px-4 py-2 rounded `}
            >
              Make Agent
            </button>
          </div>
        )}
        {item.role == "admin" && (
          <button
            disabled={true}
            className={`  bg-slate-200 w-full text-white px-4 py-2 rounded `}
          >
            Admin
          </button>
        )}
        {(item.role === "fraud") | fraudFlag ? (
          <button
            disabled={true}
            className={`  bg-slate-200 w-full text-white px-4 py-2 rounded `}
          >
            disabled
          </button>
        ) : null}
      </td>

      <td className=" border-r">
        <div className={`${adminFlag && "hidden"}`}>
          {(item.role === "agent") | agentFlag ? (
            <button
              onClick={() => onMakeFraud(item?._id)}
              className={`${
                fraudFlag ? "hidden" : "hover:bg-red-600"
              }  flex items-center bg-red-500 text-white px-4 py-2 rounded `}
            >
              <AiOutlineWarning className="mr-2" /> Mark as Fraud
            </button>
          ) : null}

          {(item.role === "fraud") | fraudFlag ? (
            <button
              disabled={fraudFlag | (item.role === "fraud")}
              onClick={() => onMakeFraud(item?._id)}
              className={`${
                fraudFlag | (item.role === "fraud")
                  ? "opacity-50"
                  : "hover:bg-red-600"
              }  flex items-center bg-red-500 text-white px-4 py-2 rounded `}
            >
              <AiOutlineWarning className="mr-2" /> Mark as Fraud
            </button>
          ) : null}
        </div>
      </td>
      <td className=" border-r ">
        <button
          onClick={() => onDelete(item?._id)}
          className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          <AiOutlineDelete className="mr-2" /> Delete User
        </button>
      </td>
    </tr>
  );
};

export default UserTable;
