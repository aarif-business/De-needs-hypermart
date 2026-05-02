-- ============================================
-- De' Needs Hyper Bazzar — Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- Clear existing data (correct syntax for UUID tables)
delete from order_items;
delete from orders;
delete from products;
delete from categories;

-- ── CATEGORIES ────────────────────────────────
insert into categories (name, slug, icon, sort_order) values
  ('Groceries',           'groceries',          '🛒', 1),
  ('Fruits & Vegetables', 'fruits-vegetables',  '🥦', 2),
  ('Meat & Fish',         'meat-fish',          '🐟', 3),
  ('Dairy & Eggs',        'dairy-eggs',         '🥛', 4),
  ('Snacks & Beverages',  'snacks-beverages',   '🧃', 5),
  ('Home & Kitchen',      'home-kitchen',       '🏠', 6),
  ('Personal Care',       'personal-care',      '🧴', 7),
  ('Home Decor',          'home-decor',         '🪴', 8);

-- ── GROCERIES ─────────────────────────────────
insert into products (name, slug, description, price, compare_price, image_url, category_id, stock_quantity, unit, is_featured, is_fresh_arrival, is_active, tags)
select
  p.name, p.slug, p.description, p.price, p.compare_price, p.image_url,
  c.id, p.stock_quantity, p.unit, p.is_featured, p.is_fresh_arrival, true, p.tags
from (values
  ('Aashirvaad Atta 5kg', 'aashirvaad-atta-5kg',
   'Premium whole wheat flour, stone-ground for soft rotis. Rich in fibre and nutrients.',
   245, 280, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
   80, 'pack', true, false, array['atta','flour','wheat']),

  ('Fortune Sunflower Oil 1L', 'fortune-sunflower-oil-1l',
   'Light and healthy sunflower oil, ideal for everyday cooking. Zero cholesterol.',
   135, 155, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
   60, 'litre', false, false, array['oil','cooking']),

  ('Tata Salt 1kg', 'tata-salt-1kg',
   'Iodised vacuum evaporated salt. India''s most trusted salt brand.',
   22, null, 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=600&q=80',
   150, 'kg', false, false, array['salt','essentials']),

  ('India Gate Basmati Rice 5kg', 'india-gate-basmati-5kg',
   'Long grain aged basmati rice with a rich aroma. Perfect for biryani and pulao.',
   620, 699, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
   45, 'pack', true, false, array['rice','basmati','biryani']),

  ('MDH Chana Masala 100g', 'mdh-chana-masala-100g',
   'Authentic blend of spices for perfect chana masala. No artificial colours.',
   55, 65, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
   90, 'pack', false, true, array['spices','masala']),

  ('Toor Dal 1kg', 'toor-dal-1kg',
   'Premium quality toor dal, cleaned and polished. Rich in protein.',
   145, 160, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80',
   70, 'kg', false, false, array['dal','pulses','protein'])
) as p(name, slug, description, price, compare_price, image_url, stock_quantity, unit, is_featured, is_fresh_arrival, tags)
cross join (select id from categories where slug = 'groceries') c;

-- ── FRUITS & VEGETABLES ───────────────────────
insert into products (name, slug, description, price, compare_price, image_url, category_id, stock_quantity, unit, is_featured, is_fresh_arrival, is_active, tags)
select
  p.name, p.slug, p.description, p.price, p.compare_price, p.image_url,
  c.id, p.stock_quantity, p.unit, p.is_featured, p.is_fresh_arrival, true, p.tags
