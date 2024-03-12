import express, { NextFunction, Request, Response, Router } from "express";
import BaseRoute from "@Routes/base.route";
import UserRoute from "./user.route";

export class IndexRoute {
  public appObj: express.Application;
  constructor(app: express.Application) {
    this.appObj = app;
  }

  public init() {
    this.appObj.use("/", new BaseRoute().router);
    this.appObj.use("/auth/", new UserRoute().router);
  }

}
