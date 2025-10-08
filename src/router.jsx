import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Root from "./layout/Root";
import AuthForm from "./components/auth/AuthForm";
import Login from "./components/auth/AuthForm";
import Events from "./components/events/Events";
import PersonalPasswords from "./components/passwords/PersonalPasswords";
import AddPersonalPasswordForm from "./components/passwords/AddPersonalPasswordForm";
import PersonalPasswordModal from "./components/passwords/UpdatePersonalPasswordForm";
import SchoolPasswords from "./components/passwords/SchoolPasswords";
import ToDoLists from "./components/lists/ToDoLists";
import ShoppingLists from "./components/lists/ShoppingLists";
import Habits from "./components/habits/Habits";
import Tasks from "./components/habits/Cleaning";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/auth", element: <AuthForm /> },
      { path: "/users/login", element: <Login /> },
      { path: "/events", element: <Events /> },
      { path: "/personalPasswords", element: <PersonalPasswords /> },
      { path: "/personalPasswords", element: <AddPersonalPasswordForm /> },
      { path: "/personalPasswords", element: <PersonalPasswordModal /> },
      { path: "/schoolpasswords", element: <SchoolPasswords /> },
      { path: "/toDoLists", element: <ToDoLists /> },
      { path: "/shoppingLists", element: <ShoppingLists /> },
      { path: "/habits", element: <Habits /> },
      { path: "/habits/cleaning", element: <Tasks /> },
    ],
  },
]);

export default router;
