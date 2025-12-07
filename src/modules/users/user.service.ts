import { pool } from "../../config/db";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  //   const hashedPass = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) 
   VALUES($1, $2, $3, $4, $5) 
   RETURNING *`,
    [name, email, password, phone, role]
  );

  return result;
};

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

export const userServices = {
  createUser,
  getUser,
  getSingleUser,
};
