import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { toast, ToastContainer } from 'react-toastify';
import PostEditor from './PostEditor.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import { parseFullUsername } from '../../utility/index.js';
import './styles.css';

const CreatePost = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentId = location.state?.postId;
  const username = parseFullUsername();

  const [file, setFile] = useState(() => location.state?.file);
  const [error, setError] = useState('');
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
  });

  const post = useSelector((state) => {
    if (currentId) {
      const x = state.posts.find((p) => p._id === currentId);
      if (x && x.creator === username) {
        return x;
      }
    }

    return null;
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (postData.title === '') {
      setError('Title cannot be empty');
      return;
    } else if (postData.message === '') {
      setError('Message cannot be empty');
      return;
    }

    const toastID = toast.loading(
      `${currentId ? 'Updating' : 'Creating'} your post`
    );
    if (currentId) {
      dispatch(updatePost(currentId, postData, file)).then((message) => {
        toast.update(toastID, {
          render: `${
            message === 'ok'
              ? 'Post successfully updated'
              : 'Could not update your post'
          }`,
          type: `${message === 'ok' ? 'success' : 'error'}`,
          hideProgressBar: true,
          isLoading: false,
          autoClose: 3000,
        });

        navigate('/');
      });
    } else {
      dispatch(createPost(postData, file)).then((message) => {
        toast.update(toastID, {
          render: `${
            message === 'ok'
              ? 'Post successfully created'
              : 'Could not create your post'
          }`,
          type: `${message === 'ok' ? 'success' : 'error'}`,
          hideProgressBar: true,
          isLoading: false,
          autoClose: 3000,
        });

        navigate('/');
      });
    }
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const clear = (e) => {
    setPostData({
      title: '',
      message: '',
      tags: '',
    });
    setFile(null);
  };

  return (
    <div>
      <NavBar disableSearch />
      <div className="form-container p-3 p-md-5">
        <h4 className="form-header text-center fw-bolder header-modal-form">
          {currentId ? 'Edit' : 'Add A'} SNAP
        </h4>

        <div className="input-group input-group-lg my-3">
          <input
            type="text"
            className="form-control"
            aria-label="post title"
            aria-describedby="post title"
            placeholder="Title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </div>

        <PostEditor postData={postData} setPostData={setPostData} />

        <div className="input-group input-group-lg my-3">
          <span className="input-group-text">@</span>
          <input
            type="text"
            className="form-control"
            placeholder="comma separated tags"
            aria-label="tags"
            aria-describedby="tags"
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          />
        </div>

        <input
          style={{ width: '100%' }}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {file && (
          <div className="post-photo-container">
            <img
              className="user-photo"
              src={file ? URL.createObjectURL(file) : null}
              alt="snap uploaded by user"
            />
          </div>
        )}

        <div className="form-actions d-flex justify-content-end pt-3">
          <span className="text-danger me-3 d-flex align-items-center">
            {error}
          </span>
          <button
            className="btn me-2 btn-outline-primary"
            type="button"
            onClick={clear}
          >
            Clear
          </button>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleSubmit}
          >
            {currentId ? 'Save' : 'Add'}
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreatePost;
