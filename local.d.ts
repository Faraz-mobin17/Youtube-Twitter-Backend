/**
 * tell typescirpt to grab request obj type from express
 * and add the custom properties to it
 */

import { Request } from "express";
import { User } from "../types/User-type.js";
import { TQuery } from "./src/types/Query-type.ts";
import { TParams } from "./src/types/Params-type.ts";
declare global {
  namespace Express {
    interface Request {
      query?: TQuery;
      params?: TParams;
      cookies: any;
      user?: User;
    }
  }
}
