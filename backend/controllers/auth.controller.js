import {
  StatusCodes,
} from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { handleErrors } from './helpers.js'

function handleSession(req, res, user) {
  // start session
  const sessionId = uuidv4()
  req.session.clientId = sessionId;
  req.session.user = {
    id: user.id,
    email: user.email
  }
  const referrer = req.get('Referrer')
  res.redirect((referrer !== undefined ? req.get('Referrer') : 'http://localhost:3000/') + 'dashboard');
  // res.status(StatusCodes.OK).send({ success: true, message: 'You are now logged in' })
}

class AuthController {
  // Handles auth redirect for all providers i.e github/google
  static async authCallback(req, res) {
    res.redirect('/api/auth/success');
  }

  static async authSuccess(req, res) {
    const email = req.user.emails[0].value
    const displayName = req.user.displayName
    const provider = req.user.provider
    const [user_exists] = await db.select().from(users).where(eq(users.email, email));
    // create account if user with email does not exists
    if (user_exists === undefined) {
      const user_data = await db.insert(users).values({ email, displayName, provider }).returning();
      await handleSession(req, res, user_data)
    } else if (user_exists.provider !== provider) {
      res.redirect('/api/auth/error');
    } else {
      await handleSession(req, res, user_exists)
    }
  }

  static async authError(req, res) {
    res.send("An error occured. Please ensure you are using the right credentials")
  }

  static async signout(req, res) {
    try {
      req.session.destroy();
      res.status(StatusCodes.OK).send({ success: true, message: 'You are now logged out' })
    } catch (error) {
      handleErrors(res, error, null)
    }
  }
}

export default AuthController