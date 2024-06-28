import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MediaForm from "./components/start.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Saved from "./components/saved.jsx";
import Start from "./components/details.jsx";
import Landing from "./components/landing.jsx";
import NotFound from "./components/notFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  { path: "/details", element: <Start /> },
  { path: "/home", element: <MediaForm /> },
  { path: "*", element: <NotFound /> }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
