const Checkbox = ({ checked, onChange, disabled, label }) => (
  <div className="React__checkbox" onClick={e => onChange(e)}>
    <input
      type="checkbox"
      name="isGoing"
      className="React__checkbox--input"
      checked={checked}
      disabled={disabled}
      onChange={e => onChange(e)}
      readOnly
    />
    <span className="React__checkbox--span" />
    &nbsp;&nbsp;{label}
  </div>
);

export default Checkbox;
