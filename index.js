const { prompt } = require("inquirer");
const db = require("./db");


init();

function init(){
    console.log("Welcome to your content management system!")
    mainMenu()
}

function mainMenu(){
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
            ]
        }
    ]).then(response =>{
        let userChoice = response.userChoice;

        console.log("userChoice", userChoice)

        // here instead of an 'if' statement you can use a switch statement...it will text whatever the userchoice is and if any of the cases match the userchoice it will fire off that cases function
     //   if(userChoice === "VIEW_EMPLOYEES"){
            // fire off view emlpoyes function
     //   }

        switch(userChoice){
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
        }
    })
}

function viewEmployees(){
    db.getAllEmployees()
    .then(([rows])=>{
        let employees = rows;
        console.table(employees)
    })
    .then(()=> mainMenu())
}

function viewRoles(){
    db.getAllRoles()
    .then(([rows])=>{
        let roles = rows;
        console.table(roles)
    })
    .then(()=> mainMenu())
}

function viewDepartments(){
    db.getAllDepartments()
    .then(([rows])=>{
        let departments = rows;
        console.table(departments)
    })
    .then(()=> mainMenu())
}