import { useState } from "react";
import toast from "react-hot-toast";
import fetchAllAnimes from "../services/fetchAllAnimes";

// TS: Define Anime type for fetch
type Anime = {
  _id: string;
  title: string;
  year_released: number;
  average_rating: number;
  // I'll add studio props if needed
};

const SearchAnime = () => {
  const [term, setTerm] = useState<string>("");

  // define as an array of my Anime type
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [allAnimes, setAllAnimes] = useState<Anime[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    // console.log("term value >>>", term);
  };

  const fetchAnimes = async (searchTerm: string) => {
    try {
      const data = await fetchAllAnimes();
      //   console.log("DATA >>>", response);

      if (!data) {
        // non-200 -> just return empty list
        return [];
      }

      console.log("searchTerm >>>", searchTerm);
      const filteredAnimes = data.filter((anime) =>
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
    resetForm();
    const filteredAnimes = await fetchAnimes(term);
    setAnimes(filteredAnimes);
    console.log("animes >>>", animes);
    setTerm("");
  };

  const handleAllAnimes = async () => {
    resetForm();
    const data = await fetchAllAnimes();
    setAllAnimes(data);
    toast.success("You've got all the Animes!");
    return data;
  };

  const resetForm = () => {
    setAllAnimes([]);
    setAnimes([]);
  };

  return (
    <section>
      <h2>Anime Search</h2>
      <form onSubmit={handleSubmit} className="centered-form">
        <label htmlFor="search">Anime name:</label>
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          value={term}
          placeholder="Ex: Sword"
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={handleAllAnimes}>
        View All Animes
      </button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
      {animes && animes.map((anime) => <p key={anime._id}>{anime.title}</p>)}
      {allAnimes &&
        allAnimes.map((anime) => (
          <details key={anime._id} className="anime-details">
            <summary>{anime.title}</summary>
            <ul>
              <li>Year Released: {anime.year_released}</li>
              <li>Average Rating: {anime.average_rating}</li>
            </ul>
          </details>
        ))}
    </section>
  );
};

export default SearchAnime;
