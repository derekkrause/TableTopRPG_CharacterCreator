import React from "react";
import SportAdminTable from "./SportAdminTable";
import SportAdminForm from "./SportAdminForm";
import { Route } from "react-router-dom";

class SportAdminPage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Route exact path={`${this.props.match.url}`} render={props => <SportAdminTable {...props} />} />
          <Route
            exact
            path={`${this.props.match.url}/:id(\\d+)`} //(\d+)
            render={props => <SportAdminForm {...props} />}
          />
          <Route exact path={`${this.props.match.url}/create`} render={props => <SportAdminForm {...props} />} />
        </div>
      </div>
    );
  }
}
export default SportAdminPage;
