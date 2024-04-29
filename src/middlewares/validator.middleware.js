import {
  signinSchema,
  signupSchema,
  updateUserBodySchema,
  updateUserParamsSchema,
} from "../schemas/zod-schema.js";

const validateSignup = (req, res, next) => {
  const { error } = signupSchema.safeParse(req.body);
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

export { validateSignup, validateSignin, validateUpdateQuery };
