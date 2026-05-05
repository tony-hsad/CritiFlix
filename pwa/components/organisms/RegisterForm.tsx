import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import { ROUTES } from "../../routes/routes";
import { LogIn, LoaderCircle } from "lucide-react";
import Button from "../atoms/Button";
import Div from "../atoms/Div";
import H1 from "../atoms/H1";
import InputField from "../molecules/InputField";

function RegisterForm() {
  const { registerUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Votre mot de passe et celui de confirmation ne correspondent pas");
      return;
    }
    setLoading(true);

    registerUser(formData)
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
      <H1 classname="mb-2 text-2xl font-bold text-white" content="Inscription" />
      <Div classname="flex gap-4">
        <Div classname="w-1/2">
          <InputField
            name="firstname"
            label="Prénom"
            value={formData.firstname}
            placeholder="John"
            onChange={handleChange}
            required
          />
        </Div>

        <Div classname="w-1/2">
          <InputField
            name="lastname"
            label="Nom"
            value={formData.lastname}
            placeholder="Doe"
            onChange={handleChange}
            required
          />
        </Div>
      </Div>

      <InputField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        placeholder="john.doe@example.com"
        onChange={handleChange}
        required
      />
      <InputField
        name="password"
        label="Mot de passe"
        type="password"
        value={formData.password}
        placeholder="Votre mot de passe"
        onChange={handleChange}
        required
      />

      <InputField
        name="confirmPassword"
        label="Confirmer le mot de passe"
        type="password"
        value={formData.confirmPassword}
        placeholder="Retapez votre mot de passe"
        onChange={handleChange}
        required
      />

      <InputField
        name="dateOfBirth"
        label="Date de naissance"
        type="date"
        value={formData.dateOfBirth}
        placeholder="Votre date de naissance"
        onChange={handleChange}
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
