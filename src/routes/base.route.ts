import { NextFunction, Request, Response, Router } from "express";
import { TempController } from "@Modules/temp/temp.controller";

class BaseRoute {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.index);
    this.router.get(`${this.path}movies`, this.movies);
    this.router.get(`${this.path}search`, this.search);

    this.router.post(`${this.path}movies`, APP.MIDDLEWARES.AUTH, this.movieDetails);
    
    this.router.put(`${this.path}movies/:id`, APP.MIDDLEWARES.AUTH, this.updateMovie);

    this.router.delete(`${this.path}movies/:id`, APP.MIDDLEWARES.AUTH, this.deleteMovie)
  }

  private index = async (request: Request, response: Response, next: NextFunction) => {
    response.send("route listening properly");
  }

  private updateMovie = async (request: Request, response: Response, next: NextFunction) => {

    const apiControllerObj = new TempController(request, response, next);

    await apiControllerObj.updateMovie().then(result => {
      APP.GLOBALS.FN.sendSuccessResponse(request, response, result?.data, 200, result?.message);
    })
    .catch(error => {
      APP.GLOBALS.FN.sendErrorResponse(request, response, error.message);
    });
  }

  private deleteMovie = async (request: Request, response: Response, next: NextFunction) => {

    const apiControllerObj = new TempController(request, response, next);

    await apiControllerObj.deleteMovie().then(result => {
      APP.GLOBALS.FN.sendSuccessResponse(request, response, result?.data, 200, result?.message);
    })
    .catch(error => {
      APP.GLOBALS.FN.sendErrorResponse(request, response, error.message);
    });
  }

  private movies = async (request: Request, response: Response, next: NextFunction) => {

    const apiControllerObj = new TempController(request, response, next);

    await apiControllerObj.getMoviesList().then(result => {
      APP.GLOBALS.FN.sendSuccessResponse(request, response, result?.data, 200, result?.message);
    })
    .catch(error => {
      APP.GLOBALS.FN.sendErrorResponse(request, response, error.message);
    });
  }

  private search = async (request: Request, response: Response, next: NextFunction) => {

    const apiControllerObj = new TempController(request, response, next);

    await apiControllerObj.getSearch().then(result => {
      APP.GLOBALS.FN.sendSuccessResponse(request, response, result?.data, 200, result?.message);
    })
    .catch(error => {
      APP.GLOBALS.FN.sendErrorResponse(request, response, error.message);
    });
  }

  private movieDetails = async (request: Request, response: Response, next: NextFunction) => {

    const apiControllerObj = new TempController(request, response, next);

    await apiControllerObj.addMovieDetails().then(result => {
      APP.GLOBALS.FN.sendSuccessResponse(request, response, result?.data, 200, result?.message);
    })
    .catch(error => {
      APP.GLOBALS.FN.sendErrorResponse(request, response, error.message);
    });
  }

}

export default BaseRoute;