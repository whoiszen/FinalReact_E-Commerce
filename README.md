# Luminary - Luxury E-commerce (Laravel + Inertia React + Tailwind)

Luxury jewelry store with admin panel, cart, orders, wishlists. Dark luxury theme.

[![Laravel](https://img.shields.io/badge/Laravel-11-green)](https://laravel.com)
[![React](https://img.shields.io/badge/React-Inertia-blue)](https://inertiajs.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-purple)](https://tailwindcss.com)

## Features
- User auth (login/register)
- Product catalog with search/categories
- Shopping cart & checkout
- Orders & wishlists
- Admin dashboard/products/orders
- Luxury dark theme (obsidian/gold)

## Quick Clone & Run

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL/PostgreSQL (or SQLite)
- Git

### 1. Clone & Install Backend
```bash
git clone <your-repo-url>
cd FinalProjectReact
cp .env.example .env
composer install --optimize-autoloader --no-dev
php artisan key:generate
```

### 2. Database Setup
```bash
# Edit .env: DB_DATABASE, DB_USERNAME, DB_PASSWORD
php artisan migrate --seed
```

### 3. Frontend Setup
```bash
npm ci
npm run build  # Production
# or npm run dev  # Development
```

### 4. Admin User (seeded)
- Email: `admin@example.com`
- Password: `password`
- Visit `/admin/dashboard` after login `/login`

### 5. Run Servers
```bash
php artisan serve
# In new terminal: npm run dev
```
App at `http://localhost:8000`

## Usage
- **Frontend**: Browse `/` → Products → Cart `/cart` → Checkout
- **Admin**: `/login` → `/admin/products/create`
- **Seed more data**: `php artisan db:seed --class=DatabaseSeeder`

## Development
```bash
npm run dev  # Vite HMR
npm run build  # Prod build
php artisan serve
```

## Customization
- Categories: Edit `ProductController` or seed data
- Theme: `tailwind.config.js` + `app.css`
- Add products: Admin panel

## Troubleshooting
- **No categories**: Run `php artisan migrate --seed`
- **Build errors**: `rm -rf node_modules package-lock.json && npm ci`
- **Migration fail**: Check `.env` DB config

## License
MIT
