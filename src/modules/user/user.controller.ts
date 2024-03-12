import { NextFunction, Request, Response } from "express";

import { UserControllerService } from "@Modules/user/user.service";

export class UserController {
    private _request: Request;
    private _response: Response;
    private _service: UserControllerService;
    constructor(request: Request, response: Response, next: NextFunction) {
        this._request = request;
        this._response = response;
        this._service = new UserControllerService(request, response, next);
    }

    // async registerUser() {
    //     try {

    //         const { email } = this._request.body;

    //         const userDetails = await this._service.getUserDetails({email}).catch((err: any) => {
    //             throw err;
    //         });

    //         if(APP.PLUGINS.lodash.isEmpty(userDetails)) {
    //             const updateToken = await this._service.createUser({email}).catch((err: any) => {
    //                 throw err;
    //             })
    //         }
            
    //         return {
    //             message: "User reistration Successfull.",
    //             data: null
    //         }
    //     }
    //     catch(err) {
    //         throw err;
    //     }
    // }

    async getToken() {
        try {

            const { email } = this._request.body;

            let userDetails = await this._service.getUserDetails({email}).catch((err: any) => {
                throw err;
            });

            let headerToke: string = "";

            if(APP.PLUGINS.lodash.isEmpty(userDetails)) {
                userDetails = await this._service.createUser({email}).catch((err: any) => {
                    throw err;
                })
            } else {
                headerToke = userDetails.token
            }

            if (headerToke) {
                if (headerToke.startsWith("Bearer")) {
                    headerToke = headerToke.slice(6, headerToke.length);
                }
                let checkToken = await this._service.checkTocken(headerToke).catch((err: any) => {
                    return false;
                });

                if(checkToken) {
                    return {
                        message: "Token Created Successfull.",
                        data: {
                            token: "Bearer" + headerToke
                        }
                    }
                }
            }

            const payload = {
                email: email,
                isAdmin: userDetails.isAdmin
            };
            
            const expiresIn = '5m';
            
            // Sign the token with the secret key
            const token = APP.PLUGINS.jwt.sign(payload, process.env.JWT_TOKEN_SECRET, { expiresIn });

            const filter = {
                email
            }

            const update = {
                $set: {
                    token
                }
            }

            const updateToken = await this._service.updateUserDetails(filter, update).catch((err: any) => {
                throw err;
            })
            
            return {
                message: "Token Created Successfull.",
                data: {
                    token: "Bearer" + token
                }
            }
        }
        catch(err) {
            throw err;
        }
    }

    // async updateUser() {
    //     try {
            
    //         const { email, isAdmin=false } = this._request.body;

    //         let filter = {
    //             email
    //         };

    //         let update = {
    //             isAdmin
    //         };

    //         await this._service.updateUserDetails(filter, update).catch((err: any) => {
    //             throw err;
    //         });

    //         return {
    //             message: "User details updated.",
    //             data: null
    //         }
    //     } catch (err) {
    //         throw err;
    //     }
    // }

}