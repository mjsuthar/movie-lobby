import { NextFunction, Request, Response } from "express";

export class UserControllerService {
    private _request: Request;
    private _response: Response;
    constructor(request: Request, response: Response, next: NextFunction) {
        this._request = request;
        this._response = response;
    }


    async getUserDetails(_details: any) {
        return await APP.MONGODBMODELS.USER.findOne(_details).catch((err: any) => {
            throw err;
        });
    }

    async updateUserDetails(_details: any, _update: any) {
        return await APP.MONGODBMODELS.USER.findOneAndUpdate(_details, _update).catch((err: any) => {
            throw err;
        });
    }

    async createUser(_details: any) {
        let details = new APP.MONGODBMODELS.USER(_details);

        return await details.save().catch((err: any) => {
            throw err;
        });
    }

    async checkTocken(headerToke: any) {
        return new Promise((resolve, reject) => {
            APP.PLUGINS.jwt.verify(headerToke, process.env.JWT_TOKEN_SECRET, (err: any, data: any) => {
                if(err) reject(err);
                resolve(data);
            })
        });
    }
}