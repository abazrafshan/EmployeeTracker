DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE employees (
    eid INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (eid)
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

insert into departments (id,department_name) values (1,"Engineering");
insert into departments (id,department_name) values (2,"Accounting");
insert into departments (id,department_name) values (3,"Legal");
insert into departments (id,department_name) values (4,"Sales");

insert into roles (id,title, salary, department_id) values (1,"Software Engineer",100000,1);
insert into roles (id,title, salary, department_id) values (2,"Sales Lead",110000,4);
insert into roles (id,title, salary, department_id) values (3,"Salesperson",80000,4);
insert into roles (id,title, salary, department_id) values (4,"Lead Engineer",120000,1);
insert into roles (id,title, salary, department_id) values (5,"Account Manager",130000,4);
insert into roles (id, title, salary, department_id) values (6,"Accountant",70000,2);
insert into roles (id,title, salary, department_id) values (7,"Lawyer",180000,3);
insert into roles (id,title, salary, department_id) values (8,"Legal Team Lead",200000,3);

insert into employees (eid, first_name, last_name, role_id, manager_id) values (1,"John","Doe",6,null);
insert into employees (eid,first_name, last_name, role_id, manager_id) values (2,"Erik","Generik",4,null);
insert into employees (eid,first_name, last_name, role_id, manager_id) values (3,"Pam","Walters",2,null);
insert into employees (eid,first_name, last_name, role_id, manager_id) values (4,"Dustin","Boris",8,null);
insert into employees (eid, first_name, last_name, role_id, manager_id) values (5, "Claudia","Law",7,4);
insert into employees (eid, first_name, last_name, role_id, manager_id) values (6, "Javi","Bo",1,2);
insert into employees (eid, first_name, last_name, role_id, manager_id) values (7, "Lucy","Dune",3,3);
insert into employees (eid, first_name, last_name, role_id, manager_id) values (8, "Ben","T",5,3);



SELECT * FROM roles;
SELECT * FROM employees;
SELECT * FROM departments;
-- select department_name from departments;