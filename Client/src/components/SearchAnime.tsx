import { useState } from "react";
import toast from "react-hot-toast";

// TS: Define Anime type for fetch
type Anime = {
  _id: string;
  title: string;
  year_released: number;
  average_rating: number;
  // I'll add studio props if needed
};

const SearchBar = () => {
  const [term, setTerm] = useState<string>("");

  // define as an array of my Anime type
  const [animes, setAnimes] = useState<Anime[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    // console.log("term value >>>", term);
  };

  //   Use Vite's built in .env processing
  const baseUrl: string = import.meta.env.VITE_ANIME_BASE_URL;
  const fetchAnimes = async (searchTerm: string) => {
    try {
      const response = await fetch(baseUrl);
      //   console.log("RESPONSE >>>", response);

      if (!response.ok) {
        // non-200 -> just return empty list
        return [];
      }

      // define and extract the animes
      const body: { animes: Anime[] } = await response.json();
      // console.log("BODY >>>", body);

      const allAnimes = body.animes;
      // console.log("allAnimes >>>", allAnimes);

      console.log("searchTerm >>>", searchTerm);
      const filteredAnimes = allAnimes.filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("filteredAnimes >>>", filteredAnimes);
      if (filteredAnimes.length < 1) {
        toast.error("No animes found.");
      } else {
        toast.success("Success!");
      }

      return filteredAnimes;
    } catch (error) {
      console.error(error);
      // cannot use "error" as a 2nd argument for toast so used template literal
      // TS: error has an unknown type in catch that can't be changed there but can be in literal
      toast.error(`Something went wrong: ${String(error)}`);
      // make fetchAnimes always return something
      return [];
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
      {animes && animes.map((anime) => <p key={anime._id}>{anime.title}</p>)}
    </>
  );
};

export default SearchBar;
