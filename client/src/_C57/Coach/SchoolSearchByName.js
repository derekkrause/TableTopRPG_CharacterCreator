import React from "react";
import { ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Input } from "reactstrap";
import { schoolSearch } from "../../services/coach.service";
import SchoolAutoComplete from "../CustomComponents/SchoolAutoComplete/AutoComplete";

class SchoolSearch extends React.Component {
  state = {
    query: this.props.defaultValue,
    dropdownOpen: false,
    results: [],
    selected: false
  };

  latestCallNumber = 0;

  onChange = e => {
    const query = e.target.value;

    this.setState({ query, selected: false });

    if (this.myTimeout) {
      clearTimeout(this.myTimeout);
    }

    this.myTimeout = setTimeout(() => {
      const promise = schoolSearch(encodeURI(this.state.query), this.props.cityEdit, this.props.stateEdit);

      const currentCallNumber = ++this.latestCallNumber;

      promise.then(res => {
        if (currentCallNumber === this.latestCallNumber) {
          this.setState({ results: res.data, dropdownOpen: true, selected: true });
        }
      });
      this.myTimeout = null;
    }, 350);
  };

  onSelect = school => {
    this.props.setSchoolName(school.name);
    this.props.setCityState(school.city, school.state);
    this.setState({ dropdownOpen: !this.state.dropdownOpen, query: school.name });
  };

  render() {
    const { defaultValue } = this.props;
    const { results, dropdownOpen, query } = this.state;

    return (
      <React.Fragment>
        <div className="form-group">
          <input onChange={this.onChange} value={query} name="schoolNameEdit" className="form-control" />
          {results.length > 0 && (
            <div className={"form-control"} hidden={!dropdownOpen}>
              {results.length > 0 &&
                results.slice(0, 5).map(result => (
                  <div
                    href=""
                    className="d-flex justify-content-between p-0"
                    key={result.id}
                    value={result.name}
                    title={result.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => this.onSelect(result)}
                  >
                    <span>{result.name}</span>
                    <small style={{ color: "gray" }}>
                      {result.city}, {result.state}
                    </small>
                  </div>
                ))}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default SchoolSearch;
