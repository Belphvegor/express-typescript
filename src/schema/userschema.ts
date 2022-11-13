import type { Schema } from "express-validator";

export const RegisterUserSchema: Schema = {
  username: {
    in: "body",
    isString: true,
    isLength: {
      options: {
        min: 4,
        max: 10,
      },
    },
  },
  password: {
    in: "body",
    isString: true,
    isLength: {
      options: {
        min: 4,
      },
    },
  },
};

export const LoginUserSchema: Schema = {
  username: {
    in: "body",
    isString: true,
    isLength: {
      options: {
        min: 4,
        max: 10,
      },
    },
  },
  password: {
    in: "body",
    isString: true,
    isLength: {
      options: {
        min: 4,
      },
    },
  },
};
