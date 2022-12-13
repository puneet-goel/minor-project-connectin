import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { resetPassword } from '../../actions/auth';
import './newPassword.css';

const regex = /^[0-9]+$/;
const schema = Yup.object().shape({
  otp: Yup.string('Enter your OTP')
    .min(6, 'Must be exactly 6 digits')
    .max(6, 'Must be exactly 6 digits')
    .matches(regex, 'Must be only digits')
    .required('Required'),
  password: Yup.string('Enter your password')
    .min(5, 'Too Short!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const ResetPassword = ({ email }) => {
  const serverError = useRef('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container-fluid pt-3 forgot-wrapper">
      <div className="row justify-content-center">
        <div className="col-8 col-sm-6 col-md-4 bg-white p-3">
          <h3 className="text-center pt-2 font-weight-bold">Reset Password</h3>
          <Formik
            initialValues={{
              otp: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              const toastID = toast.loading('Changing your password');
              dispatch(
                resetPassword(values.otp, email.current, values.password)
              ).then((res) => {
                serverError.current = res;
                if (res === 'ok') {
                  navigate('/login');
                } else {
                  toast.update(toastID, {
                    render: 'Password not changed',
                    type: 'error',
                    hideProgressBar: true,
                    isLoading: false,
                    autoClose: 3000,
                  });
                }
              });
            }}
          >
            {() => (
              <Form>
                <div className="form-floating mb-3">
                  <Field
                    name="otp"
                    type="string"
                    autoComplete="off"
                    placeholder="OTP"
                    className="form-control"
                  />
                  <label htmlFor="otp">OTP</label>
                  <small className="form-text text-muted">6 digit Code</small>
                  <ErrorMessage
                    name="otp"
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
                  <label htmlFor="password">New Password</label>
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
                    Submit
                  </button>
                </div>

                <div className="form-group text-center mt-3">
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

export default ResetPassword;
