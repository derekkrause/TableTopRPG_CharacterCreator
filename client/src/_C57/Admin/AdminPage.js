import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ClassYearAdmin from "./ClassYearAdmin/ClassYearAdmin";
import SchoolTable from "./SchoolAdmin/SchoolTable";
import SchoolForm from "./SchoolAdmin/SchoolForm";
import AdminSideBar from "./AdminSideBar";
import SportAdminPage from "./SportAdmin/SportAdminPage";
import SideNav from "../../containers/SideNav/index";

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
        <SideNav />
        <div className="row " style={{ margin: "24px" }}>
          <div className="col-12">
            <Route path={`${this.props.match.url}/school`} render={() => <SchoolTable />} />
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
