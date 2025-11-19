import { useState } from "react";
import CreateStudio from "./components/CreateStudio";
import ListAllUsers from "./components/ListAllUsers";
import SearchAnime from "./components/SearchAnime";
import SearchStudio from "./components/SearchStudio";
import SignupForm from "./components/SignupForm";

function App() {
  // this state is used to properly re-fetch the users upon new signups
  const [reloadUsers, setReloadUsers] = useState(0);
  // Great video on passing props from child to parent:
  // https://www.youtube.com/watch?v=rjYsntD4Xks

  return (
    <main>
      <h2 className="centered-text">Dashboard</h2>
      <SearchAnime />
      <SearchStudio />
      <CreateStudio />
      <SignupForm onSignup={() => setReloadUsers((state) => state + 1)} />
      <ListAllUsers reloadUsers={reloadUsers} />
    </main>
  );
}

export default App;
