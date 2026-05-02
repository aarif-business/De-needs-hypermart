-- ============================================
-- Fix: Infinite recursion in profiles RLS
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Drop all existing policies on profiles
drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Admins can view all profiles" on profiles;

-- 2. Drop the recursive admin check policies on other tables
drop policy if exists "Admins manage products" on products;
drop policy if exists "Admins manage categories" on categories;
drop policy if exists "Admins manage orders" on orders;
drop policy if exists "Admins manage order items" on order_items;

-- 3. Create a SECURITY DEFINER function that checks admin role
--    This bypasses RLS when checking the profiles table, breaking the recursion
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- 4. Re-create profiles policies using the function
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Admins can view all profiles" on profiles
  for select using (is_admin());

-- 5. Re-create admin policies on other tables using the function
create policy "Admins manage products" on products
  for all using (is_admin());

create policy "Admins manage categories" on categories
  for all using (is_admin());

create policy "Admins manage orders" on orders
  for all using (is_admin());

create policy "Admins manage order items" on order_items
  for all using (is_admin());
