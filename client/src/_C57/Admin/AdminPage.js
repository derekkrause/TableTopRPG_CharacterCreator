import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import SchoolTable from "./SchoolAdmin/SchoolTable";
import SchoolForm from "./SchoolAdmin/SchoolForm";
import AdminSideBar from "./AdminSideBar";
import SportAdminPage from "./SportAdmin/SportAdminPage";

class AdminPage extends React.Component {
  state = {
    editContent: false
  };

  //status is true or false
  editForm = status => {
    this.setState({ editContent: status });
  };

  render() {
    return (
      <div className="container ">
        <div className="row " style={{ margin: "24px" }}>
          <div className="col-12">
            <Route path={`${this.props.match.url}/school`} render={() => <SchoolTable />} />
            <Route path={`${this.props.match.url}/sports`} render={props => <SportAdminPage {...props} />} />

            {/* your admin table populated with your data will be placed here */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminPage);
