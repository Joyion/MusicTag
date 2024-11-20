import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



import { PageContainer } from "./PageContainer.js";
import { HomePage } from "./HomePage.js";
import "./styles/index.scss";


const router = createBrowserRouter([
  {
    path: "/",
    element: <PageContainer />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
    ],
  },
]);


createRoot(document.getElementById("app")).render(
  <RouterProvider router={router} />
);