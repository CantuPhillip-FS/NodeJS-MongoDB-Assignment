import { useState } from "react";
import toast from "react-hot-toast";
const SearchBar = () => {
  const [term, setTerm] = useState("");
  const [animes, setAnimes] = useState([]);

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    setTerm(e.target.value);
    // console.log("term value >>>", term);
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
        if (filteredAnimes.length < 1) {
          toast.error("No animes found.");
        } else {
          toast.success("Success!");
        }

        return filteredAnimes;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!term) return toast.error("Search field cannot be empty");
    const filteredAnimes = await fetchAnimes(term);
    setAnimes(filteredAnimes);
    console.log("animes >>>", animes);
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
      {animes && animes.map((anime) => <p>{anime.title}</p>)}
    </>
  );
};

export default SearchBar;
