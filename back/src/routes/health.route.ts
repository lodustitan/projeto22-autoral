import { Router, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const route = Router();

route.get("/", (req: Request, res: Response) => { res.send(`servidor rodando na porta: ${process.env.PORT}`) });

export default route;