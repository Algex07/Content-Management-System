const connection = require("./connection");

class DB{
    constructor(connection){
        this.connection = connection;
    }

    getAllEmployees(){
        return this.connection.promise().query(
            "SELECT * FROM employee"
        )
    }

    getAllRoles(){
        return this.connection.promise().query(
            "SELECT * FROM role"
        )
    }

    getAllDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM department"
        )
    }
}

module.exports = new DB(connection);