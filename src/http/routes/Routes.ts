import { ApiRoute, ApiRouteItem } from "../../types/routes.types";

export const userRoutes: ApiRouteItem[] = [
  {
    path: "/users",
    controller: "AuthController",
    action: "index",
    method: "GET",
  },
  {
    path: "/users",
    controller: "AuthController",
    action: "create",
    method: "POST",
  },
  {
    path: "/users/:id",
    controller: "AuthController",
    action: "show",
    method: "GET",
  },
  {
    path: "/users",
    controller: "AuthController",
    action: "update",
    method: "PUT",
  },
];

export const dataRoutes: ApiRouteItem[] = [
  {
    path: "/data",
    controller: "DataController",
    action: "index",
    method: "GET",
  },
  {
    path: "/data",
    controller: "DataController",
    action: "create",
    method: "POST",
  },
];

export const allRoutes: ApiRoute[] = [
  {
    basePath: process.env.API_BASE_PATH || "/api/v1",
    routes: [
      ...userRoutes.map((route) => ({ ...route })),
      ...dataRoutes.map((route) => ({ ...route })),
    ],
  },
];
