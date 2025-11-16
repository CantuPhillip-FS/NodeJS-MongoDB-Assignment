import { useRef, useState } from "react";
import toast from "react-hot-toast";

const SignupForm = () => {
  const firstnameInput = useRef("");
  const lastnameInput = useRef("");
  const emailInput = useRef("");
  const clearInputs = () => {
    firstnameInput.current.value = "";
    lastnameInput.current.value = "";
    emailInput.current.value = "";
  };
  const [buttonstate, setButtonstate] = useState(false);

  // Use Vite's built in .env processing
  const baseUrl: string = import.meta.env.VITE_USER_BASE_URL;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonstate(true);
    try {
      console.log("Signup Form Submitted");
      const firstnameValue = firstnameInput.current.value;
      const lastnameValue = lastnameInput.current.value;
      const emailValue = emailInput.current.value;
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: firstnameValue,
          lastname: lastnameValue,
          email: emailValue,
        }),
      });
      if (response.ok) {
        toast.success("Welcome! 🥳");
        clearInputs();
      } else {
        const body = await response.json();
        toast.error(
          `Signup was not successful: ${body.message || JSON.stringify(body)}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong❗️");
    } finally {
      setButtonstate(false);
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
        ref={firstnameInput}
        required
      />
      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        ref={lastnameInput}
        required
      />
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" ref={emailInput} required />
      <button type="submit" disabled={buttonstate}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
