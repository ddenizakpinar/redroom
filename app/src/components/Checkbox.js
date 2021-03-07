import React, { Component } from "react";

class CheckboxX extends Component {
  onChangeHandler = (e) => {
    this.props.setFieldValue(this.props.name, !this.props.checked);

    if (typeof this.props.onClick === "function") {
      this.props.onClick();
    }
  };

  getClassName = () => {
    let className = "checkbox " + this.props.className;

    return className;
  };

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={() => {
          this.onChangeHandler();
        }}
      >
        {this.props.checked ? (
          <i class="fas fa-check-circle"></i>
        ) : (
          <i class="far fa-circle"></i>
        )}
      </div>
    );
  }
}

export default CheckboxX;
