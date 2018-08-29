import React from "react";
import { DropdownMenu, DropdownItem, DropdownToggle, Input } from "reactstrap";
import { schoolSearch } from "../../services/coach.service";

class SchoolSearch extends React.Component {
  state = {
    query: "",
    results: []
  };

  latestCallNumber = 0;

  onChange = e => {
    const query = e.target.value;

    this.setState({ query });

    if (this.myTimeout) {
      clearTimeout(this.myTimeout);
    }

    this.myTimeout = setTimeout(() => {
      const promise = schoolSearch(this.state.query, this.props.cityEdit, this.props.stateEdit);

      const currentCallNumber = ++this.latestCallNumber;

      promise.then(res => {
        if (currentCallNumber === this.latestCallNumber) {
          this.setState({ results: res.data });
          console.log(res.data);
        }
      });
      this.myTimeout = null;
    }, 500);
  };

  render() {
    const { defaultValue } = this.props;
    const { results } = this.state;

    return (
      <React.Fragment>
        <input
          type="search"
          className="form-control"
          name="schoolNameEdit"
          defaultValue={defaultValue}
          placeholder="School Name"
          onChange={this.onChange}
        />
        <DropdownMenu
          type="search"
          className="form-control"
          name="schoolNameEdit"
          defaultValue={defaultValue}
          placeholder="School Name"
          onChange={this.onChange}
        >
          {results &&
            results.map(result => (
              <DropdownItem key={result.id} value={result.id}>
                {result.name}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </React.Fragment>
    );
  }
}
export default SchoolSearch;
