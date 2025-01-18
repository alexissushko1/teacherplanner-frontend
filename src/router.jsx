import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Root from "./layout/Root";
import AuthForm from "./components/auth/AuthForm";
import Login from "./components/auth/AuthForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/auth", element: <AuthForm /> },
      { path: "/users/login", element: <Login /> },
    ],
  },
]);

export default router;
