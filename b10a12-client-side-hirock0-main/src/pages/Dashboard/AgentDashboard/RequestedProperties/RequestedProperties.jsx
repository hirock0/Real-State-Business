import { useRequestedPropertise } from "../../../../utils/TanstackQuery/TanstackQuery";

import { useState } from "react";
import AcceptedBtn from "./AcceptedBtn";
import RejectBtn from "./RejectBtn";
const RequestedProperties = () => {
  const { data: requestedPropertises, isLoading } = useRequestedPropertise();
  const filterPropertise = requestedPropertises?.filter(
    (item) => item.offerValue !== null
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Requested/Offered Properties
        </h1>
        <div className=" overflow-x-scroll bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">Property Title</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Buyer Email</th>
                <th className="px-4 py-2 text-left">Buyer Name</th>
                <th className="px-4 py-2 text-right">Offered Price</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterPropertise?.map((offer, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-t">{offer?.propertyTitle}</td>
                  <td className="px-4 py-2 border-t">{offer.location}</td>
                  <td className="px-4 py-2 border-t">{offer?.userEmail}</td>
                  <td className="px-4 py-2 border-t">{offer?.userName}</td>
                  <td className="px-4 py-2 border-t text-right">
                    {offer?.offerValue}
                  </td>
                  <td className="px-4 py-2 border-t text-center">
                    <div className="flex justify-center space-x-2">
                      <AcceptedBtn
                        id={offer?._id}
                        offer={offer}
                        flag="accepted"
                        index={index}
                      />
                      <RejectBtn
                        id={offer?._id}
                        offer={offer}
                        flag="rejected"
                        index={index}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedProperties;
