# Green Zone Mnihla - Web App

Site e-commerce moderne pour le magasin **Green Zone Mnihla**:
- Adresse: Mnihla Ariana, Route de Bizerte, en face de Citroen
- Telephone / WhatsApp: +216 22 425 120
- Email: greenzonemnihla@gmail.com
- Specialite: materiel agricole, jardinage et animalerie

## Fonctionnalites

- Vitrine moderne/futuriste avec style magique (animations et gradients premium)
- Boutique produits avec recherche et filtres par categorie
- Panier d'achat avec quantites, total et validation WhatsApp / email
- Espace administrateur:
  - connexion admin (Supabase Auth)
  - dashboard
  - gestion CRUD pour produits, categories, commandes, blog, galerie, settings, notifications, utilisateurs
- Mode demo sans Supabase (produits de test) pour visualiser le site localement

## Lancer en local

1. Installer les dependances:
   - `npm install`
2. Creer un fichier `.env` a partir de `.env.example`:
   - `VITE_SUPABASE_URL=...`
   - `VITE_SUPABASE_ANON_KEY=...`
3. Lancer le serveur:
   - `npm run dev`
4. Ouvrir l'URL affichee par Vite.

Si `.env` n'est pas configure, la boutique fonctionne quand meme en mode demo.

## Configuration Supabase

1. Creer un projet Supabase
2. Aller dans SQL Editor et executer `supabase/schema.sql`
3. (Optionnel recommande) Executer `supabase/seed.sql` pour charger des categories/produits
4. Creer un utilisateur admin via Auth (email + mot de passe)
5. Ajouter les variables Supabase dans `.env`

## Publication sur internet (GitHub + Vercel)

1. Push du projet sur GitHub
2. Sur Vercel:
   - Importer le repo GitHub
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Ajouter les variables d'environnement Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

## Notes

- Le routeur utilise `HashRouter` pour reduire les problemes de refresh selon l'hebergement.
- Le schema SQL active RLS et fournit des policies de base.

## Checklist test final

1. `npm install`
2. `npm run dev`
3. Verifier:
   - page accueil et design
   - ajout produits au panier
   - validation commande depuis panier (bouton "Valider la commande")
   - bouton WhatsApp
   - connexion admin via `/admin/login`
   - CRUD admin sur produits/categories
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
