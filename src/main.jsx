import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BadgeDollarSign,
  BookOpen,
  Boxes,
  Check,
  ChevronRight,
  Droplets,
  Facebook,
  Flower2,
  Globe2,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackagePlus,
  PawPrint,
  Pencil,
  Phone,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Trash2,
  Trees,
  X
} from "lucide-react";
import { ADMIN_EMAIL, supabase, useAdminAuth } from "./auth";
import "./styles.css";

const defaultSiteSettings = {
  companyName: "Green Zone Mnihla",
  shortName: "Green Zone",
  locationLabel: "Mnihla, Ariana",
  heroTitle: "Green Zone Mnihla",
  heroSub: "Votre espace moderne pour plantes, jardinage, agriculture, irrigation et animalerie a Mnihla.",
  heroText: "Des produits fiables, des conseils utiles et une equipe proche de vos projets verts.",
  footerText: "Materiel agricole, jardinage, plantes, irrigation et animalerie.",
  phone: "+216 22 425 120",
  whatsappNumber: "21622425120",
  email: "greenzonemnihla@gmail.com",
  address: "Mnihla, Ariana, Tunisie",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  heroImage: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1800&q=85"
};

const ADMIN_PRIVATE_HASH = "#green-zone-admin";

const copy = {
  fr: {
    dir: "ltr",
    nav: ["Accueil", "Produits", "Services", "Galerie", "Blog", "Contact", "Admin"],
    heroTitle: "Green Zone Mnihla",
    heroSub: "Votre espace moderne pour plantes, jardinage, agriculture, irrigation et animalerie a Mnihla.",
    heroText: "Des produits fiables, des conseils utiles et une equipe proche de vos projets verts.",
    shop: "Voir les produits",
    whats: "Contacter sur WhatsApp",
    products: "Catalogue produits",
    search: "Rechercher une plante, un pot, un engrais...",
    all: "Toutes",
    order: "Commander maintenant",
    services: "Services",
    gallery: "Galerie photo",
    contact: "Contact",
    blog: "Conseils et Blog",
    admin: "Dashboard administrateur",
    adminLogin: "Connexion admin confidentielle",
    password: "Mot de passe",
    changePassword: "Changer le mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    logout: "Deconnexion",
    add: "Ajouter produit",
    edit: "Modifier",
    delete: "Supprimer",
    categories: "Gerer categories",
    orders: "Voir commandes",
    formName: "Nom complet",
    formMessage: "Votre message",
    send: "Envoyer",
    newsletter: "Recevoir les nouveautes",
    footer: "Materiel agricole, jardinage, plantes, irrigation et animalerie.",
    adminHint: "Demo admin locale. Connectez Supabase ou Firebase dans le fichier de configuration avant publication.",
    save: "Enregistrer",
    cancel: "Annuler"
  },
  ar: {
    dir: "rtl",
    nav: ["الرئيسية", "المنتجات", "الخدمات", "المعرض", "المدونة", "اتصال", "الإدارة"],
    heroTitle: "Green Zone Mnihla",
    heroSub: "فضاء عصري للنباتات والبستنة والفلاحة والري ومنتجات الحيوانات الأليفة في المنيهلة.",
    heroText: "منتجات موثوقة، نصائح عملية، وفريق قريب من مشاريعكم الخضراء.",
    shop: "عرض المنتجات",
    whats: "واتساب",
    products: "كتالوج المنتجات",
    search: "ابحث عن نبات، أصيص، سماد...",
    all: "الكل",
    order: "اطلب الآن",
    services: "الخدمات",
    gallery: "معرض الصور",
    contact: "اتصل بنا",
    blog: "نصائح ومدونة",
    admin: "لوحة الإدارة",
    adminLogin: "دخول الإدارة الخاص",
    password: "كلمة السر",
    changePassword: "تغيير كلمة السر",
    currentPassword: "كلمة السر الحالية",
    newPassword: "كلمة السر الجديدة",
    logout: "تسجيل الخروج",
    add: "إضافة منتج",
    edit: "تعديل",
    delete: "حذف",
    categories: "إدارة الأصناف",
    orders: "عرض الطلبات",
    formName: "الاسم الكامل",
    formMessage: "رسالتك",
    send: "إرسال",
    newsletter: "استقبل الجديد",
    footer: "معدات فلاحية، بستنة، نباتات، ري ومنتجات حيوانات.",
    adminHint: "نسخة إدارة تجريبية محلية. اربط Supabase أو Firebase قبل النشر.",
    save: "حفظ",
    cancel: "إلغاء"
  },
  en: {
    dir: "ltr",
    nav: ["Home", "Products", "Services", "Gallery", "Blog", "Contact", "Admin"],
    heroTitle: "Green Zone Mnihla",
    heroSub: "A modern store for plants, gardening, agriculture, irrigation and pet supplies in Mnihla.",
    heroText: "Reliable products, useful advice and a team close to your green projects.",
    shop: "View products",
    whats: "Contact on WhatsApp",
    products: "Product catalogue",
    search: "Search plant, pot, fertilizer...",
    all: "All",
    order: "Order now",
    services: "Services",
    gallery: "Photo gallery",
    contact: "Contact",
    blog: "Tips and Blog",
    admin: "Admin dashboard",
    adminLogin: "Private admin login",
    password: "Password",
    changePassword: "Change password",
    currentPassword: "Current password",
    newPassword: "New password",
    logout: "Log out",
    add: "Add product",
    edit: "Edit",
    delete: "Delete",
    categories: "Manage categories",
    orders: "View orders",
    formName: "Full name",
    formMessage: "Your message",
    send: "Send",
    newsletter: "Get updates",
    footer: "Agricultural equipment, gardening, plants, irrigation and pet products.",
    adminHint: "Local admin demo. Connect Supabase or Firebase in the config file before publishing.",
    save: "Save",
    cancel: "Cancel"
  }
};

