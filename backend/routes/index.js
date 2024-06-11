import { Router } from 'express'

import authRoute from "./auth.routes.js";

const mainRoute = Router();

mainRoute.get("/", (req, res) =>
  res.status(200).send('Hello from the backend!')
);

mainRoute.use("/auth", authRoute);

export default mainRoute