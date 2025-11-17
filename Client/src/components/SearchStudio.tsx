import { useState } from "react";
import toast from "react-hot-toast";

// TS: Define Studio type for fetch
type Studio = {
  _id: string;
  name: string;
  year_founded: number;
  headquarter: string;
  website: string;
  isActive: boolean;
};

const SearchStudio = () => {
  const [term, setTerm] = useState<string>("");

  // define as an array of my Studio type
  const [studios, setStudios] = useState<Studio[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    // console.log("term value >>>", term);
  };

  //   Use Vite's built in .env processing
  const baseUrl: string = import.meta.env.VITE_STUDIO_BASE_URL;
  const fetchStudios = async (searchTerm: string) => {
    try {
      const response = await fetch(baseUrl);
      //   console.log("RESPONSE >>>", response);

      if (!response.ok) {
        // non-200 -> just return empty list
        return [];
      }

      // define and extract the animes
      const body: { studios: Studio[] } = await response.json();
      // console.log("BODY >>>", body);

      const allStudios = body.studios;
      console.log("allStudios >>>", allStudios);

      console.log("searchTerm >>>", searchTerm);
      const filteredStudios = allStudios.filter((studio) =>
        studio.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("filteredAnimes >>>", filteredStudios);
      if (filteredStudios.length < 1) {
        toast.error("No studios found.");
      } else {
        toast.success("Success!");
      }

      return filteredStudios;
    } catch (error) {
      console.error(error);
      // cannot use "error" as a 2nd argument for toast so used template literal
      // TS: error has an unknown type in catch that can't be changed there but can be in literal
      toast.error(`Something went wrong: ${String(error)}`);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!term) return toast.error("Search field cannot be empty");

    const filteredStudios = await fetchStudios(term);
    setStudios(filteredStudios);
    console.log("studios >>>", studios);
    setTerm("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search for a studio:</label>
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          value={term}
        />
        <button type="submit">Submit</button>
      </form>
      {studios &&
        studios.map((studio) => <p key={studio._id}>{studio.name}</p>)}
    </>
  );
};

export default SearchStudio;
