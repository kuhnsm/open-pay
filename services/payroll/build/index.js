"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("./DB"));
const calculate_pay_1 = __importDefault(require("./calculate-pay"));
const deductions_1 = require("./deductions");
const federalTaxes_1 = __importDefault(require("./federalTaxes"));
const stateTaxes_1 = __importDefault(require("./stateTaxes"));
const updateYTD_1 = __importDefault(require("./updateYTD"));
/**
 * @constructor
 * @this Payroll
 */
function Payroll(payrollTags) {
    // assigning  parameter values to the calling object
    (this.payrollTags = payrollTags),
        (this.run = function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.db = yield DB_1.default.connect();
                console.log(`Running payroll for: ${this.payrollTags.map((tag) => tag)}`);
                //get employees
                let employees = yield DB_1.default
                    .getDB()
                    .collection("employees")
                    .find({ "job.employeeType": "Salaried", "job.payFrequency": "Weekly" })
                    .toArray();
                employees.forEach((employee) => __awaiter(this, void 0, void 0, function* () {
                    let employeeCheck = {
                        emplid: "",
                        grossPay: 0,
                        preTaxDeductions: 0,
                        federalTaxes: 0,
                        stateTaxes: 0,
                        postTaxDeductions: 0,
                        netPay: 0,
                    };
                    console.log("--------------------------------------------------------------------------------------");
                    console.log(`Processing paycheck for employee: ${employee.demographic.lastName}, ${employee.demographic.firstName}`);
                    // calculate periodic gross pay amount
                    employeeCheck.grossPay = calculate_pay_1.default(employee);
                    console.log(`Gross pay ${employeeCheck.grossPay}`);
                    // calculate pre-tax deductions
                    employeeCheck.preTaxDeductions = deductions_1.calculatePreTaxDeductions(employee);
                    console.log(`Pretax deductions ${employeeCheck.preTaxDeductions}`);
                    // calculate federal taxes
                    employeeCheck.federalTaxes = federalTaxes_1.default(employee);
                    console.log(`Federal taxes ${employeeCheck.federalTaxes}`);
                    // calculate state taxes
                    employeeCheck.stateTaxes = stateTaxes_1.default(employee);
                    console.log(`State taxes ${employeeCheck.stateTaxes}`);
                    // calculate post-tax deductions
                    employeeCheck.postTaxDeductions = deductions_1.calculatePostTaxDeductions(employee);
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
                    yield DB_1.default.getDB().collection("checks").insertOne(employeeCheck);
                    // update year to date amounts
                    yield updateYTD_1.default(employeeCheck);
                }));
                return true;
            });
        });
}
// creating objects
const payroll1 = new Payroll(["Weekly", "Salaried"]);
payroll1.run();
//# sourceMappingURL=index.js.map