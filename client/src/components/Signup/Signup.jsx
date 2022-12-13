import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { register } from '../../actions/auth';
import './signup.css';

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
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const Signup = () => {
  const serverError = useRef('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container-fluid pt-3 signup-wrapper">
      <div className="row justify-content-center">
        <div className="col-8 col-sm-6 col-md-4 bg-white p-3">
          <h3 className="text-center pt-2 font-weight-bold">Sign up</h3>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              const toastID = toast.loading('Creating your account');
              serverError.current = await dispatch(
                register(values.email, values.password, values.username)
              );
              if (serverError.current === 'ok') {
                navigate('/login');
              } else {
                toast.update(toastID, {
                  render: 'Could not create your account',
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

                <div className="form-floating mb-2">
                  <Field
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="off"
                    placeholder="*********"
                    className="form-control"
                  />
                  <label htmlFor="passwordConfirmation" className="form-label">
                    Confirm New Password
                  </label>
                  <ErrorMessage
                    name="passwordConfirmation"
                    render={(msg) => (
                      <div className="form-text text-danger">{msg}</div>
                    )}
                  />
                </div>

                <span className="text-danger">{serverError.current}</span>

                <div className="d-grid gap-2 mt-2">
                  <button className="btn btn-primary" type="submit">
                    Create an account
                  </button>
                </div>

                <div className="form-group text-center mt-3">
                  Have an account?
                  <Link to="/login"> Log in </Link>
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

export default Signup;
