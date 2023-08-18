import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage.jsx";
import PropertiesPage from "./pages/PropertiesPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: < App />,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "home",
        element: <HomePage/>
      },
      {
        path: "contacts",
        element: <ContactsPage/>
      },
      {
        path: "properties",
        element: <PropertiesPage/>
      },
      {
        path: "transactions",
        element: <TransactionsPage/>
      },
      {
        path: "tasks",
        element: <TasksPage/>
      },
      

    ]

  }
])