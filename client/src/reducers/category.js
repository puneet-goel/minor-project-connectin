import { UPDATE_CATEGORY, UPDATE_PHOTOS } from '../constants/actionTypes';

const initialCategoryState = {
  currentTrendSearch: '',
  category: {},
};

const categoryReducer = (categoryData = initialCategoryState, action) => {
  switch (action.type) {
    case UPDATE_PHOTOS:
      return {
        currentTrendSearch: action.payload.category,
        category: {
          ...categoryData.category,
          [action.payload.category]: action.payload.photos,
        },
      };
    case UPDATE_CATEGORY:
      return {
        ...categoryData,
        currentTrendSearch: action.payload,
      };
    default:
      return categoryData;
  }
};

export default categoryReducer;
