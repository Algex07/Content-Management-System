const { prompt, createPromptModule } = require("inquirer");
const db = require("./db");


init();

function init() {
    console.log("Welcome to your content management system!")
    mainMenu()
}

function mainMenu() {
    prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENTS"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLES"

                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEES"
                },
                {
                    name: "Update an Employee Roles",
                    value: "UPDATE_Roles"
                }
            ]
        }
    ]).then(response => {
        let userChoice = response.userChoice;

        console.log("userChoice", userChoice)

        // here instead of an 'if' statement you can use a switch statement...it will text whatever the userchoice is and if any of the cases match the userchoice it will fire off that cases function
        //   if(userChoice === "VIEW_EMPLOYEES"){
        // fire off view emlpoyes function
        //   }

        switch (userChoice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "ADD_DEPARTMENTS":
                addDepartments();
                break;
            case "ADD_ROLES":
                addRoles();
                break;
            case "ADD_EMPLOYEES":
                addEmployees();
                break;
            case "UPDATE_Roles":
                updateRoles();
                break;
        }
    })
}

function viewEmployees() {
    db.getAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees)
        })
        .then(() => mainMenu())
}

function viewRoles() {
    db.getAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles)
        })
        .then(() => mainMenu())
}

function viewDepartments() {
    db.getAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments)
        })
        .then(() => mainMenu())
}
function addDepartments() {
    prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department?",
        },
    ])
        .then(answer => {
            let departmentName = answer;
            console.log("departmentName on index.js", departmentName)
            db.createDepartment(departmentName)
                .then(() => console.log(`Added ${departmentName.name} to the DB`))
                .then(() => mainMenu());
        })
}

function addRoles() {
    console.log("hit add roles")
    db.getAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("inside .then departments", departments)
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            console.log(departmentChoices)
            prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the Role you want to add?",
                },
                {
                    name: "salary",
                    message: "What is the salary of this role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    console.log("role.then", role)
                    db.createRole(role)
                        //  .then(() => console.log(`Added ${role.role_name} to the DB`))
                        .then(() => mainMenu());
                })

        })
}


function addEmployees() {

    prompt([
        {
            type: "input",
            name: "first_name",
            message: "please add Employee first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "please add Employee last name?",
        },
    ])
        .then(response => {
            let firstName = response.first_name;
            let lastName = response.last_name;

            db.getAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    console.log("inside .then roles", roles)
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    console.log(roleChoices)
                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "What is the employee's role?",
                        choices: roleChoices
                    })
                        .then(response => {
                            let employee = {
                                role_id: response.roleId,
                                first_name: firstName,
                                last_name: lastName
                            }
                            db.createEmployee(employee)
                        })
                        .then(() => console.log(`Added ${firstName} ${lastName} to the DB`))
                        .then(() => mainMenu());
                })
        })
}

function updateRoles() {
    console.log("hit update roles")
    db.getAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employees role do you want to update?",
                    choices: employeeChoices
                },
            ]).then(response => {
                let employeeId = response.employeeId;
                db.getAllRoles()
                    .then(([rows]) => {
                        let roles = rows;
                        const roleChoices = roles.map(({ id, title }) => ({
                            name: title,
                            value: id
                        }))
                        prompt([
                            {
                                type: 'list',
                                name: "roleId",
                                message: "Which job title do you want to assign the selected employee?",
                                choices: roleChoices
                            }
                        ])
                            .then(response => db.updateEmployeeRole(employeeId, response.roleId))
                            .then(() => console.log("Updated employees' role"))
                            .then(() => mainMenu())
                    })
            })
        })

}