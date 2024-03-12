import bodyParser from "body-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import cors from "cors";
import { IndexRoute } from "@Routes/index";
import dotenv from "dotenv";
import { BaseApp } from "@Base";
let http = require("http");

declare const global: any;

dotenv.config();
class App {
  public app: express.Application = express();
  public server = http.createServer(this.app);

  public static bootstrap(): App {
    return new App();
  }

  constructor() {
    //this.app = express();
    this.initializeConfigsAndRoute();
    //this.initializeWebSocket();
  }

  // public async initializeWebSocket() {

  //   let io = require("socket.io")(this.server, {
  //     cors: {
  //       origin: "*",
  //       methods: ["GET", "POST"],
  //       credentials: true,
  //     },
  //     path: "/cldashboard/api/v1/socket.io"
  //   });

  //   io.on("connection", (socket: any) => {
  //     console.log("Connection stablished");

  //     socket.on("joinRoom", async(roomId: any) => { //roomid-clientId

  //       socket.join(roomId);
  //       console.log("Room created.");

  //       io.to(roomId).emit("joinRoomSuccess", roomId);
  //     });

  //     socket.on("fetchRequestForOverallReport", async (message, callback) => {

  //       let data: any = await apiClientWSController.getAPIUsageByOverall(message).catch((err: any) => {
  //           return "Error To Calculate Logs Report data.";
  //         });

  //       //io.sockets.emit("overallReportFetchResponse", data);
  //       io.to(message.roomId).emit("overallReportFetchResponse", data);

  //     });

  //     socket.on("fetchRequestForDayWise", async (message, callback) => {

  //         // ******Day wise API Details*******
  //         var data: any = await apiClientWSController.getAPIUsageByDayUsingApiParentId(message).catch((err: any) => {
  //           return "Error To Calculate Day data.";
  //         });

  //         //io.sockets.emit("dayWiseFetchResponse", data);
  //         io.to(message.roomId).emit("dayWiseFetchResponse", data);

  //     });

  //     socket.on("fetchRequestForHourWise", async (message, callback) => {

  //       let data: any = await apiClientWSController.getAPIUsageByhour(message).catch((err: any) => {
  //           return "Error To Calculate hour data.";
  //         });

  //       //io.sockets.emit("hourWiseFetchResponse", data);
  //       io.to(message.roomId).emit("hourWiseFetchResponse", data);

  //     });

  //     socket.on("fetchRequestForUserWise", async (message, callback) => {

  //       let data: any = await apiClientWSController.getAPIUsageByUser(message).catch((err: any) => {
  //           return "Error To Calculate User data.";
  //         });

  //       //io.sockets.emit("userWiseFetchResponse", data);
  //       io.to(message.roomId).emit("userWiseFetchResponse", data);

  //     });

  //     socket.on("fetchRequestForResCode", async (message, callback) => {

  //       let data: any = await apiClientWSController.getAPIUsageByResCode(message).catch((err: any) => {
  //           return "Error To Calculate Response Code data.";
  //         });

  //       //io.sockets.emit("resCodeFetchResponse", data);
  //       io.to(message.roomId).emit("resCodeFetchResponse", data);

  //     });

  //     socket.on("fetchRequestForLogsReport", async (message, callback) => {

  //       let data: any = await apiClientWSController.getAPIUsageByLogsReport(message).catch((err: any) => {
  //           return "Error To Calculate Logs Report data.";
  //         });

  //       //console.log("room-ID: ", message.roomId, "log report");
  //       //io.sockets.emit("logsReportFetchResponse", data);
  //       io.to(message.roomId).emit("logsReportFetchResponse", data);

  //     });

  //     socket.on("disconnect", (roomId: any) => {
  //       //socket.leave(roomId);
  //       console.log("user disconnected");

  //     });

  //   });
  // }


  public async initializeConfigsAndRoute() {
    this.app.use(logger("dev"));
    this.app.use(cors());
    this.app.use(express.json({ limit: "6000mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "6000mb" }));
    // this.app.use(bodyParser.json());
    // this.app.use(bodyParser.urlencoded({extended: true}));

    //mount cookie parser middleware
    // this.app.use(cookieParser("SECRET_GOES_HERE"));

    // catch 404 and forward to error handler
    // this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    //     err.status = 404;
    //     next(err);
    // });

    //error handling
    // this.app.use(errorHandler());
    // global.__root = path.join(__dirname);

    global.BasePath = __dirname;

    global.AbsPath = (path: string) => {
      return BasePath + path;
    };
    global.TaxmannRequire = (file: string) => {
      return require(AbsPath("/" + file));
    };
    global.APP = new BaseApp(this.app);
    await global.APP.initialize();
    await this.routes();
  }



  /**
   * Create and return Router.
   *
   * @class Server
   * @method routes
   * @return void
   */
  private async routes() {
    // let router: express.Router;
    // router = express.Router();
    await new IndexRoute(this.app).init();
    //use router middleware
  }

  public listen() {
    this.server.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  /**
 * Event listener for HTTP server "error" event.
 */

onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof process.env.PORT === "string" ? "Pipe " + process.env.PORT : "Port " + process.env.PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

onListening() {
  const addr = this.server?.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  //this.debug("Listening on " + bind);
}

}

export default App;