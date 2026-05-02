-- ============================================
-- RLS Fix — Run this in Supabase SQL Editor
-- Grants public (anon) read access to products & categories
-- ============================================

-- Drop existing select policies that may be blocking anon
drop policy if exists "Active products are public" on products;
drop policy if exists "Categories are public" on categories;

-- Re-create with explicit role grants
create policy "Anyone can view active products"
  on products for select
  to anon, authenticated
  using (is_active = true);

create policy "Anyone can view categories"
  on categories for select
  to anon, authenticated
  using (true);

-- Also make sure RLS is enabled (should already be, but just in case)
alter table products enable row level security;
alter table categories enable row level security;
