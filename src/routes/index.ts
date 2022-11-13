import { Router } from "express";

const router = Router();

import statusController from "../controller/status";
router.use("/status", statusController);

import userController from "../controller/user";
router.use("/user", userController);

import postController from "../controller/post";
router.use("/post", postController);

export default router;
