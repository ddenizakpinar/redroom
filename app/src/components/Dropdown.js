import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class DropdownX extends Component {
  onChangeHandler = (e) => {
    this.props.setFieldValue(
      this.props.name,
      this.props.options.filter((x) => x[this.props.valueProp] === e.value)[0]
    );
  };

  render() {
    return (
      <div>
        <Dropdown
          options={this.props.options?.map((x) => ({
            label: x[this.props.labelProp],
            value: x[this.props.valueProp],
          }))}
          onChange={this.onChangeHandler}
          value={{
            label: this.props.value[this.props.labelProp],
            value: this.props.value[this.props.valueProp],
          }}
          placeholder="Select an option"
        />
      </div>
    );
  }
}

export default DropdownX;
