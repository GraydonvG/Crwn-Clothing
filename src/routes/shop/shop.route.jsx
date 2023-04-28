import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { fetchCategories } from '../../store/categories/categories.slice';

import CategoriesPreview from '../categories-preview/categories-preview.route';
import Category from '../category/category.route';

function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        index
        element={<CategoriesPreview />}
      />
      <Route
        path=":category"
        element={<Category />}
      />
    </Routes>
  );
}

export default Shop;
