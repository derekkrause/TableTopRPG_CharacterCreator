import React, { Component } from "react";
import ClassYearTable from "./ClassYearTable";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import { getClassYear } from "./ClassYearServer";

class ClassYearAdmin extends Component {
  state = {
    addForm: false,
    classDatabase: null,
    modal: false
  };

  componentDidMount() {
    getClassYear()
      .then(response => {
        console.log(response, "Successful Get All");
        this.setState({
          classDatabase: response.data.item.pagedItems || []
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setFormValue = e => {
    let key = e.target.name;
    let value = e.target.value;
    let checkBox = e.target.checked;
    const editingClassId = this.props.match.params.editingClassId;

    this.setState(prevState => ({
      classDatabase: prevState.classDatabase.map(c => {
        if (c.id == editingClassId) {
          return {
            ...c,

            [key]: value,
            inactive: checkBox
          };
        } else {
          return c;
        }
      })
    }));
  };

  addFormToggle = () => {
    if (this.state.addForm == false) {
      this.setState({
        addForm: true,
        modal: true
      });
    } else {
      this.setState({
        addForm: false,
        modal: false
      });
    }
  };

  editFormToggle = classId => {
    this.props.history.push("/app/admin/classyear/" + classId);
  };

  addTableRow = posted => {
    const postedYear = [...this.state.classDatabase, posted];
    this.setState({
      classDatabase: postedYear,
      addForm: false
    });
  };

  removeRow = rowId => {
    this.setState(prevState => ({
      classDatabase: prevState.classDatabase.filter(d => d.id != rowId)
    }));
  };

  editingState = () => {
    this.props.history.push("/app/admin/classyear");
    this.setState({
      modal: false
    });
  };

  addingState = falsey => {
    this.setState({
      addForm: falsey
    });
  };

  render() {
    if (!this.state.classDatabase) {
      return null;
    }
    let editingInfo = null;
    const editingClassId = this.props.match.params.editingClassId;
    if (editingClassId) {
      editingInfo = this.state.classDatabase.find(data => data.id == editingClassId);
    }

    return (
      <div>
        {!this.state.addForm && !editingInfo ? (
          <ClassYearTable
            key={JSON.stringify(this.state.classDatabase)}
            editFormToggle={this.editFormToggle}
            addFormToggle={this.addFormToggle}
            classDatabase={this.state.classDatabase}
          />
        ) : null}
        {this.state.addForm && (
          <AddForm
            addFormToggle={this.addFormToggle}
            addTableRow={this.addTableRow}
            addingState={this.addingState}
            modal={true}
          />
        )}
        {editingInfo && (
          <EditForm
            editFormToggle={this.editFormToggle}
            setFormValue={this.setFormValue}
            editingInfo={editingInfo}
            editingState={this.editingState}
            removeRow={this.removeRow}
            modal={true}
          />
        )}
      </div>
    );
  }
}

export default ClassYearAdmin;
