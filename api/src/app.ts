import "reflect-metadata";

import { createOrmConnection } from "./utils/createOrmConnection";

createOrmConnection()
  .then(() => {
    import("./server");
  })
  .catch((err) => console.log(err));
