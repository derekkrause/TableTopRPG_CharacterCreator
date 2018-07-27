import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

class EventEndDatePicker extends React.Component {
  state = {
    selectedDay: undefined,
    isDisabled: false
  };

  handleDayChange = (selectedDay, modifiers) => {
    this.props.handleDateChange(selectedDay, "eventEndDateFilter");

    this.setState({
      selectedDay,
      isDisabled: modifiers.disabled === true
    });
  };

  render() {
    const { selectedDay, isDisabled } = this.state;
    return (
      <div>
        {/* <p>
          {!selectedDay && "Type or pick a valid day"}
          {selectedDay && isDisabled && "This day is disabled"}
          {selectedDay &&
            !isDisabled &&
            `You chose ${selectedDay.toLocaleDateString()}`}
        </p> */}
        <DayPickerInput
          className="datePickerInput"
          name="eventEndDateFilter"
          value={this.props.eventEndDateFilter}
          onDayChange={this.handleDayChange}
          onChange={this.props.handleChange}
          dayPickerProps={{
            selectedDays: selectedDay,
            disabledDays: {
              daysOfWeek: ""
            }
          }}
        />
      </div>
    );
  }
}

export default EventEndDatePicker;
