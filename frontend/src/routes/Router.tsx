import LoginPage from "@/pages/LogInPage/LoginPage";
import MainPage from "@/pages/MainPage/MainPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />, 
  },
  {
    path: "/login",
    element: <LoginPage />, 
  },
  {
    path: "/signup",
    element: <SignUpPage />, 
  },
  {
    path: "/create-post",
    // element:
  },
  {
    path: "/post/:postId",
    // element:
  },
  {
    path: "/mypage",
    // element:
  },
  {
    path: "/user-page/:userId",
    // element:
  },
]);

export default router;
