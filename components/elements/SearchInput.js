import { Search } from '@material-ui/icons';

const SearchInput = ({ placeholder = 'Search', value, onChange }) => (
  <div className="field">
    <p className="control has-icons-left">
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e)}
      />
      <span className="icon is-small is-left">
        <Search />
      </span>
    </p>
  </div>
);

export default SearchInput;
