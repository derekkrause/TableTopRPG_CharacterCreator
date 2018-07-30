import React, { Component } from "react";
import { Button, Form, Input, InputGroup, FormGroup, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import options from "../profile/data";
import TagsField from "./TagsField";

class ArticleSearchFilter extends React.Component {
  state = {
    //------------Filter Settings-------------
    disabled: false,
    dropup: false,
    flip: false,
    highlightOnlyResult: false,
    minLength: 2,
    selectHintOnEnter: true
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      //---------------------Article Search Filter-------------------------
      <div className="row">
        <div className="col-md-12">
          <h3 className="ml-2 pr-4 mt-2">
            <b>Refine Your Search</b>
          </h3>
          <div className="row mt-2 justify-content-center mb-2">
            <div className="col-md-3">
              <h4>
                Location&nbsp;
                <Typeahead
                  className="pr-3"
                  {...this.state}
                  //emptyLabel={emptyLabel ? "" : undefined}
                  labelKey="name"
                  options={options}
                  placeholder="Specify state..."
                  value={this.props.locationFilter}
                  onChange={this.props.handleChange}
                />
                &nbsp;
              </h4>
            </div>
            <div className="col-md-3">
              <h4>
                Article Type&nbsp;
                <Typeahead
                  className="pr-3"
                  {...this.state}
                  //emptyLabel={emptyLabel ? "" : undefined}
                  labelKey="name"
                  options={options}
                  placeholder="Specify article type..."
                  value={this.props.articleTypeFilter}
                  onChange={this.props.handleChange}
                />
                &nbsp;
              </h4>
            </div>
            <div className="col-md-4">
              <h4>
                Article Tags&nbsp;
                <TagsField
                  className="col-2"
                  handleTypeAheadChange={this.props.handleTypeAheadChange}
                  articleTagFilter={this.props.articleTagFilter}
                />
              </h4>
              {/* <Typeahead
              className="pr-3"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={options}
              placeholder="Specify article tags..."
              value={this.props.articleTagFilter}
              onChange={this.props.handleChange}
            /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ArticleSearchFilter;