from (values
  ('Fresh Tomatoes', 'fresh-tomatoes',
   'Farm-fresh red tomatoes, sourced daily from local farms. Juicy and flavourful.',
   35, null, 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80',
   100, 'kg', false, true, array['vegetables','fresh','tomato']),

  ('Organic Spinach 250g', 'organic-spinach-250g',
   'Tender organic spinach leaves, washed and ready to cook. Rich in iron.',
   45, 55, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80',
   40, 'pack', true, true, array['spinach','organic','greens']),

  ('Alphonso Mangoes 1kg', 'alphonso-mangoes-1kg',
   'The king of mangoes! Sweet, aromatic Alphonso mangoes from Ratnagiri.',
   280, 320, 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
   30, 'kg', true, true, array['mango','fruit','seasonal']),

  ('Red Onions 1kg', 'red-onions-1kg',
   'Fresh red onions, essential for every Indian kitchen. Strong flavour.',
   40, null, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80',
   120, 'kg', false, false, array['onion','vegetables']),

  ('Bananas (Dozen)', 'bananas-dozen',
   'Fresh ripe bananas, rich in potassium and natural energy. Great for kids.',
   55, null, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80',
   60, 'dozen', false, false, array['banana','fruit']),

  ('Baby Potatoes 500g', 'baby-potatoes-500g',
   'Tender baby potatoes, perfect for roasting or curries. Freshly harvested.',
   49, 60, 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=600&q=80',
   55, 'pack', false, true, array['potato','vegetables'])
) as p(name, slug, description, price, compare_price, image_url, stock_quantity, unit, is_featured, is_fresh_arrival, tags)
cross join (select id from categories where slug = 'fruits-vegetables') c;

-- ── MEAT & FISH ───────────────────────────────
insert into products (name, slug, description, price, compare_price, image_url, category_id, stock_quantity, unit, is_featured, is_fresh_arrival, is_active, tags)
select
  p.name, p.slug, p.description, p.price, p.compare_price, p.image_url,
  c.id, p.stock_quantity, p.unit, p.is_featured, p.is_fresh_arrival, true, p.tags
from (values
  ('Fresh Chicken Curry Cut 1kg', 'fresh-chicken-curry-cut-1kg',
   'Farm-fresh chicken, cleaned and cut for curry. Antibiotic-free and hygienically packed.',
   220, 260, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80',
   35, 'kg', true, false, array['chicken','meat','fresh']),

  ('Rohu Fish 1kg', 'rohu-fish-1kg',
   'Fresh Rohu fish, cleaned and cut. A Bengali favourite, rich in omega-3.',
   199, 230, 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80',
   20, 'kg', false, true, array['fish','seafood','rohu']),

  ('Prawns Medium 500g', 'prawns-medium-500g',
   'Fresh medium-sized prawns, deveined and cleaned. Perfect for masala or fry.',
   349, 399, 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80',
   15, 'pack', true, true, array['prawns','seafood','fresh']),

  ('Mutton Curry Cut 500g', 'mutton-curry-cut-500g',
   'Tender goat mutton, freshly cut. Ideal for biryani, curry and kebabs.',
   399, 450, 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80',
   18, 'pack', false, false, array['mutton','meat','goat'])
) as p(name, slug, description, price, compare_price, image_url, stock_quantity, unit, is_featured, is_fresh_arrival, tags)
cross join (select id from categories where slug = 'meat-fish') c;

-- ── DAIRY & EGGS ──────────────────────────────
insert into products (name, slug, description, price, compare_price, image_url, category_id, stock_quantity, unit, is_featured, is_fresh_arrival, is_active, tags)
select
  p.name, p.slug, p.description, p.price, p.compare_price, p.image_url,
  c.id, p.stock_quantity, p.unit, p.is_featured, p.is_fresh_arrival, true, p.tags
from (values
  ('Amul Gold Full Cream Milk 1L', 'amul-gold-milk-1l',
   'Rich and creamy full cream milk with 6% fat. Fresh and pasteurised daily.',
   68, null, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
   80, 'litre', true, false, array['milk','dairy','amul']),

  ('Farm Fresh Eggs (12 pcs)', 'farm-fresh-eggs-12',
   'Free-range farm eggs, rich in protein. Brown shell, golden yolk.',
   89, 99, 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&q=80',
   60, 'dozen', true, false, array['eggs','protein','dairy']),

  ('Amul Butter 500g', 'amul-butter-500g',
   'Creamy, salted Amul butter. The taste of India since 1946.',
   245, 265, 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80',
   40, 'pack', false, false, array['butter','dairy','amul']),

  ('Britannia Paneer 200g', 'britannia-paneer-200g',
   'Soft and fresh cottage cheese. Perfect for paneer butter masala, tikka and more.',
   85, 95, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
   35, 'pack', false, true, array['paneer','dairy','cheese'])
) as p(name, slug, description, price, compare_price, image_url, stock_quantity, unit, is_featured, is_fresh_arrival, tags)
cross join (select id from categories where slug = 'dairy-eggs') c;

