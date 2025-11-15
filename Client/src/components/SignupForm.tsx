import { useState } from "react";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isProccessing, SetisProccessing] = useState(false);

  // Use Vite's built in .env processing
  const baseUrl: string = import.meta.env.VITE_USER_BASE_URL;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetisProccessing(true);
    try {
      console.log("Signup Form Submitted");
      const data = new FormData(e.currentTarget);
      console.log("DATA >>>", data);
      const firstname = data.get("firstname");
      const lastname = data.get("lastname");
      const email = data.get("email");
      console.log("DATA.GET >>>", firstname, lastname, email);
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
        }),
      });
      console.log("RESPONSE >>>", response);
      const body = await response.json();
      console.log("BODY >>>", body);
      if (response.ok) {
        toast.success("Welcome! 🥳");
        setFirstname("");
        setLastname("");
        setEmail("");
      } else {
        toast.error(
          `Signup was not successful: ${body.message || JSON.stringify(body)}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong❗️");
    } finally {
      SetisProccessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Sign Up</p>
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={isProccessing}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
