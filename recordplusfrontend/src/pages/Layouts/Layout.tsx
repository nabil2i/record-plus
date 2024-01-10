import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
// import AuthProvider from "../../Providers/AuthProvider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "../../components/NavBar";
import { checkAuthenticated, load_user } from "../../state/slices/authSlice";
import { AppDispatch } from "../../state/store";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthenticated());
    dispatch(load_user());
  }, [dispatch]);

  return (
    <>
      {/* <AuthProvider>
      </AuthProvider> */}
      <NavBar />
      <Box padding={5} marginTop={12}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
