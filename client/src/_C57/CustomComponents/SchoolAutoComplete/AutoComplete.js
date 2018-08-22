import React from "react";
import "./AutoComplete.css";

class SchoolAutoComplete extends React.Component {
  state = {
    options: null,
    selectedSchool: [],
    needCityState: this.props.includeCityState
  };
  latestAjaxCallNum = 0;

  setTimer = () => {
    if (this.timedFunction) {
      clearTimeout(this.timedFunction);
    }
    this.timedFunction = setTimeout(() => {
      this.timedFunction = null;
      this.latestAjaxCallNum++;
      const currentAjaxCallNum = this.latestAjaxCallNum;
      const promise = this.props.callBack();
      promise.then(response => {
        console.log(response, "response from ajax");

        if (currentAjaxCallNum === this.latestAjaxCallNum) {
          this.setState(
            {
              options: response.data.resultSets[1]
            },
            () => {
              console.log(this.state.options);
            }
          );
        }
      });
    }, this.props.delay || 400);
  };

  checkLength = () => {
    this.props.value.length >= this.props.numberOfCharacters - 1 ? this.setTimer() : null;
  };
  onChange = e => {
    this.props.onChange(e.target.value, e.target.name);
    this.checkLength();
    this.setState({ selectedSchool: e.target.value });
  };

  handleDropdownSelect = e => {
    console.log("test", e.target.id);
    this.props.onChange(e.target.innerHTML);
    this.setState({ options: null });
    {
      this.props.onHandleSchoolSelect ? this.props.onHandleSchoolSelect(e.target.id) : null;
    }
  };

  render() {
    return (
      <div className="form-group dropdown-input">
        <input
          onChange={e => {
            this.onChange(e);
          }}
          value={this.props.value}
          width={this.props.width || null}
          height={this.props.height || null}
          name={this.props.name}
          list="schools"
          className={this.props.className}
          placeholder={this.props.placeholder || null}
          onKeyPress={this.props.onKeyPress || null}
        />
        {this.state.options && (
          <div className={"options-div " + this.props.className}>
            {this.state.options.length >= 1
              ? this.state.options.slice(0, this.props.limit || 10).map(options => (
                  <div
                    onClick={e => this.handleDropdownSelect(e)}
                    className={"optional-divs "}
                    name={options.Name}
                    key={options.Id}
                    id={options.Id}
                  >
                    {options.Name}
                    {this.state.needCityState ? (
                      <React.Fragment>
                        ,{options.City}, {options.State}
                      </React.Fragment>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        )}
      </div>
    );
  }
}
export default SchoolAutoComplete;
