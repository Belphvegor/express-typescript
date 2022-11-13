import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { corsConfig } from "./config";
import { SERVER_PORT } from "./constant";
import { expressJWTMiddleware, morganMiddleware } from "./middleware";

import rootRoutes from "./routes";

async function main() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors(corsConfig));
  app.use(cookieParser());
  app.use(expressJWTMiddleware);
  app.use(morganMiddleware);

  app.use(rootRoutes);

  app.listen(SERVER_PORT, () => {
    console.log(`Server Up and Running at:${SERVER_PORT}`);
  });
}

main().catch((e) => {
  console.log(e);
});
