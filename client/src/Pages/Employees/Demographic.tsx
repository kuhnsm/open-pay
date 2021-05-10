import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
import { useHistory } from "react-router-dom";
export default function Demographic(props: any) {
  const history = useHistory();
  const schema: JSONSchema7 = {
    definitions: {
      gender: {
        type: "string",
        enum: ["Male", "Female", "Other"],
      },
    },
    title: "Personal Information",
    type: "object",
    properties: {
      firstName: {
        type: "string",
        title: "First Name",
        minLength: 3,
      },
      middleName: {
        type: "string",
        title: "Middle Name",
      },
      lastName: {
        type: "string",
        title: "Last Name",
        minLength: 3,
      },
      gender: {
        title: "Gender",
        $ref: "#/definitions/gender",
      },
      birthdate: {
        type: "string",
        title: "Date of Birth",
        format: "date",
      },
    },
    required: ["firstName", "lastName", "birthdate"],
  };

  const formData = { ...props.employee.data.demographic };

  const onSubmit = (data: any) => {
    props.update("demographic", data.formData);
    history.push("/employee/address");
  };

  const onBack = () => {
    history.push("/employees/");
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
