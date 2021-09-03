import db from "../dao/DB";
import * as faker from "faker";
import { database } from "faker";

let employeeType = ["Salaried", "Hourly"];
let payFrequency = ["Weekly", "Semi-weekly", "Semi-monthly", "Monthly"];
let employeeStatus = [
  "Active",
  "Leave",
  "Paid-Leave",
  "Suspended",
  "Terminated",
  "Retired",
  "Deceased",
];
let filingStatus = [
  "Single or married filing seperately",
  "Married, filing jointly",
  "Head of household",
];
let gender = ["Male", "Female", "Other"];
let boolArray = [true, false];

function getEmployee() {
  //return {
  let thisEmployeeType =
    employeeType[Math.floor(Math.random() * employeeType.length)];
  let data = {
    demographic: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      middleName: faker.name.middleName(),
      gender: gender[Math.floor(Math.random() * gender.length)],
      birthdate: faker.date
        .between("1950-01-01", "1999-12-31")
        .toISOString()
        .substring(0, 10),
    },
    address: {
      street1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
    },
    job: {
      employeeType: thisEmployeeType,
      jobTitle: faker.name.jobTitle(),
      payFrequency:
        payFrequency[Math.floor(Math.random() * payFrequency.length)],
      annualSalary: 0,
      hourlyRate: 0,
    },
    isComplete: true,
    employment: {
      employeeStatus:
        employeeStatus[Math.floor(Math.random() * employeeStatus.length)],
      hireDate: faker.date.recent().toISOString().substring(0, 10),
    },
    federalTaxes: {
      filingStatus:
        filingStatus[Math.floor(Math.random() * filingStatus.length)],
      qualifyingDependents: faker.datatype.number(6),
      otherDependents: faker.datatype.number(2),
      otherIncome: faker.datatype.number(2),
      deductions: faker.datatype.number(2),
      multipleJob: boolArray[Math.floor(Math.random() * 2)],
      extraWithholding: faker.datatype.number(200),
    },
    deductions: [
      {
        name: "Medical",
        pretax: true,
        flatAmount: faker.datatype.number(1000),
      },
      {
        name: "Life Insurance",
        percentage: faker.datatype.number(25),
      },
    ],
  };
  if (thisEmployeeType === "Salaried") {
    data.job.annualSalary = faker.datatype.number(250000);
    //@ts-ignore
    delete data.job.hourlyRate;
  } else {
    data.job.hourlyRate = faker.datatype.number(100);
    //@ts-ignore
    delete data.job.annualSalary;
  }
  return { data };
}
async function insertEmployees(numEmployees: number) {
  console.log(`Inserting ${numEmployees} employees.`);
  let i = 0;
  while (i < 100) {
    try {
      await db.getDB().collection("employees").insertOne(getEmployee().data);
    } catch (err) {
      console.error(err);
    }
    i++;
  }
  console.log("Done.");
}

export default async function setupTestEmployees() {
  let numEmployees = 100;
  return await insertEmployees(numEmployees);
}
