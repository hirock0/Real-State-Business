const Profile = ({ info }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="flex items-center gap-4">
        <img
          src={info.image}
          alt="User"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{info.name}</h3>
          <p className="text-gray-700">{info.email}</p>
          {info.role !== "user" && (
            <p className="text-sm text-blue-500">Role: {info.role}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
