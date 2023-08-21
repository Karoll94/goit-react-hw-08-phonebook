import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/reducer';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.store.filter);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <label htmlFor="searchContacts" className="filter--label">
        Search contacts...
      </label>
      <input
        id="searchContacts"
        className="filter--input-form"
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
}
