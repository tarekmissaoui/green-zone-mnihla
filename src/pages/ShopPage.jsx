import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  useEffect(() => {
    supabase.from("products").select("*").eq("is_active", true).then(({ data }) => setProducts(data ?? []));
    supabase.from("categories").select("*").then(({ data }) => setCategories(data ?? []);
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
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-green-200 px-3 py-2"
          placeholder="Rechercher un produit..."
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded-lg border border-green-200 px-3 py-2"
        >
          <option value="all">Toutes categories</option>
          {categories.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <article key={p.id} className="rounded-xl bg-white p-4 shadow-premium">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="mt-3 font-bold text-brand-green">{p.price} TND</p>
          </article>
        ))}
      </div>
    </section>
  );
}
