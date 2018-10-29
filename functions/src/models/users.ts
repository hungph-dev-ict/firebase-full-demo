import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions';
import * as firebaseHelper from 'firebase-functions-helper'

export const adminApp = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore(adminApp);
firestore.settings({ timestampsInSnapshots: true });

const db = admin.firestore();

const usersCollection = 'users';


/**
 *
 *
 * @param {*} reqBody
 * @param {*} res
 * @returns
 */
async function addUser(reqBody, res) {
  try {
    firebaseHelper.firestore
      .createNewDocument(db, usersCollection, reqBody);
    return res.sendStatus(201);
  } catch(e) {
    return res.sendStatus(404);
  }
}

/**
 *
 *
 * @param {*} res
 * @returns
 */
async function getAllUsers(res) {
  try {
    firebaseHelper.firestore
      .backup(db, usersCollection)
      .then(data => res.status(200).send(data))
  } catch(e) {
    return res.sendStatus(404);
  }
}

/**
 * 
 *
 * @param {*} reqId
 * @param {*} res
 * @returns
 */
async function getUser(reqId, res)
{
  try {
    firebaseHelper.firestore
      .getDocument(db, usersCollection, reqId)
      .then(doc => res.status(200).send(doc));
  } catch(e) {
    return res.sendStatus(404);
  }
}

/**
 *
 *
 * @param {*} reqId
 * @param {*} reqBody
 * @param {*} res
 * @returns
 */
async function updateUser(reqId, reqBody, res)
{
  try {
    firebaseHelper.firestore
      .updateDocument(db, usersCollection, reqId, reqBody);
    res.sendStatus(200);
  } catch(e) {
    return res.sendStatus(404);
  }
}

/**
 *
 *
 * @param {*} reqId
 * @param {*} res
 * @returns
 */
async function deleteUser(reqId, res)
{
  try {
    firebaseHelper.firestore
      .deleteDocument(db, usersCollection, reqId);
    res.sendStatus(200);
  } catch(e) {
    return res.sendStatus(404);
  }
}

export default {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}