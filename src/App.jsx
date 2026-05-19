import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
