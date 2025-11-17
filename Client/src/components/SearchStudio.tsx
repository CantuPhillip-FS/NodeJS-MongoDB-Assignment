import { useState } from "react";
import toast from "react-hot-toast";
import fetchAllStudios from "../services/fetchAllStudios";

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
  const [allStudios, setAllStudios] = useState<Studio[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    // console.log("term value >>>", term);
  };

  const fetchStudios = async (searchTerm: string) => {
    try {
      const allStudios: Studio[] = await fetchAllStudios();
      // console.log("allStudios >>>", allStudios);

      const filteredStudios = allStudios.filter((studio) =>
        studio.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // console.log("filteredStudios >>>", filteredStudios);
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
    resetForm();
    const filteredStudios = await fetchStudios(term);
    setStudios(filteredStudios);
    console.log("studios >>>", studios);
    setTerm("");
  };

  const handleAllStudios = async () => {
    resetForm();
    const data = await fetchAllStudios();
    setAllStudios(data);
    toast.success("You've got all the Studios!");
    return data;
  };

  const resetForm = () => {
    setAllStudios([]);
    setStudios([]);
  };

  return (
    <section>
      <h2>Studio Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          value={term}
          placeholder="Ex: Ghibli"
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={handleAllStudios}>
        View All Studios
      </button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
      {allStudios &&
        allStudios.map((studio) => <p key={studio._id}>{studio.name}</p>)}
      {studios &&
        studios.map((studio) => <p key={studio._id}>{studio.name}</p>)}
    </section>
  );
};

export default SearchStudio;
