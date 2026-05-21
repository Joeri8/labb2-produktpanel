import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Produktpanelen</h1>

      <div>
        <Link to="/">Start</Link>
        <Link to="/products">Produkter</Link>
        <Link to="/create">Skapa produkt</Link>
      </div>
    </nav>
  );
}