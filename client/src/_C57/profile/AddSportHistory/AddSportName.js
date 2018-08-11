import React from "react";

class AddSportName extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    const { sport } = this.props;
    return (
      <option name={sport.name} key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    );
  }
}

export default AddSportName;
