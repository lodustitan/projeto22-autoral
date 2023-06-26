import { Router } from "express";

import controller from "../controllers";

import authMiddleware from "../middlewares/authentication.middleware";

const route = Router();

route
    .get("/gachaList", controller.gacha.getGachaList)
    .all("*", authMiddleware)
    .post("/work", controller.tools.doWork)
    .post("/gacha", controller.gacha.doGacha)
    .get("/inv", controller.users.user_getUserIdols)
    .post("/newquiz", controller.users.newQuiz)
    .post("/complete", controller.users.completeQuiz);

export default route;