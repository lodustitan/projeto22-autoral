import { Router } from "express";

import controller from "../controllers";
import middleware from "../middlewares";

import Schemas from "../schemas/model";
import authMiddleware from "../middlewares/authentication.middleware";
import validateSchema from "../middlewares/validateSchema.middleware";

const route = Router();

route
    .post("/authsession", authMiddleware, controller.auth.auth_session)
    .post("/signin", middleware.login, controller.auth.auth_login)
    .post("/signup", middleware.register, controller.auth.auth_register);

export default route;