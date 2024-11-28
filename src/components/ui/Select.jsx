const Select = ({ options, ...props }) => {
  return (
    <select {...props} ref={props.ref}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
