import { createBrowserRouter } from "react-router-dom";
import { GuestGuard } from "../guards/auth/GuessGuard";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout";
import Login from "../screens/login/Login";
import { useRoutes } from "@hiobairo/app-core";
import { AuthGuard } from "../guards/auth/AuthGuard";
import { HomeLayout } from "../layouts/home/HomeLayout";
import { DASHBOARD_ROUTES } from ".";

export const GetRouter = () => {
  const routes = useRoutes();

  return createBrowserRouter([
    {
      path: '/',
      element: (
        <GuestGuard>
          <HomeLayout />
        </GuestGuard>
      )
    },
    {
      path: DASHBOARD_ROUTES.AUTH.LOGIN,
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: DASHBOARD_ROUTES.ROOT,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        ...routes,
      ],
    },
  ]);
}