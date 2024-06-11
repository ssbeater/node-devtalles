import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JWTAdapter {
  static async generateToken(
    payload: { [key: string]: any },
    duration: string = "2h"
  ) {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }

  static verifyToken(token: string): { [key: string]: any } {
    throw new Error("Method not implemented.");
  }
}
