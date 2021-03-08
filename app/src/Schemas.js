import * as Yup from "yup";

const Schemas = {
  loginSchema: Yup.object().shape({
    email: Yup.string().required().min(5).max(30),
    password: Yup.string().required().min(6).max(20),
  }),
  signupSchema: Yup.object().shape({
    email: Yup.string().required().min(5).max(30),
    password: Yup.string().required().min(6).max(20),
    username: Yup.string().required().min(6).max(20),
  }),
  categorySchema: Yup.object().shape({
    name: Yup.string().required().min(3).max(20),
    background: Yup.string().required(),
  }),
  noteSchema: Yup.object().shape({
    title: Yup.string().required().min(3).max(40),
    content: Yup.string().max(400),
    collection: Yup.mixed(),
    checked: Yup.bool().required(),
    date: Yup.mixed()
  }),
};

export default Schemas;
