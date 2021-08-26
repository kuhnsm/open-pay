// filter out the percentage deductions and reduce the percentage amounts
function getPercentageDeductions(deductions: any, pay: number) {
  return deductions
    .filter((deduction: any) => deduction.hasOwnProperty("percentage"))
    .reduce((acc: any, curr: any) => {
      return (acc += (curr.percentage / 100) * pay);
    }, 0);
}

function getFlatAmountDeductions(deductions: any) {
  return deductions
    .filter((deduction: any) => deduction.hasOwnProperty("flatAmount"))
    .reduce((acc: any, curr: any) => {
      return (acc += curr.flatAmount);
    }, 0);
}

export function calculatePreTaxDeductions(employee: any, grossPay: number) {
  //filter out the pretax deductions
  let pretaxDeductions = employee.deductions.filter(
    (deduction: any) => deduction.pretax
  );

  return (
    getPercentageDeductions(pretaxDeductions, grossPay) +
    getFlatAmountDeductions(pretaxDeductions)
  );
}

export function calculatePostTaxDeductions(
  employee: any,
  postTaxNetPay: number
) {
  //filter out the pretax deductions
  let posttaxDeductions = employee.deductions.filter(
    (deduction: any) => !deduction.hasOwnProperty("pretax")
  );

  return (
    getPercentageDeductions(posttaxDeductions, postTaxNetPay) +
    getFlatAmountDeductions(posttaxDeductions)
  );
}
