import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import {
  googleAuthFail,
  googleAuthSuccess,
  load_user,
} from "../state/slices/authSlice";
import { AppDispatch } from "../state/store";

const Google = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    if (values.access && values.refresh) {
      dispatch(googleAuthSuccess(values));
      const action = dispatch(load_user());
      if (load_user.fulfilled.match(action)) {
        // console.log("loading user")
        navigate("/");
      }
    } else {
      dispatch(googleAuthFail());
    }

    // const state = Array.isArray(values.state) ? values.state[0] : values.state;
    // const code = Array.isArray(values.code) ? values.code[0] : values.code;
    // const data: GoogleAuthData = {
    //   state,
    //   code
    // }

    // console.log('State: ', state);
    // console.log('Code: ', code);

    // if (state && code) {
    //   dispatch(googleAuthenticate(data))
    // }
  }, [dispatch, location, navigate]);

  return (
    <>
      <HomePage />
    </>
  );
};

export default Google;
