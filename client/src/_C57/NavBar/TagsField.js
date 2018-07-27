import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import options from "../profile/data";

class TagsField extends React.Component {
  render() {
    return (
      <div className="w-100">
        <Typeahead
          clearButton
          name="articleTagFilter"
          //defaultSelected={options.slice(0, 5)}
          labelKey="name"
          multiple
          options={options}
          placeholder="Choose tags..."
          value={this.props.articleTagFilter}
          onChange={this.props.handleTypeAheadChange("articleTagFilter")}
        />
      </div>
    );
  }
}

export default TagsField;
