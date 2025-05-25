import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../types/User-type.js";
import { SECRET_KEY, EXPIRES_IN } from "../../index.js";

class AuthService {
  static async generateToken(user: User): Promise<string> {
    // console.log("generate Token method", user);
    try {
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
    } catch (error: any) {
      console.log("Error at generateToken method", error.message);
      throw error;
    }
  }

  static async verifyJwtToken(token: string): Promise<string | object> {
    return jwt.verify(token, SECRET_KEY);
  }

  static async getHashPassword(password: string): Promise<string> {
    let hashPassword = await bcrypt.hash(password, 10);
    hashPassword = hashPassword.toString();
    return hashPassword;
  }

  static async isPasswordCorrect(
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashPassword);
  }
}

export default AuthService;
