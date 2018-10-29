import * as express from 'express'
import userServices from '../services/users'

const router = express.Router()

router.post('/', async(req, res) => {
  return userServices.addUser(req.body, res);
});

router.get('/', async(req, res) => {
  return userServices.getAllUsers(res);
});

router.get('/:userId', async(req, res) => {
  return userServices.getUser(req.params.userId, res);
});

router.patch('/:userId', async(req ,res) => {
  return userServices.updateUser(req.params.userId, req.body, res);
});

router.delete('/:userId', async(req, res) => {
  return userServices.deleteUser(req.params.userId, res);
});

export default router