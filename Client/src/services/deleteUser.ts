const deleteUser = async (id: string) => {
  // Use Vite's built in .env processing
  const baseUrl: string = import.meta.env.VITE_USER_BASE_URL;
  const promise = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  const response = await promise.json();
  console.log(response);
  if (response.status === "successful") {
    return true;
  } else {
    return true;
  }
};

export default deleteUser;
