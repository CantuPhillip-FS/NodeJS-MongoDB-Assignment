import { useState } from "react";
import ListAllusers from "./components/ListAllUsers";
import SearchAnime from "./components/SearchAnime";
import SearchStudio from "./components/SearchStudio";
import SignupForm from "./components/SignupForm";

function App() {
  // this state is used to properly re-fetch the users upon new signups
  const [reloadUsers, setReloadUsers] = useState(0);

  return (
    <main>
      <h1>Hello World</h1>
      <SearchAnime />
      <SearchStudio />
      <SignupForm onSignup={() => setReloadUsers((state) => state + 1)} />
      <ListAllusers reloadUsers={reloadUsers} />
    </main>
  );
}

export default App;
