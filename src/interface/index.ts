import type { JwtPayload } from "jsonwebtoken";

export interface Token extends JwtPayload {
  id: string;
}

export interface ResopnseData {
  statuscode: number;
  data: {
    message: string;
    data?: any;
    info?: any;
  };
}
