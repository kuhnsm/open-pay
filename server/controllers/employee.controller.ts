import { Request, Response } from "express";
import EmployeeService from "../services/employee.service";

async function getEmployees(req: Request, res: Response) {
  if (typeof req.query.skip !== "string") {
    return res
      .status(400)
      .json({ status: 400, message: "Skip must be string" });
  }
  if (typeof req.query.limit !== "string") {
    return res
      .status(400)
      .json({ status: 400, message: "Limit must be string" });
  }
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let query = req.query.q ? req.query.q : "";
  if (typeof query !== "string") {
    return res
      .status(400)
      .json({ status: 400, message: "Query must be string" });
  }
  try {
    let employees = await EmployeeService.getEmployees(query, skip, limit);
    return res.status(200).json({
      status: 200,
      employees: employees,
      message: "Succesfully Employees Retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

async function insertEmployees(req: Request, res: Response) {
  try {
    let employees = await EmployeeService.insertEmployees(req.body.data);
    return res.status(200).json({
      status: 200,
      message: "Succesfully Employees Insert",
      employees,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

async function updateEmployees(req: Request, res: Response) {
  try {
    let employees = await EmployeeService.updateEmployees(req.body.data);
    return res.status(200).json({
      status: 200,
      message: "Succesfully Employees Update",
      employees,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

async function deleteEmployees(req: Request, res: Response) {
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
