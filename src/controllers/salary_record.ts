import { Request, Response }  from "express";
import { config } from 'dotenv';
import {
    salary_record_list, summary_statistics_formula, departments_structure, status, messages, successResponse, errorResponse,
} from '../utils/index';

config();

export default class Salary_Record {
    static async add_record (req: Request, res: Response){
        try {
            const data = {
                            id: salary_record_list.length + 1,
                            name: req.body.name,
                            salary: parseInt(req.body.salary, 10),
                            currency: req.body.currency,
                            on_contract: req.body.on_contract ? JSON.parse(req.body.on_contract) : false,
                            department: req.body.department,
                            sub_department: req.body.sub_department
                        };
            salary_record_list.push(data)
            return successResponse(res, status.created, messages.success, data);
        } catch(error){
            return errorResponse(res, status.error, messages.error);
        }
    }

    static async delete_record (req: Request, res: Response){
        try {
            //if (salary_record_list.filter((element: any) => element.id == req.params.id)){
            // numbersToRemove.forEach(x => numbers.splice(numbers.findIndex(n => n === x), 1));

            if(salary_record_list.splice(salary_record_list.findIndex(record => record.id === parseInt(req.params.id, 10)) , 1)){
                return successResponse(res, status.success, messages.success);
            } else {
                return errorResponse(res, status.notfound, messages.notFound);
            }
        } catch(error){
            return errorResponse(res, status.error, messages.error);
        }
    }
    static async entire_summary_statistics (req: Request, res: Response){
        try {
            const data = summary_statistics_formula(salary_record_list, 'salary');
            data.category = 'entire_summary_statistics';
            return successResponse(res, status.success, messages.success, data);
        } catch(error){
            return errorResponse(res, status.error, messages.error);
        }
    }
    static async on_contract_summary_statistics (req: Request, res: Response){
        try {
            const data = summary_statistics_formula(salary_record_list.filter((category) => category.on_contract == true), 'salary');
            data.category = 'on_contract_summary_statistics';
            return successResponse(res, status.success, messages.success, data);
        } catch(error){
            return errorResponse(res, status.error, messages.error);
        }
    }
    static async department_summary_statistics (req: Request, res: Response){
        try {
            const data: object[] = [];
            departments_structure.forEach((each) => {
                const record = salary_record_list.filter((category) => category.department == each.department_name)
                const result = summary_statistics_formula(record, 'salary');
                result.category = `${each.department_name}_summary_statistics`
                data.push(result)
            })
            return successResponse(res, status.success, messages.success, data);
        } catch(error){
            return errorResponse(res, status.error, messages.error);
        }
    }
    static async sub_department_summary_statistics (req: Request, res: Response){
        try {
            const data: object[] = [];
            departments_structure.forEach((each) => {
                const department = {
                    department_name: each.department_name,
                    sub_departments: [] as object[]
                }
                for (let i = 0; i < each.sub_department.length; i++) {
                    const record = salary_record_list.filter((category) => category.sub_department == each.sub_department[i])
                    const result = summary_statistics_formula(record, 'salary');
                    result.category = `${each.sub_department[i]}_sub_department_summary_statistics`
                    department.sub_departments.push(result)

                }
                data.push(department)
            })
            return successResponse(res, status.success, messages.success, data);
        } catch(error){
            return errorResponse(res, status.error, messages.error);
        }
    }
}