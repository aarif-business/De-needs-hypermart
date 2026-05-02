-- ============================================
-- De' Needs Hyper Bazzar - Supabase Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  address text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Admins can view all profiles" on profiles
  for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── CATEGORIES ────────────────────────────────
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  icon text,
  image_url text,
  description text,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table categories enable row level security;
create policy "Categories are public" on categories for select using (true);
create policy "Admins manage categories" on categories for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- ── PRODUCTS ──────────────────────────────────
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null check (price >= 0),
  compare_price numeric(10,2),
  image_url text,
  images text[] default '{}',
  category_id uuid references categories(id) on delete set null,
  stock_quantity int not null default 0 check (stock_quantity >= 0),
  unit text default 'piece',
  is_featured boolean default false,
  is_fresh_arrival boolean default false,
  is_active boolean default true,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table products enable row level security;
create policy "Active products are public" on products
  for select using (is_active = true);
create policy "Admins manage products" on products for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger products_updated_at
  before update on products
  for each row execute procedure update_updated_at();

-- ── ORDERS ────────────────────────────────────
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'processing', 'delivered', 'cancelled')),
  total_amount numeric(10,2) not null,
  delivery_address text,
  phone text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  product_image text,
  quantity int not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) generated always as (quantity * unit_price) stored
);

alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Users view own orders" on orders
  for select using (auth.uid() = user_id);
create policy "Users create orders" on orders
  for insert with check (auth.uid() = user_id);
create policy "Admins manage orders" on orders for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Users view own order items" on order_items
  for select using (
    exists (select 1 from orders where id = order_id and user_id = auth.uid())
  );
create policy "Admins manage order items" on order_items for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create trigger orders_updated_at
  before update on orders
  for each row execute procedure update_updated_at();

-- ── SEED DATA ─────────────────────────────────
insert into categories (name, slug, icon, sort_order) values
  ('Groceries', 'groceries', '🛒', 1),
  ('Fruits & Vegetables', 'fruits-vegetables', '🥦', 2),
  ('Meat & Fish', 'meat-fish', '🐟', 3),
  ('Dairy & Eggs', 'dairy-eggs', '🥛', 4),
  ('Snacks & Beverages', 'snacks-beverages', '🧃', 5),
  ('Home & Kitchen', 'home-kitchen', '🏠', 6),
  ('Personal Care', 'personal-care', '🧴', 7),
  ('Home Decor', 'home-decor', '🪴', 8);

-- Indexes for performance
create index products_category_id_idx on products(category_id);
create index products_is_featured_idx on products(is_featured) where is_featured = true;
create index products_is_fresh_arrival_idx on products(is_fresh_arrival) where is_fresh_arrival = true;
create index products_slug_idx on products(slug);
create index orders_user_id_idx on orders(user_id);
