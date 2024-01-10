import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ActionError from "../entities/ActionError";
import ConfirmData from "../entities/ConfirmData";
import { confirm_reset_password } from "../state/slices/authSlice";
import { AppDispatch } from "../state/store";

const ResetPasswordConfirmForm = () => {
  const [requestConfirmSent, setRequestConfirmSent] = useState(false);
  const [errorReset, setErrorReset] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const routeParams = useParams();
  // console.log(routeParams)

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors },
  } = useForm<ConfirmData>();

  const new_password = watch("new_password");
  const re_new_password = watch("re_new_password");

  const onSubmit = async (data: ConfirmData) => {
    if (new_password !== re_new_password) {
      setError("new_password", {
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

    data.uid = routeParams.uid!;
    data.token = routeParams.token!;
    // console.log("Form fields:", data);
    try {
      setLoading(true);
      const action = await dispatch(confirm_reset_password(data));
      if (confirm_reset_password.fulfilled.match(action)) {
        toast({
          title: "Reset password",
          description: "Password successfully reset.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setRequestConfirmSent(true);
      } else if (confirm_reset_password.rejected.match(action)) {
        const errorPayload: ActionError = action?.payload as ActionError;
        if (errorPayload) {
          let errorMessage = "";
          if (errorPayload.uid) {
            errorMessage += "Invalid user ID. ";
          }
          if (errorPayload.token) {
            errorMessage += "Invalid token. ";
          }
          if (errorPayload.detail) {
            errorMessage += errorPayload.detail;
          }
          toast({
            title: "Password Reset Failed",
            description: errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    } catch (error) {
      setErrorReset("An error occured.");
    } finally {
      setLoading(false);
    }
  };

  // if (errorReset) {
  //   toast({
  //     title: "Password Reset Failed",
  //     description: errorReset,
  //     status: "error",
  //     duration: 3000,
  //     isClosable: true,
  //     position: "top-right"
  //   });
  // }

  if (requestConfirmSent) {
    navigate("/");
  }

  return (
    <>
      <Box p={4} my={8} textAlign="center">
        {errorReset && (
          <Alert mb="15px" mt="10px" status="error">
            <AlertIcon />
            <AlertTitle></AlertTitle>
            <AlertDescription>{errorReset}</AlertDescription>
          </Alert>
        )}
        <Box>
          <Heading as="h2">Password Reset</Heading>
          <Box mb="4px">Enter your new password</Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input
              type="password"
              focusBorderColor="teal.500"
              placeholder="Enter your password"
              minLength={6}
              // value={password}
              // onChange={onChange}
              {...register("new_password", {
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
              {errors.new_password && errors.new_password.message}
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
              {...register("re_new_password", {
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
              {errors.re_new_password && errors.re_new_password.message}
            </FormErrorMessage>
          </FormControl>

          <Button width="full" mt={4} type="submit" disabled={loading}>
            {loading ? <Spinner /> : ""} Confirm
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ResetPasswordConfirmForm;
