import { useState } from "react";
import { useRouter } from "next/router";
import { LogIn, LoaderCircle } from "lucide-react";
import H1 from "../atoms/H1";
import Button from "../atoms/Button";
import InputField from "../molecules/InputField";
import { useAuth } from "../../contexts/providers/AuthContextProvider";

function LoginForm() {
  const router = useRouter();
  const { loginUser, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    loginUser(formData.email, formData.password)
      .then(() => {
        router.push("/home");
      })
      .catch(() => {
        setError("Email ou mot de passe incorrect");
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
      className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg bg-gray-900 p-6 shadow-lg"
    >
      <H1 classname="mb-2 text-2xl font-bold text-white" content="Connexion" />

      <InputField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        placeholder="example@email.com"
        onChange={handleChange}
        required
      />

      <InputField
        name="password"
        label="Mot de passe"
        type="password"
        value={formData.password}
        placeholder="Saisissez votre mot de passe"
        onChange={handleChange}
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
