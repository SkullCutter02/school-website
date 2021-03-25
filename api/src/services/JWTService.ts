import * as jwt from "jsonwebtoken";

import { AuthData } from "../types/AuthData";

const JWTService = {
  getToken: (uuid: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      jwt.sign({ uuid }, "secretkey", (err: Error, token: string) => {
        if (err) reject(err);

        resolve(token);
      });
    });
  },

  verify: (token: string): Promise<AuthData> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, "secretkey", (err: Error, authData: AuthData) => {
        if (err) reject(err);

        resolve(authData);
      });
    });
  },
};

export default JWTService;
