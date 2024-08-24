type ApiRoute = {
    basePath: string;
    routes: ApiRouteItem[];
};


type ApiRouteItem = {
    path: string;
    controller: string;
    action: string;
    method: HttpMethod;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export { ApiRoute, ApiRouteItem };