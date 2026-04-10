import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Residents = lazy(() => import("./pages/Residents"));
const ResidentDetail = lazy(() => import("./pages/ResidentDetail"));
const AddResident = lazy(() => import("./pages/AddResident"));
const EditResident = lazy(() => import("./pages/EditResident"));
const Rooms = lazy(() => import("./pages/Rooms"));
const Payments = lazy(() => import("./pages/Payments"));

const PageFallback = () => (
  <div className="flex items-center justify-center h-full min-h-[40vh]">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Dashboard />
    </Suspense>
  ),
});

const residentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/residents",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Residents />
    </Suspense>
  ),
});

const addResidentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/residents/add",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AddResident />
    </Suspense>
  ),
});

const residentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/residents/$residentId",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ResidentDetail />
    </Suspense>
  ),
});

const editResidentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/residents/$residentId/edit",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <EditResident />
    </Suspense>
  ),
});

const roomsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rooms",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Rooms />
    </Suspense>
  ),
});

const paymentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payments",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Payments />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  residentsRoute,
  addResidentRoute,
  residentDetailRoute,
  editResidentRoute,
  roomsRoute,
  paymentsRoute,
]);

const router = createRouter({ routeTree });

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0, retry: 1 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
