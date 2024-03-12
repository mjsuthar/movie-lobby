import "dotenv/config";
import moduleAlias from "module-alias";
// import moment from "moment-timezone";
// moment.tz.setDefault("Asia/Calcutta");
if (process.env.BUILD_ENV === "dev") {
    moduleAlias();
}

//import "module-alias/register";
import App from "@App";


import validateEnv from "@Utils/validateEnv";
validateEnv();
const app = new App();
app.listen();


