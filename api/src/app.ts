import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";

const app: express.Application = express();

app.use(express.json());

const PORT = 5000;

createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
