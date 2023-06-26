import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import marketRoute from "./routes/market.route";
import idolRoute from "./routes/idol.route";


const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/market", marketRoute);
app.use("/idol", idolRoute);

export default app;
