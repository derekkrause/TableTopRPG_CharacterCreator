import React from "react";
import "../CustomComponents/AthleteAutoComplete/AthleteAutoComplete.css";

class AdvoAutoComplete extends React.Component {
  componentDidMount() {
    console.log(this.props, "autocomplete");
  }
  state = {
    options: null,
    selectedAthlete: []
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
        console.log(response.data.resultSets[0], "response from ajax");
        if (currentAjaxCallNum === this.latestAjaxCallNum) {
          this.setState({
            options: response.data.resultSets[0]
          });
        }
      });
    }, this.props.delay || 400);
  };

  checkLength = () => {
    this.props.value.length >= this.props.numberOfCharacters - 1 ? this.setTimer() : null;
  };
  onChange = e => {
    this.props.onChange(e.target.value);
    this.checkLength();
    this.setState({ selectedAthlete: e.target.value });
  };

  handleDropdownSelect = (e, options) => {
    this.props.onChange(e.target.innerHTML);
    this.setState({ options: null });
    console.log("this is the options data", options);
    options.notes = null;
    this.props.selectedAthlete(options);
    // this.props.handleNewAthleteId(e.target.id);
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
          list="athletes"
          className={this.props.className}
        />
        {this.state.options && (
          <div className={"options-div " + this.props.className}>
            {this.state.options.length >= 1
              ? this.state.options.slice(0, this.props.limit || 10).map(options => (
                  <div className="optional-divs " key={options.Id}>
                    <img src={options.AvatarUrl} className="float-left user-avatar rounded-circle mr-3 " />

                    <div
                      name={options.Name}
                      id={options.Id}
                      value={options.FirstName}
                      onClick={e => this.handleDropdownSelect(e, options)}
                      style={{ height: "50px" }}
                    >
                      {options.FirstName} {options.LastName}
                      {/* {options.City != null && <React.Fragment>, {options.City}</React.Fragment>}
                      {options.State != null && <React.Fragment>, {options.State}</React.Fragment>}  */}
                    </div>
                  </div>
                ))
              : null}
          </div>
        )}
      </div>
    );
  }
}
export default AdvoAutoComplete;
