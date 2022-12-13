import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../actions/auth';
import './login.css';

const regex = /^[a-z0-9_]+$/;
const schema = Yup.object().shape({
  username: Yup.string('Enter your username')
    .min(3, 'Too Short')
    .max(15, 'Must be 15 characters or less')
    .matches(regex, 'Must be a valid username')
    .required('Required'),
  email: Yup.string('Enter your email')
    .email('Must be a valid email')
    .required('Required'),
  password: Yup.string('Enter your password')
    .min(5, 'Too Short!')
    .required('Required'),
});

const Login = () => {
  const serverError = useRef('');
  const dispatch = useDispatch();

  return (
    <div className="container-fluid pt-3 login-wrapper">
      <div className="row justify-content-center">
        <div className="col-8 col-sm-6 col-md-4 bg-white p-3">
          <h3 className="text-center pt-2 font-weight-bold">Log in</h3>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              toggle: false,
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              const toastID = toast.loading('Logging in');
              serverError.current = await dispatch(
                login(
                  values.email,
                  values.password,
                  values.username,
                  values.toggle
                )
              );

              if (serverError.current !== 'ok') {
                toast.update(toastID, {
                  render: 'Could not log in to your account',
                  type: 'error',
                  hideProgressBar: true,
                  isLoading: false,
                  autoClose: 3000,
                });
              }
            }}
          >
            {() => (
              <Form>
                <div className="form-floating mb-3">
                  <Field
                    name="username"
                    type="string"
                    autoComplete="off"
                    placeholder="daniel"
                    className="form-control"
                  />
                  <label htmlFor="username">username</label>
                  <small className="form-text text-muted">
                    only alphanumeric characters or underscores allowed
                  </small>
                  <ErrorMessage
                    name="username"
                    render={(msg) => (
                      <div className="form-text text-danger">{msg}</div>
                    )}
                  />
                </div>

                <div className="form-floating mb-2">
                  <Field
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="abc@example.com"
                    className="form-control"
                  />
                  <label htmlFor="email">Email</label>
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <div className="form-text text-danger">{msg}</div>
                    )}
                  />
                </div>

                <div className="form-floating mb-2">
                  <Field
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="*********"
                    className="form-control"
                  />
                  <label htmlFor="password">Password</label>
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <div className="form-text text-danger">{msg}</div>
                    )}
                  />
                </div>

                <label htmlFor="checkbox">
                  <Field
                    type="checkbox"
                    name="toggle"
                    style={{ width: 'auto' }}
                  />
                  Remember me for a month
                </label>
                <br />
                <span className="form-text text-danger">
                  {serverError.current}
                </span>

                <div className="d-grid gap-2 mt-2">
                  <button className="btn btn-primary" type="submit">
                    Log in
                  </button>
                </div>

                <div className="form-group text-center mt-3">
                  <Link to="/forgot-password" className="text-center">
                    Forgot password?
                  </Link>
                  <br />
                  Don't have an account?
                  <Link to="/signup"> Sign up </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
