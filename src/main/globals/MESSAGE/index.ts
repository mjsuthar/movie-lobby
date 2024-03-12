import { GlobalMessageTypes } from "@Types/globals";

const GlobalMessage: GlobalMessageTypes = {
	ERROR: {
		UNAUTHORIZED: "Unauthorized user access"
	},
	SUCCESS: {
		LOGIN_SUCCESS: "Login Successfully."
	}
};

module.exports = GlobalMessage;