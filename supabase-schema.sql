create table if not exists site_settings (
  id bigint primary key,
  content jsonb not null
);

create table if not exists products (
  id bigint primary key,
  name text not null,
  category text not null,
  price numeric not null,
  image text not null,
  description text not null
);

alter table site_settings enable row level security;
alter table products enable row level security;

drop policy if exists "Public can read site settings" on site_settings;
create policy "Public can read site settings"
on site_settings for select
using (true);

drop policy if exists "Admin can manage site settings" on site_settings;
create policy "Admin can manage site settings"
on site_settings for all
using ((auth.jwt() ->> 'email') = 'greenzonemnihla@gmail.com')
with check ((auth.jwt() ->> 'email') = 'greenzonemnihla@gmail.com');

drop policy if exists "Public can read products" on products;
create policy "Public can read products"
on products for select
using (true);

drop policy if exists "Admin can manage products" on products;
create policy "Admin can manage products"
on products for all
using ((auth.jwt() ->> 'email') = 'greenzonemnihla@gmail.com')
with check ((auth.jwt() ->> 'email') = 'greenzonemnihla@gmail.com');
