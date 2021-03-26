import express from "express";
import cookieParser from "cookie-parser";

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));

const PORT = process.env.NODE_ENV !== "test" ? 5000 : 5001;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default server;
