import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import SchoolTable from "./SchoolAdmin/SchoolTable";
import SchoolForm from "./SchoolAdmin/SchoolForm";
import AdminSideBar from "./AdminSideBar";

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
          {!this.state.editContent && (
            <Route
              path={`${this.props.match.url}/school`}
              render={() => <SchoolTable editForm={this.editForm} />}
            />
          )}
          {this.state.editContent && <SchoolForm editForm={this.editForm} />}

          {/* your admin table populated with your data will be placed here */}
        </div>
      </div>
    );
  }
}

export default withRouter(AdminPage);
