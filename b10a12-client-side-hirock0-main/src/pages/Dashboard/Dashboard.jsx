import { NavLink, Outlet } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import { useEffect, useState } from "react";
import { useUsers } from "../../utils/TanstackQuery/TanstackQuery";
import { IoArrowBackCircleOutline } from "react-icons/io5";
const Dashboard = () => {
  const { data: loggedUser } = useUsers();
  const [sideMenu, setSideMenu] = useState(false);
  const userRoutes = [
    {
      id: 0,
      title: "My Profile",
      path: "/dashboard/profile",
    },
    {
      id: 1,
      title: "Wishlist",
      path: `/dashboard/wishlist/${loggedUser?.id}`,
    },
    {
      id: 2,
      title: "Property Bought",
      path: `/dashboard/bought/${loggedUser?.id}`,
    },
    {
      id: 3,
      title: "My Reviews",
      path: "/dashboard/reviews",
    },
  ];
  const agentRoutes = [
    {
      id: 0,
      title: "Agent Profile",
      path: "/dashboard/agent_profile",
    },
    {
      id: 1,
      title: "Add Property",
      path: "/dashboard/add_property",
    },
    {
      id: 2,
      title: "My added properties",
      path: "/dashboard/my_added_property",
    },
    {
      id: 3,
      title: "My sold properties",
      path: "/dashboard/my_sold_property",
    },
    {
      id: 4,
      title: "Requested properties",
      path: "/dashboard/requested_property",
    },
  ];
  const adminRoutes = [
    {
      id: 0,
      title: "Admin Prolile",
      path: "/dashboard/admin_profile",
    },
    {
      id: 1,
      title: "Manage Properties",
      path: "/dashboard/manage_propertise",
    },
    {
      id: 2,
      title: "Manage Users",
      path: "/dashboard/manage_users",
    },
    {
      id: 3,
      title: "Manage reviews",
      path: "/dashboard/manage_reviews",
    },
  ];

  useEffect(() => {
    window.addEventListener("click", () => {
      setSideMenu(false);
    });
  }, []);

  return (
    <main className=" ">
      <button
        className=" fixed md:hidden top-20 z-50 hover:bg-slate-100 bg-white px-5 py-2 rounded-sm shadow-lg left-0 "
        onClick={(e) => {
          e.stopPropagation(), setSideMenu(true);
        }}
      >
        menu
      </button>
      <div className=" sticky top-0 z-50">
        <Nav />
      </div>
      <div className=" flex gap-4 container mx-auto px-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className={` w-3/12 max-md:w-1/2 max-md:h-full  max-md:fixed z-40 max-md:bg-white max-md:transition-all max-md:left-0 max-md:top-20  ${
            !sideMenu ? "max-md:-translate-x-[150%]" : "max-md:-translate-x-0"
          } `}
        >
          <aside
            className={` h-[85vh] max-md:h-full shadow-lg  p-4 md:sticky md:top-20 `}
          >
            <button onClick={() => setSideMenu(false)} className=" md:hidden">
              <IoArrowBackCircleOutline size={30} />
            </button>
            <h2 className="text-2xl max-lg:text-xl text-center font-bold mb-4">
              {loggedUser?.role.toUpperCase()} Dashboard
            </h2>
            <nav className="space-y-2 flex flex-col">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "text-gray-700"
                }
              >
                <div className=" bg-lime-200 h-12 flex items-center pl-2 rounded-md shadow-lg hover:scale-105">
                  Dashboard
                </div>
              </NavLink>

              {loggedUser?.role === "user" && (
                <div className=" flex flex-col gap-5">
                  {userRoutes?.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item?.path}
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : "text-gray-700"
                      }
                    >
                      <div className=" bg-white font-semibold hover:bg-slate-100 h-12 flex items-center pl-2 rounded-md shadow-lg hover:scale-105">
                        {item?.title}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}

              {loggedUser?.role === "admin" && (
                <div className=" flex flex-col gap-5">
                  {adminRoutes?.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item?.path}
                      className={({ isActive }) =>
                        isActive ? "text-blue-500 font-bold" : "text-gray-700"
                      }
                    >
                      <div className=" bg-white font-semibold hover:bg-slate-100 h-12 flex items-center pl-2 rounded-md shadow-lg hover:scale-105">
                        {item?.title}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}

              {loggedUser?.role === "agent" && (
                <div className=" flex flex-col gap-5 text-nowrap">
                  {agentRoutes?.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item?.path}
                      className={({ isActive }) =>
                        isActive ? "text-blue-500 font-bold" : "text-gray-700"
                      }
                    >
                      <div className=" bg-white font-semibold hover:bg-slate-100 h-12 flex items-center pl-2 rounded-md shadow-lg hover:scale-105">
                        {item?.title}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </nav>
          </aside>
        </div>
        <aside className=" w-9/12 max-md:w-full">
          <div className="">
            <Outlet />
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;
