# Green Zone Mnihla

Application e-commerce React + Tailwind CSS pour Green Zone Mnihla.

## Lancer en local

```bash
npm install
npm run dev
```

## Acces admin

Email admin: `greenzonemnihla@gmail.com`

Mot de passe initial demande: `123456789`

Lien admin prive en local: `http://127.0.0.1:5175/#green-zone-admin`

La section admin n'apparait pas dans le menu public et ne s'affiche pas aux visiteurs du site.

En mode local, le mot de passe peut etre change depuis le dashboard, mais cela reste stocke dans le navigateur. Pour une publication confidentielle, activez Supabase Auth:

1. Creez un projet gratuit sur Supabase.
2. Dans Authentication, creez l'utilisateur `greenzonemnihla@gmail.com` avec le mot de passe `123456789`.
3. Copiez `.env.example` vers `.env`.
4. Remplissez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
5. Relancez `npm run dev`.

Une fois Supabase active, le changement de mot de passe dans le dashboard met a jour le compte Supabase.

## Modification complete du site

Le dashboard admin permet maintenant de modifier le site apres publication:

- Textes de la page d'accueil.
- Telephone, WhatsApp, email et adresse.
- Liens Facebook et Instagram.
- Image de banniere.
- Produits, prix, descriptions et images.
- Mot de passe admin.

Sans Supabase, ces changements restent en mode local dans le navigateur. Avec Supabase configure, les changements sont sauvegardes dans le cloud et deviennent visibles en ligne pour tous les visiteurs.

Tables Supabase recommandees:

Le fichier `supabase-schema.sql` contient les tables et les politiques de securite. Les visiteurs peuvent lire le site, mais seul `greenzonemnihla@gmail.com` peut modifier les produits et les parametres.

## Images produits

Dans le dashboard admin, vous pouvez ajouter une image produit de deux facons:

- Coller une URL d'image.
- Importer une image directement depuis votre ordinateur.

En mode local, l'image importee est stockee dans le navigateur avec le produit. Pour une boutique publiee avec beaucoup de produits, utilisez Supabase Storage ou Firebase Storage afin de stocker les images dans le cloud.

## Publier gratuitement

Option simple: Vercel ou Netlify.

Build command: `npm run build`

Publish directory: `dist`

Variables d'environnement a ajouter sur la plateforme:

- `VITE_ADMIN_EMAIL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Assets generes

- Icone application: `public/assets/app-icon.svg`
- Banniere publicitaire: `public/assets/ad-banner.svg`
- Logo fourni: `public/assets/logo.jpg`
