import axios from "axios";
import { useState } from "react";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploadedImage, setUploadedImage] =
    useState("");

  const [message, setMessage] = useState("");

  // Sparar filen användaren väljer.
  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    // Tömmer tidigare meddelande när ny fil väljs.
    setMessage("");
  }

  // Skickar bilden till backend-servern med FormData.
  async function handleUpload() {
    if (!selectedFile) {
      setMessage("Välj en bild först.");

      return;
    }

    const formData = new FormData();

    // "image" måste matcha upload.single("image") i backend.
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Sparar bildens URL från servern.
      setUploadedImage(response.data.imageUrl);

      setMessage("Bilden laddades upp till servern.");
    } catch {
      setMessage("Bilden kunde inte laddas upp.");
    }
  }

  return (
    <section className="image-uploader">
      <h2>Ladda upp produktbild</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <button
        className="button"
        type="button"
        onClick={handleUpload}
      >
        Ladda upp bild
      </button>

      {/* Visar statusmeddelande */}
      {message && <p>{message}</p>}

      {/* Visar bilden efter uppladdning */}
      {uploadedImage && (
        <div className="preview">
          <p>Uppladdad bild:</p>

          <img
            src={uploadedImage}
            alt="Uppladdad produktbild"
          />
        </div>
      )}
    </section>
  );
}