import express, { Application } from 'express';
import path from 'path';
import { ApiRoute, ApiRouteItem } from './types/routes.types'; // Adjust the import path as needed

const setupRoutes = (app: Application, config: ApiRoute[]) => {
    config.forEach((apiRoute: ApiRoute) => {
        const basePath = apiRoute.basePath;
        const router = express.Router();

        // Loop through each route and bind the controller action to the route
        apiRoute.routes.forEach((route: ApiRouteItem) => {
            const controllerPath = path.join(__dirname, 'http/controllers', route.controller);
            const controller = require(controllerPath);
            const action = controller[route.action];
            if (action) {
                (router as any)[route.method.toLowerCase()](route.path, action);
            } else {
                console.error(`Action ${route.action} not found in controller ${route.controller}`);
            }
        });
        app.use(basePath, router);
    });
};

export default setupRoutes;
