const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer"); 
var rolesArray = ["Sales Lead", "Salesperson", "Software Engineer", "Lead Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"];
var departmentsArray =["Engineering", "Accounting", "Legal", "Sales"];

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
};

function viewEmployees(){
    var query = "select first_name,last_name,manager_id,title,salary,department_name from employees inner join roles on roles.id = employees.role_id inner join departments on departments.id = roles.department_id";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

function viewRoles(){
    var query = "select roles.id, title, department_name from roles inner join departments on departments.id=roles.department_id";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

function viewDepartments(){
    var query = "select * from departments";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};

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
            type: "input",
            message: "Assign a role id for the employee",
            name: "roleid"
        },
        {
            type: "input",
            message: "Assign a manager id for the employee",
            name: "managerid"
        },
    ]).then(data => {
        var query = "INSERT INTO employees SET ?";
        connection.query(query, 
            {first_name: data.firstname,
            last_name: data.lastname, 
            role_id: data.roleid,
            manager_id: data.managerid},
            (err,res) => {
            if (err) throw err;
            console.log(res.affectedRows + " post inserted\n");
            promptUser();
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
    var query = "select employees.id, first_name,last_name,title,department_name from employees inner join roles on roles.id = employees.role_id inner join departments on departments.id = roles.department_id";
    connection.query(query, (err,results) => {
        if (err) throw err;
        // console.table(results);
        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Whose role would you like to modify",
                choices: ()=> {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++){
                        choiceArray.push({Name: `${results[i].first_name} ${results[i].last_name}`, value: ` ${results[i].id}`});
                        // ${results[i].first_name} ${results[i].last_name}
                    }
                    console.log(choiceArray);
                    return choiceArray;
                },
            }
        ]).then(answer => {
            var chosenemployee = answer.choice;
            console.log(chosenemployee);
            var query = "select roles.id AS rid, title, department_id AS did from roles inner join departments on roles.department_id = departments.id";
            connection.query(query, (err, res) => {
                if (err) throw err;
                inquirer.prompt([
                {
                    type: "rawlist",
                    name: "updaterole",
                    message: "What is their new role?",
                    choices: () => {
                        var rolesArray = [];
                        for (var i = 0; i < res.length; i++){
                            rolesArray.push({Name: `${res[i].title}`, value: `${res[i].rid}`});
                        }
                        console.log(rolesArray);
                        return rolesArray;
                    },
                },
            ]).then(answer => {
                console.log(answer);
                var query = "update employees set ? where ?";
                connection.query(query, [
                    {
                        role_id: answer.updaterole.rid,
                        department_id: answer.updaterole.did
                    },
                    // {
                        
                    // }
                ], (err, res) => {
                    if (err) throw err;
                    console.log("Update successful");
                    viewEmployees();
                }
                );
            }) ;
            });
        });
        // promptUser();
    });
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the title of the new role you wish to add",
            name: "newroletitle"
        },
        {
            type: "input",
            message: "What is the starting salary for this role?",
            name: "newrolesalary"
        },
        {
            type: "input",
            message: "Please enter the department id this role will belong to",
            name: "newroledepartment"
        }
    ]).then(data => {
            var query = "INSERT INTO roles SET ?";
            connection.query(query, {
                title: data.newroletitle,
                salary: data.newrolesalary,
                department_id: data.newroledepartment
            },
            (err,res) =>{
                if (err) throw err;
                console.log(res.affectedRows + " post inserted\n");
                promptUser();
            })
        })
};

function addDepartment(){
    inquirer.prompt({
        type: "input",
        message: "Enter the name of the department you wish to add, department id will be auto-generated",
        name: "newdepartment"
    }).then(data => {
        var query = "INSERT INTO departments SET ?";
        connection.query(query, {department_name: data.newdepartment},
        (err,res) => {
            if (err) throw err;
            console.log(res.affectedRows + " post inserted\n");
            promptUser();
        })
    })

};