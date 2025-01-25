import DonutChart from "../../components/Charts/DonutChatrt/DonutChatrt";
import ThubChart from "../../components/Charts/ThubChart/ThubChart";

export default function DashboardPage() {
  return (
    <main>
      <div className=" my-20 max-md:my-10 max-sm:my-5 ">
        <div className=" container mx-auto px-5">
          <div className="">
            <ThubChart />
          </div>
          <div className=" mt-5 flex items-center justify-center">
            <DonutChart />
          </div>
        </div>
      </div>
    </main>
  );
}
