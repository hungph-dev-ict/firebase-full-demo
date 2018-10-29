import userModels from "../models/users";

/**
 * Add a user document
 *
 * @param {*} reqBody
 * @param {*} res
 * @returns
 */
async function addUser(reqBody, res)
{
  return userModels.addUser(reqBody, res);
}

/**
 * Get all users document
 *
 * @returns
 */
async function getAllUsers(res)
{
  return userModels.getAllUsers(res);
}

/**
 * Get the user document
 *
 * @param {*} reqId
 * @param {*} res
 * @returns
 */
async function getUser(reqId, res)
{
  return userModels.getUser(reqId, res);
}

/**
 *
 *
 * @param {*} reqId
 * @param {*} req
 * @param {*} body
 * @param {*} res
 * @returns
 */
async function updateUser(reqId, reqBody, res)
{
  return userModels.updateUser(reqId,reqBody, res);
}

/**
 * Delete the user document
 *
 * @param {*} reqId
 * @param {*} res
 * @returns
 */
async function deleteUser(reqId, res)
{
  return userModels.deleteUser(reqId, res);
}

export default {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}
 