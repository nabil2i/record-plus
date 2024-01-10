import { Box, Button, Heading, Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ActionError from "../entities/ActionError";
import ConfirmData from "../entities/ConfirmData";
import { verify } from "../state/slices/authSlice";
import { AppDispatch } from "../state/store";

const Activate = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [errorActivate, setErrorActivate] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const routeParams = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const data: ConfirmData = {
    uid: routeParams.uid!,
    token: routeParams.token!,
  };

  const verify_account = async (data: ConfirmData) => {
    // console.log(data)
    try {
      setLoading(true);
      const action = await dispatch(verify(data));
      // console.log(action);
      if (verify.fulfilled.match(action)) {
        toast({
          title: "Activation successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setIsVerified(true);
      } else if (verify.rejected.match(action)) {
        const errorPayload: ActionError = action?.payload as ActionError;
        if (errorPayload) {
          let errorMessage = "";
          if (errorPayload.token) {
            errorMessage += errorPayload.token[0];
          }
          if (errorPayload.detail) {
            errorMessage += errorPayload.detail[0];
          }

          toast({
            title: "Activation failed",
            description: errorMessage || "Activation link invalid",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    } catch (error) {
      setErrorActivate("An error occured");
    } finally {
      setLoading(false);
    }
  };

  if (errorActivate) {
    toast({
      title: "Activation failed",
      description: errorActivate,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  if (isVerified) {
    navigate("/");
  }

  return (
    <>
      <Box p={4} my={8} textAlign="center">
        {/* {errorActivate && (
          <Alert mb="15px" mt="10px" status="error">
            <AlertIcon />
            <AlertTitle></AlertTitle>
            <AlertDescription>{errorActivate}</AlertDescription>
          </Alert>
        )} */}
        <Box>
          <Heading as="h2">Verify your account</Heading>
          <Box>
            Click the button to verify your account
            <Button
              disabled={loading}
              width="full"
              mt={4}
              onClick={() => verify_account(data)}
              type="button"
              color={"green"}
            >
              {loading ? <Spinner /> : ""} Verify
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Activate;
