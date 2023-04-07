import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function Search(props) {
  return (
    <div className="input-wrap">
      <SearchIcon />
      <input
        value={props.inputValue}
        onChange={props.searchHandler}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;
