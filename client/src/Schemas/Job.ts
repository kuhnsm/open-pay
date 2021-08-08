import { JSONSchema7 } from "json-schema";
const jobSchema: JSONSchema7 = {
  definitions: {
    payFrequency: {
      type: "string",
      enum: ["Weekly", "Semi-weekly", "Semi-monthly", "Monthly"],
    },
  },
  dependencies: {
    employeeType: {
      oneOf: [
        {
          properties: {
            employeeType: {
              enum: ["Salaried"],
            },
            annualSalary: {
              type: "number",
              title: "Annual Salary",
            },
          },
          required: ["annualSalary"],
        },
        {
          properties: {
            employeeType: {
              enum: ["Hourly"],
            },
            hourlyRate: {
              type: "number",
              title: "Hourly Rate",
            },
          },
          required: ["hourlyRate"],
        },
      ],
    },
  },
  title: "Job Information",
  type: "object",
  properties: {
    jobTitle: {
      type: "string",
      title: "Job Title",
      minLength: 3,
    },
    payFrequency: {
      title: "Pay Frequency",
      $ref: "#/definitions/payFrequency",
    },
    employeeType: {
      type: "string",
      enum: ["Salaried", "Hourly"],
      default: "Salaried",
      title: "Employee Type",
    },
  },
  required: ["jobTitle", "payFrequency", "employeeType"],
};

export default jobSchema;
