import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



import PageContainer from "./PageContainer.js";
import HomePage from "./HomePage.js";
import "./styles/index.scss";
import NewsPage from "./NewsPage.js";
import ArtistsPage from "./ArtistsPage.js";
import CatalogPage from "./CatalogPage.js";
import OurStoryPage from "./OurStoryPage.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: <PageContainer />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "news",
        element: <NewsPage />
      },
      {
        path: "artists",
        element: <ArtistsPage />
      },
      {
        path: "catalog",
        element: <CatalogPage />
      },
      {
        path: "ourstory",
        element: <OurStoryPage />
      }
    ],
  },
]);


createRoot(document.getElementById("app")).render(
  <RouterProvider router={router} />
);