import React, { useEffect } from "react";
import { data, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/features/cartSlice";
import { useGetAllCartDataOfUser } from "./tanstack/hooks/queries/cartQueries";
import { addToFavorite } from "./redux/features/favoriteSlice";
import { useFavDataOfUser } from "./tanstack/hooks/queries/favoriteQueries";

const App = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { data: cartData } = useGetAllCartDataOfUser(user?.id);
  const { data: favData } = useFavDataOfUser(user?.id);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (cartData) {
      dispatch(addToCart(cartData));
    }
  }, [cartData, dispatch]);

  useEffect(() => {
    if (favData) {
      dispatch(addToFavorite(favData));
    }
  }, [favData, dispatch]);
  return (
    <div>
      {!isAdmin && <Navbar />}
      <Outlet />
    </div>
  );
};

export default App;
