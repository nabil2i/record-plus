import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import ConfirmData from "../../entities/ConfirmData";
import GoogleAuthData from "../../entities/GoogleAuthData";
import JWT from "../../entities/JWT";
import LoginData from "../../entities/LoginData";
import ResetPasswordData from "../../entities/ResetPasswordData";
import User from "../../entities/User";
import UserAuthData from "../../entities/UserAuthData";
import { baseURL, reactBaseURL } from "../../services/api-client";

const initialState: UserAuthData = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: false,
  user: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: UserAuthData, action: PayloadAction<UserAuthData>) => {
      const { access, refresh } = action.payload
      // console.log(access)
      // console.log(refresh)
      localStorage.setItem('access', access!);
      localStorage.setItem('refresh', refresh!);
      state.isAuthenticated = true;
      state.access = access;
      state.refresh = refresh;
    },
    userLoadedSuccess: (state: UserAuthData, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    authenticatedSuccess: (state) => {
      state.isAuthenticated = true;
    },
    loginFail: (state: UserAuthData) => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null
    },
    signUpSuccess: (state: UserAuthData) => {
      state.isAuthenticated = true;
    },
    signUpFail: (state: UserAuthData) => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null
    },
    userLoadedFail: (state: UserAuthData) => {
      state.user = null;
    },
    authenticatedFail: (state) => {
      state.isAuthenticated = false;
    },
    logout: (state: UserAuthData) => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null
    },
    passwordResetSuccess: () => {},
    passwordResetFail: () => {},
    passwordResetConfirmSuccess: () => {},
    passwordResetConfirmFail: () => {},
    activationSuccess: () => {},
    activationFail: () => {},
    googleAuthSuccess: (state: UserAuthData, action) => {
      const { access, refresh } = action.payload
      localStorage.setItem('access', access!);
      localStorage.setItem('refresh', refresh!);
      state.isAuthenticated = true;
      state.access = access!;
      state.refresh = refresh!;
    },
    googleAuthFail: (state: UserAuthData) => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null
    },
    facebookAuthSuccess: (state: UserAuthData, action) => {
      const { access, refresh } = action.payload
      localStorage.setItem('access', access!);
      localStorage.setItem('refresh', refresh!);
      state.isAuthenticated = true;
      state.access = access!;
      state.refresh = refresh!;
    },
    facebookAuthFail: (state: UserAuthData) => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
    // .addCase(login.fulfilled, (state: UserAuthData, action: PayloadAction<UserAuthData>) => {
      // authSlice.caseReducers.loginSuccess(state, action);
      // dispatch(load_user());
    // })
    // .addCase(login.rejected, (state: UserAuthData) => {
    //   authSlice.caseReducers.loginFail(state); 
    // })
    // .addCase(load_user.fulfilled, (state: UserAuthData, action: PayloadAction<User>) => {
    //   authSlice.caseReducers.userLoadedSuccess(state, action);
    // })
    .addCase(load_user.rejected, (state: UserAuthData) => {
      authSlice.caseReducers.userLoadedFail(state);
    })
    .addCase(checkAuthenticated.fulfilled, (state: UserAuthData) => {
      authSlice.caseReducers.authenticatedSuccess(state);
    })
    .addCase(checkAuthenticated.rejected, (state: UserAuthData) => {
      authSlice.caseReducers.authenticatedFail(state);
    })
    .addCase(reset_password.fulfilled, () => {
      authSlice.caseReducers.passwordResetSuccess();
    })
    .addCase(reset_password.rejected, () => {
      authSlice.caseReducers.passwordResetFail();
    })
    .addCase(confirm_reset_password.fulfilled, () => {
      authSlice.caseReducers.passwordResetConfirmSuccess();
    })
    .addCase(confirm_reset_password.rejected, () => {
      authSlice.caseReducers.passwordResetConfirmFail();
    })
    .addCase(sign_up.fulfilled, (state: UserAuthData) => {
      authSlice.caseReducers.signUpSuccess(state);
    })
    .addCase(sign_up.rejected, (state: UserAuthData) => {
      authSlice.caseReducers.signUpFail(state);
    })
    .addCase(verify.fulfilled, () => {
      authSlice.caseReducers.activationSuccess();
    })
    .addCase(verify.rejected, () => {
      authSlice.caseReducers.activationFail();
    })
  },
});

// console.log(baseURL)
// console.log(reactBaseURL)

export const load_user = createAsyncThunk<User, void, { rejectValue: User | undefined }>(
  'auth/loadUserAsync',
  async (_, { rejectWithValue, dispatch }) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      }

      try {
        const response = await axios.get<User>(baseURL + '/auth/users/me/', config);
        // console.log('loaded user: ', response.data);
        dispatch(authSlice.actions.userLoadedSuccess(response.data))

        return response.data;
      } catch (error) {
        // const axiosError = error as AxiosError;
        // console.log(axiosError.response?.data)
        // dispatch(authSlice.actions.userLoadedFail());
        return rejectWithValue(undefined);
      }
    } else {
      // dispatch(authSlice.actions.userLoadedFail());
      return rejectWithValue(undefined);
    }
});

