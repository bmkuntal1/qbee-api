const Joi = require("joi");
const dotenv = require("dotenv");

dotenv.config();

const schema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  DB_HOST: Joi.string().required().description("Database host name"),
  DB_USER: Joi.string().required().description("Database user"),
  DB_PASSWORD: Joi.string().required().description("Database password"),
  DB_NAME: Joi.string().required().description("Database name"),
  DB_DIALECT: Joi.string().required().description("Database dialect"),
});

const { value: envVars, error } = schema.validate(process.env, { allowUnknown: true });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    host: envVars.DB_HOST,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    name: envVars.DB_NAME,
    dialect: envVars.DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
