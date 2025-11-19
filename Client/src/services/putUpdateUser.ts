import toast from "react-hot-toast";

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

const baseUrl: string = import.meta.env.VITE_USER_BASE_URL;

const putUpdateUser = async (id: string, body: User) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("SERVER RESPONSE >>>", response);
    console.log("SERVER RESPONSE.BODY >>>", response.body);
    if (!response.ok) return toast.error("User update failed");
    return response;
  } catch (error) {
    console.log("ERROR >>>", error);
    return error;
  }
};

export default putUpdateUser;
