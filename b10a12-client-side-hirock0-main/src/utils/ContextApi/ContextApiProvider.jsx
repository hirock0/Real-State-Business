import { createContext, useContext, useState } from "react";
const myContext = createContext();
export const useContextApi = () => {
  return useContext(myContext);
};
const ContextApiProvider = ({ children }) => {
  const [AddedPropertises, setAddedPropertises] = useState([]);
  const [indexFlag, setIndexFlag] = useState(null);
  const [rejectIndexFlag, setRejectIndexFlag] = useState(null);
  const [loading, setLoading] = useState(false);
  const values = {
    loading,
    setLoading,
    AddedPropertises,
    setAddedPropertises,
    indexFlag,
    setIndexFlag,
    rejectIndexFlag,
    setRejectIndexFlag,
  };
  return <myContext.Provider value={values}>{children}</myContext.Provider>;
};

export default ContextApiProvider;
