import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

class EventStartDatePicker extends React.Component {
  state = {
    selectedDay: undefined,
    isDisabled: false
  };

  handleDayChange = (selectedDay, modifiers) => {
    this.setState({
      selectedDay,
      isDisabled: modifiers.disabled === true
    });

    this.props.handleDateChange(selectedDay, "eventStartDateFilter");
  };

  componentWillMount() {
    const { eventStartDateFilter } = this.props;

    const startDate = eventStartDateFilter;

    this.setState({ selectedDay: startDate });
  }

  render() {
    const { selectedDay, isDisabled } = this.state;
    return (
      <div>
        {/* <p>
          {!selectedDay && "🤔 Type or pick a valid day"}
          {selectedDay && isDisabled && "😡 This day is disabled"}
          {selectedDay && !isDisabled && `😄 You chose ${selectedDay.toLocaleDateString()}`}
        </p> */}
        <DayPickerInput
          value={selectedDay}
          onDayChange={this.handleDayChange}
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

export default EventStartDatePicker;
