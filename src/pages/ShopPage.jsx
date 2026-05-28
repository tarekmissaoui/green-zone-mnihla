import { useEffect, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { mockCategories, mockProducts } from "../data/mockProducts";
import { supabase } from "../lib/supabaseClient";

export default function ShopPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setError("Mode demo actif: configure Supabase pour charger les donnees en ligne.");
      return;
    }
    async function loadData() {
      const [{ data: loadedProducts }, { data: loadedCategories }] = await Promise.all([
        supabase.from("products").select("*").eq("is_active", true),
        supabase.from("categories").select("*"),
      ]);
      setProducts(loadedProducts ?? []);
      setCategories(loadedCategories ?? []);
    }
    loadData();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesText = p.name?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categoryId === "all" || String(p.category_id) === categoryId;
      return matchesText && matchesCategory;
    });
  }, [products, query, categoryId]);

  return (
    <section className="container-x py-10">
      <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-black via-emerald-900 to-indigo-900 p-6 text-white shadow-premium">
        <h2 className="text-2xl font-bold md:text-3xl">Boutique Green Zone</h2>
        <p className="mt-2 text-sm text-green-50">
          Equipements agricoles, jardinage, irrigation et animalerie avec qualite professionnelle.
        </p>
      </div>
      {error && (
        <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      )}
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-emerald-500/30 bg-white/95 px-4 py-3 text-slate-900 shadow-soft"
          placeholder="Rechercher un produit..."
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded-xl border border-emerald-500/30 bg-white/95 px-4 py-3 text-slate-900 shadow-soft"
        >
          <option value="all">Toutes categories</option>
          {categories.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-emerald-400/20 bg-white/95 p-5 text-slate-900 shadow-soft transition hover:-translate-y-1 hover:shadow-premium"
          >
            <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-emerald-100 to-indigo-100" />
            <h3 className="font-semibold text-brand-dark">{p.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{p.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-bold text-brand-green">{p.price} TND</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Stock: {p.stock ?? 0}
              </span>
            </div>
            <button
              onClick={() => addToCart(p)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              <ShoppingBag size={16} />
              Ajouter au panier
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
