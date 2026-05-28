import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const languages = ["fr", "en", "ar"];

export default function Layout({ children }) {
  const { t, lang, setLang } = useLanguage();
  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="sticky top-0 z-40 border-b border-green-100 bg-white/90 backdrop-blur">
        <div className="container-x flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-bold text-brand-green">
            Green Zone Mnihla
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <NavLink to="/">{t.home}</NavLink>
            <NavLink to="/shop">{t.shop}</NavLink>
            <NavLink to="/cart">{t.cart}</NavLink>
            <NavLink to="/admin">{t.admin}</NavLink>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-md border border-green-200 px-2 py-1"
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
      <footer className="mt-16 bg-black py-8 text-sm text-white">
        <div className="container-x space-y-2">
          <p>Green Zone Mnihla - Mnihla, Ariana, Tunisie</p>
          <p>+216 22 425 120 - greenzonemnihla@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
