import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import { getAllUsers } from './actions/user';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

//Lazy Loading
const Login = lazy(() => import('./components/Login/Login.jsx'));
const Signup = lazy(() => import('./components/Signup/Signup.jsx'));
const ForgotPassword = lazy(() =>
  import('./components/ForgotPassword/ForgotPassword.jsx')
);
const Home = lazy(() => import('./components/Home/Home.jsx'));
const ViewPost = lazy(() => import('./components/ViewPost'));
const ViewPostLikedBy = lazy(() => import('./components/ViewPost'));
const AuthenticationLoading = lazy(() =>
  import('./components/AuthenticationLoading/AuthenticationLoading.jsx')
);
const UserBox = lazy(() => import('./components/UserBox/UserBox.jsx'));
const Profile = lazy(() => import('./components/Profile/Profile.jsx'));
const EditPost = lazy(() => import('./components/CreatePost/CreatePost.jsx'));

const App = () => {
  const isUserValid = useSelector((state) => state.profile);
  const [isEverythingFetched, setIsEverythingFetched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserValid && !isEverythingFetched) {
      setIsEverythingFetched(true);
      dispatch(getPosts());
      dispatch(getAllUsers());
    }
  }, [dispatch, isUserValid, isEverythingFetched]);

  //High Order components
  const suspenseWrapper = (WrappedComponent) => (props) => {
    return (
      <Suspense fallback={<div />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  const LoginWithSuspense = suspenseWrapper(Login);
  const SignupWithSuspense = suspenseWrapper(Signup);
  const ForgotPasswordWithSuspense = suspenseWrapper(ForgotPassword);
  const HomeWithSuspense = suspenseWrapper(Home);
  const ViewPostWithSuspense = suspenseWrapper(ViewPost);
  const ViewPostLikedByWithSuspense = suspenseWrapper(ViewPostLikedBy);
  const AuthenticationLoadingWithSuspense = suspenseWrapper(
    AuthenticationLoading
  );
  const UserBoxWithSuspense = suspenseWrapper(UserBox);
  const ProfileWithSuspense = suspenseWrapper(Profile);
  const EditPostWithSuspense = suspenseWrapper(EditPost);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isUserValid ? (
              <HomeWithSuspense />
            ) : (
              <AuthenticationLoadingWithSuspense failure="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={isUserValid ? <Navigate to="/" /> : <LoginWithSuspense />}
        />
        <Route
          path="/signup"
          element={isUserValid ? <Navigate to="/" /> : <SignupWithSuspense />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordWithSuspense />}
        />
        <Route
          path="/network"
          element={
            isUserValid ? (
              <UserBoxWithSuspense onlyFollowers={true} />
            ) : (
              <AuthenticationLoadingWithSuspense failure="/" />
            )
          }
        />
        <Route
          path="/connect"
          element={
            isUserValid ? (
              <UserBoxWithSuspense onlyFollowers={false} />
            ) : (
              <AuthenticationLoadingWithSuspense failure="/" />
            )
          }
        />
        <Route
          path="/profile/:username"
          element={
            isUserValid ? (
              <ProfileWithSuspense />
            ) : (
              <AuthenticationLoadingWithSuspense failure="/" />
            )
          }
        />
        <Route
          path="/post/:id"
          element={
            isUserValid ? (
              <ViewPostWithSuspense />
            ) : (
              <AuthenticationLoadingWithSuspense failure="/" />
            )
          }
        />
        <Route
          path="/post/likedBy/:id"
          element={
            isUserValid ? (
              <ViewPostLikedByWithSuspense />
            ) : (
              <AuthenticationLoadingWithSuspense failure="/" />
            )
          }
        />
        <Route
          path="/createPost"
          element={
            isUserValid ? (
              <EditPostWithSuspense />
            ) : (
              <AuthenticationLoadingWithSuspense failure="/" />
            )
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
