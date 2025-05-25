import { Request, Response, NextFunction } from "express";

import {
  signinSchema,
  signupSchema,
  updateUserBodySchema,
  updateUserParamsSchema,
  tweetSchema,
  commentSchema,
} from "../utils/validators/zod-schema.js";

const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  const { error } = signupSchema.safeParse(req.body);
  console.log(req.body);
  console.log("inside validator middleware");
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
};

const validateSignin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = signinSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
};

const validateUpdateQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateUserBodySchema.safeParse(req.body);
  // const { error } = updateUserParamsSchema.safeParse(req.body.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  // if (error) {
  //   return res.status(400).json({ error: error.message });
  // }
  return next();
};

const validateTweet = (req: Request, res: Response, next: NextFunction) => {
  const { error } = tweetSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return next();
};

const validateComment = (req: Request, res: Response, next: NextFunction) => {
  const { error } = commentSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return next();
};

export {
  validateSignup,
  validateSignin,
  validateUpdateQuery,
  validateTweet,
  validateComment,
};