const categories = [
  "Jardinage",
  "Materiel agricole",
  "Pots et decoration",
  "Engrais et terreau",
  "Irrigation",
  "Animalerie",
  "Plantes d'interieur",
  "Plantes d'exterieur"
];

const iconFor = {
  Jardinage: Sprout,
  "Materiel agricole": Settings,
  "Pots et decoration": Flower2,
  "Engrais et terreau": Leaf,
  Irrigation: Droplets,
  Animalerie: PawPrint,
  "Plantes d'interieur": Trees,
  "Plantes d'exterieur": Flower2
};

const initialProducts = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    category: "Plantes d'interieur",
    price: 45,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80",
    description: "Plante tropicale decorative, ideale pour salon lumineux."
  },
  {
    id: 2,
    name: "Kit goutte a goutte 25m",
    category: "Irrigation",
    price: 69,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80",
    description: "Systeme economique pour potager, arbres et jardiniere."
  },
  {
    id: 3,
    name: "Terreau universel 50L",
    category: "Engrais et terreau",
    price: 18,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    description: "Substrat riche pour plantes vertes, fleurs et legumes."
  },
  {
    id: 4,
    name: "Pot ceramique noir",
    category: "Pots et decoration",
    price: 32,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
    description: "Pot elegant avec finition moderne pour interieur et terrasse."
  },
  {
    id: 5,
    name: "Secateur professionnel",
    category: "Jardinage",
    price: 24,
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80",
    description: "Coupe nette pour taille de rosiers, arbres et arbustes."
  },
  {
    id: 6,
    name: "Pulverisateur agricole 16L",
    category: "Materiel agricole",
    price: 85,
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80",
    description: "Equipement robuste pour traitement et entretien agricole."
  },
  {
    id: 7,
    name: "Lavande exterieure",
    category: "Plantes d'exterieur",
    price: 14,
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=80",
    description: "Plante aromatique resistante, parfum naturel pour jardins."
  },
  {
    id: 8,
    name: "Croquettes chat premium",
    category: "Animalerie",
    price: 38,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80",
    description: "Nutrition equilibree pour chats adultes, sac pratique."
  }
];

