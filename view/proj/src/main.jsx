import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MediaForm from "./components/start.jsx";
import {Router, RouterProvider,createBrowserRouter}from "react-router-dom"
import Saved from "./components/saved.jsx";

const router=createBrowserRouter([
  {
    path:'/',
    element:<MediaForm/>
  },
  {
    path:'/saved',
    element:<Saved/>
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);
