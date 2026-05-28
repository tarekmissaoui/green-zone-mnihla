export default function CartPage() {
  const message = encodeURIComponent("Bonjour Green Zone Mnihla, je veux confirmer ma commande.");
  return (
    <section className="container-x py-16">
      <h2 className="mb-4 text-2xl font-bold">Panier</h2>
      <p className="mb-6 text-gray-600">Panier client et validation rapide via WhatsApp.</p>
      <a
        href={`https://wa.me/21622425120?text=${message}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg bg-brand-green px-4 py-2 font-semibold text-white"
      >
        Commander sur WhatsApp
      </a>
    </section>
  );
}
