import { pool } from "../../config/db";

const getUser = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result;
};

const updatedUser = async (name: string, phone: string, id: string) => {
  const result = await pool.query(
    `
    UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING *
    `,
    [name, phone, id]
  );
  return result;
};

export const userServices = {
  getUser,
  updatedUser,
};
