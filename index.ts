import logo from "./asciiLogo";
import { mainMenu } from "./prompts/employeePrompts";
import {
  getAllEmployees,
  getAllRoles,
  getAllDepartments,
  addEmployeeQuery,
  addRoleQuery,
  addDepartmentQuery,
  updateEmployeeRoleQuery,
} from "./utils/queries";
import inquirer from "inquirer";

// Function to handle the main menu and navigation (initial launch)
const initialInit = async (): Promise<void> => {
  console.clear();
  console.log(logo);
  await init(); // Call the generic init function for menu navigation
};

// Function to handle subsequent menu navigations (without clearing the console)
const init = async (): Promise<void> => {
  const action = await mainMenu();
  switch (action) {
    case "View All Employees":
      await viewAllEmployees();
      break;
    case "Add Employee":
      await addEmployee();
      break;
    case "Update Employee Role":
      await updateEmployeeRole();
      break;
    case "View All Roles":
      await viewAllRoles();
      break;
    case "Add Role":
      await addRole();
      break;
    case "View All Departments":
      await viewAllDepartments();
      break;
    case "Add Department":
      await addDepartment();
      break;
    case "Exit":
      console.log("Goodbye!");
      process.exit();
      break;
  }
};

// Function to view all employees
const viewAllEmployees = async (): Promise<void> => {
  const employees = await getAllEmployees();
  console.table(employees);
  await init(); // Return to the menu
};

// Function to add a new employee
const addEmployee = async (): Promise<void> => {
  const roles = await getAllRoles();
  const employees = await getAllEmployees();

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
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
      choices: [{ name: "None", value: null }].concat(
        employees.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      ),
    },
  ]);

  await addEmployeeQuery(firstName, lastName, roleId, managerId);
  console.log("Employee added successfully.");
  await init(); // Return to the menu
};

// Function to update an employee's role
const updateEmployeeRole = async (): Promise<void> => {
  const employees = await getAllEmployees();
  const roles = await getAllRoles();

  const { employeeId, roleId } = await inquirer.prompt([
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

  await updateEmployeeRoleQuery(roleId, employeeId);
  console.log("Employee role updated successfully.");
  await init(); // Return to the menu
};

// Function to view all roles
const viewAllRoles = async (): Promise<void> => {
  const roles = await getAllRoles();
  console.table(roles);
  await init(); // Return to the menu
};

// Function to add a new role
const addRole = async (): Promise<void> => {
  const departments = await getAllDepartments();

  const { title, salary, departmentId } = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter the role title:" },
    { type: "input", name: "salary", message: "Enter the role salary:" },
    {
      type: "list",
      name: "departmentId",
      message: "Select the department:",
      choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
    },
  ]);

  await addRoleQuery(title, salary, departmentId);
  console.log("Role added successfully.");
  await init(); // Return to the menu
};

// Function to view all departments
const viewAllDepartments = async (): Promise<void> => {
  const departments = await getAllDepartments();
  console.table(departments);
  await init(); // Return to the menu
};

// Function to add a new department
const addDepartment = async (): Promise<void> => {
  const { name } = await inquirer.prompt([{ type: "input", name: "name", message: "Enter the department name:" }]);
  await addDepartmentQuery(name);
  console.log("Department added successfully.");
  await init(); // Return to the menu
};

// Start the application with the initial init function
initialInit();
