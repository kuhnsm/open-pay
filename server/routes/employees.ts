import { Router } from "express";
const employeesRouter = Router();
import EmployeeController from "../controllers/employee.controller";

employeesRouter.get("/", EmployeeController.getEmployees);
employeesRouter.post("/", EmployeeController.insertEmployees);

export default employeesRouter;
