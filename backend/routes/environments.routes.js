import { Router } from 'express'
import controller from "../controllers/environments.controller.js";
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const environmentsRoute = Router();

/**
* @swagger
* /environments:
*  post:
*   summary: Create an environment
*   description: Environment creation by user in session
*   tags: [Environments]
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        name:
*         type: string
*        color:
*         type: string
*        project_id:
*         type: string
*   responses:
*    201:
*     description: Successful response. Environment created
*    400:
*     description: Could not validate request body
*    401:
*     description: Unauthorised
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
environmentsRoute.post('/', authenticationMiddleware, controller.createEnvironment)

/**
* @swagger
* /environments/{id}:
*  put:
*   summary: Update an environment
*   description: Update an environment
*   tags: [Environments]
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      required: true
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        name:
*         type: string
*        color:
*         type: string
*   responses:
*    200:
*     description: Successful response
*    401:
*     description: Unauthorised
*    404:
*     description: Environment not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
environmentsRoute.put('/:id', authenticationMiddleware, controller.updateEnvironment)

/**
* @swagger
* /environments/{id}:
*  delete:
*   summary: Delete a environment by ID
*   description: Delete a environment by ID
*   tags: [Environments]
*   parameters:
*    - in: path
*      name: id
*      schema:
*       type: string
*      required: true
*   responses:
*    200:
*     description: Successful response
*    401:
*     description: Unauthorised
*    404:
*     description: Environment not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
environmentsRoute.delete('/:id', authenticationMiddleware, controller.removeEnvironment)


export default environmentsRoute