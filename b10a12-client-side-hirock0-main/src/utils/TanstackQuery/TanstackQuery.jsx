import { useQuery } from "@tanstack/react-query";
import { useSecureAxios } from "../AxiosInstance/SecureAxiosInstance";
import { usePublicAxios } from "../AxiosInstance/PublicAxiosInstance";
export const useUsers = () => {
  const axios = useSecureAxios();
  return useQuery({
    queryKey: ["loggedUser"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/user/authUser`);
        return response?.data?.user;
      } catch (error) {
        return error?.response?.data?.user;
      }
    },
  });
};
export const useAgentAddedProperises = () => {
  const axios = useSecureAxios();
  return useQuery({
    queryKey: ["agentAddedPropertises"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/agent/all_propertises`);
        return response?.data?.agentPropertises;
      } catch (error) {
        return error?.response?.data?.agentPropertises;
      }
    },
  });
};
export const useAdminPendingPropertises = () => {
  const axios = useSecureAxios();
  return useQuery({
    queryKey: ["pendingPropertises"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/admin/pending_propertises`);
        return response?.data?.pendingPropertise;
      } catch (error) {
        return error?.response?.data?.pendingPropertise;
      }
    },
  });
};
export const useAdminVerifiedPropertises = () => {
  const axios = useSecureAxios();
  return useQuery({
    queryKey: ["verifiedPropertises"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/admin/verified_propertises`);
        return response?.data?.verifiedPropertise;
      } catch (error) {
        return error?.response?.data?.verifiedPropertise;
      }
    },
  });
};
export const useAdminRejectedPropertises = () => {
  const axios = useSecureAxios();
  return useQuery({
    queryKey: ["rejectedPropertises"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/admin/rejected_propertises`);
        return response?.data?.rejectedPropertise;
      } catch (error) {
        return error?.response?.data?.rejectedPropertise;
      }
    },
  });
};

export const useAllUsers = () => {
  const axios = useSecureAxios();
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/admin/all_agents_and_users`);
        return response?.data?.allUser;
      } catch (error) {
        return error?.response?.data?.allUser;
      }
    },
  });
};

export const useAllverifiedPropertises = () => {
  const axios = usePublicAxios();
  return useQuery({
    queryKey: ["verifiedPropertise"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/propertise/verified_propertise`);
        return response?.data?.verifiedPropertises;
      } catch (error) {
        return error?.response?.data?.verifiedPropertises;
      }
    },
  });
};
export const useHomePagePropertise = () => {
  const axios = usePublicAxios();
  return useQuery({
    queryKey: ["homePagePropertise"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/propertise/home_page_propertis`);
        return response?.data?.homePropertise;
      } catch (error) {
        return error?.response?.data?.homePropertise;
      }
    },
  });
};

export const useRequestedPropertise = () => {
  const axios = usePublicAxios();
  return useQuery({
    queryKey: ["requestedPropertises"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/agent/requested_propertise`);
        return response?.data?.requestedPropertise;
      } catch (error) {
        return error?.response?.data?.requestedPropertise;
      }
    },
  });
};

export const usePaymentHistories = () => {
  const axios = usePublicAxios();
  return useQuery({
    queryKey: ["histories"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/user/get_buying_history`);
        return response?.data?.historis;
      } catch (error) {
        return error?.response?.data?.historis;
      }
    },
  });
};
