import {FormEventHandler, useState} from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import { ROUTES } from "../../routes/routes";
import Button from "../atoms/Button";
import H1 from "../atoms/H1";
import InputField from "../molecules/InputField";
import {User} from "@/types/UsersApi";

function RegisterForm() {
  const { registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError('');

    const form = document.querySelector("form");
    const formData = new FormData(form ?? undefined);
    const userData = {
      firstname: formData.get("firstname")?.toString() || '',
      lastname: formData.get("lastname")?.toString() || '',
      email: formData.get("email")?.toString() || '',
      password: formData.get("password")?.toString() || '',
      confirmPassword: formData.get("confirmPassword")?.toString() || '',
      dateOfBirth: formData.get("dateOfBirth")?.toString() || '',
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
      className="mx-auto flex w-full max-w-md md:max-w-2xl flex-col gap-4 rounded-lg bg-gray-900 px-4 py-6 sm:p-6 shadow-lg"
    >
      {error && <p className="text-red-500">{error}</p>}
      <H1 className="mb-2 text-2xl font-bold text-white" content="Inscription" />

      <div className="flex flex-col md:flex-row gap-4">

        <div className="w-full md:w-1/2">
          <InputField
            name="firstname"
            label="Prénom"
            placeholder="John"
            required
          />
        </div>


        <div className="w-full md:w-1/2">
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
        icon={loading ? {name: 'loading', className: 'animate-spin'} : {name: 'login'}}
        disabled={loading}
      >
        {loading ? "Chargement..." : "S'inscrire"}
      </Button>
    </form>
  );
}

export default RegisterForm;
