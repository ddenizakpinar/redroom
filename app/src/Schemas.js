import * as Yup from "yup";

const Schemas = {
  loginSchema: Yup.object().shape({
    email: Yup.string().required().min(5).max(20),
    password: Yup.string().required().min(5).max(20),
  }),
  signupSchema: Yup.object().shape({
    email: Yup.string().required().min(5).max(20),
    password: Yup.string().required().min(5).max(20),
    username: Yup.string().required().min(5).max(20)
  }),
};

export default Schemas;