import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import GoogleAuthData from "../entities/GoogleAuthData";
import {
  facebookAuthFail,
  facebookAuthenticate,
} from "../state/slices/authSlice";
import { AppDispatch } from "../state/store";
import HomePage from "../pages/HomePage";

const Facebook = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = Array.isArray(values.state) ? values.state[0] : values.state;
    const code = Array.isArray(values.code) ? values.code[0] : values.code;
    const data: GoogleAuthData = {
      state,
      code,
    };

    console.log("State: ", state);
    console.log("Code: ", code);

    if (state && code) {
      dispatch(facebookAuthenticate(data));
    } else {
      dispatch(facebookAuthFail());
    }
  }, [dispatch, location]);

  return (
    <>
      <HomePage />
    </>
  );
};

export default Facebook;
