import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { error: authError } = await signIn(email, password);
    if (authError) {
      setError(authError.message);
      return;
    }
    navigate(location.state?.from?.pathname || "/admin");
  };

  return (
    <section className="container-x py-16">
      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow-premium">
        <h2 className="text-2xl font-bold">Connexion administrateur</h2>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <input
          className="w-full rounded-md border border-green-200 px-3 py-2"
          placeholder="Email admin"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-md border border-green-200 px-3 py-2"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full rounded-md bg-brand-green py-2 font-semibold text-white">Se connecter</button>
      </form>
    </section>
  );
}
