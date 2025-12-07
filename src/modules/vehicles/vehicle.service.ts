import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    ` 
    INSERT INTO vehicles(vehicle_name, type,registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result;
};
const getVehicle = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  return result;
};
const getSingleVehicles = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result;
};
const updateVehicle = async (
  daily_rent_price: string,
  availability_status: string,
  id: string
) => {
  const result = await pool.query(
    `
    UPDATE vehicles SET daily_rent_price=$1, availability_status=$2 WHERE id=$3 RETURNING *
    `,
    [daily_rent_price, availability_status, id]
  );
  return result;
};
const deleteVehicle = async (id: string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);
  return result;
};

export const useVehiclesServices = {
  createVehicle,
  getVehicle,
  getSingleVehicles,
  updateVehicle,
  deleteVehicle,
};
