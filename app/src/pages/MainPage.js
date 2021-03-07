import React, { Component } from "react";
import { Formik } from "formik";
import { CirclePicker } from "react-color";

import Modal from "../components/Modal";
import CategoryModal from "../components/CategoryModal";
import axiosConfig from "../axiosConfig";
import Input from "../components/Input";
import Schemas from "../Schemas";
import Button from "../components/Button";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryModal: false,
    };
  }

  componentDidMount() {
    axiosConfig
      .get("/categories")
      .then((res) => {
        this.setState(
          {
            categories: res.data,
          },
          () => console.log(this.state)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openCreateCategoryModal = (category = null) => {
    this.setState({ category: category, categoryModal: true });
  };

  closeCreateCategoryModal = () => {
    this.setState({ categoryModal: false });
  };

  render() {
    return (
      <div className="main-page">
        <div className="collections">
          <div className="title">Collections</div>
          {this.state.categories.map((category) => {
            return (
              <div className="collection" key={category.id}>
                <div className="info">
                  <div
                    className="color"
                    style={{ backgroundColor: category.background }}
                  ></div>
                  <div>{category.name}</div>
                </div>
                <div
                  className="edit"
                  onClick={() => this.openCreateCategoryModal(category)}
                >
                  <i class="fas fa-edit"></i>
                </div>
              </div>
            );
          })}
          <div
            className="create"
            onClick={() => this.openCreateCategoryModal()}
          >
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <div>Main Content</div>
        <CategoryModal
          category={this.state.category}
          show={this.state.categoryModal}
          closeCreateCategoryModal={this.closeCreateCategoryModal}
        />
      </div>
    );
  }
}

export default MainPage;
