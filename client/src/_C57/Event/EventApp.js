import React, { Component } from "react";
import { Button } from "reactstrap";
import CardBox from "../../components/CardBox";

import "./EventApp.css";

import "./EventView";
import "./EventsListView-R2";
import EventsListView from "./EventsListView-R2";
import EventView from "./EventView";
import EventCardItem from "./EventCardItem";
// import EventTypeListView from "./EventTypeListView";
import EventForm from "./EventForm";
import EventTypeTable from "../Admin/EventTypeAdmin/EventTypeTable";

class EventApp extends Component {
  state = {
    showEventPage: false,
    showEventListPage: false,
    showEventTypePage: false,
    showEventCardItem: false,
    showEventForm: false,
    showEventTypeTable: false
  };

  toggleEventPage() {
    const showEventPage = this.state.showEventPage;

    this.setState({
      showEventPage: !showEventPage
    });
  }

  toggleEventListPage() {
    const showEventListPage = this.state.showEventListPage;

    this.setState({
      showEventListPage: !showEventListPage
    });
  }

  toggleEventTypePage() {
    const showEventTypePage = this.state.showEventTypePage;

    this.setState({
      showEventTypePage: !showEventTypePage
    });
  }

  toggleEventCardItem() {
    const showEventCardItem = this.state.showEventCardItem;

    this.setState({
      showEventCardItem: !showEventCardItem
    });
  }

  toggleEventForm() {
    const showEventForm = this.state.showEventForm;

    this.setState({
      showEventForm: !showEventForm
    });
  }

  toggleEventTypeTable() {
    const showEventTypeTable = this.state.showEventTypeTable;

    this.setState({ showEventTypeTable: !showEventTypeTable });
  }

  render() {
    const {
      showEventListPage,
      showEventPage,
      showEventCardItem,
      showEventTypePage,
      showEventForm,
      showEventTypeTable
    } = this.state;
    let showPage;

    if (showEventPage) {
      showPage = <EventView {...this.props} />;
    }

    if (showEventListPage) {
      showPage = <EventsListView {...this.props} />;
    }

    if (showEventCardItem) {
      showPage = <EventCardItem eventId={"8"} {...this.props} />;
    }

    if (showEventTypePage) {
      showPage = <EventTypeListView />;
    }

    if (showEventForm) {
      showPage = <EventForm />;
    }

    if (showEventTypeTable) {
      showPage = <EventTypeTable />;
    }

    return (
      <div>
        <div className="app-wrapper">
          <div className="row mb-md-4">
            <CardBox styleName="col-lg-12">
              <div className="jr-btn-group mb-3 mb-md-5">
                <h4>Event Component</h4>
                <Button color="primary" className="jr-btn" onClick={this.toggleEventPage.bind(this)}>
                  Toggle Event Page
                </Button>
                <Button color="primary" className="jr-btn" onClick={this.toggleEventListPage.bind(this)}>
                  Toggle Event List Page
                </Button>
                <Button color="primary" className="jr-btn" onClick={this.toggleEventCardItem.bind(this)}>
                  Toggle Event Card Item
                </Button>
                <Button color="primary" className="jr-btn" onClick={this.toggleEventForm.bind(this)}>
                  Toggle Event Form
                </Button>
                <Button color="primary" className="jr-btn" onClick={this.toggleEventTypePage.bind(this)}>
                  Toggle Event Type Page
                </Button>
                <Button color="primary" className="jr-btn" onClick={this.toggleEventTypeTable.bind(this)}>
                  Toggle Event Type Table
                </Button>
              </div>
            </CardBox>
          </div>
          {showPage}
        </div>
      </div>
    );
  }
}

export default EventApp;
