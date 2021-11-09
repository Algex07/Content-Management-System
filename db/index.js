const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    getAllEmployees() {
        return this.connection.promise().query(
            "SELECT * FROM employee"
        )
    }

    getAllRoles() {
        return this.connection.promise().query(
            "SELECT * FROM role"
        )
    }

    getAllDepartments() {
        return this.connection.promise().query(
            "SELECT * FROM department"
        )
    }

    createDepartment(departmentName) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?", departmentName
        )
    }

    createRole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        )
    }

    createEmployee(employee){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        )
    }

    updateEmployeeRole(employeeId, roleId){
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id =?", [roleId, employeeId]
        )
    }
}

module.exports = new DB(connection);