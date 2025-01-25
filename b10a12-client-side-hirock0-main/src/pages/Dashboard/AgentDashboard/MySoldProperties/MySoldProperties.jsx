import { FaHome } from "react-icons/fa";
import { usePaymentHistories } from "../../../../utils/TanstackQuery/TanstackQuery";

const MySoldProperties = () => {
  const { data: histories } = usePaymentHistories();
  const totalAmount = histories?.reduce((acc, item) => acc + item.amount, 0);
  return (
    <div className=" bg-gray-100 py-8 px-4">
      <div className=" container mx-auto px-2 ">
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-3 mb-6 ">
          <div className=" flex items-center  ">
            <FaHome className="text-blue-500 text-2xl mr-2" />
            <h1 className="text-2xl font-semibold text-gray-800">
              My Sold Properties
            </h1>
          </div>
          <p className=" flex items-center gap-2 text-xl  font-semibold">
            <span>Total Revenue:</span>
            <span>${totalAmount}</span>
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-scroll">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">Property Title</th>
                <th className="px-4 py-2 text-left">Payment Date</th>
                <th className="px-4 py-2 text-left">Buyer Email</th>
                <th className="px-4 py-2 text-left">Buyer Name</th>
                <th className="px-4 py-2 text-right">Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {histories?.map((property, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-t">
                    {property?.propertyTitle}
                  </td>
                  <td className="px-4 py-2 border-t">
                    {property?.paymentDate}
                  </td>
                  <td className="px-4 py-2 border-t">{property?.userEmail}</td>
                  <td className="px-4 py-2 border-t">{property?.username}</td>
                  <td className="px-4 py-2 border-t text-right">
                    ${property?.amount.toLocaleString()}
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

export default MySoldProperties;
