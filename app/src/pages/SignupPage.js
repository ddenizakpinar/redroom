import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Note from "../assets/img/note.png";
import Schemas from "../Schemas";
import axiosConfig from "../axiosConfig";
import Input from "../components/Input";
import Button from "../components/Button";

class Signup extends Component {
  signup = (values, action) => {
    axiosConfig
      .post("/users/signup", { ...values })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  render() {
    return (
      <div className="login-page">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(e) => this.signup(e)}
          validationSchema={Schemas.signupSchema}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => {
            return (
              <div className="login-container">
                <img src={Note} width={60} alt="" />
                <div className="title">Sign up</div>
                <Input
                  name="username"
                  handleChange={handleChange}
                  value={values.username}
                  placeholder="Username"
                  error={touched.username && errors.username}
                />
                <Input
                  name="email"
                  handleChange={handleChange}
                  value={values.email}
                  placeholder="Email"
                  error={touched.email && errors.email}
                />
                <Input
                  name="password"
                  handleChange={handleChange}
                  value={values.password}
                  placeholder="Password"
                  type="password"
                  error={touched.password && errors.password}
                />
                <Input
                  name="confirmPassword"
                  handleChange={handleChange}
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  type="password"
                  error={touched.password && errors.password}
                />
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="submit-button"
                >
                  Sign Up
                </Button>
                <div className="sign-up">
                  Already have an account? <Link to="/login">Log in</Link>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default withRouter(Signup);
