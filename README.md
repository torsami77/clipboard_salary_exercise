# # clipboard_salary_exercise
This exercise demonstrates skill proficiency in regards to the following requirement
https://drive.google.com/file/d/1Gf-isBBtC4hZ7AhMfORJ9uuYC_YFCxyI/view?usp=sharing
## Stacks
- Express
- Node.js
- Typescript
- Docker && Docker Compose


## Set up

After cloning this repo ```git clone https://github.com/torsami77/clipboard_salary_exercise.git```,  check into the root directory ```cd clipboard_salary_exercise```, and run ``` docker compose up``` to install all the dependencies, devDevpendencies, and run the API exposed on ```http://localhost:8080```. 

**See Environnment variables and database has been by passed to simplify the setup run to just "docker compose up"**
**See dependencies, and "devDependencies" section in package.json file for list of all packages that would be installed**

## Scripts

```npm run dev```   : to run development mode
```npm run build``` : to transpile build. see ./dist folder
```npm start```   : to run production mode
```npm test```   :  to run sample test on sample cases
```docker compose up```   :  to spin up server in docker container


## API Documentation
 #### Root Route:  ```/``` 
 ###### Method: GET 
 ###### Sample Success Response  
```
{
    "statusCode":  200,
    "message":  "Welcome to clipboard_salary_exercise",
 }
```
___

#### Sign Up
  ###### Route: ```http://localhost:8080/api/v1/authenticate/sign_up```
 ###### Method: POST
 ###### Sample Error Response  
 ```
{
    "errors": {
        "username": "username should be alphabets, between 2 and 20 characters long",
        "password": "Password should be at least 8 characters"
    }
}
 ```
 
  ###### Sample Payload
  - Body

 ```
{
        "username": "sami",
        "password": "Pass10!?"
        "confirm_password": "Pass10!?"
}

 ```
 ###### Sample Success Response  
 ```
{
    "statusCode": 201,
    "message": "User created successfully",
    "data": {
        "id": 2,
        "username": "torsami",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0b3JzYW1pIiwiaWF0IjoxNjcyMDY2NDQ5LCJleHAiOjE2NzIxNTI4NDl9.vjU0ECvz3zIuykgpkZo08fJfg-VXyuDEZt5FSI_Z9EU"
    }
}
```
___

#### Sign In
  ###### Route: ```http://localhost:8080/api/v1/authenticate/sign_in```
 ###### Method: POST
 
 ###### Sample Validation Error Response  
 ```
{
    "errors": {
        "username": "username should be alphabets, between 2 and 20 characters long",
        "password": "Password should be at least 8 characters"
    }
}
 ```
 
  ###### Sample Payload
  - Body
 ```
{
        "username": "sami",
        "password": "Pass10!?"
}

 ```
 ###### Sample Success Response  
 ```
{
    "statusCode": 200,
    "message": "Successfully signed in",
    "data": {
        "id": 2,
        "username": "torsami",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0b3JzYW1pIiwiaWF0IjoxNjcyMDY3NTUyLCJleHAiOjE2NzIxNTM5NTJ9.XpH_241IraDIeCapQOGUBST3lrkmdonmS1Ye3w2MM9k"
    }
}
```
___
#### Add a new record to the dataset.
 ###### Route: ```http://localhost: 8080/api/v1/salary_record/add```
 ###### Method: POST
 ###### Sample Auth Error Response  
 ```
{
    "statusCode": 401,
    "message": "Access denied."
}
```
 ###### Sample Validation Error Response  
```
{
    "errors": {
        "name": "name should be alphabets, between 2 and 20 characters long",
        "salary": "salary should be number",
        "currency": "currency must be one of the following USD,EUR,INR",
        "department": "Department is required",
        "sub_department": "Provided sub_department must belong to department"
    }
}
```
 ###### Sample Payload
 - Header
```
{
     "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0b3JzYW1pIiwiaWF0IjoxNjcyMDY3NTUyLCJleHAiOjE2NzIxNTM5NTJ9.XpH_241IraDIeCapQOGUBST3lrkmdonmS1Ye3w2MM9k" 
}
 ```
 
 - body
 ```
 {
        "name": "Samson",
        "salary": 10000,
        "currency": "USD" // ['USD', 'EUR', 'INR'],
        "on_contract": true  // not compulsory, but if provided value must be one of [true, false]   
        "department": "Engineering" // ['Engineering', 'Banking', 'Operations', 'Administration' ],
        "sub_department": "Platform"
        
        // Sub Departments List 
                <!--{-->
                <!--department_name: "Engineering",-->
                <!--sub_department: ["Platform"]-->
                <!--},-->
                <!--{-->
                <!--    department_name: "Banking",-->
                <!--    sub_department: ["Loan"]-->
                <!--},-->
                <!--{-->
                <!--    department_name: "Operations",-->
                <!--    sub_department: ["CustomerOnboarding"]-->
                <!--},-->
                <!--{-->
                <!--    department_name: "Administration",-->
                <!--    sub_department: ["Agriculture"]-->
                <!--}-->
}
 ```
 
 ###### Sample Success Response
 ```
{
    "statusCode": 201,
    "message": "Request processed successfully",
    "data": {
        "id": 10,
        "name": "Samson",
        "salary": 10000,
        "currency": "USD",
        "on_contract": true,
        "department": "Engineering",
        "sub_department": "Platform"
    }
}
 ```