const services = [
  ["Conseils jardinage", "Diagnostic plantes, choix des sols et calendrier d'entretien.", Leaf],
  ["Installation irrigation", "Pose et configuration de goutte a goutte pour jardins et cultures.", Droplets],
  ["Entretien espaces verts", "Taille, plantation, nettoyage et suivi regulier.", Trees],
  ["Vente accessoires animaux", "Selection pratique pour chiens, chats et petits animaux.", PawPrint]
];

const gallery = [
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80"
];

const blog = [
  ["Conseils plantes", "Comment choisir l'exposition et l'arrosage selon chaque plante d'interieur.", "5 min"],
  ["Conseils jardinage", "Preparer un potager productif avec un sol sain et un bon paillage.", "7 min"],
  ["Conseils animalerie", "Les indispensables pour accueillir un chat ou un chien dans de bonnes conditions.", "4 min"]
];

const waLink = (settings, productName = "") => {
  const message = productName
    ? `Bonjour ${settings.companyName}, je souhaite commander ce produit: ${productName}.`
    : `Bonjour ${settings.companyName}, je souhaite vous contacter.`;
  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

function useSiteSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("gzm_site_settings");
    return saved ? { ...defaultSiteSettings, ...JSON.parse(saved) } : defaultSiteSettings;
  });

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("site_settings")
      .select("content")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content) {
          setSettings({ ...defaultSiteSettings, ...data.content });
          localStorage.setItem("gzm_site_settings", JSON.stringify(data.content));
        }
      });
  }, []);

  const saveSettings = async (next) => {
    setSettings(next);
    localStorage.setItem("gzm_site_settings", JSON.stringify(next));
    if (supabase) {
      await supabase.from("site_settings").upsert({ id: 1, content: next });
    }
  };

  return { settings, saveSettings };
};

function useProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("gzm_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        if (data?.length) {
          setProducts(data);
          localStorage.setItem("gzm_products", JSON.stringify(data));
        }
      });
  }, []);

  const persist = async (next) => {
    setProducts(next);
    localStorage.setItem("gzm_products", JSON.stringify(next));
  };

  return {
    products,
    addProduct: async (product) => {
      const nextProduct = { ...product, id: Date.now(), price: Number(product.price) };
      const next = [nextProduct, ...products];
      await persist(next);
      if (supabase) await supabase.from("products").upsert(nextProduct);
    },
    updateProduct: async (product) => {
      const nextProduct = { ...product, price: Number(product.price) };
      const next = products.map((item) => (item.id === product.id ? nextProduct : item));
      await persist(next);
      if (supabase) await supabase.from("products").upsert(nextProduct);
    },
    deleteProduct: async (id) => {
      const next = products.filter((item) => item.id !== id);
      await persist(next);
      if (supabase) await supabase.from("products").delete().eq("id", id);
    }
  };
}

