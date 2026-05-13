import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import { ROUTES } from "../../routes/routes";
import { LogIn, LoaderCircle } from "lucide-react";
import Button from "../atoms/Button";
import H1 from "../atoms/H1";
import InputField from "../molecules/InputField";

function RegisterForm() {
  const { registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const form = document.querySelector("form");
    const formData = new FormData(form);
    const userData = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      dateOfBirth: formData.get("dateOfBirth"),
    };

    if (userData.password !== userData.confirmPassword) {
      setError("Votre mot de passe et celui de confirmation ne correspondent pas");
      return;
    }
    setLoading(true);

    registerUser(userData)
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
      <H1 classname="mb-2 text-2xl font-bold text-white" content="Inscription" />
      <div className="flex gap-4">
        <div className="w-1/2">
          <InputField
            name="firstname"
            label="Prénom"
            placeholder="John"
            required
          />
        </div>

        <div className="w-1/2">
          <InputField
            name="lastname"
            label="Nom"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder="john.doe@example.com"
        required
      />
      <InputField
        name="password"
        label="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
        required
      />

      <InputField
        name="confirmPassword"
        label="Confirmer le mot de passe"
        type="password"
        placeholder="Retapez votre mot de passe"
        required
      />

      <InputField
        name="dateOfBirth"
        label="Date de naissance"
        type="date"
        placeholder="Votre date de naissance"
        required
      />


      <Button
        type="submit"
        icon={loading ? <LoaderCircle size={16} className="animate-spin" /> : <LogIn size={16} />}
        disabled={loading}
      >
        {loading ? "Chargement..." : "S'inscrire"}
      </Button>
    </form>
  );
}

export default RegisterForm;
