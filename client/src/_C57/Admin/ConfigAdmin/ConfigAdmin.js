import React from "react";
import { Route, withRouter } from "react-router-dom";
import ConfigTable from "./ConfigTable";
import ConfigForm from "./ConfigForm";

class ConfigAdmin extends React.Component {
  render() {
    return (
      <div className="col-lg-12">
        <div className="card jr-card admin-container">
          <Route exact path={`${this.props.match.url}`} render={props => <ConfigTable {...props} />} />
          <Route exact path={`${this.props.match.url}/create`} render={props => <ConfigForm {...props} />} />
          <Route exact path={`${this.props.match.url}/:id(\\d+)`} render={props => <ConfigForm {...props} />} />
        </div>
      </div>
    );
  }
}
export default ConfigAdmin;
