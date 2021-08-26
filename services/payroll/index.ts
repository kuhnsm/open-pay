import db from "./DB";
import calculatePay from "./calculate-pay";
import {
  calculatePreTaxDeductions,
  calculatePostTaxDeductions,
} from "./deductions";
import calculateFederalTaxes from "./federalTaxes";
import calculateStateTaxes from "./stateTaxes";
import updateYTD from "./updateYTD";

/**
 * @constructor
 * @this Payroll
 */
function Payroll(payrollTags: string[]) {
  // assigning  parameter values to the calling object
  (this.payrollTags = payrollTags),
    (this.run = async function () {
      this.db = await db.connect();
      console.log(
        `Running payroll for: ${this.payrollTags.map((tag: string) => tag)}`
      );
      //get employees
      let employees = await db
        .getDB()
        .collection("employees")
        .find({ "job.employeeType": "Salaried", "job.payFrequency": "Weekly" })
        .toArray();
      employees.forEach(async (employee) => {
        let employeeCheck = {
          emplid: "",
          grossPay: 0,
          preTaxDeductions: 0,
          federalTaxes: 0,
          stateTaxes: 0,
          postTaxDeductions: 0,
          netPay: 0,
        };
        console.log(
          "--------------------------------------------------------------------------------------"
        );
        console.log(
          `Processing paycheck for employee: ${employee.demographic.lastName}, ${employee.demographic.firstName}`
        );
        // calculate periodic gross pay amount
        employeeCheck.grossPay = calculatePay(employee);
        console.log(`Gross pay ${employeeCheck.grossPay}`);
        // calculate pre-tax deductions
        employeeCheck.preTaxDeductions = calculatePreTaxDeductions(
          employee,
          employeeCheck.grossPay
        );
        console.log(`Pretax deductions ${employeeCheck.preTaxDeductions}`);
        // calculate federal taxes
        employeeCheck.federalTaxes = calculateFederalTaxes(employee);
        console.log(`Federal taxes ${employeeCheck.federalTaxes}`);
        // calculate state taxes
        employeeCheck.stateTaxes = calculateStateTaxes(employee);
        console.log(`State taxes ${employeeCheck.stateTaxes}`);
        // calculate post-tax deductions
        const postTaxNetPay =
          employeeCheck.grossPay -
          employeeCheck.preTaxDeductions -
          employeeCheck.federalTaxes -
          employeeCheck.stateTaxes;
        employeeCheck.postTaxDeductions = calculatePostTaxDeductions(
          employee,
          postTaxNetPay
        );
        console.log(`Post tax deductions ${employeeCheck.postTaxDeductions}`);
        // process final check
        employeeCheck.netPay =
          employeeCheck.grossPay -
          employeeCheck.preTaxDeductions -
          employeeCheck.federalTaxes -
          employeeCheck.stateTaxes -
          employeeCheck.postTaxDeductions;
        employeeCheck.emplid = employee._id;
        // insert paycheck
        await db.getDB().collection("checks").insertOne(employeeCheck);
        // update year to date amounts
        await updateYTD(employeeCheck);
      });
      return true;
    });
}

// creating objects
const payroll1 = new (Payroll as any)(["Weekly", "Salaried"]);

payroll1.run();
