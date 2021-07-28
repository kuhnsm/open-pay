import Form from "@rjsf/bootstrap-4";
import jobSchema from "../../Schemas/Job";
import { useHistory } from "react-router-dom";
export default function Job(props: any) {
  const history = useHistory();
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
      schema={jobSchema}
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
