/*
var User = require('../models/user.model')

exports.getUsers = async function (query, page, limit) {

    try {
        var users = await User.find(query)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
*/
import db from "../dao/DB";

async function getEmployees(query: any, skip: number, limit: number) {
  try {
    let employees = await db.getDB().collection("employees").find({}).toArray();
    return employees;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Employees");
  }
}

async function insertEmployees(employee: any) {
  try {
    let employees = await db
      .getDB()
      .collection("employees")
      .insertOne(employee);
    return employees;
  } catch (e) {
    // Log Errors
    throw Error("Error while Paginating Employees");
  }
}

export default { getEmployees, insertEmployees };
