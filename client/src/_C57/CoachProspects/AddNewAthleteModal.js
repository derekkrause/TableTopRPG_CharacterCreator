import React from "react";
import { Modal, Container, ModalHeader, ModalBody } from "reactstrap";
import AthleteAutoComplete from "../CustomComponents/AthleteAutoComplete/AthleteAutoComplete";
import { AthleteSearchAutoComplete } from "../../services/AthleteSearch.service";

class AddNewAthleteModal extends React.Component {
  callback = () => {
    return AthleteSearchAutoComplete(this.props.athleteSearchTerm); // schoolSearch available in SchoolAdminServer.js
  };
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleNewAthleteModal}>
        <Container>
          <ModalHeader toggle={this.props.toggle}>Add New Athlete</ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row ">
                <form className="form-group col-md-12">
                  <label>Athlete Name</label>
                  <AthleteAutoComplete
                    handleNewAthleteId={this.props.handleNewAthleteId}
                    numberOfCharacters={2} // when you want callback function to fire
                    callBack={this.callback} // the call back function in the parent you want called
                    value={this.props.athleteSearchTerm} // value you want changed
                    onChange={this.props.athleteSearch} // onChange function in the parent
                    name={this.props.athleteSearchTerm} // name
                    limit={10} // limit the results on the dropdown, recommend 10
                    className={"form-control"} // any classnames you want to include in the input
                    resultSetNumber={1} // res.data.resultSets[*] * = the number your resultsets come back on
                  />

                  <label>Notes</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="newAthleteNotes"
                    onChange={e => this.props.handleModalChange(e)}
                  />
                  {/* <label>Rank</label>
                  <select
                    className="form-control "
                    name="newAthleteRank"
                    onChange={e => this.props.handleModalChange(e)}
                  >
                    <option /> {/*until CSS is added to not show first child */}
                  {/* <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>*/}
                </form>
                <div className="col-md-12">
                  <button
                    className=" float-right btn btn-primary"
                    onClick={() => this.props.handleNewAthleteAddition()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </ModalBody>
        </Container>
      </Modal>
    );
  }
}

export default AddNewAthleteModal;
