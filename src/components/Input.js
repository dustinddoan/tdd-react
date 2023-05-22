const Input = (props) => {
  const { id, label, onChange, help, type } = props;

  let inputClass = "form-control";
  if (help) {
    inputClass += " is-invalid";
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type || "text"}
        className={inputClass}
        placeholder="Username"
        onChange={onChange}
      />
      {help && <span className="invalid-feedback">{help}</span>}
    </div>
  );
};

export default Input;
