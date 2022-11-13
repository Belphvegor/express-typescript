import type { Schema } from "express-validator";

export const PostGETPostSchema: Schema = {};

export const PostGETSpesificSchema: Schema = {
  id: {
    in: "params",
    isUUID: true,
  },
};

export const PostPOSTSchema: Schema = {
  title: {
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 255,
      },
    },
  },
  body: {
    isString: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  isPosted: {
    isBoolean: true,
  },
};

export const PostPUTSchema: Schema = {
  id: {
    isUUID: true,
  },
  title: {
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 255,
      },
    },
  },
  body: {
    isString: true,
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  isPosted: {
    isBoolean: true,
  },
};

export const PostDELETESchema: Schema = {
  id: {
    isUUID: true,
  },
};
