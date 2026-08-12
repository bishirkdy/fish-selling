import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import DesktopNavbar from "./DesktopNavbar";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import Cart from "../../pages/user/cart/Cart";

import { useGetCurrentUser } from "../../tanstack/hooks/queries/auth/authQueries";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  // User from API
  const { data: loggedUser } = useGetCurrentUser();

  // Cart from Redux
  const cart = useSelector((state) => state.cart.cart);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const grandTotal = useSelector((state) => state.cart.grandTotal);

  // Favorite from Redux
  const totalFavorites = useSelector(
    (state) => state.favorite.totalFavorites
  );

  const handleSearch = () => {
    const value = search.trim();

    if (!value) return;

    navigate(`/shop?search=${encodeURIComponent(value)}`);

    setSearch("");
    setOpen(false);
  };

  const cartPopupHandler = () => {
    if (!loggedUser) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    setCartOpen(true);
  };

  const favPopupHandler = () => {
    if (!loggedUser) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // Your existing route
    navigate(`/favorite/${loggedUser.id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    queryClient.removeQueries({
      queryKey: ["currentUser"],
    });

    setProfileOpen(false);
    setOpen(false);

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-(--color-background) text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-(--color-accent) cursor-pointer"
            >
              Aquora
            </button>

            {/* Desktop */}
            <DesktopNavbar
              loggedUser={loggedUser}
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              totalItems={totalItems}
              totalFavorites={totalFavorites}
              onCartClick={cartPopupHandler}
              onFavoriteClick={favPopupHandler}
              onProfileClick={() => setProfileOpen(true)}
              navigate={navigate}
            />

            {/* Mobile */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-white text-2xl cursor-pointer"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <MobileMenu
          loggedUser={loggedUser}
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          totalItems={totalItems}
          totalFavorites={totalFavorites}
          onCartClick={cartPopupHandler}
          onFavoriteClick={favPopupHandler}
          onProfileClick={() => setProfileOpen(true)}
          onClose={() => setOpen(false)}
          navigate={navigate}
          handleLogout={handleLogout}
        />
      )}

      {/* Profile */}
      {profileOpen && loggedUser && (
        <ProfileMenu
          loggedUser={loggedUser}
          navigate={navigate}
          onClose={() => setProfileOpen(false)}
          handleLogout={handleLogout}
        />
      )}

      {/* Cart */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <Cart
            closeCart={() => setCartOpen(false)}
            cart={cart}
            grandTotal={grandTotal}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;