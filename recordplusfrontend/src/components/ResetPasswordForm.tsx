import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionError from "../entities/ActionError";
import ResetPasswordData from "../entities/ResetPasswordData";
import { reset_password } from "../state/slices/authSlice";
import { AppDispatch } from "../state/store";

const ResetPasswordForm = () => {
  const [requestSent, setRequestSent] = useState(false);
  const [errorRequest, setErrorRequest] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  const onSubmit = async (data: ResetPasswordData) => {
    // console.log("Form fields:", data);
    try {
      setLoading(true);
      const action = await dispatch(reset_password(data));
      // console.log(action);
      if (reset_password.fulfilled.match(action)) {
        toast({
          title: "Reset password",
          description: "We've sent you an email.",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        setRequestSent(true);
      } else if (reset_password.rejected.match(action)) {
        const errorPayload: ActionError = action?.payload as ActionError;
        if (errorPayload) {
          let errorMessage = "";
          if (errorPayload.email) {
            errorMessage += "Invalid user email. ";
          }
          if (errorPayload.detail) {
            errorMessage += errorPayload.detail;
          }
          toast({
            title: "Reset password",
            description: errorMessage || "An error occurred. Please try later",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    } catch (error) {
      setErrorRequest("An error occcured.");
    } finally {
      setLoading(false);
    }
  };

  if (requestSent) {
    navigate("/");
  }

  return (
    <>
      <Box p={4} my={8} textAlign="center">
        {errorRequest && (
          <Alert mb="15px" mt="10px" status="error">
            <AlertIcon />
            <AlertTitle></AlertTitle>
            <AlertDescription>{errorRequest}</AlertDescription>
          </Alert>
        )}
        <Box>
          <Heading as="h2">Request Password Reset</Heading>
          <Box mb="4px">Enter the email you used to create an account</Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            {/* <FormLabel htmlFor="email">Email</FormLabel> */}
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

          <Button width="full" mt={4} type="submit" disabled={loading}>
            {loading ? <Spinner /> : ""} Reset Password
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ResetPasswordForm;
