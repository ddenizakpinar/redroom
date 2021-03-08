import React, { Component } from "react";
import { Formik } from "formik";

import Modal from "./Modal";
import Input from "./Input";
import Schemas from "../Schemas";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";
import Datepicker from "./Datepicker";

class NoteModal extends Component {
  setFieldValue;

  constructor(props) {
    super(props);

    this.state = {
      delete: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCollection !== this.props.selectedCollection) {
      this.setFieldValue("collection", this.props.selectedCollection);
    }

    if (prevProps.editingNote !== this.props.editingNote) {
      this.setFieldValue(
        "title",
        this.props.editingNote ? this.props.editingNote.title : ""
      );
      this.setFieldValue(
        "content",
        this.props.editingNote ? this.props.editingNote.content : ""
      );
      this.setFieldValue(
        "collection",
        this.props.editingNote
          ? this.props.editingNote.collection
            ? this.props.editingNote.collection
            : this.props.collections[0]
          : this.props.collections[0]
      );
      this.setState({ delete: false });
    }
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        closeModal={() => this.props.closeCreateNoteModal()}
        title={this.props.editingNote ? "Update Note" : "Create Note"}
      >
        <div className="note-modal">
          <Formik
            initialValues={{
              title: "",
              content: "",
              collection: "",
              checked: true,
              date: new Date(),
            }}
            onSubmit={(e) =>
              this.props.editingNote
                ? this.props.editNote(e)
                : this.props.createNote(e)
            }
            validationSchema={Schemas.noteSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              touched,
              errors,
              setFieldValue,
            }) => {
              this.setFieldValue = setFieldValue;
              return (
                <div className="input-container">
                  <Input
                    className="my-3"
                    name="title"
                    handleChange={handleChange}
                    value={values.title}
                    placeholder="Title"
                    error={touched.title && errors.title}
                  />
                  <Input
                    className="my-3"
                    name="content"
                    handleChange={handleChange}
                    value={values.content}
                    placeholder="Content"
                    error={touched.content && errors.content}
                  />
                  {values.collection ? (
                    <Dropdown
                      setFieldValue={setFieldValue}
                      name={"collection"}
                      value={values.collection}
                      options={this.props.collections}
                      valueProp="id"
                      labelProp="name"
                    />
                  ) : null}
                  <div className="date">
                    <Checkbox
                      className="mr-1 my-3"
                      name={"checked"}
                      checked={values.checked}
                      setFieldValue={setFieldValue}
                    />
                    <Datepicker
                      value={values.date}
                      setFieldValue={setFieldValue}
                      name="date"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="submit-button"
                  >
                    {this.props.editingNote ? "Update" : "Create"}
                  </Button>
                  {this.props.editingNote ? (
                    <span
                      className="delete pr-1"
                      onClick={() => this.setState({ delete: true })}
                    >
                      Delete
                    </span>
                  ) : null}
                  {this.state.delete ? (
                    <span className="sure">
                      <span>Are you sure?</span>
                      <span
                        className="yes pl-1"
                        onClick={this.props.deleteNote}
                      >
                        Yes
                      </span>
                      <span
                        className="cancel"
                        onClick={() => this.setState({ delete: false })}
                      >
                        No
                      </span>
                    </span>
                  ) : null}
                </div>
              );
            }}
          </Formik>
        </div>
      </Modal>
    );
  }
}

export default NoteModal;
