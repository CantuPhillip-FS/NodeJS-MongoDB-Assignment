import { useState } from "react";
import toast from "react-hot-toast";
import postNewStudio from "../services/postNewStudio";

type Studio = {
  name: string;
  year_founded: number;
  headquarters: string;
  website: string;
  isActive: boolean;
};

// Watched this video on handling multiple states:
// https://www.youtube.com/watch?v=-KBS93RlUCY
// Much better than having a state for each input

const CreateStudio = () => {
  const blankStudio: Studio = {
    name: "",
    year_founded: 0,
    headquarters: "",
    website: "",
    isActive: true,
  };
  const [studio, setStudio] = useState<Studio>(blankStudio);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudio((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Submitted Form");
      const response = await postNewStudio(studio);
      if (!response) {
        return;
      }
      console.log("Studio >>>", studio);
      toast.success("Studio Created!");
      return;
    } catch (error) {
      console.log("ERROR>>>", error);
      toast.error(`Something went wrong: ${String(error.message)}`);
    }
  };

  return (
    <section>
      <h2>Add an Anime Studio</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Ex: Ghibli"
          onChange={handleChange}
          required
        />

        <label htmlFor="year_founded">Year Founded:</label>
        <input
          type="number"
          name="year_founded"
          id="year_founded"
          placeholder="Ex: 1985"
          onChange={handleChange}
          required
        />

        <label htmlFor="hq">Headquarters:</label>
        <input
          type="text"
          name="headquarters"
          id="headquarters"
          placeholder="Ex: Tokyo, Japan"
          onChange={handleChange}
          required
        />

        <label htmlFor="website">Website:</label>
        <input
          type="text"
          name="website"
          id="website"
          placeholder="Ex: ghibli.jp"
          onChange={handleChange}
          required
        />

        <label htmlFor="isActive">Active?:</label>
        <input
          type="radio"
          name="isActive"
          onChange={handleChange}
          checked={studio.isActive === true}
          required
        />
        <label htmlFor="yes">Yes</label>
        <input
          type="radio"
          name="isActive"
          onChange={handleChange}
          checked={studio.isActive === false}
          required
        />
        <label htmlFor="no">No</label>
        <button type="submit">Create Studio</button>
      </form>
    </section>
  );
};

export default CreateStudio;
