import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
export default function FederalTaxes(props: any) {
  const schema: JSONSchema7 = {
    definitions: {
      filingStatus: {
        type: "string",
        enum: [
          "Single or married filing seperately",
          "Married, filing jointly",
          "Head of household",
        ],
      },
    },
    title: "Job Information",
    type: "object",
    properties: {
      filingStatus: {
        title: "Filing Status",
        $ref: "#/definitions/filingStatus",
      },
      multipleJobsOrSpouseWorks: {
        type: "boolean",
        title: "Multiple jobs or spouse works",
      },
      qualifyingDependents: {
        title: "Qualifying dependents",
        type: "number",
      },
      otherDependents: {
        title: "Other Dependents",
        type: "number",
      },
      otherIncome: {
        title: "Other Income",
        type: "number",
      },
      deductions: {
        title: "Deductions",
        type: "number",
      },
      extraWithholding: {
        title: "Extra Withholding",
        type: "number",
      },
    },
    required: ["filingStatus", "qualifyingDependents"],
  };

  const formData = { ...props.employee.data.federalTaxes };

  const onSubmit = (data: any) => {
    props.update("federalTaxes", data.formData);
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
