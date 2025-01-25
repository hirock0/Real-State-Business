import { useAdminPendingPropertises } from "../../../../utils/TanstackQuery/TanstackQuery";
import Loading from "../../../Loading/Loading";
import RejectedBtn from "./RejectedBtn";
import VerifyBtn from "./VerifyBtn";

const ManageProperties = () => {
  const { data: pendingPropertises, isLoading } = useAdminPendingPropertises();

  return (
    <main className="">
      <div className={``}>
        <div className=" py-5">
          <h1 className="text-3xl font-bold text-center mb-8">
            Manage Properties
          </h1>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="overflow-x-scroll ">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className=" ">
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Agent Name</th>
                    <th className="px-4 py-2">Agent Email</th>
                    <th className="px-4 py-2">Price Range</th>
                    <th className="px-4 py-2 text-center">Verify</th>
                    <th className="px-4 py-2 text-center">Rejected</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPropertises.map((property, index) => (
                    <tr key={index} className="border-b text-nowrap">
                      <td className="px-4 py-2">{property.title}</td>
                      <td className="px-4 py-2">{property.location}</td>
                      <td className="px-4 py-2">{property.name}</td>
                      <td className="px-4 py-2">{property.email}</td>
                      <td className="px-4 py-2">
                        ${property.priceRangeMin} - ${property.priceRangeMax}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <VerifyBtn
                          id={property?._id}
                          isVerify={property?.isVerified}
                          isReject={property?.isRejected}
                          index={index}
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <RejectedBtn
                          id={property?._id}
                          isReject={property?.isRejected}
                          isVerify={property?.isVerified}
                          index={index}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ManageProperties;
