import { body, param, query } from 'express-validator';
import { departments_structure, currencies } from '../../utils'

const alphabetStringRegex = /^[A-Za-z\-']{2,20}$/;

export const sign_up = [
    body('username', 'username should be alphabets, between 2 and 20 characters long')
      .matches(alphabetStringRegex)
      .trim(),
    body('password', 'Password should be at least 8 characters')
     .isLength({min: 8}),
    body('confirm_password').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    })
];

export const sign_in = [
  body('username', 'username should be alphabets, between 2 and 20 characters long')
    .matches(alphabetStringRegex)
    .trim(),
  body('password', 'password should be at least 8 characters')
    .isLength({min: 8}),
];

export const salary_record = [
    body('name', 'name should be alphabets, between 2 and 20 characters long')
        .notEmpty()
        .matches(alphabetStringRegex),
    body('salary', 'salary should be number')
        .trim()
        .notEmpty()
        .isNumeric(),
    body('currency', `currency must be one of the following ${currencies}`).isIn(currencies),
    body('on_contract').custom((value, { req }) => {
      console.log(req.body.on_contract == "true")
        if (req.body.on_contract){
          if(JSON.parse(req.body.on_contract) != true && JSON.parse(req.body.on_contract) != false){
            throw new Error('on_contract  must be true or false');
          }
        }
        return true;
    }),
    body('department', 'department is required')
        .notEmpty()
        .custom((value, { req }) => {
          if (!departments_structure.filter((department) => department.department_name == req.body.department)) {
        throw new Error('Provided department not recognised');
      }
      return true;
    }),
    body('sub_department', 'sub_department is required')
        .notEmpty()
        .custom((value, { req }) => {
        if (req.body.department){
            const department = departments_structure.filter((department) => department.department_name == req.body.department)[0];
            if (!department.sub_department.filter((sub_department) => sub_department == req.body.sub_department)){
              throw new Error('Provided sub_department must belong to department');
            }
            return true;
        } else {
          throw new Error('Provided sub_department must belong to department');
        }
    }),
];

export const delete_record = [
  param('id', 'Provide id in params')
        .trim()
        .notEmpty()
        .isNumeric(),
]