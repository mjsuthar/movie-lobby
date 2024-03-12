import { cleanEnv, num, port, str } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    JWT_TOKEN_SECRET: str(),
    MONGO_HOST: str(),
    MONGO_DB: str(),
    MONGO_PORT: port(),
  });
}

export default validateEnv;