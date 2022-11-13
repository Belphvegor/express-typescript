import { Router, Request, Response, NextFunction } from "express";
import { checkSchema, validationResult } from "express-validator";

import { prismaClient } from "../config";
import { decodeToken } from "../function";
import { Token } from "../interface";
import {
  PostGETSpesificSchema,
  PostPOSTSchema,
  PostPUTSchema,
  PostDELETESchema,
} from "../schema";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const userToken: Token = decodeToken(req.headers.authorization as string);

  const validResult = validationResult(req);

  if (validResult.isEmpty()) {
    try {
      const result = await prismaClient.post.findMany({
        where: {
          userId: userToken.id,
        },
      });

      return res.status(200).json({
        message: "Get Post",
        result,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  } else {
    return res.status(400).json({
      message: "Check your GET Request",
      info: validResult.array(),
    });
  }
});

router.get(
  "/:id",
  checkSchema(PostGETSpesificSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const userToken: Token = decodeToken(req.headers.authorization as string);

    const validResult = validationResult(req);

    if (validResult.isEmpty()) {
      try {
        const { id }: any = req.params;

        const result = await prismaClient.post.findFirst({
          where: {
            id,
            userId: userToken.id,
          },
        });

        return res.status(200).json({
          message: "Get one Post",
          result,
        });
      } catch (error) {
        console.log(error);

        return res.status(500).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({
        message: "Check your GET Request",
        info: validResult.array(),
      });
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const userToken: Token = decodeToken(req.headers.authorization as string);

  try {
    const { ...body }: any = req.body;

    const result = await prismaClient.post.create({
      data: {
        userId: userToken.id,
        ...body,
      },
    });

    return res.status(200).json({
      message: "Create Post",
      result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const userToken: Token = decodeToken(req.headers.authorization as string);

  try {
    const { id }: any = req.params;
    const { ...body }: any = req.body;

    const userValid = await prismaClient.post.count({
      where: {
        id,
        userId: userToken.id,
      },
    });

    if (userValid > 0) {
      const result = await prismaClient.post.update({
        where: {
          id,
        },
        data: {
          userId: userToken.id,
          ...body,
        },
      });

      return res.status(200).json({
        message: "Update Post",
        result,
      });
    } else {
      return res.status(401).json({
        message: "Cannot Update Post",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const userToken: Token = decodeToken(req.headers.authorization as string);

    try {
      const { id }: any = req.params;

      const userValid = await prismaClient.post.count({
        where: {
          id,
          userId: userToken.id,
        },
      });

      if (userValid > 0) {
        const result = await prismaClient.post.delete({
          where: {
            id,
          },
        });

        return res.status(200).json({
          message: "Delete Post",
          result,
        });
      } else {
        return res.status(401).json({
          message: "Cannot Delete Post",
        });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

export default router;
