import chai from "chai";
const expect = chai.expect;
import {
  calculateFederalTaxes,
  calculateSocialSecurityWitholding,
  calculateMedicareWitholding,
} from "../FederalTaxes/federalTaxes";

const marriedFilingJointlyEmployee = {
  job: {
    employeeType: "Salaried",
    jobTitle: "Senior Software Engineer",
    payFrequency: "Weekly",
    annualSalary: 183040,
  },
  federalTaxes: {
    filingStatus: "Married, filing jointly",
    qualifyingDependents: 1,
    otherDependents: 1,
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
    qualifyingDependents: 1,
    otherDependents: 1,
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
    qualifyingDependents: 1,
    otherDependents: 1,
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

describe("Social Security Witholding", () => {
  it("calculates Social Security witholding", () => {
    let socialSecurityWitholding = calculateSocialSecurityWitholding(
      marriedFilingJointlyEmployee
    );
    expect(socialSecurityWitholding).to.equal(218.24);
  });
});

describe("Medicare Witholding", () => {
  it("calculates Medicare witholding", () => {
    let socialSecurityWitholding = calculateMedicareWitholding(
      marriedFilingJointlyEmployee
    );
    expect(socialSecurityWitholding).to.equal(52.45);
  });
});
