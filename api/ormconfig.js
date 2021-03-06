module.exports = [
  {
    name: "default",
    type: "postgres",
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    entities: ["src/entity/**/*.ts", "build/entity/**/*.js"],
    migrations: ["src/migration/**/*.ts", "build/migration/**/*.js"],
    subscribers: ["src/subscriber/**/*.ts", "build/subscriber/**/*.js"],
    seeds: ["src/seeds/**/*.ts", "build/seeds/**/*.js"],
    factories: ["src/factories/**/*.ts", "build/factories/**/*.js"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
  {
    name: "test",
    type: "postgres",
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: "test_db",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    seeds: ["src/seeds/**/*.ts"],
    factories: ["src/factories/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
];
