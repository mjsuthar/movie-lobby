import moment from "moment";
import lodash from "lodash";
import Axios from "axios";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

export interface PluginsTypes {
    moment: moment;
    lodash: lodash;
    path: path;
    fs: fs;
    jwt: jwt;
}