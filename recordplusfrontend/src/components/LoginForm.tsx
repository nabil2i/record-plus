import { LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import ActionError from "../entities/ActionError";
import LoginData from "../entities/LoginData";
import {
  googleSocialAuth,
  login,
  requestFacebookSocialAuth,
} from "../state/slices/authSlice";
import { AppDispatch, RootState } from "../state/store";

const LoginForm = () => {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    // console.log("Form fields:", data);
    try {
      setLoading(true);
      const action = await dispatch(login(data));
      if (login.fulfilled.match(action))
        toast({
          title: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
          icon: <LockIcon />,
        });
      else if (login.rejected.match(action)) {
        const errorPayload: ActionError = action?.payload as ActionError;
        if (errorPayload) {
          let errorMessage = "";
          if (errorPayload.detail) {
            errorMessage += errorPayload.detail;
          }
          toast({
            title: "Login failed",
            description: errorMessage || "An error occured.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    } catch (error) {
      setErrorLogin("An error occured");
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = async () => {
    try {
      const page = "login";
      await dispatch(googleSocialAuth(page));
    } catch (error) {
      setErrorLogin("An error occured");
    }
  };

  const continueWithFacebook = async () => {
    try {
      await dispatch(requestFacebookSocialAuth());
    } catch (error) {
      setErrorLogin("An error occured");
    }
  };

  if (errorLogin) {
    toast({
      title: "Login failed",
      description: errorLogin,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <>
      <Box p={4} my={8} textAlign="center">
        {/* {errorLogin && (
          <Alert mb="15px" mt="10px" status="error">
            <AlertIcon />
            <AlertTitle></AlertTitle>
            <AlertDescription>{errorLogin}</AlertDescription>
          </Alert>
        )} */}
        <Center>
          <Heading as="h2">Log in</Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              focusBorderColor="teal.500"
              placeholder="Enter your email"
              // value={email}
              // onChange={onChange}
              {...register("email", {
                required: "Email is required",
                minLength: {
                  value: 5,
                  message: "Email must be at least 5 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Email must be at most 20 characters.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input
              type="password"
              focusBorderColor="teal.500"
              placeholder="Enter your password"
              minLength={6}
              // value={password}
              // onChange={onChange}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be at most 255 characters.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button width="full" mt={4} type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Log in"}
          </Button>
        </form>

        <Button
          width="full"
          mt={4}
          type="submit"
          colorScheme="red"
          onClick={continueWithGoogle}
        >
          Continue with Google
        </Button>
        <Button
          width="full"
          mt={4}
          type="submit"
          colorScheme="blue"
          onClick={continueWithFacebook}
        >
          Continue with Facebook
        </Button>

        <VStack mt={4}>
          <Box>
            {/* <Checkbox border={1} colorScheme={VARIANT_COLOR} borderColor="teal">
              Remember me
            </Checkbox> */}
          </Box>
          <Box>
            Don't have an account?
            <Link as={NavLink} to="/signup" color="blue">
              {" "}
              Sign Up
            </Link>
          </Box>
          <Box mt="3px">
            Forgot your password?{" "}
            <Link to="/reset-password" as={NavLink} color="blue">
              {" "}
              Reset Password
            </Link>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default LoginForm;
