import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../api/productApi";
import type { Product } from "../types/Product";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const [message, setMessage] = useState("");

  // Hämtar en produkt med hjälp av id från URL:en.
  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      const data = await getProductById(id);

      setProduct(data);
      setTitle(data.title);
      setPrice(data.price);
    }

    fetchProduct();
  }, [id]);

  // PATCH: uppdaterar produkten.
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!product) return;

    try {
      const updatedProduct = await updateProduct(product.id, {
        title,
        price,
      });

      setProduct(updatedProduct);
      setMessage("Produkten uppdaterades.");
    } catch {
      setMessage("Något gick fel.");
    }
  }

  // Villkorlig rendering om produkt saknas.
  if (!product) {
    return <p>Laddar produkt...</p>;
  }

  return (
    <section className="details">
      <h2>{product.title}</h2>

      <img src={product.thumbnail} alt={product.title} />

      <p>{product.description}</p>

      <p>{product.price} kr</p>

      <form onSubmit={handleUpdate} className="form">
        <h3>Redigera produkt</h3>

        <label>
          Titel
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

        <button type="submit">Spara ändringar</button>

        {message && <p>{message}</p>}
      </form>
    </section>
  );
}