create table if not exists categories (
  id bigint generated always as identity primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id bigint generated always as identity primary key,
  category_id bigint references categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  stock integer not null default 0,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id bigint generated always as identity primary key,
  customer_name text,
  customer_phone text,
  customer_email text,
  status text not null default 'new',
  total numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references orders(id) on delete cascade,
  product_id bigint references products(id) on delete set null,
  product_name text not null,
  unit_price numeric(10,2) not null default 0,
  quantity integer not null default 1
);

create table if not exists blog_posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists gallery (
  id bigint generated always as identity primary key,
  title text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  id bigint generated always as identity primary key,
  key text not null unique,
  value text not null,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id bigint generated always as identity primary key,
  title text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table blog_posts enable row level security;
alter table gallery enable row level security;
alter table settings enable row level security;
alter table notifications enable row level security;
alter table admin_users enable row level security;

drop policy if exists "Public can read categories" on categories;
create policy "Public can read categories" on categories for select using (true);

drop policy if exists "Public can read products" on products;
create policy "Public can read products" on products for select using (true);

drop policy if exists "Public can read blog posts" on blog_posts;
create policy "Public can read blog posts" on blog_posts for select using (true);

drop policy if exists "Public can read gallery" on gallery;
create policy "Public can read gallery" on gallery for select using (true);

-- Admin writes should be done with authenticated users only.
drop policy if exists "Authenticated full access categories" on categories;
create policy "Authenticated full access categories"
on categories
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access products" on products;
create policy "Authenticated full access products"
on products
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access orders" on orders;
create policy "Authenticated full access orders"
on orders
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can create orders" on orders;
create policy "Public can create orders"
on orders
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated full access order_items" on order_items;
create policy "Authenticated full access order_items"
on order_items
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can create order items" on order_items;
create policy "Public can create order items"
on order_items
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated full access blog_posts" on blog_posts;
create policy "Authenticated full access blog_posts"
on blog_posts
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access gallery" on gallery;
create policy "Authenticated full access gallery"
on gallery
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access settings" on settings;
create policy "Authenticated full access settings"
on settings
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access notifications" on notifications;
create policy "Authenticated full access notifications"
on notifications
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated full access admin_users" on admin_users;
create policy "Authenticated full access admin_users"
on admin_users
for all
to authenticated
using (true)
with check (true);
-- Green Zone Mnihla - Supabase schema
create extension if not exists "uuid-ossp";

create table if not exists public.admin_users (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz default now()
);

create table if not exists public.categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id bigint generated always as identity primary key,
  category_id bigint references public.categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10, 3) not null default 0,
  stock integer not null default 0,
  images text[] default '{}',
  promotion_percent integer default 0,
  is_active boolean default true,
  is_popular boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  full_name text,
  phone text,
  email text,
  address text,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'pending',
  total numeric(10, 3) not null default 0,
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.blog_posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  image_url text,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.gallery (
  id bigint generated always as identity primary key,
  title text,
  image_url text not null,
  position integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.settings (
  id bigint generated always as identity primary key,
  key text not null unique,
  value text not null,
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id bigint generated always as identity primary key,
  title text not null,
  message text not null,
  level text default 'info',
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.blog_posts enable row level security;
alter table public.gallery enable row level security;
alter table public.settings enable row level security;
alter table public.notifications enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.admin_users a
    where a.user_id = auth.uid()
  );
$$;

create policy "public read categories" on public.categories for select using (true);
create policy "public read products" on public.products for select using (is_active = true);
create policy "public read blog" on public.blog_posts for select using (published = true);
create policy "public read gallery" on public.gallery for select using (true);
create policy "public read settings" on public.settings for select using (true);

create policy "admin full categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "admin full products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "admin full customers" on public.customers for all using (public.is_admin()) with check (public.is_admin());
create policy "admin full orders" on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "admin full blog" on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());
create policy "admin full gallery" on public.gallery for all using (public.is_admin()) with check (public.is_admin());
create policy "admin full settings" on public.settings for all using (public.is_admin()) with check (public.is_admin());
create policy "admin full notifications" on public.notifications for all using (public.is_admin()) with check (public.is_admin());
create policy "admin users self read" on public.admin_users for select using (public.is_admin());
create policy "admin users admin write" on public.admin_users for all using (public.is_admin()) with check (public.is_admin());

insert into public.categories(name) values
  ('Jardinage'),
  ('Agricole'),
  ('Animalerie'),
  ('Irrigation'),
  ('Pots'),
  ('Engrais'),
  ('Plantes')
on conflict (name) do nothing;
