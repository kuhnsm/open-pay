import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
export default function Deduction(props: any) {
  const schema: JSONSchema7 = {
    type: "object",

    properties: {
      deductions: {
        title: "Deductions",
        type: "array",
        items: {
          type: "object",
          required: ["name", "amount"],
          properties: {
            name: {
              type: "string",
              title: "Name",
            },
            pretax: {
              type: "boolean",
              title: "Pretax deduction",
            },
          },
          oneOf: [
            {
              title: "Flat amount",
              properties: {
                amount: {
                  type: "number",
                  title: "Amount",
                },
              },
              required: ["amount"],
            },
            {
              title: "Percentage",
              properties: {
                percentage: {
                  type: "number",
                  title: "Percentage",
                },
              },
              required: ["percentage"],
            },
          ],
        },
      },
    },
  };

  const uiSchema = {
    deductions: {
      "ui:options": {
        orderable: false,
      },
    },
  };

  const formData = { deductions: props.employee.data.deductions };

  const onSubmit = (data: any) => {
    props.update("deductions", data.formData.deductions);
  };

  return (
    <Form
      showErrorList={false}
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}
