import { Router } from 'express'
import controller from "../controllers/auth.controller.js";
import passport from 'passport'

const authRoute = Router();

/**
* @swagger
* /auth/github:
*  get:
*   summary: Github Auth
*   description: Allows user to sign in with github
*   tags: [Authentication]
*   responses:
*    200:
*     description: Successful response
*/
authRoute.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
authRoute.get('/github/callback', passport.authenticate('github', { failureRedirect: '/error' }), controller.authCallback)

/**
* @swagger
* /auth/google:
*  get:
*   summary: Google Auth
*   description: Allows user to sign in with google
*   tags: [Authentication]
*   responses:
*    200:
*     description: Successful response
*/
authRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
authRoute.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error' }), controller.authCallback)


authRoute.get('/success', controller.authSuccess)
authRoute.get('/error', controller.authError)

/**
* @swagger
* /signout:
*  post:
*   summary: Signout out user
*   description: Terminate user session
*   tags: [Authentication]
*   responses:
*    200:
*     description: Successful responsepos
*    500:
*     description: Internal server error
*/
authRoute.post("/signout", controller.signout);

export default authRoute