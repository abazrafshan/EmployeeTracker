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
// When connection is made to database promptUser function is called to initiate application
connection.connect(err => {
    if (err) throw err;
    promptUser();
});
// Inquirer method called to present user with list of options for how to proceed with the application
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
        // Call fuction based on user's input to inquirer method
        switch(data.options){
            case "View all employees":
                // Shows current list of employees
                viewEmployees();
                break;

            case "View all roles":
                // Shows current list of job roles
                viewRoles();
                break;

            case "View all departments":
                // Shows current list of departments
                viewDepartments();
                break;

            case "Add employee":
                // User can add employee to team
                addEmployee();
                break;

            case "Add role":
                // User can add a new role
                addRole();
                break;

            case "Add department":
                // User can add a new department
                addDepartment();
                break;

            case "Update employee role":
                // User can update an employee's job role
                updateRole();
                break;

            case "Exit":
                // End connection
                connection.end();
                break;
        }
    });
};
// Query ties together the roles, departments, and employees sql tables an displays this to user in terminal in table format
function viewEmployees(){
    // Displays employees' first names, last names, manager id, title, salary, and department they belong to
    var query = "select first_name,last_name,manager_id,title,salary,department_name from employees inner join roles on roles.id = employees.role_id inner join departments on departments.id = roles.department_id";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
};
// Query ties together roles and departments sql tables and displays list of roles defined in application
function viewRoles(){
    // Displays role id, role title, department the role belongs to
    var query = "select roles.id, title, department_name from roles inner join departments on departments.id=roles.department_id";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table(res);
        // Prompt user with list of options 
        promptUser();
    })
};
// Query displays all columns in departments table
function viewDepartments(){
    var query = "select * from departments";
    connection.query(query,(err,res) => {
        if (err) throw err;
        // Display table to terminal 
        console.table(res);
        promptUser();
    })
};
// Function adds employees to employee roster
function addEmployee(){
    // Inquirer method called for user to store new employees' name, role, and manager id
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
        // Query inserts values employees table
        var query = "INSERT INTO employees SET ?";
        connection.query(query, 
            // Set name, role, and manager id 
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

function updateRole(){
    // Query employees table
    var query = "select * from employees";
    connection.query(query, (err,results) => {
        if (err) throw err;
        // Inquirer method called for user to select which employee role to modify
        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Whose role would you like to modify",
                choices: ()=> {
                    // Declare empty choiceArray
                    var choiceArray = [];
                    // Loop through results from sql query 
                    for (var i = 0; i < results.length; i++){
                        // Push list of results to choiceArray, pushing the first name, last name, and eid of each employee 
                        choiceArray.push({name: `${results[i].first_name} ${results[i].last_name}`, value: `${results[i].eid}`});
                    }
                    // Return choiceArray
                    return choiceArray;
                },
            }
        ]).then(answer => {
            // Store user's input to inquirer method
            var eid = answer.choice;
            // Query ties roles and departments tables together
            var query = "select roles.id AS rid, roles.title, roles.department_id AS did from roles inner join departments on roles.department_id = departments.id";
            connection.query(query, (err, res) => {
                if (err) throw err;
                // Inquirer method called for user to select which role to assign to new employee
                inquirer.prompt([
                {
                    type: "rawlist",
                    name: "updaterole",
                    message: "What is their new role?",
                    choices: () => {
                        // Declare empty rolesArray
                        var rolesArray = [];
                        // Loop through results from sql query 
                        for (var i = 0; i < res.length; i++){
                            rolesArray.push({name: `${res[i].title}`, value: {rid :`${res[i].rid}`,  did: `${res[i].did}`}});
                        }
                        // Return rolesArray
                        return rolesArray;
                    },
                }
            ]).then((result) => {
                // Query accesses employees table and sets role id
                var query = "update employees set ? where ?";
                connection.query(query, 
                    // Set role and employee id's
                    [{role_id: result.updaterole.rid}, {eid: eid}],
                    function (err, res) {
                    if (err) throw err;
                    console.log("Update successful");
                    // View employees then prompt user 
                    viewEmployees();
                    promptUser();
                }
                );
            }) ;
            });
        });
    });
}
// Add role to list of job roles
function addRole(){
    // Inquirer method called to gather title, salary, and department the new role belongs to
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
        // Query accesses roles table
            var query = "INSERT INTO roles SET ?";
            // Set title, salary, department id 
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
// Adds department to list of departments
function addDepartment(){
    // Inquirer method called to gather name of new department
    inquirer.prompt({
        type: "input",
        message: "Enter the name of the department you wish to add, department id will be auto-generated",
        name: "newdepartment"
    }).then(data => {
        // Query accesses departments table
        var query = "INSERT INTO departments SET ?";
        // Set department name 
        connection.query(query, {department_name: data.newdepartment},
        (err,res) => {
            if (err) throw err;
            console.log(res.affectedRows + " post inserted\n");
            promptUser();
        })
    })
};