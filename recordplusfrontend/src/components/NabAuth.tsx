import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../state/slices/authSlice";
import { AppDispatch, RootState } from "../state/store";

const VARIANT_COLOR = "teal";

const NavAuth = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  // const [ redirect, setRedirect ] = useState(false);

  // const logout_user = () => {
  //   dispatch(logout());
  //   setRedirect(true);
  // }

  // if (redirect) navigate('/login');

  if (!auth.access)
    return (
      <>
        <HStack>
          <NavLink to="/login">
            <Button
              fontSize={"sm"}
              variant={"link"}
              colorScheme={VARIANT_COLOR}
              _hover={{
                textDecoration: "underline",
              }}
            >
              Log in
            </Button>
          </NavLink>

          <NavLink to="/signup">
            <Button
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize={"sm"}
              colorScheme={VARIANT_COLOR}
            >
              Sign up
            </Button>
          </NavLink>
        </HStack>
      </>
    );

  return (
    <>
      <Flex align="center" justify="space-between" gap={2}>
        <Box fontWeight={400} color={"green.500"}>
          {auth?.user?.username}
        </Box>
        <Box
          as="a"
          color="red"
          onClick={() => {
            dispatch(logout());
            navigate("login");
          }}
          _hover={{ cursor: "pointer", color: "red.200" }}
        >
          Logout
        </Box>
      </Flex>
    </>
  );
};

export default NavAuth;
