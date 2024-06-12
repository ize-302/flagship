import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import { eq, and } from "drizzle-orm";
import yup from 'yup'

import { db } from "../db/index.js";
import { flags, flags_columns } from "../db/schema.js";
import { handleErrors } from './helpers.js'

const createFlagSchema = yup.object({
  name: yup.string().required(),
  key: yup.string().matches(/^[A-Z_]+$/, 'Only uppercase letters and underscores are allowed for key value').required(),
  project_id: yup.string().required()
})

const updateFlagSchema = yup.object({
  name: yup.string().required(),
  key: yup.string().matches(/^[A-Z_]+$/, 'Only uppercase letters and underscores are allowed for key value').required(),
})

class FlagsController {
  static async createFlag(req, res) {
    try {
      const { user: user_session_data } = req.session
      await createFlagSchema.validate(req.body)

      const { name, key, project_id } = req.body
      const [flag] = await db
        .insert(flags)
        .values({ owner_id: user_session_data.id, name, key, project_id }).returning()
      res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: flag });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async updateFlag(req, res) {
    try {
      const { user: user_session_data } = req.session
      await updateFlagSchema.validate(req.body)
      const { id } = req.params
      const { name, key } = req.body

      const [updateResponse] = await db.update(flags).set({ name, key }).where(and(eq(flags.id, id), eq(flags.owner_id, user_session_data.id))).returning()
      if (updateResponse === undefined) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Flag ' + ReasonPhrases.NOT_FOUND });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Flag has been updated', data: { ...updateResponse } });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async toggleFlagColumn(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params
      const { is_active, environment_id } = req.body

      const [result] = await db.select().from(flags_columns).where(and(eq(flags_columns.flag_id, id), eq(flags_columns.environment_id, environment_id)))

      if (result === undefined) {
        await db
          .insert(flags_columns)
          .values({ is_active: is_active, owner_id: user_session_data.id, flag_id: id, environment_id: environment_id })
      } else {
        await db.update(flags_columns).set({ is_active }).where(and(eq(flags_columns.flag_id, id), eq(flags_columns.environment_id, environment_id), eq(flags_columns.owner_id, user_session_data.id))).returning()
      }

      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Flag column has been updated', });
    } catch (error) {
      console.log(error)
      handleErrors(res, error, null)
    }
  }

  static async removeFlag(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params

      const [deleteResponse] = await db.delete(flags).where(and(eq(flags.id, id), eq(flags.owner_id, user_session_data.id))).returning()
      if (deleteResponse === undefined) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Flag ' + ReasonPhrases.NOT_FOUND });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Flag has been deleted' });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }
}

export default FlagsController