import Form from "@rjsf/bootstrap-4";
import { JSONSchema7 } from "json-schema";
import { useHistory } from "react-router-dom";
export default function FederalTaxes(props: any) {
  const history = useHistory();
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
    history.push("/employee/deductions");
  };

  const onBack = () => {
    history.push("/employee/job");
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
