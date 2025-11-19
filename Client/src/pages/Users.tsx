import { useState } from "react";
import ListAllUsers from "../components/ListAllUsers";
import SignupForm from "../components/SignupForm";

const Users = () => {
  // this state is used to properly re-fetch the users upon new signups
  const [reloadUsers, setReloadUsers] = useState(0);
  // Great video on passing props from child to parent:
  // https://www.youtube.com/watch?v=rjYsntD4Xks

  return (
    <main>
      <SignupForm onSignup={() => setReloadUsers((state) => state + 1)} />
      <ListAllUsers reloadUsers={reloadUsers} />
    </main>
  );
};

export default Users;
