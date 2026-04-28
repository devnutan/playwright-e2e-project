import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  baseUrl: getEnv('BASE_URL', 'https://www.saucedemo.com'),
  users: {
    standard: {
      username: getEnv('STANDARD_USERNAME', 'standard_user'),
      password: getEnv('STANDARD_PASSWORD', 'secret_sauce'),
    },
    lockedOut: {
      username: getEnv('LOCKED_OUT_USERNAME', 'locked_out_user'),
      password: getEnv('LOCKED_OUT_PASSWORD', 'secret_sauce'),
    },
    invalid: {
      username: getEnv('INVALID_USERNAME', 'invalid_user'),
      password: getEnv('INVALID_PASSWORD', 'wrong_password'),
    },
  },
};