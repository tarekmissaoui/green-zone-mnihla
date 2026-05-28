import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function EntityManagerPage({ title, table, fields }) {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});

  async function loadRows() {
    const { data } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }

  useEffect(() => {
    loadRows();
  }, [table]);

  const handleSave = async () => {
    await supabase.from(table).insert(form);
    setForm({});
    loadRows();
  };

  const handleDelete = async (id) => {
    await supabase.from(table).delete().eq("id", id);
    loadRows();
  };

  return (
    <section className="container-x py-10">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {fields.map((f) => (
          <input
            key={f.key}
            value={form[f.key] ?? ""}
            onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
            placeholder={f.label}
            className="rounded-md border border-green-200 px-3 py-2"
          />
        ))}
        <button onClick={handleSave} className="rounded-md bg-brand-green px-4 py-2 font-semibold text-white">
          Ajouter
        </button>
      </div>
      <div className="space-y-3">
        {rows.map((row) => (
          <article key={row.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-premium">
            <pre className="overflow-auto text-xs">{JSON.stringify(row, null, 2)}</pre>
            <button onClick={() => handleDelete(row.id)} className="rounded-md border border-red-300 px-3 py-2 text-red-700">
              Supprimer
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
