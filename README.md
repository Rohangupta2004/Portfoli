# LUXE — Premium E-Commerce Store

A modern, visually stunning e-commerce web application built as a **conceptual portfolio project**. Features a dark glassmorphism UI, bento grid layouts, smooth Framer Motion animations, Supabase backend, and Razorpay test payment integration.

> **This is a portfolio/demo project.** No real transactions are processed. Razorpay runs in test mode only.

## Features

- **Unique Luxury UI** — Dark theme with glassmorphism, gradient accents, and magazine-style layouts
- **Bento Grid Categories** — Asymmetric, Pinterest-inspired category layout
- **Framer Motion Animations** — Smooth scroll reveals, page transitions, and micro-interactions
- **Product Catalog** — Filterable, searchable, sortable shop with real product images
- **Shopping Cart** — Slide-out cart drawer with quantity controls
- **Razorpay Checkout** — Test mode payment gateway integration (INR)
- **Supabase Auth** — Email/password authentication with auto profile creation
- **Supabase Database** — Full schema with products, orders, wishlists, and RLS policies
- **Responsive Design** — Mobile-first, works beautifully from 320px to 4K
- **Real Images** — High-quality Unsplash photography

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Auth & DB | Supabase (PostgreSQL) |
| Payments | Razorpay (Test Mode) |
| Notifications | React Hot Toast |

## Getting Started

```bash
git clone https://github.com/Rohangupta2004/Portfoli.git
cd Portfoli
npm install
cp .env.example .env
# Edit .env with your Supabase and Razorpay test keys
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `VITE_RAZORPAY_KEY_ID` | Razorpay test key (starts with `rzp_test_`) |

## Project Structure

```
src/
  components/      # Reusable UI components
  context/         # React Context providers (Cart, Auth)
  data/            # Static product & category data
  lib/             # Supabase client & Razorpay helpers
  pages/           # Route-level page components
  App.jsx          # Root component with router
  index.css        # Tailwind + custom styles
  main.jsx         # Entry point
supabase/
  schema.sql       # Database schema + RLS + seed data
```

## Database Setup

Run `supabase/schema.sql` in your Supabase SQL editor to create all tables, RLS policies, and seed data.

## Author

**Rohan Gupta** — Full-Stack Developer
- GitHub: [@Rohangupta2004](https://github.com/Rohangupta2004)

## License

MIT