export const login = createAsyncThunk<UserAuthData, LoginData>(
  'auth/loginAsync',
  async (credentials,{ rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    try {
      const response = await axios.post<UserAuthData>(baseURL + '/auth/jwt/create/', credentials, config);
      dispatch(authSlice.actions.loginSuccess(response.data));
      // console.log(response.data);
      dispatch(load_user());
      return response.data;
    } catch (error) {
      // dispatch(authSlice.actions.loginFail())
      const axiosError = error as AxiosError;
      // console.log(axiosError.response?.data)
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const checkAuthenticated = createAsyncThunk<object, void, { rejectValue: JWT | undefined }>(
  'auth/checkAuthenticatedAsync',
  async (_,{ rejectWithValue}) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      const body = { token: localStorage.getItem("access")}

      try {
        const response = await axios.post(baseURL + '/auth/jwt/verify/', body, config);
        
        if (response.data.code === 'token_not_valid')
          return rejectWithValue(undefined);
        
        return response.data;

      } catch (error) {
        // const axiosError = error as AxiosError;
        // console.log(axiosError.response?.data)
        // dispatch(authSlice.actions.userLoadedFail());
        return rejectWithValue(undefined);
      }
    } else {
      return rejectWithValue(undefined);
   }
  });

export const reset_password = createAsyncThunk<object, ResetPasswordData>(
  'auth/resetPasswordAsync',
  async(data, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    try {
      const response = await axios.post(baseURL + '/auth/users/reset_password/', data, config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // console.log(axiosError.response?.data)
      return rejectWithValue(axiosError.response?.data);
    }
  }
)

export const confirm_reset_password = createAsyncThunk<object, ConfirmData>(
  'auth/resetPasswordConfirmAsync',
  async(data, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    // console.log("data from action: ", data)

    try {
      const response = await axios.post(baseURL + '/auth/users/reset_password_confirm/', data, config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // console.log(axiosError.response?.data)
      return rejectWithValue(axiosError.response?.data);
    }
  }
)

export const sign_up = createAsyncThunk<object, LoginData>(
  'auth/signUpAsync',
  async (data,{ rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    
    // console.log(data);
    try {
      const response = await axios.post(baseURL + '/auth/users/', data, config);
      // dispatch(authSlice.actions.loginSuccess(response.data));
      // console.log(response.data);
      // dispatch(load_user());
      return response.data;
    } catch (error) {
      // dispatch(authSlice.actions.loginFail())
      const axiosError = error as AxiosError;
      // console.log(axiosError)
      if (axiosError.response?.status === 401 || axiosError.response?.status === 400) {
        return rejectWithValue(axiosError.response?.data);
      } else {
        return rejectWithValue('An error occurred');
      }
    }
  }
);

export const verify = createAsyncThunk<object, ConfirmData>(
  'auth/verifyAsync',
  async(data, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    try {
      const response = await axios.post(baseURL + '/auth/users/activation/', data, config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // console.log(axiosError.response?.data)
      return rejectWithValue(axiosError.response?.data);
    }
  }
)

export const googleSocialAuth = createAsyncThunk<object, string>(
  'auth/googleSocialAuthAsync',
  async(page) => {
      window.location.replace(`${baseURL}/api/auth/google/callback/?flag=google&page=${page}`);
  }
)

export const requestGoogleSocialAuth = createAsyncThunk(
  'auth/requestGoogleSocialAuthAsync',
  async(_, { rejectWithValue }) => {

    try {
      const response = await axios.get(baseURL + `/auth/o/google-oauth2/?redirect_uri=${reactBaseURL}/google/callback`);
      // console.log("in verify action: ", response.data)
      window.location.replace(response.data.authorization_url)
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // console.log(axiosError)
      return rejectWithValue(axiosError.response?.data);
    }
  }
)

export const googleAuthenticate = createAsyncThunk(
  'auth/googleAuthenticateAsync',
  async (data: GoogleAuthData, { rejectWithValue, dispatch }) => {
    if (data.state && data.code && !localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };

      const details: Record<string, string> = {
        'state': data.state,
        'code': data.code
      }
      // console.log(details)
      const formBody = Object.keys(details).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
      
      try {
        const response = await axios.post(baseURL + `/auth/o/google-oauth2/?${formBody}`, config);
        dispatch(authSlice.actions.googleAuthSuccess(response.data))
        dispatch(load_user())
      } catch (error) {
        const axiosError = error as AxiosError;
        // console.log(axiosError)
        dispatch(googleAuthFail());
        rejectWithValue(axiosError.response?.data);
      }
    }
});

export const requestFacebookSocialAuth = createAsyncThunk(
  'auth/requestFacebookSocialAuthAsync',
  async(_, { rejectWithValue }) => {

    try {
      const response = await axios.get(baseURL + `/auth/o/facebook/?redirect_uri=${reactBaseURL}/facebook`);
      // console.log("in verify action: ", response.data)
      window.location.replace(response.data.authorization_url)
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // console.log(axiosError)
      return rejectWithValue(axiosError.response?.data);
    }
  }
)

export const facebookAuthenticate = createAsyncThunk(
  'auth/facebookAuthenticateAsync',
  async (data: GoogleAuthData, { rejectWithValue, dispatch }) => {
    if (data.state && data.code && !localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };

      const details: Record<string, string> = {
        'state': data.state,
        'code': data.code
      }
      // console.log(details)
      const formBody = Object.keys(details).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
      
      try {
        const response = await axios.post(baseURL + `/auth/o/facebook/?${formBody}`, config);
        dispatch(authSlice.actions.facebookAuthSuccess(response.data))
        dispatch(load_user())
      } catch (error) {
        const axiosError = error as AxiosError;
        // console.log(axiosError)
        dispatch(facebookAuthFail());
        rejectWithValue(axiosError.response?.data);
      }
    }
});

export const { loginSuccess, userLoadedSuccess, loginFail, userLoadedFail, authenticatedFail, authenticatedSuccess, logout, googleAuthFail, googleAuthSuccess, facebookAuthFail, facebookAuthSuccess} = authSlice.actions

export default authSlice.reducer;

// export const selectCurrentAccess = (state: RootState) => state.auth.access;
// export const selectUser = (state: RootState) => state.auth.user;
