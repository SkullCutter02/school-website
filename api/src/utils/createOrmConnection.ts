import { createConnection, getConnection, getConnectionOptions } from "typeorm";

export const createOrmConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  return createConnection({ ...connectionOptions, name: "default" });
};

export const closeOrmConnection = async () => {
  const connection = await getConnection("default");
  await connection.close();
};
