import React from "react";

const SearchForm = () => {
  return (
    <form className="nvbar--search">
      <input
        type="text"
        name="nv-search"
        id="nv-search"
        placeholder="Search something ..."
      />
      <span className="material-icons">search</span>
    </form>
  );
};

export default SearchForm;
