import { useState } from "react";

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState("");

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Skapar en lokal bildlänk så bilden kan visas direkt på sidan
    const localUrl = URL.createObjectURL(file);
    setImageUrl(localUrl);
  }

  return (
    <section className="image-uploader">
      <h2>Ladda upp produktbild</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imageUrl && (
        <div className="preview">
          <p>Förhandsvisning:</p>
          <img src={imageUrl} alt="Uppladdad produktbild" />
        </div>
      )}
    </section>
  );
}