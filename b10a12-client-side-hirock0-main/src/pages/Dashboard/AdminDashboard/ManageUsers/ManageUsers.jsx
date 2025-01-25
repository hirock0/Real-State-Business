import UserTable from "../../../../components/UserTable/UserTable";
import { useAllUsers } from "../../../../utils/TanstackQuery/TanstackQuery";
import Loading from "../../../Loading/Loading";
const ManageUsers = () => {
  const { data: allUsers, isLoading } = useAllUsers();
  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" overflow-x-scroll text-nowrap mt-5 text-center">
          <h1 className=" text-3xl font-semibold mb-5">Manage Users</h1>
          <table cellPadding={10} >
            <thead>
              <tr className=" border text-center">
                <th className="border-r">Name</th>
                <th className="border-r">Email</th>
                <th className="border-r">Role</th>
                <th className="border-r">Make It</th>
                <th className="border-r">Make Frud</th>
                <th className="text-center ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((item, index) => (
                <UserTable key={index} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default ManageUsers;
