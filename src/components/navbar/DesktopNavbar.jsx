import {
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

const DesktopNavbar = ({
  loggedUser,
  search,
  setSearch,
  handleSearch,
  totalItems,
  totalFavorites,
  onCartClick,
  onFavoriteClick,
  onProfileClick,
  navigate,
}) => {
  return (
    <div className="hidden md:flex items-center gap-6">

      {/* Navigation */}
      <ul className="flex gap-8">

        <li>
          <Link
            to="/"
            className="cursor-pointer hover:text-gray-300"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/shop"
            className="cursor-pointer hover:text-gray-300"
          >
            Explore
          </Link>
        </li>

        {loggedUser && (
          <li>
            <Link
              to={`/orders/${loggedUser.id}`}
              className="cursor-pointer hover:text-gray-300"
            >
              Orders
            </Link>
          </li>
        )}

      </ul>

      {/* Search */}
      <div className="relative">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSearch()
          }
          type="text"
          placeholder="Search..."
          className="px-3 py-2 w-[30vw] rounded-md bg-white/10 border border-white/20 outline-none text-sm"
        />

        <Search
          className="absolute right-2 top-2 w-4 h-4 text-gray-300"
        />

      </div>

      {/* User Actions */}
      {loggedUser && (
        <>

          {/* Cart */}
          <div
            onClick={onCartClick}
            className="relative cursor-pointer"
          >
            <ShoppingCart />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          {/* Favorites */}
          <div
            onClick={onFavoriteClick}
            className="relative cursor-pointer"
          >
            <Heart />

            {totalFavorites > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                {totalFavorites}
              </span>
            )}
          </div>

        </>
      )}

      {/* Profile / Login */}
      <div className="cursor-pointer">

        {loggedUser ? (
          <User onClick={onProfileClick} />
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm px-4 py-2 rounded-lg cursor-pointer bg-(--color-accent) hover:bg-transparent hover:border hover:border-(--color-accent)"
          >
            Login
          </button>
        )}

      </div>

    </div>
  );
};

export default DesktopNavbar;