import React, { Component } from "react";
import { Button } from "reactstrap";
import CardBox from "../../components/CardBox";

import "./EventApp.css";

import "./EventView";
import "./EventsListView";
import EventsListView from "./EventsListView";
import EventView from "./EventView";
import EventCardItem from "./EventCardItem";
import EventTypeListView from "./EventTypeListView";
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

  // componentDidMount() {
  //   this.setState({ showEventPage: false, showEventListPage: false });
  // }

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

          {/* {this.state.showEventPage && <EventView {...this.props} />}
          {this.state.showEventCardItem && <EventCardItem eventId={"8"} />}
          {this.state.showEventListPage && <EventListView {...this.props} />} */}
          {showPage}
        </div>
      </div>
    );
  }
}

export default EventApp;

/* Button sample
<div className="row mb-md-4">
          <CardBox
            styleName="col-lg-12"
            heading={<IntlMessages id="component.buttons.colorScheme" />}
          >
            <div>
              <IntlMessages id="component.buttons.colorSchemeTxt" />
            </div>

            <div className="jr-btn-group mb-3 mb-md-5">
              <Button color="default" className="jr-btn btn-white">
                Default
              </Button>
              <Button color="primary" className="jr-btn">
                Primary
              </Button>
              <Button color="secondary" className="jr-btn">
                Secondary
              </Button>
              <Button color="warning" className="jr-btn bg-warning">
                Warning
              </Button>
              <Button color="info" className="jr-btn bg-info">
                Info
              </Button>
              <Button color="success" className="jr-btn bg-success">
                Success
              </Button>
              <Button color="danger" className="jr-btn bg-danger">
                Danger
              </Button>
            </div>
            <h4 className="sub-heading"> Optional Material Design Colors</h4>
            <div className="jr-btn-group">
              <Button color="default" className="jr-btn btn-cyan">
                Cyan
              </Button>
              <Button color="default" className="jr-btn btn-teal">
                Teal
              </Button>
              <Button color="default" className="jr-btn btn-amber">
                Amber
              </Button>
              <Button color="default" className="jr-btn btn-orange">
                Orange
              </Button>
              <Button color="default" className="jr-btn btn-deep-orange">
                Deep Orange
              </Button>
              <Button color="default" className="jr-btn btn-red">
                Red
              </Button>
              <Button color="default" className="jr-btn btn-pink">
                Pink
              </Button>
              <Button color="default" className="jr-btn btn-light-blue">
                Light Blue
              </Button>
              <Button color="default" className="jr-btn btn-blue">
                Blue
              </Button>
              <Button color="default" className="jr-btn btn-indigo">
                Indigo
              </Button>
              <Button color="default" className="jr-btn btn-lime">
                Lime
              </Button>
              <Button color="default" className="jr-btn btn-light-green">
                Light Green
              </Button>
              <Button color="default" className="jr-btn btn-purple">
                Purple
              </Button>
              <Button color="default" className="jr-btn btn-deep-purple">
                Deep Purple
              </Button>
              <Button color="default" className="jr-btn btn-green">
                Green
              </Button>
              <Button color="default" className="jr-btn btn-grey">
                Grey
              </Button>
              <Button color="default" className="jr-btn btn-blue-grey">
                Blue Grey
              </Button>
            </div>
          </CardBox>
        </div>
*/
