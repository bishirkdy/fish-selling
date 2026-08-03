import {
  ChartNoAxesGanttIcon,
  ShoppingCart,
  User,
  Search,
  Heart,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/features/cartSlice";
import { clearFavorite } from "../redux/features/favoriteSlice";
import { logout } from "../redux/features/authSlice";
import { useGetCurrentUser } from "../tanstack/hooks/queries/auth/authQueries";
import { useLogout } from "../tanstack/hooks/mutations/auth/authMutations";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { mutate: logoutMutation } = useLogout();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { cart: cartFromSlice, grandTotal } = useSelector((s) => s.cart);
  const favFromSlice = useSelector((s) => s.favorite.favorite);
  const { data: loggedUser } = useGetCurrentUser();
  const client = useQueryClient();
  function handleSearch(e) {
    navigate(`/shop?q=${search}`);
    setOpen(false);
  }
  function cartPopupHandler() {
    setCartOpen((p) => !p);
  }
  function favPopupHandler() {
    navigate(`/favorite/${user?.id}`);
  }
  
  function handleLogout() {
    logoutMutation(undefined, {
      onSuccess: () => {
        dispatch(logout());
        client.clear();
        navigate("/");
        setProfileOpen(false);
        dispatch(clearCart());
        dispatch(clearFavorite());
        setOpen(false);
      },
    });
  }

  return (
    <div>
      <nav className="fixed w-full px-8 md:px-16 top-0 left-0 text-white flex z-50 items-center justify-between py-4  backdrop-blur-md">
        <h1 className="text-2xl font-bold">Aquora</h1>

        <div className="hidden md:flex items-center gap-6">
          <ul className="hidden md:flex gap-8">
            <li>
              <Link to="/" className="cursor-pointer hover:text-gray-300">
                Home
              </Link>
            </li>{" "}
            <li>
              <Link to="/shop" className="cursor-pointer hover:text-gray-300">
                Explore
              </Link>
            </li>{" "}
            {loggedUser && (
              <li>
                <Link
                  to={`/orders/${user?.id}`}
                  className="cursor-pointer hover:text-gray-300"
                >
                  Orders
                </Link>
              </li>
            )}
          </ul>
          <div className="relative">
            <input
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              className="px-3 py-2 w-[30vw] rounded-md bg-white/10 border border-white/20 outline-none text-sm"
            />
            <Search className="absolute right-2 top-2 w-4 h-4 text-gray-300" />
          </div>
          {loggedUser && (
            <>
              <div
                onClick={cartPopupHandler}
                className="relative cursor-pointer"
              >
                <ShoppingCart />
                {cartFromSlice.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                    {cartFromSlice.length}
                  </span>
                )}
              </div>

              <div
                onClick={favPopupHandler}
                className="relative cursor-pointer"
              >
                <Heart />
                {favFromSlice.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                    {favFromSlice.length}
                  </span>
                )}
              </div>
            </>
          )}

          <div className="cursor-pointer">
            {loggedUser ? (
              <User onClick={() => setProfileOpen(true)} />
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-transparent hover:border hover:border-(--color-accent) transition duration-300 ease-in-out bg-(--color-accent)"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          <ChartNoAxesGanttIcon />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-999 md:hidden">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="absolute top-0 right-0 h-full w-[80%] max-w-[320px] bg-(--color-background) border-r border-zinc-800 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-white">Aquora</h1>
              <button
                onClick={() => setOpen(false)}
                className="text-white text-2xl"
              >
                <X />
              </button>
            </div>
            {loggedUser && (
              <div className="flex items-center gap-3 bg-(--color-surface) p-4 rounded-2xl mb-4">
                <div className="w-12 h-12 rounded-full bg-(--color-accent) flex items-center justify-center text-xl font-bold">
                  {loggedUser?.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h2 className="text-white font-semibold">
                    {loggedUser?.name}
                  </h2>
                  <p className="text-zinc-400 text-sm">{loggedUser?.email}</p>
                </div>
              </div>
            )}
            <div className="relative mb-4">
              <input
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search fish..."
                className="w-full px-4 py-3 rounded-xl bg-(--color-surface) border border-zinc-800 outline-none text-white"
              />
              <Search className="absolute right-4 top-3.5 w-5 h-5 text-zinc-400" />
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="bg-(--color-surface) px-4 py-3 rounded-xl transition text-zinc-400"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="bg-(--color-surface) px-4 py-3 rounded-xl transition text-zinc-400"
              >
                Explore
              </Link>
              {loggedUser && (
                <Link
                  to={`/orders/${user?.id}`}
                  onClick={() => setOpen(false)}
                  className="bg-(--color-surface) px-4 py-3 rounded-xl transition text-zinc-400"
                >
                  Orders
                </Link>
              )}

              {/* <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="bg-(--color-surface) px-4 py-3 rounded-xl transition text-zinc-400"
              >
                Contact
              </Link> */}
            </div>
            {loggedUser ? (
              <div className="mt-8 flex items-center gap-6 px-2">
                <div
                  onClick={() => {
                    cartPopupHandler();
                    setOpen(false);
                  }}
                  className="relative cursor-pointer"
                >
                  <ShoppingCart className="text-white" />
                  {cartFromSlice.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                      {cartFromSlice.length}
                    </span>
                  )}
                </div>
                <div
                  onClick={() => {
                    favPopupHandler();
                    setOpen(false);
                  }}
                  className="relative cursor-pointer"
                >
                  <Heart className="text-white" />

                  {favFromSlice.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-1 rounded-full">
                      {favFromSlice.length}
                    </span>
                  )}
                </div>
                <div
                  onClick={() => {
                    if (loggedUser) {
                      setProfileOpen(true);
                    } else {
                      navigate("/login");
                    }
                    setOpen(false);
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
                  className="text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-transparent hover:border hover:border-(--color-accent) transition duration-300 ease-in-out bg-(--color-accent)"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="text-sm px-4 py-2 rounded-lg cursor-pointer hover:bg-transparent hover:border hover:border-(--color-accent) transition duration-300 ease-in-out bg-(--color-accent)"
                >
                  Register
                </button>
              </div>
            )}

            {loggedUser && (
              <div className="flex items-start mt-4 text-white w-full gap-2">
                {loggedUser && loggedUser?.role === "Admin" && (
                  <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="mt-auto bg-(--color-accent) hover:bg-red-600 transition py-3 px-4 rounded-xl font-semibold"
                  >
                    Switch to Admin
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="mt-auto bg-(--color-accent) hover:bg-red-600 transition py-3 px-4 rounded-xl font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {cartOpen && (
        <div className="fixed inset-0 z-9999 flex justify-end">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setCartOpen(false)}
          />

          <div className="bg-(--color-surface) shadow-lg p-4 z-50">
            <Cart
              closeCart={() => setCartOpen(false)}
              cart={cartFromSlice}
              grandTotal={grandTotal}
              user={loggedUser?.id}
            />
          </div>
        </div>
      )}
      {profileOpen && (
        <div
          className="fixed inset-0 z-9999 bg-black/40 backdrop-blur-sm flex justify-end"
          onClick={() => setProfileOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[320px] h-full bg-zinc-950 border-l border-zinc-800 shadow-2xl p-6 flex flex-col animate-[slideIn_.3s_ease]"
          >
            <div className="flex items-center gap-4 border-b border-zinc-800 pb-5">
              <div className="w-14 h-14 rounded-full bg-(--color-accent) flex items-center justify-center text-2xl font-bold text-white">
                {loggedUser?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <h2 className="text-white text-lg font-semibold">
                  {loggedUser?.name}
                </h2>

                <p className="text-gray-400 text-sm">{loggedUser?.email}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate(`/profile/${loggedUser?.id}`);
                  setProfileOpen(false);
                }}
                className=" w-full text-left px-4 py-3 rounded-xl cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition text-white"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate(`/orders/${loggedUser?.id}`);
                  setProfileOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition text-white"
              >
                Orders
              </button>
              <button
                onClick={() => {
                  navigate(`/favorite/${loggedUser?.id}`);
                  setProfileOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition text-white"
              >
                Favorites
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-800 space-y-2">
              {loggedUser?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="w-full hover:bg-(--color-accent) bg-transparent border border-(--color-accent) cursor-pointer text-white py-3 rounded-xl font-semibold transition"
                >
                  Switch To Admin
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full bg-(--color-accent) hover:bg-transparent hover:border hover:border-(--color-accent) cursor-pointer text-white py-3 rounded-xl font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
