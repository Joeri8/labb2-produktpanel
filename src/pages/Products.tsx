import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { deleteProduct, getProducts } from "../api/productApi";
import type { Product } from "../types/Product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hämtar produkter när sidan laddas.
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Kunde inte hämta produkter.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Tar bort produkt både från API och state.
  async function handleDelete(id: number) {
    const confirmed = confirm("Vill du ta bort produkten?");

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      setProducts(products.filter((product) => product.id !== id));
    } catch {
      setError("Kunde inte ta bort produkten.");
    }
  }

  // Villkorlig rendering vid laddning.
  if (loading) {
    return <p>Laddar produkter...</p>;
  }

  // Villkorlig rendering vid error.
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Produkter</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}