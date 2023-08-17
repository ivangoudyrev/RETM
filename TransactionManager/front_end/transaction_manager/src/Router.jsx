import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import { Lists } from "./pages/ListsPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: < App />,
    children: [
      {
        index: true,
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "register",
        element: <RegisterPage/>
      },
      {
        path: "home",
        element: <HomePage/>
      }
    ]

  }
])