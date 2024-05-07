const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    POSTGRES_USER_NAME: Joi.string().required().description('Postgress Username is required!'),
    POSTGRES_PASSWORD: Joi.string().required().description('Postgress Password is required!'),
    POSTGRES_HOST: Joi.string().required().description('Postgress Host name is required!'),
    POSTGRES_PORT: Joi.number().required().description('Postgress Port is required!'),
    POSTGRES_DATABASE: Joi.string().required().description('Postgress Database name is required!'),
    POSTGRES_MAX_CONN_POOL: Joi.number().required().description('Postgress Maximum connection pool number is required!'),
    POSTGRES_IDLE_TIMEOUT: Joi.number().required().description('Postgress Idle timeout is required!'),
    POSTGRES_CONN_TIMEOUT: Joi.number().required().description('Postgress Connection timeout is required!'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  postgres: {
    userName: envVars.POSTGRES_USER_NAME,
    pswd: envVars.POSTGRES_PASSWORD,
    host: envVars.POSTGRES_HOST,
    port: envVars.POSTGRES_PORT,
    database: envVars.POSTGRES_DATABASE,
    idleTimeOut: envVars.POSTGRES_IDLE_TIMEOUT,
    connTimeOut: envVars.POSTGRES_CONN_TIMEOUT,
    maxConn: envVars.POSTGRES_MAX_CONN_POOL,
  },
};
