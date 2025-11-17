import toast from "react-hot-toast";

// TS: Define Anime type for fetch
type Anime = {
  _id: string;
  title: string;
  year_released: number;
  average_rating: number;
  // I'll add studio props if needed
};

const baseUrl: string = import.meta.env.VITE_ANIME_BASE_URL;
const fetchAllAnimes = async () => {
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
    console.log("allAnimes >>>", allAnimes);

    return allAnimes;
  } catch (error) {
    console.error(error);
    // cannot use "error" as a 2nd argument for toast so used template literal
    // TS: error has an unknown type in catch that can't be changed there but can be in literal
    toast.error(`Something went wrong: ${String(error)}`);
    // make fetchAnimes always return something
    return [];
  }
};

export default fetchAllAnimes;
