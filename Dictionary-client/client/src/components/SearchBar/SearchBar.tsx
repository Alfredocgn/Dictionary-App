import {
  Paper,
  TextField,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { responseStatusType } from "../Layout/Layout";
type SearchBarProps = {
  setNewWord: React.Dispatch<React.SetStateAction<string | undefined>>;
  responseStatus: responseStatusType;
};

export const SearchBar = ({ setNewWord, responseStatus }: SearchBarProps) => {
  const [word, setWord] = useState("");
  const showClearButton = word.length > 0;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  const handleClearClick = () => {
    setWord("");
  };

  const handleSearch = () => {
    setNewWord(word);
    setWord("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "1rem",
      }}
    >
      <Paper sx={{ display: "flex", width: "100%" }}>
        <TextField
          disabled={responseStatus === "loading" ? true : false}
          sx={{ "& fieldset": { border: "none" }, width: "100%" }}
          onChange={handleChange}
          placeholder="Insert your word"
          value={word}
          onKeyDown={handleKeyDown}
        />
        {showClearButton && (
          <IconButton
            onClick={handleClearClick}
            type="button"
            aria-label="search"
          >
            <ClearIcon />
          </IconButton>
        )}
        {responseStatus === "loading" && <CircularProgress />}
        {word && (
          <IconButton onClick={handleSearch}>{<SearchIcon />}</IconButton>
        )}
      </Paper>
    </Box>
  );
};
