import { useState } from "react";
import CreateStudio from "./components/CreateStudio";
import EditUser from "./components/EditUser";
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
      <CreateStudio />
      <SignupForm onSignup={() => setReloadUsers((state) => state + 1)} />
      <ListAllusers reloadUsers={reloadUsers} />
      <EditUser />
    </main>
  );
}

export default App;
