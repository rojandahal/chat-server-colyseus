import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import setupRoutes from "./route.setup";

// Import Routes
import { allRoutes } from "./http/routes/Routes";
import connectDB from "./configs/dbSetup";
import dotenv from "dotenv";
import session from "express-session";
import errorHandler from "./errors/errorHandler";
import passport from "passport";
import configurePassport from "./configs/configurePassport";

dotenv.config();
connectDB();

export default config({
  initializeGameServer: (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define("my_room", MyRoom);
  },

  initializeExpress: (app) => {
    /**
     * Bind your custom express routes here:
     * Read more: https://expressjs.com/en/starter/basic-routing.html
     */

    // Add body parser middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Add cors middleware
    const corsOption: cors.CorsOptions = {
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOption));

    // Add cookie parser middleware
    app.use(cookieParser());

    // Add session middleware
    app.use(passport.initialize());
    app.use(
      session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          httpOnly: false,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
      })
    );

    configurePassport(passport);

    // Setup path to routes json config file
    setupRoutes(app, allRoutes);
    // catch 404 and forward to error handler
    app.use(errorHandler);

    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    if (process.env.NODE_ENV !== "production") {
      app.use("/", playground);
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
});
