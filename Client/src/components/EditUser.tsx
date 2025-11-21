import { useState } from "react";
import toast from "react-hot-toast";
import putUpdateUser from "../services/putUpdateUser";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

// Great video on passing props from child to parent:
// https://www.youtube.com/watch?v=rjYsntD4Xks
const EditUser = ({ user, onSubmit }: { user: User; onSubmit: () => void }) => {
  // defined default state of user from props
  const [fname, setfName] = useState(user.firstName);
  const [lname, setlName] = useState(user.lastName);
  const [emailVal, setEmailVal] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await putUpdateUser(user._id, {
        firstName: fname,
        lastName: lname,
        email: emailVal,
      });

      if (response) toast.success("User updated!");
    } catch (error) {
      console.log("ERROR >>>", error);
    } finally {
      onSubmit(); // closes dialog
    }
  };

  return (
    <form className="centered-form" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={fname}
        onChange={(e) => setfName(e.target.value)}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lname}
        onChange={(e) => setlName(e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={emailVal}
        onChange={(e) => setEmailVal(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
      <button type="button" onClick={onSubmit}>
        Cancel
      </button>
    </form>
  );
};

export default EditUser;
