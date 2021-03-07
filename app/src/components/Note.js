import React, { Component } from "react";

import Checkbox from "./Checkbox";

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showContent: false,
    };
  }

  showContentHandler = () => {
    this.setState((prevState) => ({
      showContent: !prevState.showContent,
    }));
  };

  render() {
    const { note } = this.props;
    return (
      <div className="note my-2">
        <div className="note-wrap">
          <Checkbox className="mr-2" checked={note.checked} />
          <div className="info mt-1">
            <div className="note-title">
              <div>{note.title}</div>
              <div onClick={() => this.showContentHandler()}>
                {this.state.showContent ? (
                  <i class="fas fa-chevron-down"></i>
                ) : (
                  <i class="fas fa-chevron-up"></i>
                )}
              </div>
            </div>

            {this.state.showContent ? (
              <div className="content mt-1">
                {note.content}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
