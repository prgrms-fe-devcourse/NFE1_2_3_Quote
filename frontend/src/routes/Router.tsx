import LoginPage from "@/pages/LogInPage/LoginPage";
import MainPage from "@/pages/MainPage/MainPage";
import MyPage from "@/pages/MyPages/MyPage";
import CreatePost from "@/pages/PostCreate/CreatePost";
import PostDetailPage from "@/pages/PostDetail/PostDetailPage";
import PostModifyPage from "@/pages/PostModify/PostModifyPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import UserPage from "@/pages/UserPages/UserPage";
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
    element: <PostDetailPage />,
  },
  {
    path: "/post/:postId/modify",
    element: <PostModifyPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/user-page/:userId",
    element: <UserPage />,
  },
]);

export default router;
