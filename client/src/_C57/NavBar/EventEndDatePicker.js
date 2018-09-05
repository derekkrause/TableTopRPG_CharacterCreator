import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

class EventEndDatePicker extends React.Component {
  state = {
    selectedDay: undefined,
    isDisabled: false
  };

  handleDayChange = (selectedDay, modifiers) => {
    this.setState({
      selectedDay,
      isDisabled: modifiers.disabled === true
    });

    this.props.handleDateChange(selectedDay, "eventEndDateFilter");
  };

  componentWillMount() {
    const { eventEndDateFilter } = this.props;

    const endDate = eventEndDateFilter;

    this.setState({ selectedDay: endDate });
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

export default EventEndDatePicker;
