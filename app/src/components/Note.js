import React, { Component } from "react";
import moment from "moment";

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
          <Checkbox
            onClick={() => this.props.openCreateNoteModal(note)}
            className="mr-2"
            checked={note.checked}
            color={
              note.collection?.background ? note.collection?.background : "white"
            }
          />
          <div className="info mt-1">
            <div className="note-title">
              <div>{note.title}</div>
              <div className="icons">
                <i
                  onClick={() => this.props.openCreateNoteModal(note)}
                  className="fas fa-edit "
                ></i>
                <div onClick={() => this.showContentHandler()}>
                  {note.content ? (
                    this.state.showContent ? (
                      <i className="ml-1 fas fa-chevron-down"></i>
                    ) : (
                      <i className="ml-1 fas fa-chevron-up"></i>
                    )
                  ) : null}
                </div>
              </div>
            </div>
            {this.state.showContent ? (
              <div className="content mt-1">{note.content}</div>
            ) : null}
            <div className="date mt-1">
              {this.props.task
                ? moment(note.date).startOf("day").fromNow()
                : moment(note.date).format("MM/DD/YYYY")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
