import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import TicketInfo from "../modules/ticket/TicketInfo";

const HomePage = lazy(() => import("../modules/home/HomePage"));
const TicketPage = lazy(() => import("../modules/ticket/TicketPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/ticket",
    element: <TicketPage />,
  },
  {
    path: "/ticketInfo",
    element: <TicketInfo />,
  },
]);
