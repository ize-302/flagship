import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import yup from 'yup'
import { eq, and } from "drizzle-orm";

import { db } from "../db/index.js";
import { environments, flags, projects, flags_columns } from "../db/schema.js";
import { handleErrors } from './helpers.js'

const createProjectSchema = yup.object({
  name: yup.string().max(100, 'Message cannot be more than 100 characters').required()
})

const fetchColumnData = async (environment_id, flag_id) => {
  const [result] = await db.select({
    environment_name: environments.name,
    environment_id: environments.id,
    environment_updated_at: environments.updated,
    flag_is_active: flags_columns.is_active,
    flag_updated_at: flags_columns.updated
  }).from(environments).where(and(eq(environments.id, environment_id)))
    .leftJoin(flags_columns, and(eq(flags_columns.environment_id, environments.id), eq(flags_columns.flag_id, flag_id)))
  return { ...result, flag_is_active: result.flag_is_active === null ? false : result.flag_is_active, flag_updated_at: result.flag_updated_at === null ? result.environment_updated_at : result.flag_updated_at }
}

const fetchCorresponsingEnvironmentData = async (flag_id, all_flags, all_environments_ids) => {
  const result = await Promise.all(
    all_environments_ids.map(environment_id => fetchColumnData(environment_id, flag_id))
  );

  const data = {
    flag: all_flags.find(flag => flag.id === flag_id),
    columns: result.sort((a, b) => (a.environment_updated_at - b.environment_updated_at))
  }

  return data
}

class ProjectsController {
  static async createProject(req, res) {
    try {
      const { user: user_session_data } = req.session
      await createProjectSchema.validate(req.body)
      const { name } = req.body
      const [project] = await db
        .insert(projects)
        .values({ owner_id: user_session_data.id, name }).returning()
      res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: project });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async getProjectById(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params

      const [project] = await db.select().from(projects).where(and(eq(projects.id, id), eq(projects.owner_id, user_session_data.id)))
      if (project === undefined) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Project ' + ReasonPhrases.NOT_FOUND });
      res
        .status(StatusCodes.OK)
        .json({ success: true, data: { ...project } });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async updateProject(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params

      await createProjectSchema.validate(req.body)
      const { name } = req.body

      const [updateResponse] = await db.update(projects).set({ name }).where(and(eq(projects.id, id), eq(projects.owner_id, user_session_data.id))).returning()
      if (updateResponse === undefined) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Project ' + ReasonPhrases.NOT_FOUND });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Project has been updated', data: { ...updateResponse } });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async removeProject(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params

      const [deleteResponse] = await db.delete(projects).where(and(eq(projects.id, id), eq(projects.owner_id, user_session_data.id))).returning()
      if (deleteResponse === undefined) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Project ' + ReasonPhrases.NOT_FOUND });
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Project has been deleted' });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async listProjects(req, res) {
    try {
      const { user: user_session_data } = req.session
      const all_projects = await db.select().from(projects).where(eq(projects.owner_id, user_session_data.id))
      res
        .status(StatusCodes.OK)
        .json({ success: true, data: [...all_projects] });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async listProjectEnvironments(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params // project id
      const all_environments = await db.select().from(environments).where(and(eq(environments.owner_id, user_session_data.id), eq(environments.project_id, id)))
      res
        .status(StatusCodes.OK)
        .json({ success: true, data: [...all_environments.sort((a, b) => a.updated - b.updated)] });
    } catch (error) {
      handleErrors(res, error, null)
    }
  }

  static async listProjectFlags(req, res) {
    try {
      const { user: user_session_data } = req.session
      const { id } = req.params // project id

      // all flags
      const all_flags = await db.select().from(flags).where(and(eq(flags.owner_id, user_session_data.id), eq(flags.project_id, id)))
      // extract all ids of existing flags
      const all_flags_ids = all_flags.map(item => item.id)

      // all environments 
      const all_environments = await db.select().from(environments).where(and(eq(environments.owner_id, user_session_data.id), eq(environments.project_id, id)))
      // extract all ids of existing environments
      const all_environments_ids = all_environments.map(item => item.id)

      const result = await Promise.all(
        all_flags_ids.map(flag_id => fetchCorresponsingEnvironmentData(flag_id, all_flags, all_environments_ids))
      );

      res
        .status(StatusCodes.OK)
        .json({ success: true, data: result });
    } catch (error) {
      console.log(error)
      handleErrors(res, error, null)
    }
  }
}

export default ProjectsController