import { GlobalFunctionTypes } from "@Types/globals";

const GlobalFunction: GlobalFunctionTypes = {
	sendSuccessResponse: function (request: any, response: any, data: any = {}, statusCode: number = 200, message: string = "") {
		response.status(statusCode).send({
			success: true,
			StatusMsg: message,
			ResponseType: "SUCCESS",
			data: data
		});
	},
	sendErrorResponse: function (request: any, response: any, data: any = {}, statusCode: number = 400, message: string = "") {
		response.status(statusCode).send({
			success: false,
			ResponseType: "ERROR",
			StatusMsg: message,
			data: data
		});
	},
	currentTimeStamp: function () {
		return APP.PLUGINS.moment.tz(new Date(), "Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";

	}
};
module.exports = GlobalFunction;