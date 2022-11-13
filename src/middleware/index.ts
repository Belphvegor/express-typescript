import { expressjwt } from "express-jwt";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";

import { TOKEN, noAuthPath } from "../constant";

export const expressJWTMiddleware = expressjwt({
  secret: TOKEN as string,
  algorithms: ["HS256"],
}).unless({
  path: noAuthPath,
});

export const morganMiddleware = morgan("combined", {
  stream: rfs.createStream("activity.log", {
    interval: "1d",
    path: "log",
  }),
});
