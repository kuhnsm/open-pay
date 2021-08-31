import chai from "chai";
const expect = chai.expect;
import calculateFederalTaxes from "../FederalTaxes/federalTaxes";

let employee = {
  job: {
    employeeType: "Salaried",
    jobTitle: "Senior Software Engineer",
    payFrequency: "Weekly",
    annualSalary: 183040,
  },
  federalTaxes: {
    filingStatus: "Married, filing jointly",
    qualifyingDependents: 2000,
    otherDependents: 500,
    otherIncome: 0,
    deductions: 0,
    multipleJob: false,
    extraWithholding: 0,
  },
};

describe("Federal Taxes Tests", () => {
  it("Process Federal Taxes", () => {
    let federalTaxAmount = calculateFederalTaxes(employee);
    expect(federalTaxAmount).to.equal(564);
  });
});
