import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import ResetPassword from './ResetPassword.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../actions/auth';
import * as Yup from 'yup';
import './newPassword.css';

const schema = Yup.object().shape({
  email: Yup.string('Enter your email')
    .email('Must be a valid email')
    .required('Required'),
});

const ForgotPassword = () => {
  const [reset, setReset] = useState(false);
  const userEmail = useRef('');
  const serverError = useRef('');

  const dispatch = useDispatch();

  if (reset) {
    return <ResetPassword email={userEmail} />;
  }

  return (
    <div className="container-fluid pt-5 forgot-wrapper">
      <div className="row justify-content-center">
        <div className="col-8 col-sm-6 col-md-4 bg-white p-4">
          <h3 className="text-center pt-2 font-weight-bold">Forgot Password</h3>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              const toastID = toast.loading('Sending Email');
              dispatch(forgotPassword(values.email)).then((res) => {
                serverError.current = res;
                if (res === 'ok') {
                  userEmail.current = values.email;
                  setReset(true);
                } else {
                  toast.update(toastID, {
                    render: 'An error occurred while sending you an email',
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
                <div className="form-floating mt-3">
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

                <span className="form-text text-danger">
                  {serverError.current}
                </span>

                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-primary" type="submit">
                    Send Password Reset Link
                  </button>
                </div>

                <div className="form-group text-center mt-3">
                  <Link to="/login"> Back to Login Page </Link>
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

export default ForgotPassword;
