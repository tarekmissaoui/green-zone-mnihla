insert into categories (name)
values
  ('Agricole'),
  ('Jardinage'),
  ('Animalerie')
on conflict do nothing;

insert into products (name, description, price, stock, category_id, is_active)
values
  (
    'Motobineuse Pro 6CV',
    'Preparation rapide du sol pour cultures maraicheres et espaces verts.',
    1890,
    5,
    (select id from categories where name = 'Agricole' limit 1),
    true
  ),
  (
    'Kit Irrigation Goutte-a-goutte 100m',
    'Economise l''eau et optimise l''irrigation de vos plantations.',
    320,
    18,
    (select id from categories where name = 'Agricole' limit 1),
    true
  ),
  (
    'Pack Jardin Magique',
    'Set premium: secateur, gants renforces, arrosoir et semences.',
    145,
    24,
    (select id from categories where name = 'Jardinage' limit 1),
    true
  ),
  (
    'Terreau Bio Fertile 50L',
    'Substrat riche pour potager, plantes fleuries et vergers.',
    29,
    90,
    (select id from categories where name = 'Jardinage' limit 1),
    true
  ),
  (
    'Croquettes Premium Chien 20kg',
    'Nutrition complete pour chiens adultes actifs.',
    179,
    30,
    (select id from categories where name = 'Animalerie' limit 1),
    true
  ),
  (
    'Voliere Nature XL',
    'Espace spacieux et securise pour oiseaux d''ornement.',
    460,
    6,
    (select id from categories where name = 'Animalerie' limit 1),
    true
  )
on conflict do nothing;
