import { Link } from "react-router";

function App() {
  return (
    <main>
      <h2 className="centered-text">Dashboard</h2>
      <Link to="/users">
        <article
          className="card"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
        >
          👥 Users
        </article>
      </Link>
      <Link to="/studios">
        <article
          className="card"
          style={{ backgroundColor: "rgba(255, 123, 0, 0.85)" }}
        >
          🎬 Studios
        </article>
      </Link>
      <Link to="/animes">
        <article
          className="card"
          style={{ backgroundColor: "rgba(255, 0, 0, 0.85)" }}
        >
          🌸 Animes
        </article>
      </Link>
    </main>
  );
}

export default App;
