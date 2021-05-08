import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
import { useHistory } from "react-router-dom";

export default function Employment(props: any) {
  const history = useHistory();
  const schema: JSONSchema7 = {
    definitions: {
      employeeStatus: {
        type: "string",
        enum: [
          "Active",
          "Leave",
          "Paid-Leave",
          "Suspended",
          "Terminated",
          "Retired",
          "Deceased",
        ],
      },
    },
    title: "Personal Information",
    type: "object",
    properties: {
      employeeStatus: {
        title: "Employee Status",
        $ref: "#/definitions/employeeStatus",
      },
      hireDate: {
        type: "string",
        title: "Date of Hire",
        format: "date",
      },
      terminationDate: {
        type: "string",
        title: "Date of Termination",
        format: "date",
      },
      rehireDate: {
        type: "string",
        title: "Date of Rehire",
        format: "date",
      },
      leaveDate: {
        type: "string",
        title: "Date of Leave",
        format: "date",
      },
      returnFromLeaveDate: {
        type: "string",
        title: "Date of Return from Leave",
        format: "date",
      },
    },
    required: ["employeeStatus", "hireDate"],
  };

  const formData = { ...props.employee.data.employment };

  const onSubmit = (data: any) => {
    props.update("employment", data.formData);
    history.push("/employee/job");
  };

  const onBack = () => {
    history.push("/employee/address");
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
        <button className="btn btn-primary float-right" type="submit">
          Next
        </button>
      </div>
    </Form>
  );
}
