import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Fish,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
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
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState("");

  const handleMenu = (menu) => {
    if (menu.subMenu) {
      setOpenMenu(openMenu === menu.title ? "" : menu.title);
    } else {
      navigate(menu.path);
    }
  };

  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-[#0B1120]
        text-white
        flex
        flex-col
        justify-between
        border-r
        border-white/10
      "
    >
      <div>
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-wide">
            AquaAdmin
          </h1>
        </div>

        <div className="px-4 py-5">
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-xl
              px-4
              py-2.5
              outline-none
              text-sm
              placeholder:text-zinc-400
            "
          />
        </div>

        <nav className="px-3 space-y-2">
          {menus.map((menu, index) => {
            const isOpen = openMenu === menu.title;

            const isActive =
              location.pathname === menu.path;

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
                    ${
                      isActive
                        ? "bg-cyan-500 text-white"
                        : "hover:bg-white/10"
                    }
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
                      const isSubActive =
                        location.pathname === sub.path;

                      return (
                        <button
                          key={i}
                          onClick={() => navigate(sub.path)}
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
        <div
          className="
            flex
            items-center
            justify-between
            bg-white/5
            rounded-2xl
            p-3
          "
        >
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="
                w-11
                h-11
                rounded-full
                object-cover
              "
            />

            <div>
              <h3 className="text-sm font-semibold">
                Bishir
              </h3>

              <p className="text-xs text-zinc-400">
                Administrator
              </p>
            </div>
          </div>

          <button
            className="
              p-2
              rounded-lg
              hover:bg-white/10
              transition
            "
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;