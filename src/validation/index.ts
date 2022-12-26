import {
    salary_record, sign_in, sign_up, delete_record
} from './validators/rules';

type MetadataObj = {[key: string]: unknown}

const getValidator = (validationName:string) => {
    const rules: MetadataObj = {
        salary_record, sign_in, sign_up, delete_record
    };
    return rules[validationName]
}

export default getValidator;