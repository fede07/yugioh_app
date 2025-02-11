import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import CardDetail from "./pages/cardDetail/CardDetail.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/card/:id", element: <CardDetail /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
