import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "@Modules/user/user.controller";

class UserRoute {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //this.router.get(`${this.path}user`, this.index);

    //this.router.post(`${this.path}user`, this.registerUser);
    this.router.post(`${this.path}token`, this.getToken);

    //this.router.put(`${this.path}user`, this.updateUser);
    
  }

  // private index = async (request: Request, response: Response, next: NextFunction) => {
  //   response.send("route listening properly");
  // }

  // private registerUser = async (request: Request, response: Response, next: NextFunction) => {

  //   const apiControllerObj = new UserController(request, response, next);

  //   await apiControllerObj.registerUser().then(result => {
  //     APP.GLOBALS.FN.sendSuccessResponse(request, response, result?.data, 200, result?.message);
  //   })
  //   .catch(error => {
  //     APP.GLOBALS.FN.sendErrorResponse(request, response, error.message);
  //   });
  // }

  private getToken = async (request: Request, response: Response, next: NextFunction) => {

    const apiControllerObj = new UserController(request, response, next);

    await apiControllerObj.getToken().then(result => {
      APP.GLOBALS.FN.sendSuccessResponse(request, response, result?.data, 200, result?.message);
    })
    .catch(error => {
      APP.GLOBALS.FN.sendErrorResponse(request, response, error.message);
    });
  }

  // private updateUser = async (request: Request, response: Response, next: NextFunction) => {

  //   const apiControllerObj = new UserController(request, response, next);

  //   await apiControllerObj.updateUser().then(result => {
  //     APP.GLOBALS.FN.sendSuccessResponse(request, response, result?.data, 200, result?.message);
  //   })
  //   .catch(error => {
  //     APP.GLOBALS.FN.sendErrorResponse(request, response, error.message);
  //   });
  // }

}

export default UserRoute;