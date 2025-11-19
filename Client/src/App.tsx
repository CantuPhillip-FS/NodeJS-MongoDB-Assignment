import CreateStudio from "./components/CreateStudio";
import SearchAnime from "./components/SearchAnime";
import SearchStudio from "./components/SearchStudio";

function App() {
  return (
    <main>
      <h2 className="centered-text">Dashboard</h2>
      <SearchAnime />
      <SearchStudio />
      <CreateStudio />
    </main>
  );
}

export default App;
