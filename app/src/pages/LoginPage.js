import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import axiosConfig from "../axiosConfig";
import Note from "../assets/img/note.png";
import Schemas from "../Schemas";
import Input from "../components/Input";
import Button from "../components/Button";

class LoginPage extends Component {
  login = async (values, action) => {
    axiosConfig
      .post("/user/login", { ...values })
      .then((res) => {
        localStorage.setItem("token", res.data.token).then(() => {
          axiosConfig.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;

          this.props.history.push("/");
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  render() {
    return (
      <div className="login-page">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(e) => this.login(e)}
          validationSchema={Schemas.loginSchema}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => {
            return (
              <div className="login-container">
                <img src={Note} width={60} alt="" />
                <div className="title">Log in</div>
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
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="submit-button"
                >
                  Log in
                </Button>
                <div className="sign-up">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default withRouter(LoginPage);
