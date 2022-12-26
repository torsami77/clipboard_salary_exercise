import * as express from "express";
import salary_record from './endpoints/salary_record';
import Authenticate from './endpoints/authenticate'

const router = express.Router();

router.use('/salary_record', salary_record);
router.use('/authenticate', Authenticate);


export default router;