import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import "./AthleteSportHistoryCard.css";
import { connect } from "react-redux";

class AthleteSportHistoryCard extends React.Component {
  //Sport, Position, Year, Team, Notes
  state = {
    alert: null,
    editMode: true
  };
  delete = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={`Are you sure you want to delete?`}
        onConfirm={this.cancelAlert} //what function you want on confirm
        onCancel={this.cancelAlert} //what function you want on cancel
      />
    );
    this.setState({ alert: getAlert() });
  };
  cancelAlert = () => {
    this.setState({
      alert: null
    });
  };

  edit = () => {
    this.setState({
      editMode: true
    });
  };

  positionArray = () => {
    const positionArray = this.props.sportPositions.map(pos => {
      return pos.name;
    });
    const joinedPos = positionArray.join(", ");
    return joinedPos;
  };

  render() {
    const {
      classYear,
      classyearId,
      clubName,
      comments,
      schoolName,
      schoolNameId,
      selectedSchoolClubOrTeam,
      sportId,
      sportLevel,
      sportLevelId,
      sportName,
      sportPositions,
      teamName,
      userId
    } = this.props;
    return (
      <div>
        {this.state.editMode ? (
          <React.Fragment>
            <div>
              test
              <UncontrolledDropdown>
                <DropdownToggle className="ash">
                  <i className="zmdi zmdi-more zmdi-hc-3x moreDots" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.delete()}>Delete</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <input />
            </div>
            <span className="body">
              <div>
                <span>{sportName}</span>
                <span className="float-right">{this.positionArray()}</span>
              </div>
              <div>
                {classYear}
                <strong>(</strong>
                {sportLevel}
                <strong>)</strong>
              </div>
            </span>
            <div className="sub-heading">{comments}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              {/* <UncontrolledDropdown>
                <DropdownToggle className="ash">
                  <i className="zmdi zmdi-more zmdi-hc-3x moreDots" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onclick={() => this.edit()}>Edit</DropdownItem>
                  <DropdownItem onClick={() => this.delete()}>Delete</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}

              <h2 className="card-heading">{schoolName}</h2>
            </div>
            <span className="body">
              <div>
                <span>{sportName}</span>
                <span className="float-right">{this.positionArray()}</span>
              </div>
              <div>
                {classYear}
                <strong>(</strong>
                {sportLevel}
                <strong>)</strong>
              </div>
            </span>
            <div className="sub-heading">{comments}</div>
          </React.Fragment>
        )}
        {this.state.alert}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps)(AthleteSportHistoryCard);
