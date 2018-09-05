import * as React from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { deleteCoachAthleteTag, updateCoachAthlete } from "./server";
import { DeleteButton } from "../CustomComponents/Button";
import { NavLink } from "react-router-dom";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const colors = ["success", "primary", "secondary", "danger", "purple", "orange", "teal", "lime", "blue-grey"];

class Card extends React.Component {
  state = {
    notesVal: "",
    buttonVal: "See More",
    buttonClicked: false,
    editMode: false,
    labelMenu: false
  };
  componentDidMount() {
    console.log(this.props, "card props");
  }

  handleColorChange = name => {
    const index = this.props.tags
      .map(function(e) {
        return e.text;
      })
      .indexOf(name);

    return colors[index - colors.length * Math.floor(index / colors.length)];
  };

  handleLabelToggle = () => {
    this.setState(prevState => ({ labelMenu: !prevState.labelMenu }));
  };

  handleInsertTags = () => {};

  getShortNotes = () => {
    if (this.props.notes > 50) {
      this.setState({
        notesVal: this.props.notes.slice(0, 20) + " ... "
      });
    }
  };

  getFullNotes = () => {
    if (!this.state.buttonClicked) {
      this.setState({
        notesVal: this.props.notes,
        buttonVal: "Close",
        buttonClicked: true
      });
    } else {
      this.setState({
        notesVal: this.props.notes.slice(0, 20) + "...",
        buttonVal: "See More",
        buttonClicked: false
      });
    }
  };

