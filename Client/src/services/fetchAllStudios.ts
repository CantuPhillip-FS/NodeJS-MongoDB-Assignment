import toast from "react-hot-toast";

//   Use Vite's built in .env processing
const baseUrl: string = import.meta.env.VITE_STUDIO_BASE_URL;

const fetchAllStudios = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      //just return empty list
      return [];
    }

    const body = await response.json();
    // console.log("BODY >>>", body);

    const allStudios = body.studios;
    // console.log("allStudios >>>", allStudios);

    if (allStudios.length < 1) {
      toast.error("No studios found.");
    }

    return allStudios;
  } catch (error) {
    console.error(error);
    // cannot use "error" as a 2nd argument for toast so used template literal
    // TS: error has an unknown type in catch that can't be changed there but can be in literal
    toast.error(`Something went wrong: ${String(error)}`);
    return [];
  }
};
export default fetchAllStudios;
