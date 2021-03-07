import React, { Component } from "react";
import DatePicker from "react-date-picker";

class Datepicker extends Component {

  onChangeHandler = (e) => {
    this.props.setFieldValue(this.props.name, e);
  };

  render() {
    return (
      <div className="datepicker">
        <DatePicker
          onChange={this.onChangeHandler}
          value={this.props.value}
          clearIcon={null}
        />
      </div>
    );
  }
}

export default Datepicker;
