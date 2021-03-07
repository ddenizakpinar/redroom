import React, { Component } from "react";

class CheckboxX extends Component {
  onChangeHandler = (e) => {
    if (this.props.setFieldValue) {
      this.props.setFieldValue(this.props.name, !this.props.checked);
    }

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
        style={{ color: this.props.color }}
        className={this.getClassName()}
        onClick={() => {
          this.onChangeHandler();
        }}
      >
        {this.props.checked ? (
          <i className="fas fa-check-circle"></i>
        ) : (
          <i className="far fa-circle"></i>
        )}
      </div>
    );
  }
}

export default CheckboxX;
