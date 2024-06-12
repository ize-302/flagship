import { Router } from 'express'
import controller from "../controllers/projects.controller.js";
import authenticationMiddleware from '../middlewares/authentication.middleware.js';


const projectsRoute = Router();

/**
* @swagger
* /projects:
*  post:
*   summary: Create a project
*   description: Project creation by user in session
*   tags: [Projects]
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        name:
*         type: string
*   responses:
*    201:
*     description: Successful response. Project created
*    400:
*     description: Could not validate request body
*    401:
*     description: Unauthorised
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
projectsRoute.post('/', authenticationMiddleware, controller.createProject)


/**
* @swagger
* /projects/{id}:
*  get:
*   summary: Get a project by ID
*   description: Get a project by ID
*   tags: [Projects]
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
*     description: Project not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
projectsRoute.get('/:id', authenticationMiddleware, controller.getProjectById)

/**
* @swagger
* /projects/{id}:
*  put:
*   summary: Update a project
*   description: Update a project
*   tags: [Projects]
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
*   responses:
*    200:
*     description: Successful response
*    401:
*     description: Unauthorised
*    404:
*     description: Project not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
projectsRoute.put('/:id', authenticationMiddleware, controller.updateProject)

/**
* @swagger
* /projects/{id}:
*  delete:
*   summary: Delete a project by ID
*   description: Delete a project by ID
*   tags: [Projects]
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
*     description: Project not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
projectsRoute.delete('/:id', authenticationMiddleware, controller.removeProject)

/**
* @swagger
* /projects:
*  get:
*   summary: List projects by user in session
*   description: List projects by user in session
*   tags: [Projects]
*   responses:
*    200:
*     description: Successful response
*    401:
*     description: Unauthorised
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
projectsRoute.get('/', authenticationMiddleware, controller.listProjects)

/**
* @swagger
* /projects/{id}/environments:
*  get:
*   summary: Get list of environments by project ID
*   description: Get list of environments by project ID
*   tags: [Projects]
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
*     description: Project not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
projectsRoute.get('/:id/environments', authenticationMiddleware, controller.listProjectEnvironments)

/**
* @swagger
* /projects/{id}/flags:
*  get:
*   summary: Get list of flags by project ID
*   description: Get list of flags by project ID
*   tags: [Projects]
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
*     description: Project not found
*    500:
*     description: Internal server error
*   security:
*    - cookieAuth: []
*/
projectsRoute.get('/:id/flags', authenticationMiddleware, controller.listProjectFlags)

export default projectsRoute