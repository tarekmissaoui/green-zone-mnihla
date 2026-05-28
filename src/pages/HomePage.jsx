import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <section className="container-x py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl bg-gradient-to-br from-brand-green to-brand-accent p-8 text-white shadow-premium md:p-16"
      >
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">Green Zone Mnihla</h1>
        <p className="max-w-2xl text-base md:text-lg">{t.welcome}</p>
      </motion.div>
    </section>
  );
}