-- ── SNACKS & BEVERAGES ────────────────────────
insert into products (name, slug, description, price, compare_price, image_url, category_id, stock_quantity, unit, is_featured, is_fresh_arrival, is_active, tags)
select
  p.name, p.slug, p.description, p.price, p.compare_price, p.image_url,
  c.id, p.stock_quantity, p.unit, p.is_featured, p.is_fresh_arrival, true, p.tags
from (values
  ('Lays Classic Salted 90g', 'lays-classic-salted-90g',
   'Crispy, light potato chips with the perfect amount of salt. A classic snack.',
   30, null, 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80',
   100, 'pack', false, false, array['chips','snacks','lays']),

  ('Tropicana Orange Juice 1L', 'tropicana-orange-1l',
   '100% pure orange juice with no added sugar. Packed with Vitamin C.',
   120, 140, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80',
   50, 'litre', true, false, array['juice','beverage','orange']),

  ('Bru Instant Coffee 200g', 'bru-instant-coffee-200g',
   'Rich and aromatic instant coffee. South India''s favourite morning brew.',
   245, 275, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
   45, 'pack', false, true, array['coffee','beverage','bru']),

  ('Haldirams Mixture 400g', 'haldirams-mixture-400g',
   'Crunchy and spicy namkeen mixture. A perfect tea-time snack.',
   99, 115, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
   70, 'pack', false, false, array['namkeen','snacks','haldirams'])
) as p(name, slug, description, price, compare_price, image_url, stock_quantity, unit, is_featured, is_fresh_arrival, tags)
cross join (select id from categories where slug = 'snacks-beverages') c;

-- ── HOME & KITCHEN ────────────────────────────
insert into products (name, slug, description, price, compare_price, image_url, category_id, stock_quantity, unit, is_featured, is_fresh_arrival, is_active, tags)
select
  p.name, p.slug, p.description, p.price, p.compare_price, p.image_url,
  c.id, p.stock_quantity, p.unit, p.is_featured, p.is_fresh_arrival, true, p.tags
from (values
  ('Prestige Non-Stick Tawa 28cm', 'prestige-nonstick-tawa-28cm',
   'Hard anodised non-stick tawa with cool-touch handle. Induction compatible.',
   699, 899, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
   20, 'piece', true, false, array['cookware','tawa','prestige']),

  ('Borosil Glass Casserole 1L', 'borosil-glass-casserole-1l',
   'Microwave-safe borosilicate glass casserole with lid. Oven and dishwasher safe.',
   549, 699, 'https://images.unsplash.com/photo-1584990347449-a2d4c2c044c9?w=600&q=80',
   15, 'piece', false, true, array['glassware','borosil','kitchen']),

  ('Steel Dinner Set 18pcs', 'steel-dinner-set-18pcs',
   'Premium stainless steel dinner set. Includes plates, bowls and glasses.',
   1299, 1599, 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=600&q=80',
   10, 'set', true, false, array['dinnerware','steel','kitchen'])
) as p(name, slug, description, price, compare_price, image_url, stock_quantity, unit, is_featured, is_fresh_arrival, tags)
cross join (select id from categories where slug = 'home-kitchen') c;

-- ── PERSONAL CARE ─────────────────────────────
insert into products (name, slug, description, price, compare_price, image_url, category_id, stock_quantity, unit, is_featured, is_fresh_arrival, is_active, tags)
select
  p.name, p.slug, p.description, p.price, p.compare_price, p.image_url,
  c.id, p.stock_quantity, p.unit, p.is_featured, p.is_fresh_arrival, true, p.tags
