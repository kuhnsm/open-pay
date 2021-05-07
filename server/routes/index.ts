import { Router } from "express";
import employeesRouter from "./employees";

const routes = Router();

routes.use("/employees", employeesRouter);

export default routes;
