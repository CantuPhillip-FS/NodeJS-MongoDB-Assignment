import { useState } from "react";

const SearchBar = ({ onSubmit }: { onSubmit: () => void }) => {
  const [term, setTerm] = useState("");

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("e.target.value >>>", e.target.value);
    setTerm(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        name="search"
        id="search"
        value={term}
        onChange={handleChange}
      />
      {term.length < 3 && <p>Search term must be at least 3 characters</p>}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
