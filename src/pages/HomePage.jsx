import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="container-x space-y-10 py-12 md:py-16">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-emerald-300/30 bg-gradient-to-br from-emerald-800 via-emerald-600 to-indigo-700 p-8 text-white shadow-premium md:p-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-emerald-200/20 blur-3xl" />
          <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
            Materiel Agricole & Jardinage
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Green Zone Mnihla
          </h1>
          <p className="max-w-2xl text-base text-emerald-50 md:text-lg">{t.welcome}</p>
        </motion.div>
        <div className="rounded-3xl border border-emerald-400/20 bg-white p-6 text-slate-900 shadow-soft">
          <h2 className="mb-4 text-xl font-bold text-brand-dark">Nos univers</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>Plantes & pots decoratifs</li>
            <li>Irrigation et outillage</li>
            <li>Engrais, terreau et semences</li>
            <li>Animalerie et nutrition</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          "Livraison rapide en Tunisie",
          "Produits professionnels verifies",
          "Support WhatsApp 7j/7",
        ].map((item) => (
          <article key={item} className="rounded-2xl border border-emerald-400/20 bg-white p-5 text-slate-900 shadow-soft">
            <p className="font-semibold text-brand-dark">{item}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-emerald-400/20 bg-white p-8 text-slate-900 shadow-soft">
        <h3 className="text-2xl font-bold text-brand-dark">Infos du magasin</h3>
        <p className="mt-3 text-slate-700">
          Adresse: Mnihla Ariana, Route de Bizerte, en face de Citroen
        </p>
        <p className="mt-2 text-slate-700">Telephone & WhatsApp: +216 22 425 120</p>
        <p className="mt-2 text-slate-700">Email: greenzonemnihla@gmail.com</p>
      </section>
    </div>
  );
}
