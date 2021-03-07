import React, { Component } from "react";
import { Formik } from "formik";
import { CirclePicker } from "react-color";

import Modal from "./Modal";
import axiosConfig from "../axiosConfig";
import Input from "./Input";
import Schemas from "../Schemas";
import Button from "./Button";

class CategoryModal extends Component {
  setFieldValue;

  constructor(props) {
    super(props);

    this.state = {
      delete: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.editingCollection !== this.props.editingCollection) {
      this.setFieldValue(
        "name",
        this.props.editingCollection ? this.props.editingCollection.name : ""
      );
      this.setFieldValue(
        "background",
        this.props.editingCollection ? this.props.editingCollection.background : ""
      );
      this.setState({ delete: false });
    }
  }

  onColorChange = (color) => {
    this.setState({ background: color.hex }, () => {
      this.setFieldValue("background", color.hex);
    });
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        closeModal={() => this.props.closeCreateCollectionModal()}
        title={this.props.editingCollection ? "Update Collection" : "Create Collection"}
      >
        <div className="category-modal">
          <Formik
            initialValues={{
              name: "",
              background: "",
            }}
            onSubmit={(e) =>
              this.props.editingCollection
                ? this.props.editCollection(e)
                : this.props.createCollection(e)
            }
            validationSchema={Schemas.categorySchema}
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
                    name="name"
                    handleChange={handleChange}
                    value={values.name}
                    placeholder="Name"
                    error={touched.name && errors.name}
                  />
                  <div className="my-2">
                    <CirclePicker
                      circleSize={20}
                      width={"100%"}
                      color={values.background}
                      onChangeComplete={this.onColorChange}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="submit-button"
                  >
                    {this.props.editingCollection ? "Update" : "Create"}
                  </Button>
                  {this.props.editingCollection ? (
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
                      <span className="yes pl-1" onClick={this.props.deleteCollection}>
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

export default CategoryModal;
