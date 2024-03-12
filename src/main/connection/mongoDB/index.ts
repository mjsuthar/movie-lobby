import express from "express";
import * as mongoose from "mongoose";
import { MongoDbModel } from "@Main/models/mongoose";

class MongoDB {
    public appObj: express.Application;
    constructor(app: express.Application) {
        this.appObj = app;
    }
    public async index() {
        try {
            const MONGODB_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
            //console.log(MONGODB_URI);
            mongoose.set("strictQuery", false);
            await mongoose.connect(MONGODB_URI).catch((err) => {
                console.log("MongoDB connection failed.", err);
                throw err;
            });
            APP.MongoDB = mongoose;
            console.log("MongoDB connection successful.");
            APP.MONGODBMODELS = await this._registeringModels();
        } catch (error) {
            throw error;
        }
    }

    async _registeringModels() {
        return await new MongoDbModel().index();
    }
}


module.exports = MongoDB;