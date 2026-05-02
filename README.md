# De' Needs Hyper Bazzar 🛒

Premium supermarket e-commerce platform for **De' Needs Hyper Bazzar**, Jalahalli, Bangalore.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand (cart) |
| Auth | Supabase Auth |

## Project Structure

```
src/
├── app/
│   ├── (shop)/               # Public shop routes (with page transitions)
│   │   ├── products/         # Product listing + filters
│   │   │   └── [id]/         # Product detail page
│   │   └── checkout/         # Checkout page
│   ├── admin/                # Protected admin portal
│   │   ├── products/         # Add / edit products
│   │   └── orders/           # Manage & update orders
│   ├── api/
│   │   ├── products/         # Products REST endpoint
│   │   └── auth/signout/     # Sign out handler
│   ├── login/                # Admin login
│   ├── order-success/        # Post-checkout confirmation
│   ├── layout.tsx            # Root layout + SEO metadata
│   └── page.tsx              # Homepage
├── components/
│   ├── layout/
│   │   └── Navbar.tsx        # Sticky navbar + megamenu + search
│   ├── shop/
│   │   ├── Hero.tsx          # High-conversion hero section
│   │   ├── CategoryGrid.tsx  # Visual category browser
│   │   ├── ProductCard.tsx   # Card with Quick Add to Cart
│   │   ├── ProductGrid.tsx   # Responsive product grid
│   │   ├── CartSidebar.tsx   # Slide-out cart drawer
│   │   └── AddToCartButton.tsx
│   ├── admin/
│   │   ├── ProductForm.tsx   # Add/edit product modal
│   │   └── OrderStatusSelect.tsx
│   └── ui/
│       └── Toaster.tsx       # Toast notifications
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser Supabase client
│   │   └── server.ts         # Server Supabase client
│   └── utils.ts              # cn(), formatPrice(), getDiscountPercent()
├── store/
│   └── cartStore.ts          # Zustand cart store (persisted)
├── types/
│   └── database.ts           # Full TypeScript types
└── middleware.ts              # Session refresh middleware
supabase/
└── schema.sql                # Full DB schema + seed data
```

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste contents of `supabase/schema.sql` → Run
3. Copy your project URL and anon key

### 3. Configure environment
```bash
cp .env.local.example .env.local
# Fill in your Supabase credentials
```

### 4. Create admin user
In Supabase Dashboard → Authentication → Users → Add user, then run:
```sql
UPDATE profiles SET role = 'admin' WHERE id = '<your-user-id>';
```

### 5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features

- **Sticky Navbar** with global search, cart badge, and visual megamenu
- **Hero Section** with Bangalore-local copy and floating animations
- **Product Cards** with Quick Add to Cart hover overlay
- **Slide-out Cart Sidebar** with real-time quantity controls and free delivery tracker
- **Admin Portal** at `/admin` — add products, update prices, mark Fresh Arrivals, manage orders
- **Local SEO** — structured metadata targeting "Bangalore Supermarket" keywords
- **Mobile-first** responsive design throughout
- **Page transitions** via Framer Motion on all shop routes

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `brand-yellow` | `#FFD700` | Hero background, accents, category hover |
| `brand-red` | `#B22222` | Buttons, headings, navbar, badges |
