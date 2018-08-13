import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import { NavLink } from "react-router-dom";

import { getEventTypes } from "../../../services/EventType.service";

import EventTypeTableCell from "./EventTypeTableCells";

class EventTypeTable extends Component {
  state = {
    eventTypeItems: [],

    modal: false
  };

  getEventTypes() {
    getEventTypes()
      .then(response => {
        console.log("Get Event Types GET Ajax Request success!");
        console.log(response);

        this.setState({ eventTypeItems: response.data.items });
      })
      .catch(error => {
        console.log("Get Event Types GET Ajax Request failed!");
        console.log(error);
      });
  }

  componentDidMount() {
    console.log("EventTypeTable Component Mounted");

    this.getEventTypes();
  }

  render() {
    const { eventTypeItems } = this.state;

    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="table-responsive-material">
            <Table>
              <thead>
                {/* <tr>
              <th className="border-top-0">Dessert (100g serving)</th>
              <th className="border-top-0">Calories</th>
              <th className="border-top-0">Fat (g)</th>
              <th className="border-top-0">Carbs (g)</th>
              <th className="border-top-0">Protein (g)</th>
            </tr> */}
                <tr>
                  <th> </th>
                  <th> </th>
                  <th>
                    <NavLink to={`${this.props.match.url}/form`}>
                      <button className="btn btn-link">Add Event Type</button>
                    </NavLink>
                  </th>
                </tr>
                <tr>
                  <th> </th>
                  <th className="border-top-0">Event Type Name</th>
                  <th className="border-top-0">Event Type Code</th>
                  {/* <th className="border-top-0">Event Type Display Order</th>
                    <th className="border-top-0">Event Type Inactive?</th> */}
                </tr>
              </thead>
              <tbody>
                {/* {data.map(n => {
              return (
                <tr key={n.id}>
                  <td>{n.name}</td>
                  <td>{n.calories}</td>
                  <td>{n.fat}</td>
                  <td>{n.carbs}</td>
                  <td>{n.protein}</td>
                </tr>
              );
            })} */}
                {eventTypeItems &&
                  eventTypeItems.map(item => (
                    // <tr key={item.id} eventTypeId={item.id}>
                    //   <td>{item.name}</td>
                    //   <td>{item.code}</td>
                    //   <td>{item.displayOrder}</td>
                    //   <td>
                    //     <Button onClick={this.toggle}>Edit</Button> <Button>Delete</Button>
                    //   </td>
                    // </tr>
                    <EventTypeTableCell key={item.id} data={item} {...this.props} />
                  ))}
              </tbody>
              <tfoot />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default EventTypeTable;
