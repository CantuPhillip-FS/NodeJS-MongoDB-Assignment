import { useState } from "react";

// const SearchBar = ({ onSubmit }: { onSubmit: () => void }) => {
const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [animes, setAnimes] = useState([]);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    setTerm(e.target.value);
    console.log("term value >>>", term);
  };

  //   Use Vite's built in .env processing
  const baseUrl: string = import.meta.env.VITE_ANIME_BASE_URL;
  const fetchAnimes = async (searchTerm: string) => {
    try {
      const response = await fetch(baseUrl);
      //   console.log("RESPONSE >>>", response);
      if (response.ok) {
        const body = await response.json();
        // console.log("BODY >>>", body);

        const allAnimes = await body.animes;
        // console.log("allAnimes >>>", allAnimes);

        console.log("searchTerm >>>", searchTerm);
        const filteredAnimes = allAnimes.filter((anime) =>
          anime.title.includes(searchTerm)
        );
        console.log("filteredAnimes >>>", filteredAnimes);

        await setAnimes(filteredAnimes);
        console.log("animes >>>", animes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchAnimes(term);
    setTerm("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search for an anime:</label>
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          value={term}
        />
        <button type="submit">Submit</button>
      </form>
      {animes.length > 0
        ? animes.map((anime) => <p>{anime.title}</p>)
        : "No anime found."}
    </>
  );
};

export default SearchBar;
