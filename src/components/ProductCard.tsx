import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

type Props = {
  product: Product;
  onDelete: (id: number) => void;
};

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>
      <p>{product.price} kr</p>

      <div className="button-row">
        <Link className="button" to={`/products/${product.id}`}>
          Visa mer
        </Link>

        <button className="button button-danger" onClick={() => onDelete(product.id)}>
          Ta bort
        </button>
      </div>
    </article>
  );
}