-- VELORA E-Commerce Database Schema
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Categories
create table public.categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  image_url text,
  created_at timestamptz default now()
);

-- Products
create table public.products (
  id serial primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  category_id integer references public.categories(id),
  image_url text,
  gallery text[] default '{}',
  badge text,
  rating numeric(2,1) default 0,
  reviews_count integer default 0,
  featured boolean default false,
  in_stock boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  order_number text unique not null,
  status text default 'confirmed' check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  total numeric(10,2) not null,
  shipping_name text,
  shipping_email text,
  shipping_phone text,
  shipping_address text,
  shipping_city text,
  shipping_pincode text,
  payment_id text,
  payment_method text default 'razorpay',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order Items
create table public.order_items (
  id serial primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id integer references public.products(id),
  product_name text not null,
  product_image text,
  price numeric(10,2) not null,
  quantity integer not null default 1,
  created_at timestamptz default now()
);

-- Wishlist
create table public.wishlists (
  id serial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  product_id integer references public.products(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

-- Newsletter
create table public.newsletter_subscribers (
  id serial primary key,
  email text unique not null,
  subscribed_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlists enable row level security;

create policy "Users view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Anyone view categories" on public.categories for select to anon, authenticated using (true);
create policy "Anyone view products" on public.products for select to anon, authenticated using (true);
create policy "Users view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users create orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users view own order items" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));
create policy "Users view own wishlist" on public.wishlists for select using (auth.uid() = user_id);
create policy "Users add to wishlist" on public.wishlists for insert with check (auth.uid() = user_id);
create policy "Users remove from wishlist" on public.wishlists for delete using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed categories
insert into public.categories (name, slug, image_url) values
  ('Electronics', 'electronics', 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800'),
  ('Fashion', 'fashion', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800'),
  ('Accessories', 'accessories', 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800'),
  ('Home', 'home', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800');
