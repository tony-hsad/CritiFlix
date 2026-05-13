import { useState } from "react";
import { useRouter } from "next/router";
import { LogIn, LoaderCircle } from "lucide-react";
import H1 from "../atoms/H1";
import Button from "../atoms/Button";
import InputField from "../molecules/InputField";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import { ROUTES } from "../../routes/routes";

function LoginForm() {
  const router = useRouter();
  const { loginUser, loading } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const form = document.querySelector("form");
    const formData = new FormData(form);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    loginUser(userData.email, userData.password)
      .then(() => {
        router.push(ROUTES.HOME);
      })
      .catch(() => {
        setError("Email ou mot de passe incorrect");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-gray-900 p-6 shadow-lg"
    >
      <H1 classname="mb-2 text-2xl font-bold text-white" content="Connexion" />

      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder="example@email.com"
        required
      />

      <InputField
        name="password"
        label="Mot de passe"
        type="password"
        placeholder="Saisissez votre mot de passe"
        required
      />

      {error && <p className="rounded bg-red-900/50 p-2 text-sm text-red-300">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        icon={loading ? <LoaderCircle size={16} className="animate-spin" /> : <LogIn size={16} />}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  );
}

export default LoginForm;
