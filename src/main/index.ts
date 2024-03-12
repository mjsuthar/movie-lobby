import express from "express";
import { ConfigTypes } from "@Types/config";
import { GlobalTypes } from "@Types/globals";
import { MiddlewareTypes } from "@Types/middlewares";
import { PluginsTypes } from "@Types/plugins";
import { Configs } from "@Main/configs";
import { ConnectionConfigLoader } from "./connection";
import { GlobalConfigLoader } from "@Main/globals";
import { MiddlewareLoader } from "@Main/middleware";
import { PluginsLoader } from "@Main/plugins";
//import ApiHitLogger from "api-hit-logger";

export class BaseApp {
    public appObj: express.Application;
    public CONFIGS: ConfigTypes | undefined;
    public GLOBALS: GlobalTypes | undefined;
    public MIDDLEWARES: MiddlewareTypes | undefined;
    public PLUGINS: PluginsTypes | undefined;
    constructor(appObj: express.Application) {
        this.appObj = appObj;
    }

    public async initialize() {
        await this.loadAppConfigs();
        await this.loadAppDataBaseConfig();
        await this.loadAppGlobals();
        await this.loadAppMiddlewares();
        await this.loadAppPlugins();
        //await this.loadAPIHitLoggerlibrary();

        // this.loadLoaderClasses();
    }

    /**
     * @description load all configs object's and put on configs property.
     */
    private async loadAppConfigs() {
        this.CONFIGS = await new Configs().index();
    }

    private async loadAppDataBaseConfig() {
        await new ConnectionConfigLoader().index()
            .then(async (loaderClasses: any) => {
                for (let loaderClass of loaderClasses) {
                    try {
                        if (typeof loaderClass === "function") {
                            let loaderClassObject = new loaderClass();
                            await loaderClassObject.index();
                        }
                    } catch (err) {
                        console.log(`There was an error while creating LoaderClass Object`, err);
                    }
                }
            });
    }

    /**
     * @description load all globals like variables, project folder path etc.
     */
    private async loadAppGlobals() {
        this.GLOBALS = await new GlobalConfigLoader(this.appObj).index();
    }

    private async loadAppMiddlewares() {
        let MIDDLEWARES: MiddlewareTypes | any = {};
        await new MiddlewareLoader(this.appObj).index()
            .then(async (loaderClasses: any) => {
                for (let loaderClass in loaderClasses) {
                    if (loaderClasses.hasOwnProperty(loaderClass)) {
                        try {
                            if (typeof loaderClasses[loaderClass] === "function") {
                                let loaderClassObject = loaderClasses[loaderClass];
                                MIDDLEWARES[loaderClass] = loaderClassObject;
                            }
                        } catch (err) {
                            console.log(`There was an error while creating LoaderClass Object`, err);
                        }
                    }
                }
                this.MIDDLEWARES = MIDDLEWARES;
            });

    }

    /**
     * @description load utils like lodash, moment etc.
     */
    private async loadAppPlugins() {
        this.PLUGINS = await new PluginsLoader().index();
    }

    // private async loadAPIHitLoggerlibrary() {
    //     const apiHitLoggerObj = await new ApiHitLogger(APP.MongoDB);
    //     APP.APIHITLOGGER = await apiHitLoggerObj.initialise();
    // }

}
