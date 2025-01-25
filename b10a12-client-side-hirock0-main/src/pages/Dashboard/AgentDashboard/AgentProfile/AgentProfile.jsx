import Profile from "../../../../components/Profile/Profile";
import { useUsers } from "../../../../utils/TanstackQuery/TanstackQuery";

const AgentProfile = () => {
  const { data: loggedUser } = useUsers();
  return (
    <main>
      <div className="">
        <Profile info={loggedUser} />
      </div>
    </main>
  );
};

export default AgentProfile;
