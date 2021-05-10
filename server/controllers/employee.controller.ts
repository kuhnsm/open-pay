import { Request, Response, NextFunction } from "express";
import EmployeeService from "../services/employee.service";

async function getEmployees(req: Request, res: Response, next: NextFunction) {
  let page = req.params.page ? parseInt(req.params.page) : 1;
  let limit = req.params.limit ? parseInt(req.params.limit) : 10;
  try {
    let employees = await EmployeeService.getEmployees({}, page, limit);
    return res.status(200).json({
      status: 200,
      employees: employees,
      message: "Succesfully Employees Retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

async function insertEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let employees = await EmployeeService.insertEmployees(req.body.data);
    return res.status(200).json({
      status: 200,
      message: "Succesfully Employees Insert",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

async function updateEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let employees = await EmployeeService.updateEmployees(req.body.data);
    return res.status(200).json({
      status: 200,
      message: "Succesfully Employees Update",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

async function deleteEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let employees = await EmployeeService.deleteEmployees(req.body._id);
    return res.status(200).json({
      status: 200,
      employees: employees,
      message: "Succesfully Employees Delete",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}
export default {
  getEmployees,
  insertEmployees,
  updateEmployees,
  deleteEmployees,
};
