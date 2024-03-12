import mongoose from "mongoose";
// import { Sequelize } from "sequelize";
import { ConfigTypes } from "@Types/config";
import { GlobalTypes } from "@Types/globals";
import { MiddlewareTypes } from "@Types/middlewares";
import { PluginsTypes } from "@Types/plugins";


/* eslint-disable no-var */
declare global {
    const BasePath: string;
    const __root: string;
    function AbsPath(arg1: string): string;
    var APP: {
        user: Express.Request.decoded;
        //MYSQLDB: Sequelize;
        MongoDB: mongoose;
        //RDC: redis;
        CONFIGS: ConfigTypes;
        GLOBALS: GlobalTypes;
        MIDDLEWARES: MiddlewareTypes;
        PLUGINS: PluginsTypes;
        //MYSQLMODELS: any;
        MONGODBMODELS: any;
        APIHITLOGGER: any;
        //SendInBlueApiInstance: any;
        //REDISCLIENT: any;
    };
    var TaxmannRequire: any;
    // namespace NodeJS {
    //     export interface Module {
    //         BasePath: string;
    //         AbsPath:string;
    //         TaxmannRequire:any;
    //         __root:string;
    //         APP:any;
    //     }
    // }
    namespace Express {
        export interface Request {
            decoded?: {
                email: string;
                isAdmin: boolean;
            };
        }
    }
}

export { }