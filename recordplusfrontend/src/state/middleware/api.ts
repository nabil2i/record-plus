// import axios, { AxiosError } from "axios";
// import * as actions from "../slices/apiSlice";

// const api = ({ dispatch }) => next => async action => {
//   if (action.type !== actions.apiCallBegan.type) return next(action);
  
//   const { url, method, data, onStart, onSuccess, onError } = action.payload;

//   if (onStart) dispatch({ type: onStart });

//   next(action);

//   try {
//     const response = await axios.request({
//       baseURL: "http:localhost:8000/",
//       url,
//       method,
//       data
//     });
//     dispatch(actions.apiCallSuccess(response.data));
//     if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
//   } catch (error) {
//       const axiosError = error as AxiosError;
//       dispatch(actions.apiCallFailed(axiosError.message));
//       if (onError) dispatch( { type: onError, payload: error.message})
// }
// }

// export default api;
