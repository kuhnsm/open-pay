import db from "../dao/DB";
import * as faker from "faker";

function getEmployee() {
  return {
    data: {
      demographic: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: faker.name.middleName(),
        gender: faker.name.gender(),
        birthdate: faker.date.between("1950-01-01", "1999-12-31"),
      },
      address: {
        street1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode(),
      },
      job: {
        employeeType: "Salaried",
        jobTitle: faker.name.jobTitle(),
        payFrequency: "Weekly",
        annualSalary: faker.datatype.number(250000),
      },
      isComplete: true,
      employment: {
        employeeStatus: "Active",
        hireDate: faker.date.recent(),
      },
      federalTaxes: {
        filingStatus: "Single or married filing seperately",
        qualifyingDependents: 2,
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
    },
  };
}
async function insertEmployees(numEmployees: number) {
  console.log(`Inserting ${numEmployees} employees.`);
  let i = 0;
  while (i < 100) {
    try {
      await db.getDB().collection("employees").insertOne(getEmployee());
    } catch (err) {
      console.error(err);
    }
    i++;
  }
  console.log("Done.");
}

async function setup() {
  let numEmployees = 100;
  await db.connect();
  await insertEmployees(numEmployees);
  process.exit(0);
}

setup();
