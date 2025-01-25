import PropertyCard from "../../../../components/PropertyCard/PropertyCard";
import { useAgentAddedProperises } from "../../../../utils/TanstackQuery/TanstackQuery";
import Loading from "../../../Loading/Loading";
const MyAddedProperties = () => {
  const { data: agentAddedPropertises, isLoading } = useAgentAddedProperises();
  return (
    <main className="">
      <div className=" pt-5 pb-10">
        <div className=" mb-10">
          <h1 className=" text-center text-3xl font-semibold">
            Added Propertise
          </h1>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className=" grid grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3">
            {agentAddedPropertises?.map((item, index) => (
              <PropertyCard key={index} property={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyAddedProperties;
