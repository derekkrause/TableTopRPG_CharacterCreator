import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import SchoolTable from "./SchoolTable";
import SchoolForm from "./SchoolForm";

class SchoolAdminPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12 ">
          <div className="card jr-card admin-container">
            <Route exact path={`${this.props.match.url}`} render={props => <SchoolTable {...props} />} />
            <Route exact path={`${this.props.match.url}/edit/:id(\\d+)`} render={props => <SchoolForm {...props} />} />
            <Route exact path={`${this.props.match.url}/create`} render={props => <SchoolForm {...props} />} />

            {/* your admin table populated with your data will be placed here */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SchoolAdminPage);
