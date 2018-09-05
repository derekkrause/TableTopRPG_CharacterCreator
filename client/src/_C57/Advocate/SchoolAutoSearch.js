import React from "react";
import SchoolAutoComplete from "./SchoolAutoComplete";
import { schoolSearch } from "../Admin/SchoolAdmin/SchoolAdminServer.js";

class SchoolAutoSearch extends React.Component {
  state = {
    typeAhead: this.props.initialValue || ''
  };

  //  In parent component, let Logan know if this doesnt work for you.
  callback = () => {
    return schoolSearch(0, this.state.typeAhead); // schoolSearch available in SchoolAdminServer.js
  };

  onChange = value => {
    this.setState({
      typeAhead: value
    });
  };

  //---------------------------------------------------------------------------------------------------------------
  render() {
    return (
      <div>
        <SchoolAutoComplete
          numberOfCharacters={5} // when you want callback function to fire
          callBack={this.callback} // the call back function in the parent you want called
          value={this.state.typeAhead} // value you want changed
          onChange={this.onChange} // onChange function in the parent
          name={this.state.typeAhead} // name
          limit={10} // limit the results on the dropdown, recommend 10
          className={"form-control"} // any classnames you want to include in the input
          resultSetNumber={1} // res.data.resultSets[*] * = the number your resultsets come back on
          selectedSchool={options => this.props.selectedSchool(options)}
        />
      </div>
    );
  }
}
export default SchoolAutoSearch;
