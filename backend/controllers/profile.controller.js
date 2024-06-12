import {
  StatusCodes,
} from 'http-status-codes';

import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { handleErrors } from "./helpers.js";
import { eq } from 'drizzle-orm';

class ProfileController {
  static async get(req, res) {
    try {
      const { user: user_session_data } = req.session
      const me = await db.select().from(users).where(eq(users.id, user_session_data.id))
      res
        .status(StatusCodes.OK)
        .json({
          success: true, data: me
        });

    } catch (error) {
      handleErrors(res, error, null)
    }
  }
}

export default ProfileController