function App() {
  const [lang, setLang] = useState("fr");
  const t = copy[lang];
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("Toutes");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [hash, setHash] = useState(window.location.hash);
  const productsApi = useProducts();
  const siteApi = useSiteSettings();
  const settings = siteApi.settings;

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const filtered = useMemo(() => {
    return productsApi.products.filter((product) => {
      const matchCategory = activeCat === "Toutes" || product.category === activeCat;
      const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return matchCategory && haystack.includes(query.toLowerCase());
    });
  }, [productsApi.products, query, activeCat]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  if (hash === ADMIN_PRIVATE_HASH) {
    return (
      <main dir={t.dir} className={lang === "ar" ? "arabic" : ""}>
        <Admin t={t} productsApi={productsApi} siteApi={siteApi} notify={notify} />
        {toast && <div className="toast"><Check size={18} />{toast}</div>}
      </main>
    );
  }

  return (
    <main dir={t.dir} className={lang === "ar" ? "arabic" : ""}>
      <Header t={t} settings={settings} lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero t={t} settings={settings} />
      <Categories t={t} activeCat={activeCat} setActiveCat={setActiveCat} />
      <Products t={t} settings={settings} products={filtered} query={query} setQuery={setQuery} activeCat={activeCat} setActiveCat={setActiveCat} />
      <Services t={t} />
      <Gallery t={t} />
      <Blog t={t} />
      <Contact t={t} settings={settings} notify={notify} />
      <Footer t={t} settings={settings} />
      {toast && <div className="toast"><Check size={18} />{toast}</div>}
    </main>
  );
}

function Header({ t, settings, lang, setLang, menuOpen, setMenuOpen }) {
  const publicNav = t.nav.slice(0, 6);
  const anchors = ["home", "products", "services", "gallery", "blog", "contact"];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/88 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img src="/assets/logo.jpg" alt="Green Zone Mnihla logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-moss/60" />
          <span className="leading-tight">
            <strong className="block text-base font-extrabold tracking-wide">{settings.shortName}</strong>
            <span className="text-xs text-white/70">{settings.locationLabel.split(",")[0]}</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {publicNav.map((item, index) => (
            <a key={item} className="nav-link" href={`#${anchors[index]}`}>{item}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Lang lang={lang} setLang={setLang} />
          <a href={waLink(settings)} target="_blank" className="btn-primary compact" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
        </div>
        <button className="icon-button lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-white/10 bg-ink px-4 py-4 lg:hidden">
          {publicNav.map((item, index) => (
            <a key={item} className="block rounded-lg px-3 py-3 text-white/80" onClick={() => setMenuOpen(false)} href={`#${anchors[index]}`}>{item}</a>
          ))}
          <div className="mt-3 flex items-center gap-2"><Lang lang={lang} setLang={setLang} /></div>
        </div>
      )}
    </header>
  );
}

function Lang({ lang, setLang }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1">
      <Globe2 size={16} className="mx-1 text-moss" />
      {["fr", "ar", "en"].map((item) => (
        <button key={item} onClick={() => setLang(item)} className={`lang ${lang === item ? "active" : ""}`}>{item.toUpperCase()}</button>
      ))}
    </div>
  );
}

