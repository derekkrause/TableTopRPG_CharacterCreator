import React from "react";
import { Button, Col, Collapse, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { createVenue } from "services/venuesService";
import { updateVenue } from "services/venuesService";
import { getById } from "services/venuesService";
import Geocode from "react-geocode";
import SweetAlert from "react-bootstrap-sweetalert";
import FileUploader from "../FileUploader/FileUploader";
import "./VenueFormStyle.css";
import { NotificationManager } from "react-notifications";

class VenueForm extends React.Component {
  state = {
    Name: "",
    Street: "",
    Suite: "",
    City: "",
    State: "",
    Zip: "",
    WebsiteUrl: "",
    Logo: "",
    Description: "",
    Lan: 0,
    Lon: 0,
    Inactive: false,
    Id: "",
    collapse: false,
    alert: null,
    // Validation
    formValid: false,
    nameValid: false,
    cityValid: false,
    stateValid: false,
    zipValid: false,
    duplicateName: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.validation);
  };

  validation = () => {
    const result = this.validateForm(this.state);
    this.setState({
      nameValid: result.nameValid,
      cityValid: result.cityValid,
      stateValid: result.stateValid,
      zipValid: result.zipValid,
      formValid: result.formValid
    });
  };

  validateForm = inputs => {
    const nameValid = inputs.Name.length >= 2;
    const cityValid = inputs.City.length >= 2;
    const stateValid = inputs.State.length == 2;
    const zipValid = inputs.Zip.length == 5;
    const formValid = nameValid && cityValid && stateValid && zipValid;
    return { formValid, nameValid, cityValid, stateValid, zipValid };
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  // ----- SWEET ALERT -----
  // success = () => {
  //   const getAlert = () => <SweetAlert success title="Submit Success!" onConfirm={this.handleCreateClicked} />;
  //   this.setState({ alert: getAlert() });
  // };

  componentDidMount() {
    // if we have an ID to edit, get that venue out of the venueList and put it into state
    const venueIdToEdit = this.props.match.params.venueId;
    if (venueIdToEdit) {
      // do an ajax to load that venue ID
      getById(venueIdToEdit).then(response => {
        this.setState(response.data.item[0]);
        this.setState({ collapse: true });
      });
    }
  }

  // ----- REACT NOTIFICATIONS -----
  createNotification = type => {
    console.log("Notification Type: " + type);

    switch (type) {
      case "update":
        NotificationManager.success("has been updated", "Venue: " + `${this.state.Name}`, 5000);
        break;
      case "added":
        NotificationManager.success("has been added", "Venue: " + `${this.state.Name}`, 5000);
        break;
      case "info":
        NotificationManager.info("INFO message");
        break;
      case "warning":
        NotificationManager.warning("Oh No!", "WARNING!");
        break;
      case "error":
        NotificationManager.error("ERROR!", "Error Title");
        break;
    }
  };

  handleClicked = () => {
    const data = {
      name: this.state.Name,
      street: this.state.Street,
      suite: this.state.Suite,
      city: this.state.City,
      state: this.state.State,
      zip: this.state.Zip,
      websiteUrl: this.state.WebsiteUrl,
      logo: this.state.Logo,
      description: this.state.Description,
      inactive: this.state.Inactive,
      id: this.state.Id
    };

    // ----- GOOGLE MAP -----
    const address = this.state.Street + ", " + this.state.State;

    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        data.lat = lat;
        data.lon = lng;
        console.log("Address: " + address);
        console.log("Lat: " + data.lat);
        console.log("Lng: " + data.lon);

        const clearStateAfterSuccess = () => {
          this.setState({
            Name: "",
            Street: "",
            Suite: "",
            City: "",
            State: "",
            Zip: "",
            WebsiteUrl: "",
            Logo: "",
            Description: "",
            Inactive: "",
            collapse: false,
            alert: null
          });
        };

        const handleSaveVenueError = err => {
          if (err.response.data.errors == "Duplicate name") {
            this.setState({ duplicateName: true });
          }
          this.setState({ error: err });
        };

        if (!this.state.Id) {
          createVenue(data)
            .then(response => {
              this.createNotification("added");
              clearStateAfterSuccess();
              this.props.history.push("/app/venues/");
            })
            .catch(err => {
              handleSaveVenueError(err);
            });
        } else {
          updateVenue(data)
            .then(response => {
              this.createNotification("update");
              clearStateAfterSuccess();
              console.log("Edit ID: " + data.id + ": " + data.name);
              const updateVenue = this.props.venueList.map(venue => {
                if (venue.id === data.id) {
                  return data;
                } else {
                  return venue;
                }
              });
              this.setState({ venueList: updateVenue });
              console.log(data.name);
              this.props.history.push("/app/venues/");
            })
            .catch(err => {
              handleSaveVenueError(err);
            });
        }
      },
      error => {
        console.error(error);
      }
    );
  };

  handleImageUrlChange = img => {
    this.setState({ Logo: img });
  };

  render() {
    return (
      <div>
        {/* <button onClick={this.createNotification.bind(this, "success")}>Test</button> */}
        <div className="d-flex justify-content-end">
          <Button color="primary" onClick={this.toggle} style={{ marginBottom: "1rem" }}>
            Add Venue
          </Button>
        </div>
        <Collapse isOpen={this.state.collapse}>
          <Form className="jr-card">
            <header>
              <h1>Venues Admin page</h1>
            </header>
            <FormGroup>
              <Label>
                Venue Name <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                className="form-control"
                type="text"
                name="Name"
                value={this.state.Name}
                onChange={this.onChange}
                valid={!this.state.duplicateName && this.state.Name.length > 0 && this.state.Name.length >= 2}
                invalid={this.state.duplicateName || (this.state.Name.length > 0 && this.state.Name.length < 2)}
                required
              />
              <FormFeedback>
                {this.state.duplicateName ? "This name is already used" : "Please enter at lease 2 letter"}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>
                Street <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                className="form-control"
                name="Street"
                type="text"
                value={this.state.Street}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Suite</Label>
              <Input
                className="form-control"
                name="Suite"
                type="text"
                value={this.state.Suite}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                City <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                className="form-control"
                name="City"
                type="text"
                value={this.state.City}
                onChange={this.onChange}
                valid={this.state.City.length > 0 && this.state.cityValid}
                invalid={this.state.City.length > 0 && this.state.City.length <= 2 && !this.state.cityValid}
              />
              <FormFeedback>Please enter valid City</FormFeedback>
            </FormGroup>
            <div className="row">
              <div className="col-6">
                <Label>
                  State <span style={{ color: "red" }}>*</span>
                </Label>
                <select
                  className="form-control"
                  name="State"
                  value={this.state.State}
                  onChange={this.onChange}
                  valid={this.state.stateValid}
                  inValid={!this.state.stateValid}
                >
                  <option>Choose one</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="col-6">
                <Label>
                  Zip <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  type="number"
                  name="Zip"
                  maxLength="5"
                  className="no-spinners"
                  pattern="/^\d{1,5}$/"
                  value={this.state.Zip}
                  onChange={this.onChange}
                  valid={this.state.Zip.length > 0 && this.state.zipValid}
                  invalid={(this.state.Zip.length > 0 && this.state.Zip.length < 5) || this.state.Zip.length > 5}
                />
                <FormFeedback>Please enter valid Zipcode</FormFeedback>
              </div>
            </div>

            <FormGroup>
              <Label>Website URL</Label>
              <Input
                className="form-control"
                type="text"
                name="WebsiteUrl"
                value={this.state.WebsiteUrl}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Logo</Label>

              <FileUploader handleImageUrlChange={this.handleImageUrlChange} />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <textarea
                className="form-control"
                name="Description"
                type="text"
                value={this.state.Description}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <Col sm={{ size: 10 }}>
                  <Input
                    type="checkbox"
                    checked={this.state.Inactive}
                    onChange={e => this.setState({ Inactive: e.target.checked })}
                  />
                  Inactive
                </Col>
              </Label>
            </FormGroup>
            <FormGroup className="text-right">
              <Button
                color="primary"
                disabled={!this.state.formValid ? true : false}
                onClick={() =>
                  // this.success();
                  this.handleClicked()
                }
              >
                {this.state.Id ? "Save" : "Create"} Venue
              </Button>
              <Button type="button" color="default" onClick={this.toggle}>
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Collapse>

        {/* {this.state.alert} */}
      </div>
    );
  }
}

export default VenueForm;
