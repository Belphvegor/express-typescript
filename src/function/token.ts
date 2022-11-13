import jwt from "jsonwebtoken";

import { TOKEN } from "../constant";

export function decodeToken(token: string): any {
  return jwt.verify(token.replace("Bearer ", ""), TOKEN as string);
}

export function accessToken(data: object) {
  return jwt.sign(data, TOKEN as string, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
}
