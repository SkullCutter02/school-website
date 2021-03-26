import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";

import { createOrmConnection } from "./utils/createOrmConnection";

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));

const PORT = process.env.NODE_ENV !== "test" ? 5000 : 5001;

createOrmConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
