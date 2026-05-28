# Green Zone Mnihla - E-commerce + Admin Platform

Plateforme web moderne pour **Green Zone Mnihla** (agricole, jardinage, animalerie, pots, terreau, engrais, irrigation), construite avec **React + Vite + Tailwind + Supabase** et prete pour **Vercel**.

## Stack

- React.js + Vite
- Tailwind CSS
- Supabase (DB, Auth, Storage)
- Vercel (deploy)
- GitHub (versionning)

## Fonctionnalites incluses

### Espace client

- Boutique responsive moderne
- Recherche produits
- Filtre par categories
- Panier + commande rapide WhatsApp
- Base multi-langues (FR / EN / AR)

### Espace administrateur

- Connexion admin via Supabase Auth
- Session persistante + routes protegees
- Dashboard statistiques (produits, categories, commandes, notifications)
- Gestion CRUD:
  - Produits
  - Categories
  - Commandes
  - Blog
  - Galerie
  - Parametres site
  - Utilisateurs admin
  - Notifications

## Installation locale

1. Cloner le repo
2. Installer les dependances:

```bash
npm install
```

3. Copier `.env.example` vers `.env` et renseigner vos cles Supabase:

```bash
cp .env.example .env
```

4. Appliquer le schema SQL dans Supabase SQL Editor:
   - fichier: `supabase/schema.sql`

5. Lancer en dev:

```bash
npm run dev
```

## Deploiement Vercel

1. Push le projet sur GitHub
2. Importer le repo dans Vercel
3. Configurer variables d'environnement:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Build command: `npm run build`
5. Output directory: `dist`

## Supabase Storage recommande

Creer des buckets:

- `products`
- `blog`
- `gallery`
- `branding`

Configurer policies lecture publique et ecriture admin.

## Infos societe

- Nom: Green Zone Mnihla
- Telephone/WhatsApp: +216 22 425 120
- Email: greenzonemnihla@gmail.com
- Adresse: Mnihla, Ariana, Tunisie
