import { Router } from 'express'

import authRoute from "./auth.routes.js";
import projectsRoute from './projects.routes.js';
import environmentsRoute from './environments.routes.js'
import flagsRoute from './flags.routes.js'

const mainRoute = Router();

mainRoute.get("/", (req, res) =>
  res.status(200).send('Hello from the backend!')
);

mainRoute.use("/auth", authRoute);
mainRoute.use("/projects", projectsRoute);
mainRoute.use("/environments", environmentsRoute);
mainRoute.use("/flags", flagsRoute);

export default mainRoute