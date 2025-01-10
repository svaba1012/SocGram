import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ value, setValue }) {
  return (
    <TextField
      placeholder="Search"
      value={value}
      size="small"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      variant="outlined"
      InputProps={{
        startAdornment: !value && (
          <InputAdornment position="start">
            {" "}
            <SearchIcon />{" "}
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            {" "}
            <IconButton
              onClick={() => {
                setValue("");
              }}
            >
              {" "}
              <ClearIcon />{" "}
            </IconButton>{" "}
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
}

export default SearchBar;
