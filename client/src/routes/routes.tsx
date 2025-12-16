import type React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Suggestions from "@/pages/suggestions";

interface Route {
  path: string;
  element: React.ReactNode;
  children?: Route[];
}

const routes: Route[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/suggestions",
    element: <Suggestions />,
  },
];

const router = createBrowserRouter(routes);

export default router;
