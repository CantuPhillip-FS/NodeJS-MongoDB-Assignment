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
  const [userId] = useState(user._id);
  const [fname, setfName] = useState(user.firstName);
  const [lname, setlName] = useState(user.lastName);
  const [emailVal, setEmailVal] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      firstName: fname,
      lastName: lname,
      email: emailVal,
    };
    try {
      const response = await putUpdateUser(userId, body);
      if (response) {
        console.log("RESPONSE >>>", response);
        toast.success("User updated!");
      }
    } catch (error) {
      console.log("ERROR >>>", error);
    } finally {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={fname}
        onChange={(e) => setfName(e.target.value)}
        required
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={lname}
        onChange={(e) => setlName(e.target.value)}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={emailVal}
        onChange={(e) => setEmailVal(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => onSubmit()}>
        Cancel
      </button>
    </form>
  );
};

export default EditUser;
