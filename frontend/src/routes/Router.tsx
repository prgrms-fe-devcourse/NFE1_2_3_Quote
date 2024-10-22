import LoginPage from "@/pages/LogInPage/LoginPage";
import MainPage from "@/pages/MainPage/MainPage";
import MyPage from "@/pages/MyPages/MyPage";
import CreatePost from "@/pages/PostCreate/components/CreatePost";
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
    element: <CreatePost />,
  },
  {
    path: "/post/:postId",
    // element:
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/user-page/:userId",
    // element:
  },
]);

export default router;