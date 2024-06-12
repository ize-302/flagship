import { Router } from 'express'
import controller from "../controllers/flags.controller.js";
import authenticationMiddleware from '../middlewares/authentication.middleware.js';

const flagsRoute = Router();

/**
* @swagger
* /flags:
*  post:
*   summary: Create a flag
*   description: Flag creation by user in session
*   tags: [Flags]
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        name:
*         type: string
*        key:
*         type: string
*        project_id:
*         type: string
*   responses:
*    201:
*     description: Successful response. Flag created
*    400:
*     description: Could not validate request body
*    401:
*     description: Unauthorised
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
flagsRoute.post('/', authenticationMiddleware, controller.createFlag)

/**
* @swagger
* /flags/{id}:
*  put:
*   summary: Update a flag
*   description: Update a flag
*   tags: [Flags]
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
*        key:
*         type: string
*   responses:
*    200:
*     description: Successful response
*    401:
*     description: Unauthorised
*    404:
*     description: Flag not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
flagsRoute.put('/:id', authenticationMiddleware, controller.updateFlag)

/**
* @swagger
* /flags/{id}/column:
*  put:
*   summary: Toggle a flag column ON or OFF
*   description: Toggle a flag column ON or OFF
*   tags: [Flags]
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
*        is_active:
*         type: boolean
*        environment_id:
*         type: string
*   responses:
*    200:
*     description: Successful response
*    401:
*     description: Unauthorised
*    404:
*     description: Flag not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
flagsRoute.put('/:id/column', authenticationMiddleware, controller.toggleFlagColumn)

/**
* @swagger
* /flags/{id}:
*  delete:
*   summary: Delete a flag by ID
*   description: Delete a flag by ID
*   tags: [Flags]
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
flagsRoute.delete('/:id', authenticationMiddleware, controller.removeFlag)


export default flagsRoute