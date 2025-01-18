import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Root from "./layout/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default router;
