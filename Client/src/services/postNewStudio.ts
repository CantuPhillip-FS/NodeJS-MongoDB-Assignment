import toast from "react-hot-toast";

type Studio = {
  name: string;
  year_founded: number;
  headquarters: string;
  website: string;
  isActive: boolean;
};

const baseUrl: string = import.meta.env.VITE_STUDIO_BASE_URL;

const postNewStudio = async (body: Studio): Promise<boolean> => {
  // TS: explicitly tell the promise to return a boolean
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("ERROR BODY >>>", data);
      toast.error(
        `Studio creation was not successful: ${
          data.message || JSON.stringify(data)
        }`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong. No new studio created.");
    return false;
  }
};

export default postNewStudio;
