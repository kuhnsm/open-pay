/**
 * Based on IRS document: https://www.irs.gov/pub/irs-pdf/p15t.pdf
 */

// @ts-nocheck
import {
  marriedFilingJointly,
  singleOrMarriedFilingSeparately,
  headOfHousehold,
} from "./PercentageMethodTables";

const QUALIFYING_DEPENDENT_MULTIPLIER = 2000;
const OTHER_DEPENDENTS_MULTIPLIER = 500;

function getDivisor(payFrequency: string) {
  switch (payFrequency) {
    case "Semiannually":
      return 2;
    case "Quarterly":
      return 4;
    case "Monthly":
      return 12;
    case "Semimonthly":
      return 24;
    case "Biweekly":
      return 26;
    case "Weekly":
      return 52;
    case "Daily":
      return 260;
    default:
      throw new Error("Pay frequency not supported");
  }
}

function getTaxBracket(filingStatus, adjustedAnnualWageAmount) {
  let percentageMethodTable;
  if (filingStatus === "Head of household") {
    percentageMethodTable = headOfHousehold;
  } else if (filingStatus === "Single or married filing seperately") {
    percentageMethodTable = singleOrMarriedFilingSeparately;
  } else if (filingStatus === "Married, filing jointly") {
    percentageMethodTable = marriedFilingJointly;
  } else {
    throw new Error("Invalid Filing Status");
  }
  return percentageMethodTable.filter((bracket) => {
    return (
      bracket.atLeast <= adjustedAnnualWageAmount &&
      bracket.lessThan >= adjustedAnnualWageAmount
    );
  })[0];
}

export function calculateFederalTaxes(employee: any) {
  try {
    let baseIncome = employee.job.annualSalary;
    console.log("baseIncome", baseIncome);
    // adjust baseIncome for hourly employees
    let adjustedIncome = baseIncome + employee.federalTaxes.otherIncome;
    console.log("adjustedIncome", adjustedIncome);
    let adjustedDeduction = 0;
    if (!employee.federalTaxes.multipleJob) {
      if (employee.federalTaxes.filingStatus === "Married, filing jointly") {
        adjustedDeduction = 12900; //make this enum
      } else {
        adjustedDeduction = 8600;
      }
    }
    console.log("adjustedDeduction", adjustedDeduction);
    let adjustedAnnualWageAmount =
      adjustedIncome - (adjustedDeduction + employee.federalTaxes.deductions);
    if (adjustedAnnualWageAmount < 0) {
      adjustedAnnualWageAmount = 0;
    }
    console.log("adjustedAnnualWageAmount", adjustedAnnualWageAmount);
    const taxBracket = getTaxBracket(
      employee.federalTaxes.filingStatus,
      adjustedAnnualWageAmount
    );
    console.log("taxBracket", taxBracket);
    let line2e = adjustedAnnualWageAmount - taxBracket.atLeast;
    console.log("line2e", line2e);
    let line2f = line2e * taxBracket.plusPercentage;
    console.log("line2f", line2f);
    let line2g = line2f + taxBracket.tentativeAmt;
    console.log("line2g", line2g);
    let tentativeHoldingAmount = line2g / getDivisor(employee.job.payFrequency);
    console.log("tentativeHoldingAmount", tentativeHoldingAmount);
    let taxCredits =
      (employee.federalTaxes.qualifyingDependents *
        QUALIFYING_DEPENDENT_MULTIPLIER +
        employee.federalTaxes.otherDependents * OTHER_DEPENDENTS_MULTIPLIER) /
      getDivisor(employee.job.payFrequency);
    console.log("taxCredits", taxCredits);
    let netWitholdingAmount = tentativeHoldingAmount - taxCredits;
    if (netWitholdingAmount < 0) {
      netWitholdingAmount = 0;
    }
    console.log("netWitholdingAmount", netWitholdingAmount);
    let finalWitholdingAmount =
      netWitholdingAmount + employee.federalTaxes.extraWithholding;
    console.log("finalWitholdingAmount", finalWitholdingAmount);
    return Math.round(finalWitholdingAmount);
  } catch (error) {
    console.error(error);
  }
}

export function calculateSocialSecurityWitholding(employee: any) {
  return parseFloat(
    (
      (employee.job.annualSalary / getDivisor(employee.job.payFrequency)) *
      0.062
    ).toFixed(2)
  );
}

export function calculateMedicareWitholding(employee: any) {
  return parseFloat(
    (
      (employee.job.annualSalary / getDivisor(employee.job.payFrequency)) *
      0.0149
    ).toFixed(2)
  );
}
