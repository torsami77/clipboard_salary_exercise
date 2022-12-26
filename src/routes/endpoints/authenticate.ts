import express from 'express';
import Account_Controller from '../../controllers/authentication';
import middleware from '../../middlewares';
const { validate } = middleware;

const {
  sign_up, sign_in
} = Account_Controller;

const router = express.Router();
router.post('/sign_up', validate('sign_up'), sign_up);
router.post('/sign_in', validate('sign_in'), sign_in);

export default router;