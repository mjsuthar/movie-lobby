import { PluginsTypes } from "@Types/plugins";


export class PluginsLoader {
    constructor() { }
    public async index() {
        return {
            moment: (await this.importModule("moment")),
            lodash: await this.importModule("lodash"),
            path: await this.importModule("path"),
            fs: await this.importModule("fs"),
            jwt: await this.importModule("jsonwebtoken")
        } as PluginsTypes;
    }


    private async importModule(file: string) {
        let importModuleClass = await import(file)
            .then(module => {
                return module?.default;
            });
        return importModuleClass;
    }

}