import express from 'express';
import Salary_Record_Controller from '../../controllers/salary_record';
import middleware from '../../middlewares';
const { validate, Authenticate } = middleware;

const {
    add_record, delete_record, entire_summary_statistics, on_contract_summary_statistics,
    department_summary_statistics, sub_department_summary_statistics
} = Salary_Record_Controller;

const router = express.Router();

router.post('/add', Authenticate.runVerifyToken, validate('salary_record'), add_record);
router.delete('/delete/:id', Authenticate.runVerifyToken, validate('delete_record'), delete_record);
router.get('/entire_summary_statistics', Authenticate.runVerifyToken, entire_summary_statistics);
router.get('/on_contract_summary_statistics', Authenticate.runVerifyToken, on_contract_summary_statistics);
router.get('/department_summary_statistics', Authenticate.runVerifyToken, department_summary_statistics);
router.get('/sub_department_summary_statistics', Authenticate.runVerifyToken, sub_department_summary_statistics);

export default router;