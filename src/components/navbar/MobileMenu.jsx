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
  cart,
  favorites,
  onCartClick,
  onFavoriteClick,
  onProfileClick,
  onClose,
  navigate,
  handleLogout,
}) => {
  return (
    <div className="fixed inset-0 z-999 md:hidden">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Menu */}
      <div className="absolute top-0 right-0 h-full w-[80%] max-w-[320px] bg-(--color-background) border-r border-zinc-800 p-6 flex flex-col">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">
            Aquora
          </h1>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            <X />
          </button>
        </div>

        {/* User */}
        {loggedUser && (
          <div className="flex items-center gap-3 bg-(--color-surface) p-4 rounded-2xl mb-4">
            <div className="w-12 h-12 rounded-full bg-(--color-accent) flex items-center justify-center text-xl font-bold">
              {loggedUser.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h2 className="text-white font-semibold">
                {loggedUser.name}
              </h2>

              <p className="text-zinc-400 text-sm">
                {loggedUser.email}
              </p>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSearch()
            }
            type="text"
            placeholder="Search fish..."
            className="w-full px-4 py-3 rounded-xl bg-(--color-surface) border border-zinc-800 outline-none text-white"
          />

          <Search className="absolute right-4 top-3.5 w-5 h-5 text-zinc-400" />
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">

          <Link
            to="/"
            onClick={onClose}
            className="bg-(--color-surface) px-4 py-3 rounded-xl text-zinc-400"
          >
            Home
          </Link>

          <Link
            to="/shop"
            onClick={onClose}
            className="bg-(--color-surface) px-4 py-3 rounded-xl text-zinc-400"
          >
            Explore
          </Link>

          {loggedUser && (
            <Link
              to={`/orders/${loggedUser.id}`}
              onClick={onClose}
              className="bg-(--color-surface) px-4 py-3 rounded-xl text-zinc-400"
            >
              Orders
            </Link>
          )}

        </div>

        {/* Icons */}
        {loggedUser ? (
          <div className="mt-8 flex items-center gap-6 px-2">

            <div
              onClick={() => {
                onCartClick();
                onClose();
              }}
              className="relative cursor-pointer"
            >
              <ShoppingCart className="text-white" />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

            <div
              onClick={() => {
                onFavoriteClick();
                onClose();
              }}
              className="relative cursor-pointer"
            >
              <Heart className="text-white" />

              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                  {favorites.length}
                </span>
              )}
            </div>

            <div
              onClick={() => {
                onProfileClick();
                onClose();
              }}
              className="cursor-pointer"
            >
              <User className="text-white" />
            </div>

          </div>
        ) : (
          <div className="flex items-center mt-4 text-white w-full gap-2">

            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 rounded-lg bg-(--color-accent)"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="text-sm px-4 py-2 rounded-lg bg-(--color-accent)"
            >
              Register
            </button>

          </div>
        )}

        {/* Admin + Logout */}
        {loggedUser && (
          <div className="flex flex-col mt-auto gap-2">

            {loggedUser.role === "Admin" && (
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="bg-(--color-accent) py-3 px-4 rounded-xl font-semibold"
              >
                Switch to Admin
              </button>
            )}

            <button
              onClick={handleLogout}
              className="bg-(--color-accent) py-3 px-4 rounded-xl font-semibold"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default MobileMenu;