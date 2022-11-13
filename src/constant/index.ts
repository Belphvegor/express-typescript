import * as dotenv from "dotenv";

dotenv.config();

export const SERVER_PORT = process.env.PORT;

export const TOKEN = process.env.TOKEN;

export const noAuthPath: string[] = [
  "/user/register",
  "/user/login",
  "/status",
  "/",
];
