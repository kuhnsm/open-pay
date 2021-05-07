import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
export default function Address(props: any) {
  const schema: JSONSchema7 = {
    title: "Address",
    type: "object",
    properties: {
      street1: {
        type: "string",
        title: "Street1",
      },
      street2: {
        type: "string",
        title: "Street2",
      },
      city: {
        type: "string",
        title: "City",
      },
      state: {
        type: "string",
        title: "State",
      },
      zip: {
        type: "string",
        title: "Zip",
      },
    },
    required: ["street1", "city", "state", "zip"],
  };

  const formData = { ...props.employee.data.address };

  const onSubmit = (data: any) => {
    props.update("address", data.formData);
  };

  return (
    <Form
      showErrorList={false}
      schema={schema}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
}
