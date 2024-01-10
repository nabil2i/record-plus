import User from "./User";

export default interface UserAuthData {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
  user: User | null
}
