
import fs from "fs";
import path from "path";
import { ConfigTypes } from "@Types/config";

export class Configs {
	constructor() {
	}

	public async index() {
		let config: ConfigTypes | any = {};
		const loaderClasses = await fs.readdirSync(__dirname)
			.filter(file =>
				((file.indexOf(".") !== 0) && (!file.includes("index")))
			);
		await Promise.all(
			loaderClasses.map(async file => {
				const result = await this.importModule(file);
				config = { ...config, ...result };
				// return config[file] = result;
			})
		);
		return config;
	}

	public async importModule(file: string) {
		let importModuleClass = await import(path.join(__dirname, file))
			.then(module => {
				return module?.default;
			});
		return importModuleClass;
	}

}