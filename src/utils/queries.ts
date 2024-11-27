import { query } from "../db/connection";

export const getAllEmployees = async (): Promise<any[]> => {
  return await query(`
    SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
    CONCAT(m.first_name, 'null ', m.last_name) AS manager
    FROM employees 
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id;
  `);
};

export const getAllRoles = async (): Promise<any[]> => {
  return await query(`
    SELECT r.id, r.title, d.name AS department, r.salary
    FROM roles r
    LEFT JOIN departments d ON r.department_id = d.id;
  `);
};

export const getAllDepartments = async (): Promise<any[]> => {
  return await query("SELECT * FROM departments");
};

export const addEmployeeQuery = async (firstName: string, lastName: string, roleId: number, managerId: number | null): Promise<void> => {
  await query(
    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, roleId, managerId]
  );
};

export const addRoleQuery = async (title: string, salary: number, departmentId: number): Promise<void> => {
  await query(
    "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)",
    [title, salary, departmentId]
  );
};

export const addDepartmentQuery = async (name: string): Promise<void> => {
  await query("INSERT INTO departments (name) VALUES ($1)", [name]);
};

export const updateEmployeeRoleQuery = async (roleId: number, employeeId: number): Promise<void> => {
  await query("UPDATE employees SET role_id = $1 WHERE id = $2", [roleId, employeeId]);
};