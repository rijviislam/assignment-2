import { NextFunction, Request, Response } from "express";

const verify = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Bhai wait id card ansen ?");
};

export default verify;
