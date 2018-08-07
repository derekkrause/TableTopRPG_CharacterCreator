import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import SchoolAdminPage from "./SchoolAdmin/SchoolAdminPage";
import ClassYearAdmin from "./ClassYearAdmin/ClassYearAdmin";
import SportAdminPage from "./SportAdmin/SportAdminPage";
import "./Admin.css";

class AdminPage extends React.Component {
  render() {
    return (
      <div className="container ">
        <div className="row admin-container ">
          <div className="col-md-12">
            <Route path={`${this.props.match.url}/school`} component={SchoolAdminPage} />
            <Route path={`${this.props.match.url}/sports`} render={props => <SportAdminPage {...props} />} />
            <Route
              path={`${this.props.match.url}/classyear/:editingClassId?`}
              render={props => <ClassYearAdmin {...props} />}
            />
            {/* your admin table populated with your data will be placed here */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminPage);
