import { Link } from "react-router";

function App() {
  return (
    <main>
      <h2 className="centered-text">Dashboard</h2>
      <article
        className="card users-card"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
      >
        <Link to="/users">Users</Link>
      </article>
      <article
        className="card studios-card"
        style={{ backgroundColor: "rgba(255, 123, 0, 0.85)" }}
      >
        <Link to="/studios">Studios</Link>
      </article>
      <article
        className="card animes-card"
        style={{ backgroundColor: "rgba(255, 0, 0, 0.85)" }}
      >
        <Link to="/animes">Animes</Link>
      </article>
    </main>
  );
}

export default App;
