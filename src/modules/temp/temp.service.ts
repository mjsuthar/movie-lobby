import { NextFunction, Request, Response } from "express";

export class TempControllerService {
    private _request: Request;
    private _response: Response;
    constructor(request: Request, response: Response, next: NextFunction) {
        this._request = request;
        this._response = response;
    }

    sayHello(): { data: string } {
        return {
            data: "hello"
        };
    }

    async addMovie(_details: any) {

        let details = new APP.MONGODBMODELS.MOVIE(_details);

        return await details.save().catch((err: any) => {
            throw err;
        });
    }

    async getMoviesList(_details: any) {
        return await APP.MONGODBMODELS.MOVIE.find(_details, 'title genre rating streaming_link').catch((err: any) => {
            throw err;
        });
    }

    async getMovieDetails(_details: any) {
        return await APP.MONGODBMODELS.MOVIE.findOne(_details, 'title genre rating streaming_link').catch((err: any) => {
            throw err;
        });
    }

    async updateMovie(_filter: any, _update: any, _options: any) {
        return await APP.MONGODBMODELS.MOVIE.findOneAndUpdate(_filter, _update, _options).catch((err: any) => {
            throw err;
        })
    }

    async deleteMovie(_filter: any) {
        return await APP.MONGODBMODELS.MOVIE.deleteOne(_filter).catch((err: any) => {
            throw err;
        })
    }


}