from (values
  ('Dove Body Lotion 250ml', 'dove-body-lotion-250ml',
   'Nourishing body lotion with 1/4 moisturising cream. Leaves skin soft all day.',
   199, 230, 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
   55, 'ml', false, false, array['lotion','dove','skincare']),

  ('Colgate MaxFresh 150g', 'colgate-maxfresh-150g',
   'Cooling crystals toothpaste for 12-hour fresh breath. Whitening formula.',
   89, 99, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
   80, 'pack', false, false, array['toothpaste','colgate','oral care']),

  ('Head and Shoulders Shampoo 340ml', 'head-shoulders-shampoo-340ml',
   'Anti-dandruff shampoo with zinc pyrithione. Clinically proven formula.',
   299, 349, 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600&q=80',
   40, 'ml', false, true, array['shampoo','haircare','dandruff'])
) as p(name, slug, description, price, compare_price, image_url, stock_quantity, unit, is_featured, is_fresh_arrival, tags)
cross join (select id from categories where slug = 'personal-care') c;

-- ── HOME DECOR ────────────────────────────────
insert into products (name, slug, description, price, compare_price, image_url, category_id, stock_quantity, unit, is_featured, is_fresh_arrival, is_active, tags)
select
  p.name, p.slug, p.description, p.price, p.compare_price, p.image_url,
  c.id, p.stock_quantity, p.unit, p.is_featured, p.is_fresh_arrival, true, p.tags
from (values
  ('Ceramic Planter Set 3pcs', 'ceramic-planter-set-3pcs',
   'Elegant white ceramic planters with drainage holes. Perfect for succulents and herbs.',
   649, 799, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
   25, 'set', true, true, array['planter','ceramic','decor']),

  ('Scented Soy Candle Set', 'scented-soy-candle-set',
   'Hand-poured soy wax candles in lavender, vanilla and sandalwood. 30hr burn time.',
   549, 699, 'https://images.unsplash.com/photo-1602607144535-11be3fe59c5e?w=600&q=80',
   30, 'set', true, false, array['candle','scented','decor']),

  ('Woven Wall Hanging', 'woven-wall-hanging',
   'Handcrafted boho macrame wall hanging. Adds warmth and texture to any room.',
   899, 1099, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
   12, 'piece', false, true, array['wall art','macrame','handmade']),

  ('Bamboo Photo Frame Set 3pcs', 'bamboo-photo-frame-set',
   'Eco-friendly bamboo photo frames in 3 sizes. Natural finish, modern design.',
   749, 899, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
   18, 'set', false, false, array['photo frame','bamboo','eco']),

  ('Decorative Cushion Cover Set 2pcs', 'decorative-cushion-cover-set',
   'Premium cotton cushion covers with geometric print. 16x16 inch, zipper closure.',
   449, 549, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
   22, 'set', true, false, array['cushion','home decor','cotton'])
) as p(name, slug, description, price, compare_price, image_url, stock_quantity, unit, is_featured, is_fresh_arrival, tags)
cross join (select id from categories where slug = 'home-decor') c;

-- ── DUMMY ORDERS ──────────────────────────────
-- Bypasses RLS using direct insert (run as service role in SQL editor)
insert into orders (status, total_amount, phone, notes, created_at) values
  ('delivered',  1247.00, '+91 98765 11111', 'Please pack carefully',  now() - interval '5 days'),
  ('delivered',   876.50, '+91 98765 22222', null,                      now() - interval '4 days'),
  ('processing',  543.00, '+91 98765 33333', 'Call before billing',     now() - interval '2 days'),
  ('confirmed',   329.00, '+91 98765 44444', null,                      now() - interval '1 day'),
  ('pending',     998.00, '+91 98765 55555', 'Urgent order',            now() - interval '3 hours'),
  ('delivered',  1850.00, '+91 98765 66666', null,                      now() - interval '6 days'),
  ('cancelled',   220.00, '+91 98765 77777', 'Changed mind',            now() - interval '3 days'),
  ('confirmed',   675.00, '+91 98765 88888', null,                      now() - interval '12 hours');
