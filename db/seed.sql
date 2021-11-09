USE employees;

INSERT INTO department
    (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role
    (title, salary, department_id)
VALUES
("Senior Engineer", 150000, 2),
("Salesperson", 75000, 1),
("Accountant", 125000, 3),
("Lawyer", 190000, 4)

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
("Amar", "Algu", 1),
("Brian", "Gearty", 2),
("George", "Clooney", 3),
("Amal", "Clooney", 4)
