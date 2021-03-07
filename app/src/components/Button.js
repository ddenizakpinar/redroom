import React, { Component } from "react";

export class Button extends Component {
  getClassName = () => {
    let className = "submit-button " + this.props.className;
    switch (this.props.type) {
      case "danger":
        className += " danger ";
        break;
      default:
        break;
    }
    return className;
  };
  render() {
    return (
      <button
        className={this.getClassName()}
        type="button"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
