import {
  Box,
  Button,
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
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import ActionError from "../entities/ActionError";
import LoginData from "../entities/LoginData";
import {
  googleSocialAuth,
  requestFacebookSocialAuth,
  sign_up,
} from "../state/slices/authSlice";
import { AppDispatch } from "../state/store";

const SignUpForm = () => {
  const [accountCreated, setAccountCreated] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState("");
  const toast = useToast();
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );

  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
  } = useForm<LoginData>();

  const password = watch("password");
  const re_password = watch("re_password");

  const onSubmit = async (data: LoginData) => {
    // console.log("Form fields:", data);
    if (password !== re_password) {
      setError("re_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      toast({
        title: "Password Mismatch",
        description: "Please make sure the passwords match.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      setLoading(true);
      const action = await dispatch(sign_up(data));
      if (sign_up.fulfilled.match(action)) {
        toast({
          title: "Account created successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setAccountCreated(true);
      } else if (sign_up.rejected.match(action)) {
        const errorPayload: ActionError = action?.payload as ActionError;
        if (errorPayload) {
          let errorMessage = "";
          if (errorPayload.detail) {
            errorMessage += errorPayload.detail;
          }
          if (errorPayload.email) {
            errorMessage += errorPayload.email;
          }
          if (errorPayload.username) {
            errorMessage += errorPayload.username;
          }

          toast({
            title: "Account creation failed",
            description: errorMessage || "An error occurred. Please try later",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    } catch (error) {
      setErrorSignUp("An error occured.");
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = async () => {
    try {
      const page = "signup";
      await dispatch(googleSocialAuth(page));
    } catch (error) {
      //
    }
  };

  const continueWithFacebook = async () => {
    try {
      await dispatch(requestFacebookSocialAuth());
    } catch (error) {
      //
    }
  };

  if (errorSignUp) {
    toast({
      title: "Sign Up failed",
      description: errorSignUp,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  // if (isAuthenticated) {
  //   navigate("/");
  // }

  if (accountCreated) {
    navigate("/login");
  }

  return (
    <>
      <Box p={4} my={8} textAlign="center">
        {/* {errorSignUp && (
          <Alert mb="15px" mt="10px" status="error">
            <AlertIcon />
            <AlertTitle></AlertTitle>
            <AlertDescription>
              {errorSignUp}
            </AlertDescription>
          </Alert>
        )} */}
        <Box>
          <Heading as="h2">Sign Up</Heading>
          <Box mb="4px">Create a new account</Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              focusBorderColor="teal.500"
              placeholder="Enter your username"
              // value={username}
              // onChange={onChange}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be at most 20 characters.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
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
            <FormLabel htmlFor="username">First Name</FormLabel>
            <Input
              type="text"
              focusBorderColor="teal.500"
              placeholder="Enter your first name"
              // value={username}
              // onChange={onChange}
              {...register("first_name", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "First name must be at least 2 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "First name must be at most 20 characters.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.first_name && errors.first_name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Last Name</FormLabel>
            <Input
              type="text"
              focusBorderColor="teal.500"
              placeholder="Enter your last name"
              // value={username}
              // onChange={onChange}
              {...register("last_name", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Last name must be at least 2 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Last name must be at most 20 characters.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.last_name && errors.last_name.message}
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
          <FormControl isRequired>
            <FormLabel htmlFor="email">Confirm Password</FormLabel>
            <Input
              type="password"
              focusBorderColor="teal.500"
              placeholder="Confirm your password"
              minLength={6}
              // value={password}
              // onChange={onChange}
              {...register("re_password", {
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
              {errors.re_password && errors.re_password.message}
            </FormErrorMessage>
          </FormControl>

          <Button width="full" mt={4} type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Sign up"}
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
            Already have an account?
            <Link as={NavLink} to="/login" color="blue">
              {" "}
              Log in
            </Link>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default SignUpForm;
