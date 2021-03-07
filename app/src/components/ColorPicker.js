import React, { Component } from "react";
import { CirclePicker } from "react-color";

export class ColorPicker extends Component {
  onColorChange = (color) => {
    this.props.setFieldValue(this.props.name, color.hex);
  };
  render() {
    return (
      <div>
        <CirclePicker
          circleSize={this.props.circleSize}
          width={this.props.width}
          color={this.props.color}
          onChangeComplete={this.onColorChange}
        />
      </div>
    );
  }
}

export default ColorPicker;
