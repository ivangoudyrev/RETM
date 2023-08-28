import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage.jsx";
import PropertiesPage from "./pages/PropertiesPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import PendingTransactionsPage from "./pages/PendingTransactionsPage";
import CompletedTransactionsPage from "./pages/CompletedTransactionsPage";
import TransactionPage from "./pages/TransactionPage";
import TasksPage from "./pages/TasksPage.jsx";
import AgentsPage from "./pages/AgentsPage";
import ClientsPage from "./pages/ClientsPage";
import InspectorsPage from "./pages/InspectorsPage";
import LendersPage from "./pages/LendersPage";
import TitleCosPage from "./pages/TitleCosPage";
import TasksTemplatesPage from "./pages/TasksTemplatesPage";
import TasksTemplatesBuyPage from "./pages/TasksTemplatesBuyPage";
import App from "./App";
import NewTransactionPage from "./pages/NewTransactionPage";
import TaskListPage from "./pages/TaskListPage";

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
        path: "transactions",
        element: <TransactionsPage/>
      },
      {
        path: "transactions/:transactionId",
        element: <TransactionPage/>
      },
      {
        path: "transactions/new",
        element: <NewTransactionPage/>
      },
      {
        path: "transactions/pending",
        element: <PendingTransactionsPage/>
      },
      {
        path: "transactions/completed",
        element: <CompletedTransactionsPage/>
      },
      // {
      //   path: "transactions/archived",
      //   element: <ArchivedTransactionsPage/>
      // },
      // {
      //   path: "transactions/transaction",
      //   element: <TransactionPage/>
      // },
      {
        path: "contacts",
        element: <ContactsPage/>
      },
      {
        path: "contacts/agents",
        element: <AgentsPage/>
      },
      {
        path: "contacts/clients",
        element: <ClientsPage/>
      },
      {
        path: "contacts/inspectors",
        element: <InspectorsPage/>
      },
      {
        path: "contacts/lenders",
        element: <LendersPage/>
      },
      {
        path: "contacts/titlecos",
        element: <TitleCosPage/>
      },
      {
        path: "properties",
        element: <PropertiesPage/>
      },
      {
        path: "tasks",
        element: <TasksPage/>
      },
      {
        path: "tasks/:transactionId",
        element: <TaskListPage/>
      },
      {
        path: "tasks/templates",
        element: <TasksTemplatesPage/>
      },
      {
        path: "tasks/templates/buy",
        element: <TasksTemplatesBuyPage/>
      }
    ]
  }
])