import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";

const cards = [
  ["Produits", "products"],
  ["Categories", "categories"],
  ["Commandes", "orders"],
  ["Notifications", "notifications"],
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState("");
  const { signOut } = useAuth();

  useEffect(() => {
    if (!supabase) {
      setError("Supabase n'est pas configure sur cet environnement.");
      return;
    }
    async function loadStats() {
      const results = await Promise.all(
        cards.map(async ([, table]) => {
          const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
          return [table, count ?? 0];
        })
      );
      setStats(Object.fromEntries(results));
    }
    loadStats();
  }, []);

  return (
    <section className="container-x py-10">
      {error && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      )}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Dashboard administrateur</h2>
        <button onClick={signOut} className="rounded-md border border-green-200 px-3 py-2">
          Deconnexion
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, table]) => (
          <article key={table} className="rounded-xl bg-white p-4 shadow-premium">
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-brand-green">{stats[table] ?? 0}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Link to="/admin/products" className="rounded-lg bg-black px-4 py-2 text-center font-medium text-white">Produits</Link>
        <Link to="/admin/categories" className="rounded-lg bg-black px-4 py-2 text-center font-medium text-white">Categories</Link>
        <Link to="/admin/orders" className="rounded-lg bg-black px-4 py-2 text-center font-medium text-white">Commandes</Link>
        <Link to="/admin/settings" className="rounded-lg bg-black px-4 py-2 text-center font-medium text-white">Site</Link>
        <Link to="/admin/blog" className="rounded-lg bg-black px-4 py-2 text-center font-medium text-white">Blog</Link>
        <Link to="/admin/gallery" className="rounded-lg bg-black px-4 py-2 text-center font-medium text-white">Galerie</Link>
        <Link to="/admin/users" className="rounded-lg bg-black px-4 py-2 text-center font-medium text-white">Utilisateurs</Link>
        <Link to="/admin/notifications" className="rounded-lg bg-black px-4 py-2 text-center font-medium text-white">Alertes</Link>
      </div>
    </section>
  );
}
