import { useState } from "react";
import ListAllusers from "./components/ListAllUsers";
import SignupForm from "./components/SignupForm";

function App() {
  const [reloadUsers, setReloadUsers] = useState(0);
  return (
    <main>
      <h1>Hello World</h1>
      <SignupForm onSignup={() => setReloadUsers((state) => state + 1)} />
      <ListAllusers reloadUsers={reloadUsers} />
    </main>
  );
}

export default App;
