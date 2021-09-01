import chai from "chai";
const expect = chai.expect;
import calculateFederalTaxes from "../FederalTaxes/federalTaxes";

const marriedFilingJointlyEmployee = {
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

const singleOrMarriedFilingSeperately = {
  job: {
    employeeType: "Salaried",
    jobTitle: "Senior Software Engineer",
    payFrequency: "Weekly",
    annualSalary: 183040,
  },
  federalTaxes: {
    filingStatus: "Single or married filing seperately",
    qualifyingDependents: 2000,
    otherDependents: 500,
    otherIncome: 0,
    deductions: 0,
    multipleJob: false,
    extraWithholding: 0,
  },
};

const headOfHousehold = {
  job: {
    employeeType: "Salaried",
    jobTitle: "Senior Software Engineer",
    payFrequency: "Weekly",
    annualSalary: 183040,
  },
  federalTaxes: {
    filingStatus: "Head of household",
    qualifyingDependents: 2000,
    otherDependents: 500,
    otherIncome: 0,
    deductions: 0,
    multipleJob: false,
    extraWithholding: 0,
  },
};
describe("Federal Taxes Tests", () => {
  it("Process Federal Taxes for married, filing jointly", () => {
    let federalTaxAmount = calculateFederalTaxes(marriedFilingJointlyEmployee);
    expect(federalTaxAmount).to.equal(564);
  });
  it("Process Federal Taxes for single  or married, filing seperately", () => {
    let federalTaxAmount = calculateFederalTaxes(
      singleOrMarriedFilingSeperately
    );
    expect(federalTaxAmount).to.equal(839);
  });

  it("Process Federal Taxes for head of household", () => {
    let federalTaxAmount = calculateFederalTaxes(headOfHousehold);
    expect(federalTaxAmount).to.equal(804);
  });
});
