"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeRoleQuery = exports.addDepartmentQuery = exports.addRoleQuery = exports.addEmployeeQuery = exports.getAllDepartments = exports.getAllRoles = exports.getAllEmployees = void 0;
const connection_1 = require("../db/connection");
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.query)(`
    SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
           CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id;
  `);
});
exports.getAllEmployees = getAllEmployees;
const getAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.query)(`
    SELECT r.id, r.title, d.name AS department, r.salary
    FROM roles r
    LEFT JOIN departments d ON r.department_id = d.id;
  `);
});
exports.getAllRoles = getAllRoles;
const getAllDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, connection_1.query)("SELECT * FROM departments");
});
exports.getAllDepartments = getAllDepartments;
const addEmployeeQuery = (firstName, lastName, roleId, managerId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.query)("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [firstName, lastName, roleId, managerId]);
});
exports.addEmployeeQuery = addEmployeeQuery;
const addRoleQuery = (title, salary, departmentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.query)("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, departmentId]);
});
exports.addRoleQuery = addRoleQuery;
const addDepartmentQuery = (name) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.query)("INSERT INTO departments (name) VALUES ($1)", [name]);
});
exports.addDepartmentQuery = addDepartmentQuery;
const updateEmployeeRoleQuery = (roleId, employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.query)("UPDATE employees SET role_id = $1 WHERE id = $2", [roleId, employeeId]);
});
exports.updateEmployeeRoleQuery = updateEmployeeRoleQuery;
