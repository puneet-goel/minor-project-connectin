import React, { useState, memo } from 'react';
import { List, ListItem, ListItemText, Grid } from '@material-ui/core';
import ForwardIcon from '@material-ui/icons/Forward';
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory, updatePhotos } from '../../actions/category.js';
import { trendingData } from '../../utility/index.js';
import './styles.css';

const Category = () => {
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState('');
  const categoryData = useSelector((state) => state.category);

  const handleSearchTextChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleGetTrends = (textToBeSearched) => {
    const text = textToBeSearched.trim();
    const data = categoryData.category[text];
    if (data || text === '') {
      dispatch(updateCategory(text));
    } else {
      dispatch(updatePhotos(text));
    }
    setSearchCategory('');
  };

  return (
    <Grid>
      <Grid>
        <div className="p-1 font-monospace fw-bold fs-6">
          Search trending photos
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            aria-label="Search Categories"
            aria-describedby="Search Categories"
            value={searchCategory}
            onChange={handleSearchTextChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => handleGetTrends(searchCategory)}
          >
            Get
          </button>
        </div>
      </Grid>
      <Grid className="m-auto">
        <h2 className="trending-header fw-bold text-center">Trending</h2>
        <List component="nav" aria-label="trends">
          {(trendingData || []).map((trend) => (
            <ListItem button key={trend} onClick={() => handleGetTrends(trend)}>
              <ListItemText primary={trend} />
              <ForwardIcon />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default memo(Category);
