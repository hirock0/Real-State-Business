import Profile from "../../../../components/Profile/Profile";
import { useUsers } from "../../../../utils/TanstackQuery/TanstackQuery";
import Loading from "../../../Loading/Loading";
const MyProfile = () => {
  const { data: loggedUser, isLoading } = useUsers();

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <Profile info={loggedUser} />
        </div>
      )}
    </main>
  );
};

export default MyProfile;
