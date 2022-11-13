import { Router, Request, Response, NextFunction } from "express";

import { ResopnseData } from "../interface";

const router = Router();

let responseData: ResopnseData;

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  responseData = {
    statuscode: 200,
    data: {
      message: "Status Ok!",
    },
  };

  return res.status(responseData.statuscode).json(responseData.data);
});

export default router;
