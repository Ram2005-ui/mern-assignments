import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "add-user", element: <AddUser /> },
      { path: "users", element: <UserList /> },
    ],
  },
]);

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
