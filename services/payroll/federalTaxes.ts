// @ts-nocheck
let marriedFilingJointly = [
  {
    atLeast: 0,
    lessThan: 12550,
    tentativeAmt: 0.0,
    plusPercentage: 0,
    adjustedAnnualWageExceeds: 0,
  },
  {
    atLeast: 12550,
    lessThan: 22500,
    tentativeAmt: 0.0,
    plusPercentage: 0.1,
    adjustedAnnualWageExceeds: 12550,
  },
  {
    atLeast: 22500,
    lessThan: 53075,
    tentativeAmt: 995.0,
    plusPercentage: 0.12,
    adjustedAnnualWageExceeds: 22500,
  },
  {
    atLeast: 53075,
    lessThan: 98925,
    tentativeAmt: 4664.0,
    plusPercentage: 0.22,
    adjustedAnnualWageExceeds: 53075,
  },
  {
    atLeast: 98925,
    lessThan: 177475,
    tentativeAmt: 14751.0,
    plusPercentage: 0.24,
    adjustedAnnualWageExceeds: 98925,
  },
  {
    atLeast: 177475,
    lessThan: 221975,
    tentativeAmt: 33603.0,
    plusPercentage: 0.32,
    adjustedAnnualWageExceeds: 177475,
  },
  {
    atLeast: 221975,
    lessThan: 326700,
    tentativeAmt: 47843.0,
    plusPercentage: 0.35,
    adjustedAnnualWageExceeds: 221975,
  },
  {
    atLeast: 326700,
    lessThan: Number.MAX_VALUE,
    tentativeAmt: 84496.75,
    plusPercentage: 0.37,
    adjustedAnnualWageExceeds: 326700,
  },
];

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
export default function calculateFederalTaxes(employee: any) {
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
  let taxBracket = marriedFilingJointly.filter((bracket) => {
    return (
      bracket.atLeast <= adjustedAnnualWageAmount &&
      bracket.lessThan >= adjustedAnnualWageAmount
    );
  })[0];
  console.log("taxBracket", taxBracket);
  //taxBracket.atLeast // column A
  //taxBracket.tentativeAmt // column C
  //taxBracket.plusPercentage // column D
  let line2e = adjustedAnnualWageAmount - taxBracket.atLeast;
  console.log("line2e", line2e);
  let line2f = line2e * taxBracket.plusPercentage;
  console.log("line2f", line2f);
  let line2g = line2f + taxBracket.tentativeAmt;
  console.log("line2g", line2g);
  let tentativeHoldingAmount = line2g / getDivisor(employee.job.payFrequency);
  console.log("tentativeHoldingAmount", tentativeHoldingAmount);
  let taxCredits =
    (employee.federalTaxes.qualifyingDependents +
      employee.federalTaxes.otherDependents) /
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
}
