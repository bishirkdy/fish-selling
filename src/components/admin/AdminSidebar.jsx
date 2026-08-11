import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Fish,
  Users,
  BarChart3,
  LogOut,
  ChevronDown,
  ChevronRight,
  LineStyle,
  CircleX,
  GroupIcon,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetUserById } from "../../tanstack/hooks/queries/user/userQueries";
import { useLogout } from "../../tanstack/hooks/mutations/auth/authMutations";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../../tanstack/hooks/queries/auth/authQueries";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Category",
    icon: GroupIcon,
    path: "/admin/categories",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },
  {
    title: "Products",
    icon: Fish,
    path: "/admin/products",

    subMenu: [
      {
        title: "Add Fish",
        path: "/admin/addfish",
      },
      {
        title: "View Fish",
        path: "/admin/viewfish",
      },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data  } = useGetCurrentUser();
  const { mutate: logoutMutation } = useLogout();
  const client = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState("");

  const handleMenu = (menu) => {
    if (menu.subMenu) {
      setOpenMenu(openMenu === menu.title ? "" : menu.title);
    } else {
      navigate(menu.path);
    }
  };
  
  function logoutHandler() {
    logoutMutation(undefined, {
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["currentUser"],
        });
        toast.success("Logout successfully");
        navigate("/login");
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-60 bg-[#0B1120] text-white p-3 rounded-xl shadow-lg"
        >
          <LineStyle size={16} />
        </button>
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 w-72 lg:w-64 h-screen bg-[#0B1120] text-white flex flex-col justify-between border-r border-white/10 transition-all duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div>
          <div className="h-20 flex justify-between items-center px-4 border-b border-white/10">
            <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden text-white p-2 rounded-xl hover:bg-white/10 transition"
            >
              <CircleX size={22} />
            </button>
          </div>
          <nav className="px-3 py-5 space-y-2">
            {menus.map((menu, index) => {
              const isOpen = openMenu === menu.title;

              const isActive = location.pathname === menu.path;

              return (
                <div key={index}>
                  <button
                    onClick={() => handleMenu(menu)}
                    className={`
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${isActive ? "bg-cyan-500 text-white" : "hover:bg-white/10"}
                  `}
                  >
                    <div className="flex items-center gap-3">
                      <menu.icon size={20} />

                      <span>{menu.title}</span>
                    </div>

                    {menu.subMenu &&
                      (isOpen ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      ))}
                  </button>

                  {menu.subMenu && isOpen && (
                    <div className="ml-6 mt-2 space-y-1 border-l border-white/10 pl-4">
                      {menu.subMenu.map((sub, i) => {
                        const isSubActive = location.pathname === sub.path;

                        return (
                          <button
                            key={i}
                            onClick={() => {
                              navigate(sub.path);
                              setOpen(false);
                            }}
                            className={`
                            w-full
                            text-left
                            px-3
                            py-2.5
                            rounded-lg
                            text-sm
                            transition
                            ${
                              isSubActive
                                ? "bg-white/10 text-cyan-400"
                                : "text-zinc-300 hover:bg-white/5"
                            }
                          `}
                          >
                            {sub.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-3xl p-4 space-y-4 backdrop-blur-md">
            <button
              onClick={() => navigate("/")}
              className="w-full animate-pulse py-3 rounded-2xl bg-(--color-background) hover:bg-(--color-surface) text-white text-sm font-semibold cursor-pointer"
            >
              Go To Official Page
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/100"
                  alt=""
                  className="w-12 h-12 rounded-2xl object-cover border border-white/10"
                />
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {data?.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.3">Administrator</p>
                </div>
              </div>
              <button
                onClick={logoutHandler}
                className="p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all duration-200 cursor-pointer"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
