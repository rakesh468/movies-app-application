import React,{useContext} from 'react'
import { GlobalState } from '../../GlobalState';
import "./Filter.css";

function Filter() {
    const state=useContext(GlobalState)
    const [category, setcategory] = state.moviesAPI.category;
    const [sort, setsort] = state.moviesAPI.sort;
    const [search, setsearch] = state.moviesAPI.search;
    const [categories] = state.categoriesAPI.categories;

    const handlecategory = (event) => {
        setcategory(event.target.value);
        setsearch("");
      };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filter: </span>
        <select name="category" value={category} onChange={handlecategory}>
          <option value="">All Movies</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Search Movie"
        onChange={(event) => setsearch(event.target.value.toLowerCase())}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select value={sort} onChange={(event) => setsort(event.target.value)}>
          <option value="">All Movies</option>
          <option value="">Newest</option>
          <option value="sort=-rating">Rating: High-rating</option>
          <option value="sort=rating"> Rating: Low-rating</option>
        </select>
      </div>
    </div>
  )
}

export default Filter