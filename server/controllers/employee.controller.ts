/*
var UserService = require('../services/user.service')    

exports.getUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    
    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
*/
import { Request, Response, NextFunction } from "express";
import EmployeeService from "../services/employee.service";

async function getEmployees(req: Request, res: Response, next: NextFunction) {
  let page = req.params.page ? parseInt(req.params.page) : 1;
  let limit = req.params.limit ? parseInt(req.params.limit) : 10;
  try {
    let employees = await EmployeeService.getEmployees({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: employees,
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
      message: "Succesfully Employees Retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export default { getEmployees, insertEmployees };
