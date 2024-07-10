import dotenv from "dotenv";
dotenv.config();

export const HOST: string = process.env.MYSQL_HOST!;
export const PASS: string = process.env.MYSQL_PASS!;
export const USER: string = process.env.MYSQL_USER!;
export const DATABASE: string = process.env.MYSQL_DATABASE!;
export const SECRET_KEY: string = process.env.SECRET_KEY!;
export const EXPIRES_IN: string = process.env.EXPIRES_IN!;
export const ORIGIN: string = process.env.ORIGIN!;
export const CLOUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME!;
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY!;
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET!;
export const MYSQL_PORT: string = process.env.MYSQL_PORT!;
