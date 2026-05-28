import { Link, NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const languages = ["fr", "en", "ar"];

export default function Layout({ children }) {
  const { t, lang, setLang } = useLanguage();
  const { itemCount } = useCart();
  return (
    <div className="min-h-screen bg-brand-night text-white">
      <header className="sticky top-0 z-40 border-b border-emerald-500/20 bg-brand-night/85 backdrop-blur-xl">
        <div className="container-x flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg text-white shadow-soft">
              GZ
            </span>
            <span className="text-xl font-bold text-white">Green Zone Mnihla</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <NavLink to="/" className="nav-link">{t.home}</NavLink>
            <NavLink to="/shop" className="nav-link">{t.shop}</NavLink>
            <NavLink to="/cart" className="nav-link inline-flex items-center gap-2">
              <ShoppingBag size={16} />
              {t.cart}
              {itemCount > 0 ? (
                <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </NavLink>
            <NavLink to="/admin" className="nav-link">{t.admin}</NavLink>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-full border border-emerald-500/30 bg-brand-night px-3 py-2 text-xs font-semibold text-white"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-emerald-500/20 bg-black/30 py-10 text-sm text-emerald-100">
        <div className="container-x grid gap-3 md:grid-cols-3">
          <p className="font-semibold text-emerald-300">Green Zone Mnihla</p>
          <p>Mnihla Ariana, Route de Bizerte (en face de Citroen)</p>
          <p className="md:text-right">+216 22 425 120 - greenzonemnihla@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
