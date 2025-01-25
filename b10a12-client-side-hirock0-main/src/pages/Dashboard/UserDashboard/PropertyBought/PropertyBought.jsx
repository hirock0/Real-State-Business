import OfferPropertyCard from "../../../../components/OfferPropertyCard/OfferPropertyCard";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
const PropertyBought = () => {
  const properties = useLoaderData();
  const filterOffer = properties?.filter(
    (property) => property.offerValue !== null
  );
  const navigate = useNavigate();
  const handlePayRedirect = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <main className=" mt-10">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Property Bought</h1>
        <div className="flex flex-wrap justify-center">
          {filterOffer.map((property, index) => (
            <OfferPropertyCard
              key={index}
              property={property}
              onPay={handlePayRedirect}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default PropertyBought;
