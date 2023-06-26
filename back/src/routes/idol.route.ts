import { Router } from "express";

import controller from "../controllers";

import authMiddleware from "../middlewares/authentication.middleware";

const route = Router();

route
    .get("/search", controller.tools.getAllIdols)

export default route;