  changeEditMode = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  };

  getNotes = () => {
    if (this.props.notes.length > 50) {
      this.getShortNotes();
    }
  };

  deleteAthleteTag = (id, tag) => {
    deleteCoachAthleteTag(id, tag).then(() => {
      console.log("tag has been removed from CoachAthleteTags table");
    });
  };
  athleteContact = classYear => {
    const contactYear = classYear - 2;
    const contactDate = new Date(contactYear, 8, 1);
    const contactDateMill = contactDate.getTime();
    const today = new Date();
    const todayMill = today.getTime();
    const availableForContact = todayMill - contactDateMill;

    if (availableForContact > 0) {
      return true;
    } else {
      return false;
    }
  };
  handleEditSave = () => {
    this.changeEditMode(), this.getNotes(), this.updateNotesData(this.props.notes);
  };

  updateNotesData = notes => {
    console.log(this.props.athleteId);

    var payload = {
      Notes: notes,
      Rank: 1,
      AthleteId: this.props.athleteId // this should come from state or props
    };
    updateCoachAthlete(payload, this.props.currentUser).then(() => {
      // console.log(payload, id);
      console.log("notes has been updated in database");
    });
  };

  handleRemovingTags = tag => {
    console.log(tag, "tag", this.props.athleteId);
    const promise = deleteCoachAthleteTag(this.props.athleteId, tag)
      .then(this.props.handleRemoveTag(tag, this.props.athleteId))
      .then(this.props.loadAthleteById());
  };
  render() {
    const {
      logo,
      index,
      athleteTags,
      name,
      tags,
      notes,
      avatarUrl,
      isDragging,
      connectDragSource,
      connectDropTarget,
      lastName,
      schoolName,
      city,
      state,
      gradYear,
      athleteId
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className="row" style={{ cursor: "move", opacity }}>
            <div className="col-md-12">
              {
                <div className="contact-item-hk ripple no-gutters align-items-center py-2 px-3 py-sm-4 px-sm-6">
                  <div className="col-md-2">
                    <img src={avatarUrl} className="float-left user-avatar rounded-circle mr-3" />

                    <div className="float-left mt-3">
                      {name} {lastName}
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div>{schoolName}</div>
                    <div>
                      {city}, {state}
                    </div>
                    <div>Class of {gradYear}</div>
                  </div>
                  <div className="col-md-2">
                    {this.state.editMode ? (
                      <div>
                        <a
                          className=" float-right ml-3"
                          href="javascript:void(0)"
                          onClick={() => this.handleEditSave()}
                        >
                          Save
                        </a>
                        <a
                          className=" float-right"
                          href="javascript:void(0)"
                          onClick={() => {
                            this.changeEditMode();
                            this.getNotes();
                          }}
                        >
                          Cancel
                        </a>

                        <textarea
                          className="form-control"
                          rows="3"
                          value={notes}
                          onChange={e => this.props.handleNewChange(index, "Notes", e.target.value)}
                        />
                      </div>
                    ) : this.props.notes && notes.length > 50 ? (
                      <div>
                        {this.state.notesVal}
                        <a onClick={this.getFullNotes} href="javascript:void(0)">
                          {this.state.buttonVal}
                        </a>
                      </div>
                    ) : (
                      <div className="float-left col-12 pl-0">{notes}</div>
                    )}

                    {!this.state.editMode && (
                      <a className=" float-right col-12 pl-0" href="javascript: void(0)" onClick={this.changeEditMode}>
                        <i className="zmdi zmdi-edit zmdi-hc-fw " />

                        {this.props.notes == 0 ? <span>Add</span> : <span>Edit</span>}
                      </a>
                    )}
                  </div>
                  <div className="col-md-2">
                    <div style={{ textAlign: "left" }}>
                      <Dropdown
                        isOpen={this.state.labelMenu}
                        toggle={this.handleLabelToggle.bind(this)}
                        className="float-left"
                      >
                        <DropdownToggle tag="span">
                          <span className="icon-btn " style={{ textAlign: "left", position: "relative", right: "25%" }}>
                            <i className="zmdi zmdi-label-alt zmdi-hc-lg " />
                          </span>
                        </DropdownToggle>
                        <DropdownMenu>
                          {tags.map(tag => (
                            <DropdownItem
                              key={tag.id}
                              onClick={e => {
                                this.props.handleTagsChange(index, e.target.value, athleteId);
                              }}
                              value={tag.text}
                            >
                              {tag.text}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>

                      <div className="row">
                        {athleteTags.length >= 1 && (
                          <React.Fragment>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                              {athleteTags.map(tag => (
                                <div
                                  key={tag.id}
                                  className={`badge text-uppercase text-white bg-${this.handleColorChange(tag.name)}`}
                                  style={{ height: "20px" }}
                                >
                                  {tag.name}
                                  <a
                                    className="font-weight-bold"
                                    style={{ color: "black" }}
                                    href="javascript:void(0)"
                                    onClick={() => {
                                      this.handleRemovingTags(tag.name);
                                    }}
                                  >
                                    X
                                  </a>
                                </div>
                              ))}
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2  px-1  d-lg-flex">
                    <a
                      onClick={() => {
                        this.props.toggleActivity(this.props.athleteId);
                        this.props.handleActivityLogData(name, logo);
                      }}
                      href="javascript:void(0)"
                    >
                      See Past Activity
                    </a>
                  </div>
                  {!this.props.listEditMode && (
                    <React.Fragment>
                      {this.athleteContact(this.props.gradYear) ? (
                        <div className="col-md-2">
                          <NavLink to={{ pathname: "/app/messaging", state: { id: `${this.props.athleteUserId}` } }}>
                            <button
                              href="javascript: void(0)"
                              className="float-right jr-btn jr-btn-default btn btn-default profileInfoBtnTwo"
                              style={{
                                border: "0px",
                                paddingBottom: "10px",
                                paddingTop: "10px",
                                paddingLeft: "15px",
                                paddingRight: "15px"
                              }}
                            >
                              <i className="zmdi zmdi-comment-alt-text zmdi-hc-lg zmdi-hc-fw" />
                              Message
                            </button>
                          </NavLink>
                        </div>
                      ) : (
                        <div className="col-md-2">
                          <span className="float-right">
                            Not Available for Contact until September, 1st, {this.props.gradYear - 2}
                          </span>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                  {this.props.listEditMode && (
                    <div className="col-md-2 d-flex justify-content-end">
                      <DeleteButton
                        className="font-weight-bold "
                        href="javascript:void(0)"
                        onClick={() => {
                          this.props.handleDeleteAthlete(this.props.id);
                          this.props.showDeleteAlert();
                        }}
                      />
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        )
      )
    );
  }

  componentWillMount() {
    if (this.props.notes) {
      this.getShortNotes();
    }
  }
}

export default flow(
  DragSource("card", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget("card", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Card);
