import { Router } from 'express'
import controller from "../controllers/profile.controller.js";
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const profileRoute = Router();

/**
* @swagger
* /profile/me:
*  get:
*   summary: get current profile
*   description: get current profile
*   tags: [Profile]
*   responses:
*    200:
*     description: Successful response
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
profileRoute.get("/me", authenticationMiddleware, controller.get);

export default profileRoute