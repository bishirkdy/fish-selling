import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";

import { addToCart } from "./redux/features/cartSlice";
import { addToFavorite } from "./redux/features/favoriteSlice";

import { useGetCurrentUser } from "./tanstack/hooks/queries/auth/authQueries";
import { useGetAllCartDataOfUser } from "./tanstack/hooks/queries/cart/cartQueries";
import { useFavDataOfUser } from "./tanstack/hooks/queries/favorite/favoriteQueries";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  const {
    data: currentUser,
    isSuccess,
    isError,
  } = useGetCurrentUser();


useEffect(() => {
  if (currentUser?.isBlocked) {
    navigate("/login", { replace: true });
  }
}, [currentUser, navigate]);

  // Cart
  const { data: cartData } = useGetAllCartDataOfUser({
    enabled: !!currentUser && !currentUser.isBlocked,
  });

  // Favorites
  const { data: favData } = useFavDataOfUser({
    enabled: !!currentUser && !currentUser.isBlocked,
  });

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
    <>
      {!isAdmin && <Navbar />}
      <Outlet />
    </>
  );
};

export default App;