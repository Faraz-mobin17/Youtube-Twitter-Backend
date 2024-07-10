import {
  signinSchema,
  signupSchema,
  updateUserBodySchema,
  updateUserParamsSchema,
  tweetSchema,
  commentSchema,
} from "../schemas/zod-schema.js";

const validateSignup = (req, res, next) => {
  const { error } = signupSchema.safeParse(req.body);
  console.log(req.body);
  console.log("inside validator middleware");
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

const validateSignin = (req, res, next) => {
  const { error } = signinSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

const validateUpdateQuery = (req, res, next) => {
  const { errorBody } = updateUserBodySchema.safeParse(req.body);
  const { errorId } = updateUserParamsSchema.safeParse(req.body.id);
  if (errorBody) {
    return res.status(400).json({ error: errorBody.message });
  }
  if (errorId) {
    return res.status(400).json({ error: errorId.message });
  }
  next();
};

const validateTweet = (req, res, next) => {
  const { error } = tweetSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

const validateComment = (req, res, next) => {
  const { error } = commentSchema.safeParse(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};

export {
  validateSignup,
  validateSignin,
  validateUpdateQuery,
  validateTweet,
  validateComment,
};
