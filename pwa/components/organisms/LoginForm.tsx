import {FormEventHandler, useState} from "react";
import { useRouter } from "next/router";
import H1 from "../atoms/H1";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";
import InputField from "../molecules/InputField";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import { ROUTES } from "../../routes/routes";

function LoginForm() {
  const router = useRouter();
  const { loginUser, loading } = useAuth();
  const [error, setError] = useState<string>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(undefined);

    const form = document.querySelector("form");
    const formData = new FormData(form ?? undefined);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    loginUser(userData.email?.toString() ?? '', userData.password?.toString() ?? '')
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
      <H1 className="mb-2 text-2xl font-bold text-white" content="Connexion" />

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
        icon={{ name: loading ? 'loading' : 'login' }}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  );
}

export default LoginForm;
