import React, { Component } from "react";
import { Formik } from "formik";
import { CirclePicker } from "react-color";

import Modal from "../components/Modal";
import axiosConfig from "../axiosConfig";
import Input from "../components/Input";
import Schemas from "../Schemas";
import Button from "../components/Button";

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
    if (prevProps.category !== this.props.category) {
      this.setFieldValue(
        "name",
        this.props.category ? this.props.category.name : ""
      );
      this.setFieldValue(
        "background",
        this.props.category ? this.props.category.background : ""
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
        closeModal={() => this.props.closeCreateCategoryModal()}
        title={this.props.category ? "Update Collection" : "Create Collection"}
      >
        <div className="category-modal">
          <Formik
            initialValues={{
              name: "",
              background: "",
            }}
            onSubmit={(e) =>
              this.props.category
                ? this.props.editCategory(e)
                : this.props.createCategory(e)
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
                <div className="login-container">
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
                    {this.props.category ? "Update" : "Create"}
                  </Button>
                  {this.props.category ? (
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
                      <span className="yes pl-1" onClick={this.props.deleteCategory}>
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
