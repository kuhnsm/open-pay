import chai from "chai";
const expect = chai.expect;
import {
  calculatePreTaxDeductions,
  calculatePostTaxDeductions,
} from "../deductions/index";

let deductions = [
  {
    name: "Medical",
    pretax: true,
    flatAmount: 254,
  },
  {
    name: "401k",
    pretax: true,
    percentage: 4,
  },
  {
    name: "Dental",
    pretax: true,
    flatAmount: 26,
  },
  {
    name: "Vision",
    pretax: true,
    flatAmount: 10,
  },
  {
    name: "FSA",
    pretax: true,
    percentage: 2,
  },
  {
    name: "Life Insurance",
    percentage: 2,
  },
  {
    name: "Roth 401k",
    percentage: 3,
  },
  {
    name: "ESPP",
    flatAmount: 100,
  },
  {
    name: "Pet Insurance",
    flatAmount: 23.95,
  },
];

describe("Deduction Tests", () => {
  it("Process Pre-tax deductions", () => {
    let employee = { deductions: deductions };
    let preTaxDeductionAmount = calculatePreTaxDeductions(employee, 1000);
    expect(preTaxDeductionAmount).to.equal(350);
  });
  it("Process Post-tax deductions", () => {
    let employee = { deductions: deductions };
    let preTaxDeductionAmount = calculatePostTaxDeductions(employee, 1000);
    expect(preTaxDeductionAmount).to.equal(173.95);
  });
});
