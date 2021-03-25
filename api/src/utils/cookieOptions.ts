import { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 2_592_000_000,
  sameSite: "strict",
};

export default cookieOptions;
