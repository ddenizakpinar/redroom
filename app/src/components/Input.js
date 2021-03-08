import React, { Component } from "react";

class Input extends Component {
  getClassName = () => {
    let className = "input " + this.props.className;
    switch (this.props.type) {
      case "transparent":
        className += " transparent ";
        break;
      default:
        break;
    }
    return className;
  };

  render() {
    return (
      <div className={this.getClassName()}>
        <div className="input-wrap">
          <input
            onChange={(e) => this.props.handleChange(e)}
            value={this.props.value}
            placeholder={this.props.placeholder}
            name={this.props.name}
            type={this.props.type}
            className="input-field"
          />
        </div>
        <div className="error-message">{this.props.error}</div>
      </div>
    );
  }
}
class TextArea extends Component {
  getClassName = () => {
    let className = "input " + this.props.className;
    switch (this.props.type) {
      case "transparent":
        className += " transparent ";
        break;
      default:
        break;
    }
    return className;
  };

  render() {
    return (
      <div className={this.getClassName()}>
        <div className="input-wrap">
          <textarea
            onChange={(e) => this.props.handleChange(e)}
            value={this.props.value}
            placeholder={this.props.placeholder}
            name={this.props.name}
            type={this.props.type}
            className="input-field"
            rows={this.props.rows ? this.props.rows : 1}
          />
        </div>
        <div className="error-message">{this.props.error}</div>
      </div>
    );
  }
}

export { Input, TextArea };
