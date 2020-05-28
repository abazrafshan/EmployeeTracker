DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary decimal(10, 0),
    department_id INT,
    primary key (id)
);

CREATE TABLE departments (
--     id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30)
--     primary key (id)
);

insert into departments (department_name) values ("Engineering");
insert into departments (department_name) values ("Accounting");
insert into departments (department_name) values ("Legal");
insert into departments (department_name) values ("Sales");

insert into roles (title, salary, department_id) values ("Software Engineer",100000,7);
insert into roles (title, salary, department_id) values ("Sales Lead",110000,9);
insert into roles (title, salary, department_id) values ("Salesperson",80000,9);
insert into roles (title, salary, department_id) values ("Lead Engineer",120000,7);
insert into roles (title, salary, department_id) values ("Account Manager",130000,9);
insert into roles (title, salary, department_id) values ("Accountant",70000,6);
insert into roles (title, salary, department_id) values ("Lawyer",180000,8);
insert into roles (title, salary, department_id) values ("Legal Team Lead",200000,8);

insert into employees (first_name, last_name, role_id, manager_id) values ("John","Doe",6,null);
insert into employees (first_name, last_name, role_id, manager_id) values ("Erik","Generik",4,null);
insert into employees (first_name, last_name, role_id, manager_id) values ("Pam","Walters",2,null);
insert into employees (first_name, last_name, role_id, manager_id) values ("Dustin","Boris",8,null);
insert into employees (first_name, last_name, role_id, manager_id) values ("Claudia","Law",7,5);
insert into employees (first_name, last_name, role_id, manager_id) values ("Javi","Bo",1,3);
insert into employees (first_name, last_name, role_id, manager_id) values ("Lucy","Dune",3,4);
insert into employees (first_name, last_name, role_id, manager_id) values ("Ben","T",5,4);

-- delete from departments where id=null;

SELECT * FROM roles;
SELECT * FROM employees;
SELECT * FROM departments;

select * from employees inner join roles on roles.id = employees.role_id 
inner join departments on departments.id = roles.department_id;

select first_name,last_name,manager_id,title,salary,department_name from employees inner join roles on roles.id = employees.role_id 
inner join departments on departments.id = roles.department_id;