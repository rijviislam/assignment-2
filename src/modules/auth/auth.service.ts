import { pool } from "../../config/db";

const loginUserIntoDB = async (email: string, password: string) => {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
  return user;
};

export const authServices = {
  loginUserIntoDB,
};
