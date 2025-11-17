// Use Vite's built in .env processing
const baseUrl: string = import.meta.env.VITE_USER_BASE_URL;

const fetchAllUsers = async () => {
  try {
    const response = await fetch(baseUrl, { method: "GET" });
    // console.log("RESPONSE >>>", response);
    if (response.ok) {
      // TS: deconstruct and extract the users as an array of my User type
      const body = await response.json();
      console.log("Response.json > BODY >>>", body);
      if (body.message === "failed") return null;
      return body.users;
    }
    if (response.status === 400) return null;
  } catch (error) {
    console.log(error);
  }
};

export default fetchAllUsers;
