import { useState } from "react";
import ListAllusers from "./components/ListAllUsers";
import SearchBar from "./components/SearchAnime";
import SignupForm from "./components/SignupForm";

function App() {
  // this state is used to properly re-fetch the users upon new signups
  const [reloadUsers, setReloadUsers] = useState(0);

  return (
    <main>
      <h1>Hello World</h1>
      <SearchBar />
      <SignupForm onSignup={() => setReloadUsers((state) => state + 1)} />
      <ListAllusers reloadUsers={reloadUsers} />
    </main>
  );
}

export default App;
