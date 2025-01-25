import Advertisement from "./components/Advertisement/Advertisement";
import Banner from "./components/Banner/Banner";
import LatestUserReview from "./components/LatestUserReview/LatestUserReview";
const App = () => {
  return (
    <div className="w-full bg-gradient-to-tl from-orange-100/20 to-red-50/10 pb-10">
      <Banner />
      <div className=" container pt-10 mx-auto px-5">
        <Advertisement />
        <LatestUserReview />
      </div>
    </div>
  );
};

export default App;
