import { eq } from "drizzle-orm"
import { users } from "../db/schema.js"
import { db } from "../db/index.js"
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';

/**
 * DB query to return user details if user exists, it acepts username as argument
 *
 * @async
 * @param {string} username
 * @returns {unknown}
 */
export const isUserExists = async (username) => {
  const [user] = await db.select({ id: users.id, username: users.username, password: users.password }).from(users).where(eq(users.username, username));
  return user
}


/**
 * General error handler
 *
 * @async
 * @param {*} res
 * @param {*} error
 * @param {string} customErrorMessage
 * @returns {unknown}
 */
export const handleErrors = async (res, error, customErrorMessage) => {
  if (error.errors) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.errors[0] ?? customErrorMessage });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}
