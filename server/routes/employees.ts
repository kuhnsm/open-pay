import { Router } from "express";
import db from "../dao/DB";

const employeesRouter = Router();
/*
var UserController = require('../controllers/user.controller')

router.get('/', UserController.getUsers)
*/
import EmployeeController from "../controllers/employee.controller";

employeesRouter.get("/", EmployeeController.getEmployees);
employeesRouter.post("/", EmployeeController.insertEmployees);
/*
employeesRouter.get("/", async (request, response) => {
  
  let cursor = await db.getDB().collection("movie").find({});
  await cursor.forEach((doc) => console.log(doc));
  const allValues = await cursor.toArray();
  console.log(allValues);
  return response.json("OK");
  
});
*/
export default employeesRouter;
