import * as jwt from "jsonwebtoken";

const JWTService = {
  getToken: (uuid: string): string => {
    let token: string;

    jwt.sign({ uuid }, "secretkey", (err: Error, jwtToken: string) => {
      if (err) throw err;

      token = jwtToken;
    });

    return token;
  },
};

export default JWTService;
