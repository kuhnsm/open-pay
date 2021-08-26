function determinePayPeriods(payFrequency: string) {
  switch (payFrequency) {
    //"Weekly", "Semi-weekly", "Semi-monthly", "Monthly"
    case "Weekly":
      return 52;
    case "Semi-weekly":
      return 26;
    case "Semi-monthly":
      return 24;
    case "Monthly":
      return 12;
    default:
      throw new Error("Invalid pay frequecy.");
  }
}
export default function calculatePay(employee: any) {
  console.log("employee.job.annualSalary", employee.job.annualSalary);
  if (employee.job.employeeType === "Salaried") {
    return parseFloat(
      (
        employee.job.annualSalary /
        determinePayPeriods(employee.job.payFrequency)
      ).toFixed(2)
    );
  } else {
    throw new Error("Only salaried");
  }
}
