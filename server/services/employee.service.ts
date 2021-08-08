import db from "../dao/DB";
import { ObjectId } from "mongodb";
import { employeeFind } from "../types/employees";

async function getEmployees(query: string, skip: number, limit: number) {
  try {
    let find: employeeFind = { deletionDate: { $exists: false } };
    if (query) {
      find.$text = { $search: query };
    }
    return await db
      .getDB()
      .collection("employees")
      .find(find)
      .skip(skip)
      .limit(limit)
      .toArray();
  } catch (e) {
    // Log Errors
    console.error(e);
    throw Error("Error while Paginating Employees");
  }
}

async function getTotalEmployeeCount() {
  try {
    return await db
      .getDB()
      .collection("employees")
      .find({ deletionDate: { $exists: false } })
      .count();
  } catch (e) {
    // Log Errors
    console.error(e);
    throw Error("Error while getting employee record count");
  }
}

async function insertEmployees(employee: any) {
  try {
    await db.getDB().collection("employees").insertOne(employee);
    return await db
      .getDB()
      .collection("employees")
      .find({ deletionDate: { $exists: false } })
      .skip(0)
      .limit(10)
      .toArray();
  } catch (e) {
    // Log Errors
    console.error(e);
    throw Error("Error while Inserting Employees");
  }
}

async function updateEmployees(employee: any) {
  try {
    let thisId = employee._id;
    delete employee._id;
    await db
      .getDB()
      .collection("employees")
      .replaceOne({ _id: new ObjectId(thisId) }, employee);
    return await db
      .getDB()
      .collection("employees")
      .find({ deletionDate: { $exists: false } })
      .skip(0)
      .limit(10)
      .toArray();
  } catch (e) {
    // Log Errors
    console.error(e);
    throw Error("Error while Updating Employees");
  }
}

async function deleteEmployees(_id: any) {
  try {
    await db
      .getDB()
      .collection("employees")
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { deletionDate: new Date() } }
      );
    return await db
      .getDB()
      .collection("employees")
      .find({ deletionDate: { $exists: false } })
      .skip(0)
      .limit(10)
      .toArray();
  } catch (e) {
    // Log Errors
    console.error(e);
    throw Error("Error while Paginating Employees");
  }
}

export default {
  getEmployees,
  getTotalEmployeeCount,
  insertEmployees,
  updateEmployees,
  deleteEmployees,
};