___
#### Delete record from the dataset.
 ###### Route: ```http://localhost: 8080/api/v1/salary_record/delete/:id```
 ###### Method: DELETE
 ###### Sample Auth Error Response  
 ```
{
    "statusCode": 401,
    "message": "Access denied."
}
```

 ###### Sample Payload
 - Header
```
{
     "authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0b3JzYW1pIiwiaWF0IjoxNjcyMDY3NTUyLCJleHAiOjE2NzIxNTM5NTJ9.XpH_241IraDIeCapQOGUBST3lrkmdonmS1Ye3w2MM9k" 
}
 ```
 - URL 
```http://localhost: 8080/api/v1/salary_record/delete/3```

 ###### Sample Success Response
 ```
 {
    "statusCode": 200,
    "message": "Request processed successfully"
}
 ```
___
#### Fetch Entire Summary Statistics for salary over the entire dataset.
 ###### Route: ```http://localhost: 8080/api/v1/salary_record/entire_summary_statistics```
 ###### Method: GET
 ###### Sample Auth Error Response 
  ```
{
    "statusCode": 401,
    "message": "Access denied."
}
```
 ###### Sample Success Response
 ```
{
    "statusCode": 200,
    "message": "Request processed successfully",
    "data": {
        "max": 200000000,
        "min": 30,
        "mean": 22269454.444444444,
        "category": "entire_summary_statistics"
    }
}
 ```
___
#### Fetch On Contract Summary Statistics for salary over the entire dataset.
 ###### Route: ```http://localhost: 8080/api/v1/salary_record/entire_summary_statistics```
 ###### Method: GET
 ###### Sample Auth Error Response 
  ```
{
    "statusCode": 401,
    "message": "Access denied."
}
```
 ###### Sample Success Response
 ```
{
    "statusCode": 200,
    "message": "Request processed successfully",
    "data": {
        "max": 110000,
        "min": 10000,
        "mean": 70000,
        "category": "on_contract_summary_statistics"
    }
}
 ```
___
#### Fetch Department Summary Statistics for salary over the entire dataset.
 ###### Route: ```http://localhost: 8080/api/v1/salary_record/entire_summary_statistics```
 ###### Method: GET
 ###### Sample Auth Error Response 
  ```
{
    "statusCode": 401,
    "message": "Access denied."
}
```
 ###### Sample Success Response
 ```
{
    "statusCode": 200,
    "message": "Request processed successfully",
    "data": [
        {
            "max": 200000000,
            "min": 30,
            "mean": 40053006,
            "category": "Engineering_summary_statistics"
        },
        {
            "max": 90000,
            "min": 90000,
            "mean": 90000,
            "category": "Banking_summary_statistics"
        },
        {
            "max": 70000,
            "min": 30,
            "mean": 35015,
            "category": "Operations_summary_statistics"
        },
        {
            "max": 30,
            "min": 30,
            "mean": 30,
            "category": "Administration_summary_statistics"
        }
    ]
}
 ```
 ___
 #### Fetch On Sub Department Summary Statistics for salary over the entire dataset.
 ###### Route: ```http://localhost: 8080/api/v1/salary_record/entire_summary_statistics```
 ###### Method: GET
 ###### Sample Auth Error Response 
  ```
{
    "statusCode": 401,
    "message": "Access denied."
}
```
 ###### Sample Success Response
 ```
{
    "statusCode": 200,
    "message": "Request processed successfully",
    "data": [
        {
            "department_name": "Engineering",
            "sub_departments": [
                {
                    "max": 200000000,
                    "min": 30,
                    "mean": 40053006,
                    "category": "Platform_sub_department_summary_statistics"
                }
            ]
        },
        {
            "department_name": "Banking",
            "sub_departments": [
                {
                    "max": 90000,
                    "min": 90000,
                    "mean": 90000,
                    "category": "Loan_sub_department_summary_statistics"
                }
            ]
        },
        {
            "department_name": "Operations",
            "sub_departments": [
                {
                    "max": 70000,
                    "min": 30,
                    "mean": 35015,
                    "category": "CustomerOnboarding_sub_department_summary_statistics"
                }
            ]
        },
        {
            "department_name": "Administration",
            "sub_departments": [
                {
                    "max": 30,
                    "min": 30,
                    "mean": 30,
                    "category": "Agriculture_sub_department_summary_statistics"
                }
            ]
        }
    ]
}
 ```
___
## Thank you
