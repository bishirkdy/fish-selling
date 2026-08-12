import {
  Search,
  ShoppingCart,
  Heart,
  User,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

const MobileMenu = ({
  loggedUser,
  search,
  setSearch,
  handleSearch,
  totalItems,
  totalFavorites,
  onCartClick,
  onFavoriteClick,
  onProfileClick,
  onClose,
  navigate,
  handleLogout,
}) => {
  return (
    <div className="fixed inset-0 z-50 md:hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-(--color-background) text-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">

          <button
            onClick={() => {
              navigate("/");
              onClose();
            }}
            className="text-2xl font-bold text-(--color-accent)"
          >
            Aquora
          </button>

          <button
            onClick={onClose}
            className="cursor-pointer"
          >
            <X />
          </button>

        </div>


        <div className="p-5 space-y-6 overflow-y-auto h-[calc(100%-80px)]">

          {/* Search */}
          <div className="relative">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 pr-10 rounded-xl bg-white/10 border border-white/20 outline-none text-sm"
            />

            <Search
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-300"
            />

          </div>


          {/* Navigation */}
          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={onClose}
              className="py-3 border-b border-white/10 hover:text-gray-300"
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={onClose}
              className="py-3 border-b border-white/10 hover:text-gray-300"
            >
              Explore
            </Link>

            {loggedUser && (
              <Link
                to={`/orders/${loggedUser.id}`}
                onClick={onClose}
                className="py-3 border-b border-white/10 hover:text-gray-300"
              >
                Orders
              </Link>
            )}

          </div>


          {/* User Actions */}
          {loggedUser && (
            <div className="space-y-3">

              {/* Cart */}
              <button
                onClick={() => {
                  onCartClick();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"
              >

                <div className="flex items-center gap-3">
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                </div>

                {totalItems > 0 && (
                  <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}

              </button>


              {/* Favorites */}
              <button
                onClick={() => {
                  onFavoriteClick();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"
              >

                <div className="flex items-center gap-3">
                  <Heart size={20} />
                  <span>Favorites</span>
                </div>

                {totalFavorites > 0 && (
                  <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
                    {totalFavorites}
                  </span>
                )}

              </button>


              {/* Profile */}
              <button
                onClick={() => {
                  onProfileClick();
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                <User size={20} />
                <span>Profile</span>
              </button>

            </div>
          )}


          {/* Login / Logout */}
          <div className="pt-4">

            {loggedUser ? (
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-(--color-accent) font-semibold cursor-pointer"
              >
                Login
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default MobileMenu;