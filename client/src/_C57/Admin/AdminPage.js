import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import SchoolAdminPage from "./SchoolAdmin/SchoolAdminPage";
import ClassYearAdmin from "./ClassYearAdmin/ClassYearAdmin";
import SportAdminPage from "./SportAdmin/SportAdminPage";
import "./Admin.css";

import EventTypeTable from "./EventTypeAdmin/EventTypeTable";
import EventTypeForm from "./EventTypeAdmin/EventTypeForm";

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
            <Route exact path={`${this.props.match.url}/eventtypes`} render={props => <EventTypeTable {...props} />} />
            <Route
              exact
              path={`${this.props.match.url}/eventtypes/form/:eventTypeId?`}
              render={props => <EventTypeForm {...props} />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminPage);
