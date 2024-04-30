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
    .min(0, { message: "avatar must be greater than 0" }),
  coverImage: z
    .string({ required_error: "Avatar is required" })
    .min(0, { message: "avatar must be greater than 0" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least of 7 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

const signinSchema = z.object({
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
});

const updateUserParamsSchema = z.object({
  id: z
    .string() // Assuming it's a string from the params
    .transform((val) => parseInt(val, 10)) // Convert to number
    .refine((id) => !isNaN(id) && id > 0, {
      message: "ID must be a positive integer",
    }),
});

const updateUserBodySchema = z.object({
  name: z.string().min(1, "Name cannot be empty"), // Example user attribute
  email: z.string().email("Invalid email format"), // Another common user attribute
  // You can add more fields as needed
});

const tweetSchema = z.object({
  content: z
    .string()
    .max(1000, { message: "Tweet content cannot be greater than 1000 words" }),
});

const commentSchema = z.object({
  content: z
    .string()
    .max(1000, { message: "Comment should be less than 1000 words" }),
});

export {
  signinSchema,
  signupSchema,
  updateUserParamsSchema,
  updateUserBodySchema,
  tweetSchema,
  commentSchema,
};
