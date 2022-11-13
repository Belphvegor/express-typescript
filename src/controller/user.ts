import { Router, Request, Response, NextFunction } from "express";
import { checkSchema, validationResult } from "express-validator";
import { compare, genSalt, hash } from "bcryptjs";

import { prismaClient } from "../config";
import { RegisterUserSchema, LoginUserSchema } from "../schema";
import { accessToken } from "../function";

const router = Router();

router.post(
  "/register",
  checkSchema(RegisterUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const validResult = validationResult(req);

    if (validResult.isEmpty()) {
      try {
        const { username, password }: any = req.body;

        const getUserData = await prismaClient.user.findFirst({
          where: {
            username,
          },
          select: {
            username: true,
          },
        });

        if (getUserData === null) {
          const salt = await genSalt(10);
          const hashedPass = await hash(password, salt);

          const createUser = await prismaClient.user.create({
            data: {
              username,
              password: hashedPass,
            },
            select: {
              username: true,
            },
          });

          return res.status(200).json({
            message: "Create user Success",
            user: createUser,
          });
        } else {
          return res.status(400).json({
            message: "Create user Failed, username has been used",
            getUserData,
          });
        }
      } catch (error) {
        console.log(error);

        return res.status(200).json({
          message: "Something went Wrong",
          data: error,
        });
      }
    } else {
      return res.status(400).json({
        message: "Check your POST Request",
        info: validResult.array(),
      });
    }
  }
);

router.post(
  "/login",
  checkSchema(LoginUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const validResult = validationResult(req);

    if (validResult.isEmpty()) {
      try {
        const { username, password }: any = req.body;

        const getUserData = await prismaClient.user.findFirst({
          where: {
            username,
          },
          select: {
            id: true,
            username: true,
            password: true,
          },
        });

        if (getUserData !== null) {
          const comparePass = await compare(password, getUserData.password);

          if (comparePass === true) {
            return res.status(200).json({
              message: "Login Successful",
              token: accessToken({
                id: getUserData.id,
                username: getUserData.username,
              }),
            });
          } else {
            return res.status(400).json({
              message: "Password doesn't match with user",
            });
          }
        } else {
          return res.status(400).json({
            message: "Login Fail, no user found",
          });
        }
      } catch (error) {
        console.log(error);

        return res.status(200).json({
          message: "Something went Wrong",
          data: error,
        });
      }
    } else {
      return res.status(400).json({
        message: "Check your POST Request",
        info: validResult.array(),
      });
    }
  }
);

export default router;
