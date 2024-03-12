import { NextFunction, Request, Response } from "express";
import { TempControllerService } from "@Modules/temp/temp.service";

export class TempController {
    private _request: Request;
    private _response: Response;
    private _service: TempControllerService;
    constructor(request: Request, response: Response, next: NextFunction) {
        this._request = request;
        this._response = response;
        this._service = new TempControllerService(request, response, next);
    }

    sayHello(): { data: string } {
        return this._service.sayHello();
    }

    async addMovieDetails() {

        try {
            
            if(!APP.user.isAdmin) {
                return {
                    message: "you have no right to use this API."
                }
            }
            
            const { title, genre, rating, streaming_link } = this._request.body;

            if(!title) { throw new Error("Title Value not received.") }

            if(!genre) { throw new Error("Genre Value not received.") }

            if(!rating) { throw new Error("Rating Value not received.") }

            if(!streaming_link) { throw new Error("Link not received.") }

            const checkData = await this._service.getMovieDetails({title, genre}).catch((err: any) => {
                throw err;
            });

            if(!APP.PLUGINS.lodash.isEmpty(checkData)) {
                return {
                    message: "Movie ALready exist.",
                    data: {}
                }
            }

            const saveData = await this._service.addMovie(this._request.body).catch((err: any) => {
                throw err;
            });
            
            return {
                message: "Successfully.",
                data: {
                }
            };
        } catch (err) {
            throw err;
        }

    }

    async getMoviesList() {
        try {

            const moviesList = await this._service.getMoviesList({}).catch((err: any) => {
                throw err;
            });

            if(!APP.PLUGINS.lodash.isEmpty(moviesList)) {
                return {
                    message: "Successful.",
                    data: moviesList
                }
            } else {
                return {
                    message: "Movie List is empty",
                    data: moviesList
                }
            }
        }
        catch (err) {
            throw err;
        }
    }

    async getSearch() {
        try {

            const {q} = this._request.query;

            if(!q) { throw new Error("Please type something in search key.") }

            let query: any = {
                $or: [
                    { title: { $regex: '.*' + q + '.*' } },
                    { genre: { $regex: '.*' + q + '.*' } },
                ]
            }

            const moviesList = await this._service.getMoviesList(query).catch((err: any) => {
                throw err;
            });

            if(!APP.PLUGINS.lodash.isEmpty(moviesList)) {
                return {
                    message: "Successful.",
                    data: moviesList
                }
            } else {
                return {
                    message: "Data not found.",
                    data: moviesList
                }
            }
        }
        catch (err) {
            throw err;
        }
    }

    async updateMovie() {

        try {

            const { id } = this._request.params;

            const { title, genre, rating, streaming_link } = this._request.body;
            
            if(!id) { throw new Error("ID not received.") }

            // const checkData = await this._service.getMovieDetails({id}).catch((err: any) => {
            //     throw err;
            // });

            // if(APP.PLUGINS.lodash.isEmpty(checkData)) {
            //     return {
            //         message: "Movie Not Found.",
            //         data: {}
            //     }
            // }

            let filter: any = {
                _id: id
            }

            let update: any = {
                $set: {
                    title, genre, rating, streaming_link 
                }
            }

            let options: any = {
                new: true
            }

            const updateData = await this._service.updateMovie(filter, update, options).catch((err: any) => {
                throw err;
            });
            
            let message: string = "";

            if(!APP.PLUGINS.lodash.isEmpty(updateData)) { message = "Movie updated." } 
            else { message = "Movie not Found." }

            return {
                message,
                data: updateData
            }

        } catch (err) {
            throw err;
        }

    }

    async deleteMovie() {

        try {

            const { id } = this._request.params;

            if(!id) { throw new Error("ID not received.") }

            let filter: any = {
                _id: id
            }

            const deleteData = await this._service.deleteMovie(filter).catch((err: any) => {
                throw err;
            });
            
            let message: string = "";

            if(!APP.PLUGINS.lodash.isEmpty(deleteData) && 
                deleteData.deletedCount > 0) 
            { 
                message = "Movie deleted successfully." 
            } 
            else { message = "Movie not Found." }

            return {
                message,
                data: {}
            }

        } catch (err) {
            throw err;
        }

    }

}