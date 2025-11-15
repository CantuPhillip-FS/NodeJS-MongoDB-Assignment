import { useState } from "react";

const SignupForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isProccessing, SetisProccessing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetisProccessing(true);
    try {
      console.log("Signup Form Submitted");
    } catch (error) {
      console.log(error);
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
