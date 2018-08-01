import React from "react";
import { Button, Form, Input, InputGroup, Label } from "reactstrap";

class SearchBarFilter extends React.Component {
  render() {
    return (
      <Form>
        <div className="custom-control custom-radio mr-4 mx-auto">
          <Input type="radio" name="test" value={undefined} id="testRadio" className="custom-control-input" />
          <Label className="custom-control-label" htmlFor="testRadio">
            test
          </Label>
        </div>
      </Form>
    );
  }
}
export default SearchBarFilter;
