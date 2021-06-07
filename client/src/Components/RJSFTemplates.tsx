export function ArrayFieldTemplate(props: any) {
  let deleteButtonStyle = { marginTop: 32, marginLeft: 15 };
  return (
    <div>
      <div className="my-1">
        <h5>{props.title}</h5>
        <hr className="border-0 bg-secondary" style={{ height: 1 }} />
      </div>
      {props.items.map((element: any) => {
        return (
          <div style={{ display: "flex" }}>
            {element.children}
            <button
              style={deleteButtonStyle}
              className="btn btn-primary h-50"
              onClick={() => element.onDropIndexClick(element.index)()}
            >
              X
            </button>
          </div>
        );
      })}
      {props.canAdd && (
        <button
          className="btn btn-primary"
          type="button"
          onClick={props.onAddClick}
        >
          +
        </button>
      )}
    </div>
  );
}

export function CustomFieldTemplate(props: any) {
  let { classNames, help, description, errors, children } = props;
  classNames += " mx-1";
  return (
    <div className={classNames}>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}

export function ObjectFieldTemplate({
  TitleField,
  properties,
  title,
  description,
}: any) {
  return (
    <div className="row">
      {properties.map((prop: any) => {
        return prop.content;
      })}
    </div>
  );
}