function Hero({ t, settings }) {
  return (
    <section id="home" className="hero" style={{ "--hero-image": `url("${settings.heroImage}")` }}>
      <div className="hero-bg" />
      <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div className="relative z-10 max-w-3xl text-white">
          <span className="eyebrow"><Leaf size={16} /> {settings.locationLabel}</span>
          <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">{settings.heroTitle}</h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold text-white/90">{settings.heroSub}</p>
          <p className="mt-4 max-w-xl text-white/72">{settings.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="btn-primary"><ShoppingBag size={20} />{t.shop}</a>
            <a href={waLink(settings)} target="_blank" rel="noreferrer" className="btn-light"><MessageCircle size={20} />{t.whats}</a>
          </div>
        </div>
        <div className="relative z-10 hidden lg:block">
          <div className="showcase">
            <img src="/assets/logo.jpg" alt={settings.companyName} className="mx-auto h-44 w-44 rounded-full object-cover shadow-soft" />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["Plantes", "Irrigation", "Engrais", "Animalerie"].map((item) => (
                <div key={item} className="rounded-2xl bg-white/92 p-4 font-bold text-ink shadow-soft">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-zinc-600">{text}</p>}
    </div>
  );
}

function Categories({ t, activeCat, setActiveCat }) {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[t.all, ...categories].map((category) => {
            const key = category === t.all ? "Toutes" : category;
            const Icon = iconFor[category] || Boxes;
            return (
              <button key={category} onClick={() => setActiveCat(key)} className={`category-card ${activeCat === key ? "active" : ""}`}>
                <Icon size={22} />
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Products({ t, settings, products, query, setQuery }) {
  return (
    <section id="products" className="section bg-limewash">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Shop" title={t.products} text="Selection organisee avec recherche, categories et commande WhatsApp directe." />
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-emerald-900/10 bg-white p-3 shadow-soft md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-zinc-100 px-4 py-3">
            <Search className="text-leaf" size={20} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} className="w-full bg-transparent text-sm outline-none" />
          </div>
          <span className="rounded-xl bg-ink px-4 py-3 text-center text-sm font-bold text-white">{products.length} produits</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} settings={settings} t={t} />)}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, settings, t }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-leaf">{product.category}</span>
        <h3 className="mt-2 text-lg font-black text-ink">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm text-zinc-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <strong className="text-xl text-ink">{product.price} TND</strong>
          <a href={waLink(settings, product.name)} target="_blank" rel="noreferrer" className="order-btn"><MessageCircle size={17} />{t.order}</a>
        </div>
      </div>
    </article>
  );
}

function Services({ t }) {
  return (
    <section id="services" className="section bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Expertise" title={t.services} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map(([title, text, Icon]) => (
            <div className="service-card" key={title}>
              <Icon size={30} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ t }) {
  return (
    <section id="gallery" className="section bg-ink text-white">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Green Zone" title={t.gallery} />
        <div className="gallery-grid">
          {gallery.map((src, index) => <img key={src} src={src} alt={`Green Zone Mnihla galerie ${index + 1}`} loading="lazy" />)}
        </div>
      </div>
    </section>
  );
}

function Blog({ t }) {
  return (
    <section id="blog" className="section bg-limewash">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Magazine" title={t.blog} />
        <div className="grid gap-5 md:grid-cols-3">
          {blog.map(([title, text, read]) => (
            <article key={title} className="blog-card">
              <BookOpen className="text-leaf" />
              <span>{read}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contact">Lire plus <ChevronRight size={16} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Admin({ t, productsApi, siteApi, notify }) {
  const auth = useAdminAuth();
  const blank = { name: "", category: categories[0], price: "", image: "", description: "" };
  const [form, setForm] = useState(blank);
  const [siteForm, setSiteForm] = useState(siteApi.settings);
  const [editing, setEditing] = useState(null);
  const [adminQuery, setAdminQuery] = useState("");
  const [login, setLogin] = useState({ email: ADMIN_EMAIL, password: "" });
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "" });

  const importImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("Veuillez choisir une image valide");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: reader.result }));
      notify("Image importee depuis votre ordinateur");
    };
    reader.readAsDataURL(file);
  };

  const importHeroImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("Veuillez choisir une image valide");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSiteForm((current) => ({ ...current, heroImage: reader.result }));
      notify("Banniere importee");
    };
    reader.readAsDataURL(file);
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      await auth.signIn(login.email, login.password);
      setLogin({ ...login, password: "" });
      notify("Connexion admin reussie");
    } catch (error) {
      notify(error.message);
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    try {
      await auth.changePassword(passwordForm.current, passwordForm.next);
      setPasswordForm({ current: "", next: "" });
      notify("Mot de passe modifie");
    } catch (error) {
      notify(error.message);
    }
  };

  const saveSite = async (event) => {
    event.preventDefault();
    await siteApi.saveSettings(siteForm);
    notify("Site mis a jour");
  };

  const submit = async (event) => {
    event.preventDefault();
    const payload = { ...form, image: form.image || "/assets/ad-banner.svg" };
    if (editing) {
      await productsApi.updateProduct({ ...payload, id: editing });
      notify("Produit modifie avec succes");
    } else {
      await productsApi.addProduct(payload);
      notify("Produit ajoute avec succes");
    }
    setForm(blank);
    setEditing(null);
  };

  const startEdit = (product) => {
    setEditing(product.id);
    setForm(product);
  };

  const adminProducts = productsApi.products.filter((product) => product.name.toLowerCase().includes(adminQuery.toLowerCase()));

  if (auth.loading) {
    return (
      <section id="admin" className="section bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle eyebrow="Back office" title={t.admin} text="Chargement de la session admin..." />
        </div>
      </section>
    );
  }

  if (!auth.user) {
    return (
      <section id="admin" className="section bg-white">
        <div className="mx-auto max-w-xl">
          <SectionTitle eyebrow="Back office" title={t.adminLogin} text={`Email autorise: ${ADMIN_EMAIL}`} />
          <form onSubmit={signIn} className="admin-panel">
            <h3><ShieldCheck size={22} />{t.adminLogin}</h3>
            <input required type="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} placeholder="Email admin" />
            <input required type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} placeholder={t.password} />
            <button className="btn-primary" type="submit"><ShieldCheck size={18} />Connexion</button>
            {!auth.isCloudAuth && <p className="text-sm text-zinc-500">Mode local pour test. Pour une confidentialite reelle en ligne, activez Supabase Auth avec les variables d'environnement.</p>}
          </form>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="section bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Back office" title={t.admin} text={t.adminHint} />
        <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-ink p-4 text-white sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold">{ADMIN_EMAIL} {auth.isCloudAuth ? "- Supabase Auth actif" : "- mode local"}</span>
          <button className="btn-light" type="button" onClick={auth.signOut}>{t.logout}</button>
        </div>
        <form onSubmit={saveSite} className="admin-panel mb-6">
          <h3><Settings size={22} />Modifier le site en ligne</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <input required placeholder="Nom societe" value={siteForm.companyName} onChange={(e) => setSiteForm({ ...siteForm, companyName: e.target.value })} />
            <input required placeholder="Nom court" value={siteForm.shortName} onChange={(e) => setSiteForm({ ...siteForm, shortName: e.target.value })} />
            <input required placeholder="Localisation courte" value={siteForm.locationLabel} onChange={(e) => setSiteForm({ ...siteForm, locationLabel: e.target.value })} />
            <input required placeholder="Telephone" value={siteForm.phone} onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })} />
            <input required placeholder="Numero WhatsApp sans +" value={siteForm.whatsappNumber} onChange={(e) => setSiteForm({ ...siteForm, whatsappNumber: e.target.value.replace(/\D/g, "") })} />
            <input required type="email" placeholder="Email" value={siteForm.email} onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })} />
            <input required placeholder="Adresse" value={siteForm.address} onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })} />
            <input placeholder="Lien Facebook" value={siteForm.facebookUrl} onChange={(e) => setSiteForm({ ...siteForm, facebookUrl: e.target.value })} />
            <input placeholder="Lien Instagram" value={siteForm.instagramUrl} onChange={(e) => setSiteForm({ ...siteForm, instagramUrl: e.target.value })} />
            <input placeholder="URL image banniere" value={siteForm.heroImage} onChange={(e) => setSiteForm({ ...siteForm, heroImage: e.target.value })} />
          </div>
          <textarea required placeholder="Titre accueil" value={siteForm.heroTitle} onChange={(e) => setSiteForm({ ...siteForm, heroTitle: e.target.value })} />
          <textarea required placeholder="Sous-titre accueil" value={siteForm.heroSub} onChange={(e) => setSiteForm({ ...siteForm, heroSub: e.target.value })} />
          <textarea required placeholder="Texte accueil" value={siteForm.heroText} onChange={(e) => setSiteForm({ ...siteForm, heroText: e.target.value })} />
          <textarea required placeholder="Texte footer" value={siteForm.footerText} onChange={(e) => setSiteForm({ ...siteForm, footerText: e.target.value })} />
          <label className="image-upload">
            <span>Importer une banniere depuis votre ordinateur</span>
            <input type="file" accept="image/*" onChange={importHeroImage} />
          </label>
          {siteForm.heroImage && <img className="admin-preview" src={siteForm.heroImage} alt="Apercu banniere" />}
          <button className="btn-primary" type="submit"><ShieldCheck size={18} />Publier les modifications du site</button>
          {!supabase && <p className="text-sm text-zinc-500">Mode local: les modifications sont visibles sur cet ordinateur. Avec Supabase configure, elles seront visibles en ligne pour tous les visiteurs.</p>}
        </form>
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <form onSubmit={submit} className="admin-panel">
            <h3><PackagePlus size={22} />{editing ? t.edit : t.add}</h3>
            <input required placeholder="Nom produit" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <input required type="number" min="0" placeholder="Prix TND" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input placeholder="URL image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <label className="image-upload">
              <span>Importer une image depuis votre ordinateur</span>
              <input type="file" accept="image/*" onChange={importImage} />
            </label>
            {form.image && <img className="admin-preview" src={form.image} alt="Apercu du produit" />}
            <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="flex gap-2">
              <button className="btn-primary" type="submit"><ShieldCheck size={18} />{t.save}</button>
              {editing && <button className="btn-dark" type="button" onClick={() => { setEditing(null); setForm(blank); }}>{t.cancel}</button>}
            </div>
          </form>
          <div className="admin-panel">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3><Boxes size={22} />{t.categories}</h3>
              <div className="flex items-center gap-2 rounded-xl bg-zinc-100 px-3 py-2"><Search size={17} /><input value={adminQuery} onChange={(e) => setAdminQuery(e.target.value)} placeholder="Filtrer" /></div>
            </div>
            <div className="space-y-3">
              {adminProducts.map((product) => (
                <div className="admin-row" key={product.id}>
                  <img src={product.image} alt="" />
                  <div className="min-w-0 flex-1">
                    <strong>{product.name}</strong>
                    <span>{product.category} - {product.price} TND</span>
                  </div>
                  <button onClick={() => startEdit(product)} aria-label={t.edit}><Pencil size={17} /></button>
                  <button onClick={async () => { await productsApi.deleteProduct(product.id); notify("Produit supprime"); }} aria-label={t.delete}><Trash2 size={17} /></button>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-limewash p-4">
              <h4 className="font-black text-ink"><BadgeDollarSign className="mr-2 inline text-leaf" />{t.orders}</h4>
              <p className="mt-2 text-sm text-zinc-600">Les commandes arrivent via WhatsApp avec le nom du produit. Pour une boutique complete, branchez Supabase/Firebase et un web hook de commande.</p>
            </div>
            <form onSubmit={changePassword} className="mt-5 grid gap-3 rounded-2xl bg-zinc-50 p-4">
              <h4 className="font-black text-ink">{t.changePassword}</h4>
              <input required type="password" value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} placeholder={t.currentPassword} />
              <input required type="password" value={passwordForm.next} onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })} placeholder={t.newPassword} />
              <button className="btn-dark" type="submit">{t.changePassword}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ t, settings, notify }) {
  const submit = (event) => {
    event.preventDefault();
    notify("Message prepare dans votre application email");
    const data = new FormData(event.currentTarget);
    window.location.href = `mailto:${settings.email}?subject=Contact ${settings.companyName}&body=${encodeURIComponent(data.get("message"))}`;
  };

  return (
    <section id="contact" className="section bg-limewash">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Adresse" title={t.contact} />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="contact-card">
            <iframe title={`Carte ${settings.companyName}`} src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`} loading="lazy" />
          </div>
          <div className="contact-card p-6">
            <div className="space-y-4">
              <p><Phone className="inline text-leaf" /> {settings.phone}</p>
              <p><Mail className="inline text-leaf" /> {settings.email}</p>
              <p><MapPin className="inline text-leaf" /> {settings.address}</p>
            </div>
            <form onSubmit={submit} className="mt-6 grid gap-3">
              <input required name="name" placeholder={t.formName} />
              <input required name="email" type="email" placeholder="Email" />
              <textarea required name="message" placeholder={t.formMessage} />
              <button className="btn-primary" type="submit"><Send size={18} />{t.send}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t, settings }) {
  return (
    <footer className="bg-ink px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.3fr_.7fr_.7fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/assets/logo.jpg" alt="" className="h-14 w-14 rounded-full object-cover" />
            <strong className="text-xl">{settings.companyName}</strong>
          </div>
          <p className="mt-4 max-w-md text-white/65">{settings.footerText}</p>
        </div>
        <div>
          <h4 className="font-black">Contact</h4>
          <p className="mt-3 text-white/65">{settings.phone}</p>
          <p className="text-white/65">{settings.email}</p>
          <p className="text-white/65">{settings.address}</p>
        </div>
        <div>
          <h4 className="font-black">Social</h4>
          <div className="mt-3 flex gap-2">
            <a className="social" href={settings.facebookUrl} aria-label="Facebook"><Facebook /></a>
            <a className="social" href={settings.instagramUrl} aria-label="Instagram"><Instagram /></a>
            <a className="social" href={waLink(settings)} aria-label="WhatsApp"><MessageCircle /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
  useEffect(() => {
    setSiteForm(siteApi.settings);
  }, [siteApi.settings]);
