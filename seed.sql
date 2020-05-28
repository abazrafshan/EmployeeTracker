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
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    primary key (id)
);

insert into departments (department_name) values ("Engineering");
insert into departments (department_name) values ("Accounting");
insert into departments (department_name) values ("Legal");
insert into departments (department_name) values ("Sales");

insert into roles (title, salary, department_id) values ("Software Engineer",100000,1);
insert into roles (title, salary, department_id) values ("Sales Lead",110000,4);
insert into roles (title, salary, department_id) values ("Salesperson",80000,4);
insert into roles (title, salary, department_id) values ("Lead Engineer",120000,1);
insert into roles (title, salary, department_id) values ("Account Manager",130000,4);
insert into roles (title, salary, department_id) values ("Accountant",70000,2);
insert into roles (title, salary, department_id) values ("Lawyer",180000,3);
insert into roles (title, salary, department_id) values ("Legal Team Lead",200000,3);

insert into employees (first_name, last_name, role_id, manager_id) values ("John","Doe",6,null);
insert into employees (first_name, last_name, role_id, manager_id) values ("Erik","Generik",4,null);
insert into employees (first_name, last_name, role_id, manager_id) values ("Pam","Walters",2,null);
insert into employees (first_name, last_name, role_id, manager_id) values ("Dustin","Boris",8,null);
insert into employees (first_name, last_name, role_id, manager_id) values ("Claudia","Law",7,4);
insert into employees (first_name, last_name, role_id, manager_id) values ("Javi","Bo",1,2);
insert into employees (first_name, last_name, role_id, manager_id) values ("Lucy","Dune",3,3);
insert into employees (first_name, last_name, role_id, manager_id) values ("Ben","T",5,3);



SELECT * FROM roles;
SELECT * FROM employees;
SELECT * FROM departments;

select * from employees inner join roles on roles.id = employees.role_id inner join departments on departments.id = roles.department_id;

select first_name,last_name,manager_id,title,salary,department_name from employees inner join roles on roles.id = employees.role_id 
inner join departments on departments.id = roles.department_id;

select employees.id,first_name,last_name,manager_id,title,salary,department_name from employees inner join roles on roles.id = employees.role_id 
inner join departments on departments.id = roles.department_id;

select title, department_name from roles inner join departments on departments.id = roles.department_id;

select employees.id, first_name,last_name,title,department_name from employees inner join roles on roles.id = employees.role_id inner join departments on departments.id = roles.department_id;

select roles.id AS rid, title, department_id AS did from roles inner join departments on roles.department_id = departments.id;
-- select department_name from departments;