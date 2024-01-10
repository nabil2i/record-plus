import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage";
import ActivatePage from "./pages/ActivatePage";
import GooglePage from "./pages/GooglePage";
import FacebookPage from "./pages/FacebookPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <></>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "password/reset/confirm/:uid/:token", element: <ResetPasswordConfirmPage /> },
      { path: 'activate/:uid/:token', element: <ActivatePage/>},
      { path: 'google/callback', element: <GooglePage/>},
      { path: 'facebook', element: <FacebookPage/>},
    ]
  }
])

export default router;
