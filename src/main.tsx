import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import HomeRoute from "./pages/home/route";
import WeeklyCalendar from "./pages/weekly/route";
import MonthlyCalendar from "./pages/monthly/route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
    children: [
      {
        element: <WeeklyCalendar />,
        path: "weekly",
      },
      {
        element: <MonthlyCalendar />,
        path: "monthly",
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
