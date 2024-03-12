import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authMiddleware(requestObj: Request, responseObj: Response, next: NextFunction) {
	try {
		const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
		let token: string = requestObj.headers[APP.CONFIGS.authorizationKey] as string;
		if (token) {
			if (token.startsWith("Bearer")) {
				token = token.slice(6, token.length);
			}
			jwt.verify(token, JWT_TOKEN_SECRET, (err: any, decoded: any) => {
				if (err) {
					APP.GLOBALS.FN.sendErrorResponse(requestObj, responseObj, {}, 200, err);
				} else {
					requestObj.decoded = { email: decoded.email, isAdmin: decoded.isAdmin };
					APP.user = requestObj.decoded;
					next();
				}
			});
		} else {
			APP.GLOBALS.FN.sendErrorResponse(requestObj, responseObj, {}, 401, APP.GLOBALS.MESSAGE.ERROR.UNAUTHORIZED);
		}
	} catch (error) {
		APP.GLOBALS.FN.sendErrorResponse(requestObj, responseObj, {}, 400, `There was an error checktoken middleware`);
	}
}

module.exports = authMiddleware;