import LoginData from "../entities/LoginData";
import UserAuthData from "../entities/UserAuthData";
import APIClient from "./api-client";

export default new APIClient<UserAuthData, LoginData>('/auth')
