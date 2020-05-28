const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer"); 

var connection = mysql.createConnection({
    hose: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeeDB"
});

connection.connect(err => {
    if (err) throw err;
    promptUser();
});

function promptUser(){
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: [
            "View all employees",
            "View all roles",
            "View all departments",
            "Add employee",
            "Add role",
            "Add department",
            "Update employee role",
            "Exit"
        ]
    }).then(data => {
        switch(data.options){
            case "View all employees":
                viewEmployees();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "View all departments":
                viewDepartments();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Add role":
                addRole();
                break;

            case "Add department":
                addDepartment();
                break;

            case "Update employee role":
                updateRole();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

// 1
// when user selects to view all employees
// console log current table of all current employees
// Prompt user with options again

function viewEmployees(){
    var query = "select first_name,last_name,manager_id,title,salary,department_name from employees inner join roles on roles.id = employees.role_id inner join departments on departments.id = roles.department_id";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

// 2
// when user selects to add an employee
// user is prompted to input a first name (varchar30)
// user is prompted to input last name (varchar30)
// user is prompted to select role from a list of roles (int? for role id)
// user is prompted to select employees manager from list of current employees(int? for manager id)
// if user doesn't have a manager, default value is null
// new row is added to table of employees containing data stored from series of prompts
// console log updated table of all employees
// Prompt user with options again

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the employee's first name",
            name: "firstname"
        },
        {
            type: "input",
            message: "Enter the employee's last name",
            name: "lastname"
        },
        {
            type: "list",
            message: "Assign a role for the employee",
            name: "role",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Software Engineer",
                "Lead Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]
        },
        {
            type: "list",
            message: "Select the employees manager if applicable",
            name: "manager",
            choices: [
                // List names of employees on team
            ]
        }
    ]).then(data => {
        var query = "INSERT INTO employees SET ?";
        connection.query(query, [{first_name: data.firstname},{last_name: data.lastname}, {role_id: data.role},{manager_id: data.manager}], (err,res) => {
            if (err) throw err;
            console.log(res.affectedRows + " post inserted\n")
        })    
    })
}
// 3
// when user selects to edit an employee role
// console log current table of all current employees
// user is prompted to select employee from list of current emloyees
// when desired employee selected, console log row that displays employees current role and department
// User prompted to select new role for emplployee from list of existing roles
// console log updated table of employees with updated role
// prompt user with options again

function updateRole(){

}

// 4
// when user selects to view all roles, display current roles column usig distinct to remove duplicates
// prompt with options

function viewRoles(){
    var query = "select title, department_name from roles inner join departments on departments.id=roles.department_id";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

// 5
// when user chooses to view all departments
// console log department column using distinct to remove duplicates
// prompt user with options

function viewDepartments(){
    var query = "select department_name from departments";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

// 6
// when user chooses to add role, user is prompted to enter title of new role
// when user inputs title of new role, it is availalbe in the array of roles
// console log updated list of roles
// prompt user with options

function addRole(){

}

// 7
// when user chooses to add department, user is prompted to enter title of new department
// when user inputs title of new dept, it is availalbe in the array of roles
// console log updated list of departments
// prompt user with options

function addDepartment(){

}