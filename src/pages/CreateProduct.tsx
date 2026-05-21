import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import { createProduct } from "../api/productApi";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  // POST: skapar en ny produkt.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createProduct({
        title,
        price,
        description: "Ny produkt",
      });

      setMessage("Produkten skapades.");

      setTitle("");
      setPrice(0);
    } catch {
      setMessage("Något gick fel.");
    }
  }

  return (
    <section>
      <h2>Skapa produkt</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Produktnamn
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Pris
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>

        <button type="submit">Skapa produkt</button>
      </form>

      <ImageUploader />

      {message && <p>{message}</p>}
    </section>
  );
}