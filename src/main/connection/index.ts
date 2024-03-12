import fs from "fs";
import path from "path";
export class ConnectionConfigLoader {
	constructor() {
	}

	public async index() {
		try {
			const loaderClasses = await fs.readdirSync(__dirname)
				.filter(file =>
					((file.indexOf(".") !== 0) && !file.includes("index"))
				);
			const mappedData = await Promise.all(
				loaderClasses.map(async file => {
					const result = await this.importModule(file);
					return result;
				})
			);
			return mappedData;


		} catch (err) {
			console.log("connection loader", err);
		}
	}

	public async importModule(file: string) {
		let importModuleClass = await import(path.join(__dirname, file))
			.then(module => {
				return module?.default;
			});
		return importModuleClass;
	}

}