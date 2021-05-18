import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
import { useHistory } from "react-router-dom";
import {
  ObjectFieldTemplate,
  CustomFieldTemplate,
  ArrayFieldTemplate,
} from "../../Components/RJSFTemplates";

export default function Deduction(props: any) {
  const history = useHistory();

  const schema: JSONSchema7 = {
    type: "object",
    properties: {
      deductions: {
        title: "Deductions",
        type: "array",
        items: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              title: "Name",
              type: "string",
            },
            pretax: {
              type: "boolean",
              title: "Pretax deduction",
            },
            flatAmount: {
              type: "number",
              title: "Flat Amount",
            },
            percentage: {
              type: "number",
              title: "Percentage",
              minimum: 1,
              maximum: 100,
            },
          },
        },
      },
    },
  };

  const uiSchema = {
    "ui:options": {
      orderable: false,
    },
  };

  const formData = { deductions: props.employee.data.deductions };

  const onSubmit = (data: any) => {
    props.update("deductions", data.formData.deductions);
  };

  const onBack = () => {
    history.push("/employee/federal-taxes");
  };

  function validate(formData: any, errors: any) {
    if (formData.flatAmount === "" && formData.percentage === "") {
      errors.flatAmount.addError("Flat amount or percentage must be populated");
    }
    return errors;
  }

  return (
    <Form
      className="p-3"
      showErrorList={false}
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onSubmit={onSubmit}
      validate={validate}
      ObjectFieldTemplate={ObjectFieldTemplate}
      ArrayFieldTemplate={ArrayFieldTemplate}
      FieldTemplate={CustomFieldTemplate}
    >
      <div>
        <button className="btn btn-primary float-left" onClick={() => onBack()}>
          Back
        </button>
        <button className="btn btn-primary float-right" type="submit">
          Save
        </button>
      </div>
    </Form>
  );
}
