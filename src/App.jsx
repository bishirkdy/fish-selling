import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";

import { login, logout, setLoading } from "./redux/features/authSlice";
import { addToCart } from "./redux/features/cartSlice";
import { addToFavorite } from "./redux/features/favoriteSlice";
import { useGetCurrentUser } from "./tanstack/hooks/queries/auth/authQueries";
import { useGetAllCartDataOfUser } from "./tanstack/hooks/queries/cart/cartQueries";
import { useFavDataOfUser } from "./tanstack/hooks/queries/favorite/favoriteQueries";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  // Restore logged-in user
  const {
    data: currentUser,
    isLoading: userLoading,
    isSuccess,
    isError,
  } = useGetCurrentUser();

  // Load cart only after user is restored
  const { data: cartData } = useGetAllCartDataOfUser({
    enabled: !!currentUser,
  });

  // Load favourites only after user is restored
  const { data: favData } = useFavDataOfUser({
    enabled: !!currentUser,
  });

  // Restore user
  useEffect(() => {

    if (isSuccess && currentUser) {
      dispatch(login(currentUser));
    }

    if (isError) {
      dispatch(logout());
    }

    dispatch(setLoading(userLoading));
  }, [currentUser, userLoading, isSuccess, isError, dispatch]);

  // Store cart in Redux
  useEffect(() => {
    if (cartData) {
      dispatch(addToCart(cartData));
    }
  }, [cartData, dispatch]);

  // Store favourites in Redux
  useEffect(() => {
    if (favData) {
      dispatch(addToFavorite(favData));
    }
  }, [favData, dispatch]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <Outlet />
    </>
  );
};

export default App;