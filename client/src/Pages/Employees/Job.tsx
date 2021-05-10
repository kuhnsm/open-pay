import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
import { useHistory } from "react-router-dom";
export default function Job(props: any) {
  const history = useHistory();
  const schema: JSONSchema7 = {
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

  const formData = { ...props.employee.data.job };

  const onSubmit = (data: any) => {
    props.update("job", data.formData);
    history.push("/employee/federal-taxes");
  };

  const onBack = () => {
    history.push("/employee/employment");
  };

  return (
    <Form
      className="p-3"
      showErrorList={false}
      schema={schema}
      formData={formData}
      onSubmit={onSubmit}
    >
      <div>
        <button className="btn btn-primary float-left" onClick={() => onBack()}>
          Back
        </button>
        <button
          data-cy="job-next"
          className="btn btn-primary float-right"
          type="submit"
        >
          Next
        </button>
      </div>
    </Form>
  );
}
