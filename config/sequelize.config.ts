import dotenv from "dotenv";
dotenv.config();

type DialectOptions = {
  bigNumberStrings?: boolean;
};

type EnvConfig = {
  username?: string | undefined;
  password?: string | undefined;
  database?: string | undefined;
  host?: string | undefined;
  port?: number | undefined;
  dialect: "mysql";
  dialectOptions?: DialectOptions;
};

const config: {
  development: EnvConfig;
  test: EnvConfig;
  production: EnvConfig;
} = {
  development: {
    username: process.env.DB_USER || "database_dev",
    password: process.env.DB_PASS || "database_dev",
    database: process.env.DB_NAME || "database_dev",
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database:  process.env.DB_NAME || "kenangan_test",
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.PROD_DB_PORT || process.env.DB_PORT || "3306"),
    dialect: "mysql",
  },
};

export default config;
