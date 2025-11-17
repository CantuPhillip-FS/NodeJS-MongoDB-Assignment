import { useState } from "react";
import ListAllusers from "./components/ListAllUsers";
import SearchBar from "./components/SearchBar";
import SignupForm from "./components/SignupForm";

function App() {
  // this state is used to properly re-fetch the users upon new signups
  const [reloadUsers, setReloadUsers] = useState(0);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search button clicked >>>", e.target.search.value);
  };
  return (
    <main>
      <h1>Hello World</h1>
      <SearchBar onSubmit={handleSearch} />
      <SignupForm onSignup={() => setReloadUsers((state) => state + 1)} />
      <ListAllusers reloadUsers={reloadUsers} />
    </main>
  );
}

export default App;
