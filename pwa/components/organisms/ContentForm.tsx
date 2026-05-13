import { useState } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "../../routes/routes";
import { Plus, LoaderCircle } from "lucide-react";
import Button from "../atoms/Button";
import H1 from "../atoms/H1";
import InputField from "../molecules/InputField";
import { createContent } from "../../services/api/contentsApi";

function ContentForm() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    const formData = new FormData(form);
    setError(null);
    setLoading(true);

    const contentData = {
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      minimalAge: Number(formData.get("minimalAge")),
      entrances: Number(formData.get("entrances")),
      releaseDate: formData.get("releaseDate"),
      poster: formData.get("poster"),
    };

    createContent(contentData)
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
            placeholder="Inséparables"
            required
          />
        </div>

        <div className="w-1/2">
          <InputField
            name="description"
            label="Description"
            placeholder="Mika refait sa vie lorsque..."
            required
          />
        </div>
      </div>

      <InputField
        name="type"
        label="Catégorie"
        placeholder="Film, Série, Documentaire..."
        required
      />
      <InputField
        name="minimalAge"
        label="Âge requis"
        type="number"
        placeholder="13+"
        required
      />

      <InputField
        name="entrances"
        label="Nombre d'entrés"
        type="number"
        placeholder="1 030 000 entrées"
        required
      />

      <InputField
        name="releaseDate"
        label="Date de publication"
        type="date"
        placeholder="4 septembre 2019"
        required
      />

      <InputField
        name="poster"
        label="Poster du contenu"
        placeholder="Lien de votre image"
        required
      />

      <Button
        type="submit"
        variant="green"
        icon={loading ? <LoaderCircle size={16} className="animate-spin" /> : <Plus size={16} />}
        disabled={loading}
      >
        {loading ? "Chargement..." : "Proposer votre contenu aux utilisateurs"}
      </Button>
    </form>
  );
}

export default ContentForm;
