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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asciiLogo_1 = __importDefault(require("./asciiLogo"));
const employeePrompts_1 = require("./prompts/employeePrompts");
const queries_1 = require("./utils/queries");
const inquirer_1 = __importDefault(require("inquirer"));
// Function to handle the main menu and navigation (initial launch)
const initialInit = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log(asciiLogo_1.default);
    yield init(); // Call the generic init function for menu navigation
});
// Function to handle subsequent menu navigations (without clearing the console)
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const action = yield (0, employeePrompts_1.mainMenu)();
    switch (action) {
        case "View All Employees":
            yield viewAllEmployees();
            break;
        case "Add Employee":
            yield addEmployee();
            break;
        case "Update Employee Role":
            yield updateEmployeeRole();
            break;
        case "View All Roles":
            yield viewAllRoles();
            break;
        case "Add Role":
            yield addRole();
            break;
        case "View All Departments":
            yield viewAllDepartments();
            break;
        case "Add Department":
            yield addDepartment();
            break;
        case "Exit":
            console.log("Goodbye!");
            process.exit();
            break;
    }
});
// Function to view all employees
const viewAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield (0, queries_1.getAllEmployees)();
    console.table(employees);
    yield init(); // Return to the menu
});
// Function to add a new employee
const addEmployee = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield (0, queries_1.getAllRoles)();
    const employees = yield (0, queries_1.getAllEmployees)();
    const { firstName, lastName, roleId, managerId } = yield inquirer_1.default.prompt([
        { type: "input", name: "firstName", message: "Enter the employee's first name:" },
        { type: "input", name: "lastName", message: "Enter the employee's last name:" },
        {
            type: "list",
            name: "roleId",
            message: "Select the employee's role:",
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
        {
            type: "list",
            name: "managerId",
            message: "Select the employee's manager:",
            choices: [{ name: "None", value: null }].concat(employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))),
        },
    ]);
    yield (0, queries_1.addEmployeeQuery)(firstName, lastName, roleId, managerId);
    console.log("Employee added successfully.");
    yield init(); // Return to the menu
});
// Function to update an employee's role
const updateEmployeeRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield (0, queries_1.getAllEmployees)();
    const roles = yield (0, queries_1.getAllRoles)();
    const { employeeId, roleId } = yield inquirer_1.default.prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Select the employee to update:",
            choices: employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
        },
        {
            type: "list",
            name: "roleId",
            message: "Select the new role:",
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
    ]);
    yield (0, queries_1.updateEmployeeRoleQuery)(roleId, employeeId);
    console.log("Employee role updated successfully.");
    yield init(); // Return to the menu
});
// Function to view all roles
const viewAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield (0, queries_1.getAllRoles)();
    console.table(roles);
    yield init(); // Return to the menu
});
// Function to add a new role
const addRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield (0, queries_1.getAllDepartments)();
    const { title, salary, departmentId } = yield inquirer_1.default.prompt([
        { type: "input", name: "title", message: "Enter the role title:" },
        { type: "input", name: "salary", message: "Enter the role salary:" },
        {
            type: "list",
            name: "departmentId",
            message: "Select the department:",
            choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
        },
    ]);
    yield (0, queries_1.addRoleQuery)(title, salary, departmentId);
    console.log("Role added successfully.");
    yield init(); // Return to the menu
});
// Function to view all departments
const viewAllDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield (0, queries_1.getAllDepartments)();
    console.table(departments);
    yield init(); // Return to the menu
});
// Function to add a new department
const addDepartment = () => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = yield inquirer_1.default.prompt([{ type: "input", name: "name", message: "Enter the department name:" }]);
    yield (0, queries_1.addDepartmentQuery)(name);
    console.log("Department added successfully.");
    yield init(); // Return to the menu
});
// Start the application with the initial init function
initialInit();
