import { useState } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "../../routes/routes";
import { Clapperboard, LoaderCircle } from "lucide-react";
import Button from "../atoms/Button";
import H1 from "../atoms/H1";
import InputField from "../molecules/InputField";
import { createContent } from "../../services/api/contentsApi";

function ContentForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    minimalAge: "",
    entrances: "",
    releaseDate: "",
    poster: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    createContent(formData)
      .then(() => {
        router.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-1/2 flex-col gap-4 rounded-lg bg-gray-900 p-6 shadow-lg"
    >
      {error && <p className="text-red-500">{error}</p>}
      <H1 classname="mb-2 text-2xl font-bold text-white" content="Ajouter le film de votre choix" />
      <div className="flex gap-4">
        <div className="w-1/2">
          <InputField
            name="title"
            label="Titre"
            value={formData.title}
            placeholder="Inséparables"
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-1/2">
          <InputField
            name="description"
            label="Description"
            value={formData.description}
            placeholder="Mika refait sa vie lorsque..."
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <InputField
        name="type"
        label="Catégorie"
        value={formData.type}
        placeholder="Film, Série, Documentaire..."
        onChange={handleChange}
        required
      />
      <InputField
        name="minimalAge"
        label="Âge requis"
        type="number"
        value={formData.minimalAge}
        placeholder="13+"
        onChange={handleChange}
        required
      />

      <InputField
        name="entrances"
        label="Nombre d'entrés"
        type="number"
        value={formData.entrances}
        placeholder="1 030 000 entrées"
        onChange={handleChange}
        required
      />

      <InputField
        name="releaseDate"
        label="Date de publication"
        type="date"
        value={formData.releaseDate}
        placeholder="4 septembre 2019"
        onChange={handleChange}
        required
      />

      <InputField
        name="poster"
        label="Poster du contenu"
        value={formData.poster}
        placeholder="Lien de votre image"
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        variant="green"
        icon={loading ? <LoaderCircle size={16} className="animate-spin" /> : <Clapperboard size={16} />}
        disabled={loading}
      >
        {loading ? "Chargement..." : "Proposer votre contenu aux utilisateurs"}
      </Button>
    </form>
  );
}

export default ContentForm;
