import {
  StatusCodes,
} from 'http-status-codes';
import yup from 'yup'
import { eq, and } from "drizzle-orm";

import { db } from "../db/index.js";
import { environments } from "../db/schema.js";
import { handleErrors } from './helpers.js'

const createEnvironmentSchema = yup.object({
  name: yup.string().max(100, 'Message cannot be more than 100 characters').required(),
  color: yup.string()
})

class EnvironmentsController {
  static async createEnvironment(req, res) {
    try {
      const { user: user_session_data } = req.session
      await createEnvironmentSchema.validate(req.body)

      const { name, color, project_id } = req.body
      const [environment] = await db
        .insert(environments)
        .values({ owner_id: user_session_data.id, name, color, project_id }).returning()
      res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: environment });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async updateEnvironment(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params

      await createEnvironmentSchema.validate(req.body)
      const { name, color } = req.body

      const [updateResponse] = await db.update(environments).set({ name, color }).where(and(eq(environments.id, id), eq(environments.owner_id, user_session_data.id))).returning()
      if (updateResponse === undefined) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Environment ' + ReasonPhrases.NOT_FOUND });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Environment has been updated', data: { ...updateResponse } });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async removeEnvironment(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params

      const [deleteResponse] = await db.delete(environments).where(and(eq(environments.id, id), eq(environments.owner_id, user_session_data.id))).returning()
      if (deleteResponse === undefined) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Environment ' + ReasonPhrases.NOT_FOUND });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Environment has been deleted' });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }
}

export default EnvironmentsController