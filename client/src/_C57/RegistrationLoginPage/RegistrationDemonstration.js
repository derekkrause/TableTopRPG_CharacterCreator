import React from "react";
import { Label, Form, Input, FormFeedback } from "reactstrap";

class ValidationPractice extends React.Component {
  state = {
    firstName: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container col-4">
        <Form>
          <Label for="firstName">First Name</Label>
          <Input
            name="firstName"
            onChange={this.onChange}
            valid={this.state.firstName.length > 2}
            invalid={this.state.firstName.length > 0 && this.state.firstName.length <= 2}
            required
          />
          <FormFeedback>WRONG!</FormFeedback>
          <FormFeedback tooltip valid>
            Yay!
          </FormFeedback>
        </Form>
      </div>
    );
  }
}
export default ValidationPractice;
