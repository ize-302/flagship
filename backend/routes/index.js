import { Router } from 'express'

import authRoute from "./auth.route.js";

const mainRoute = Router();

mainRoute.get("/", (req, res) =>
  res.status(200).send('Hello from the backend!')
);

mainRoute.use("/", authRoute);

export default mainRoute