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
      .get("/category")
      .then((res) => {
        this.setState({
          categories: res.data,
        });
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

  createCategory = (values) => {
    axiosConfig
      .post("/category", { ...values })
      .then((res) => {
        this.closeCreateCategoryModal();
        const newCategories = this.state.categories.length
          ? this.state.categories
          : [];
        newCategories.push(res.data);
        this.setState((prevState) => ({
          categories: newCategories,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editCategory = (values) => {
    axiosConfig
      .put("/category/" + this.state.category.id, { ...values })
      .then((res) => {
        this.closeCreateCategoryModal();

        let newCategories = this.state.categories;
        newCategories = newCategories.map((x) =>
          x.id === this.state.category.id ? { ...x, ...values } : x
        );
        this.setState((prevState) => ({
          categories: newCategories,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteCategory = (values) => {
    axiosConfig
      .delete("/category/" + this.state.category.id)
      .then((res) => {
        this.closeCreateCategoryModal();

        let newCategories = this.state.categories;
        newCategories = newCategories.filter(
          (x) => x.id !== this.state.category.id
        );
        this.setState((prevState) => ({
          categories: newCategories,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="main-page">
        <div className="collections">
          <div className="title">Collections</div>
          {this.state.categories.length
            ? this.state.categories.map((category) => {
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
                      <i className="fas fa-edit"></i>
                    </div>
                  </div>
                );
              })
            : null}
          <div
            className="create"
            onClick={() => this.openCreateCategoryModal()}
          >
            <i className="fas fa-plus"></i>
          </div>
        </div>
        <div>Main Content</div>
        <CategoryModal
          category={this.state.category}
          show={this.state.categoryModal}
          closeCreateCategoryModal={this.closeCreateCategoryModal}
          createCategory={this.createCategory}
          editCategory={this.editCategory}
          deleteCategory={this.deleteCategory}
        />
      </div>
    );
  }
}

export default MainPage;
