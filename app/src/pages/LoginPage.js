import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import axiosConfig from "../axiosConfig";
import Check from "../assets/img/check.svg";
import Schemas from "../Schemas";
import Input from "../components/Input";
import Button from "../components/Button";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  login = async (values, action) => {
    axiosConfig
      .post("/user/login", { ...values })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        axiosConfig.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;
        this.props.history.push("/");
      })
      .catch((err) => {
        console.warn(err);
        this.setState({ error: err.response.data.general });
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
                <img src={Check} width={70} alt="" />
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
                <div className="error-message mb-1">
                  {this.state.error && this.state.error}
                </div>
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
