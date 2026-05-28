import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabaseClient";

export default function CartPage() {
  const { items, totalPrice, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderError, setOrderError] = useState("");
  const [saving, setSaving] = useState(false);
  const lines = items
    .map((item) => `- ${item.name} x${item.quantity} (${item.price} TND)`)
    .join("%0A");
  const message = encodeURIComponent(
    `Bonjour Green Zone Mnihla, je veux confirmer ma commande:%0A${lines}%0A%0ATotal: ${totalPrice.toFixed(
      2
    )} TND`
  );

  const createOrderInSupabase = async () => {
    if (!supabase || items.length === 0) {
      if (!supabase) {
        setOrderError("Supabase non configure. Utilisez WhatsApp ou configurez .env pour activer la validation en ligne.");
      }
      return;
    }
    setSaving(true);
    setOrderError("");
    setOrderStatus("");
    const { data: order, error: orderInsertError } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName || null,
        customer_phone: customerPhone || null,
        customer_email: customerEmail || null,
        total: totalPrice,
        notes: notes || null,
        status: "new",
      })
      .select("id")
      .single();

    if (orderInsertError) {
      setOrderError(orderInsertError.message);
      setSaving(false);
      return;
    }

    const rows = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      unit_price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(rows);
    if (itemsError) {
      setOrderError(itemsError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setOrderStatus(`Commande enregistree avec succes. Reference: #${order.id}`);
    clearCart();
  };

  return (
    <section className="container-x py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-400/20 bg-white p-8 text-slate-900 shadow-premium">
        <h2 className="mb-3 text-3xl font-bold text-brand-dark">Panier & Commande Rapide</h2>
        <p className="mb-6 text-gray-600">Finalise ta commande via WhatsApp ou email avec notre equipe.</p>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-6 text-sm text-emerald-900">
            Votre panier est vide. Ajoutez des produits depuis la boutique.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.price} TND / unite</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQuantity(item.id)} className="h-9 w-9 rounded-lg border border-slate-300">-</button>
                  <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="h-9 w-9 rounded-lg border border-slate-300">+</button>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-emerald-700">{(item.price * item.quantity).toFixed(2)} TND</p>
                  <button onClick={() => removeFromCart(item.id)} className="rounded-lg border border-red-200 p-2 text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-600">Total commande</p>
          <p className="text-2xl font-bold text-slate-900">{totalPrice.toFixed(2)} TND</p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <input
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Nom complet"
          />
          <input
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Telephone"
          />
          <input
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
            placeholder="Email"
            type="email"
          />
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
            placeholder="Notes de commande (optionnel)"
            rows={3}
          />
        </div>

        {orderError ? <p className="mt-3 text-sm text-red-600">{orderError}</p> : null}
        {orderStatus ? <p className="mt-3 text-sm text-emerald-700">{orderStatus}</p> : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={createOrderInSupabase}
            disabled={saving || items.length === 0}
            className="inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {saving ? "Enregistrement..." : "Valider la commande"}
          </button>
          <a
            href={`https://wa.me/21622425120?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-xl bg-brand-green px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-emerald-700"
          >
            Commander sur WhatsApp
          </a>
          <a
            href="mailto:greenzonemnihla@gmail.com?subject=Commande Green Zone Mnihla"
            className="inline-block rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            Commander par Email
          </a>
          <button
            onClick={clearCart}
            className="inline-block rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-50"
          >
            Vider le panier
          </button>
        </div>
      </div>
    </section>
  );
}
