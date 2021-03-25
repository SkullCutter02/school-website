import { Request, Response } from "express";
import type { TypeOf } from "yup";
import * as argon2 from "argon2";

import { logInSchema } from "../schemas/authSchema";
import Admin from "../entity/Admin";
import JWTService from "../services/JWTService";
import cookieOptions from "../utils/cookieOptions";
import { AuthData } from "../types/AuthData";

const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password }: TypeOf<typeof logInSchema> = req.body;
      const admin = await Admin.findOneOrFail({ username });

      const isValidPassword = await argon2.verify(admin.hash, password);

      if (isValidPassword) {
        const token = await JWTService.getToken(admin.uuid);

        res.cookie("token", token, cookieOptions);
        return res.json(admin);
      } else {
        return res.status(403).json({ msg: "Invalid credentials" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  logout: (req: Request, res: Response) => {
    try {
      res.clearCookie("token");
      return res.json({ logout: "Successful" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const authData: AuthData = res.locals.authData;
      const admin = await Admin.findOneOrFail({ uuid: authData.uuid });
      return res.json(admin);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },
};

export default AuthController;
