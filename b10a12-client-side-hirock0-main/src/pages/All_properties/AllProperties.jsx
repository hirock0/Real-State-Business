import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { useAllverifiedPropertises } from "../../utils/TanstackQuery/TanstackQuery";
import Loading from "../Loading/Loading";
import { FaSearch } from "react-icons/fa";
import CardForAllPropertyPage from "../../components/CardForAllPropertyPage/CardForAllPropertyPage";

const AllProperties = () => {
  const { data: verifiedPropertise, isLoading } = useAllverifiedPropertises();
  const [searchData, setSearchData] = useState("");
  const [ascendingOrder, setAscendingOrder] = useState(false);

  const SearchArray = verifiedPropertise?.filter((property) =>
    property.location.toLowerCase().includes(searchData.toLowerCase())
  );
  const sortedData = verifiedPropertise?.sort(
    (a, b) => a.priceRangeMin - b.priceRangeMin
  );
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <main>
      <div className="">
        <div className="py-5 container mx-auto px-5">
          <h2
            className="text-2xl text-center font-bold mb-6"
            data-aos="fade-up"
          >
            All Properties
          </h2>
          {/* search_functionality_start */}
          <div className="   w-full mb-5">
            <div className=" flex justify-center items-center">
              <div className="w-full">
                <div className=" flex items-center bg-white shadow-md h-12  border rounded-full overflow-hidden ">
                  <input
                    type="text"
                    name="search"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    placeholder="Search..."
                    className=" pl-4 h-full w-full outline-none"
                  />
                  <button
                    type="submit"
                    className=" bg-lime-300 h-full w-16 flex items-center justify-center "
                  >
                    <FaSearch size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* search_functionality_end */}

          {isLoading ? (
            <Loading />
          ) : (
            <div className={`${SearchArray?.length === 0 && "h-[80vh]"}`}>
              {SearchArray?.length === 0 ? (
                <div className=" text-center mt-5">
                  <h1 className=" text-2xl max-md:text-xl font-semibold">
                    Data not found !
                  </h1>
                </div>
              ) : (
                <div className="">
                  <div className=" border-b pb-2 mb-2 flex justify-end">
                    <button
                      onClick={() => setAscendingOrder(!ascendingOrder)}
                      data-tip="Ascending"
                      className=" tooltip tooltip-top bg-lime-300 px-2 py-2 rounded-lg"
                    >
                      Sort by Price
                    </button>
                  </div>
                  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!ascendingOrder
                      ? SearchArray?.sort(
                          (a, b) => b.timeStamp - a.timeStamp
                        )?.map((property, index) => (
                          <CardForAllPropertyPage
                            property={property}
                            key={index}
                          />
                        ))
                      : sortedData?.map((property, index) => (
                          <CardForAllPropertyPage
                            property={property}
                            key={index}
                          />
                        ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AllProperties;
