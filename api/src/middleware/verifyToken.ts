import { Request, Response, NextFunction } from "express";

import JWTService from "../services/JWTService";

const verifyToken = () => async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (typeof token !== "undefined") {
    res.locals.authData = await JWTService.verify(token);
    next();
  } else {
    return res.status(403).json({ msg: "Access forbidden" });
  }
};

export default verifyToken;
