import { z } from "zod";
// creating object schema
const signupSchema = z.object({
  // const { username, email, firstname, lastname, avatar, coverImage, password } =
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  firstname: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  lastname: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  avatar: z
    .string({ required_error: "Avatar is required" })
    .regex(/\.(jpg|jpeg)$/, { message: "Avatar must be a .jpg or .jpeg file" }),
  coverImage: z
    .string({ required_error: "Cover image is required" })
    .regex(/\.(jpg|jpeg)$/, {
      message: "Cover image must be a .jpg or .jpeg file",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least of 7 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

const signinSchema = z
  .object({
    // const { email, password } = req.body;
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" })
      .min(3, { message: "Email must be at least of 3 characters" })
      .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(3, { message: "Password must be at least of 7 characters" })
      .max(1024, { message: "Password can't be greater than 1024 characters" }),
  })
  .strict();

const updateUserParamsSchema = z
  .object({
    id: z
      .string() // Assuming it's a string from the params
      .transform((val) => parseInt(val, 10)) // Convert to number
      .refine((id) => !isNaN(id) && id > 0, {
        message: "ID must be a positive integer",
      }),
  })
  .strict();

const updateUserBodySchema = z
  .object({
    name: z.string().min(1, "Name cannot be empty"), // Example user attribute
    email: z.string().email("Invalid email format"), // Another common user attribute
    // You can add more fields as needed
  })
  .strict();

const tweetSchema = z
  .object({
    content: z.string().max(1000, {
      message: "Tweet content cannot be greater than 1000 words",
    }),
  })
  .strict();

const commentSchema = z
  .object({
    content: z
      .string()
      .max(1000, { message: "Comment should be less than 1000 words" }),
  })
  .strict();

export {
  signinSchema,
  signupSchema,
  updateUserParamsSchema,
  updateUserBodySchema,
  tweetSchema,
  commentSchema,
};
