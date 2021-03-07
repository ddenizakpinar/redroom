import React, { Component } from "react";

class Modal extends Component {
  render() {
    return (
      <div
        className="modal"
        style={{ display: this.props.show ? "flex" : "none" }}
      >
        <div
          className="modal-backdrop"
          onClick={() => this.props.closeModal()}
        ></div>
        <div className="modal-container">
          <div className="title">{this.props.title}</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
