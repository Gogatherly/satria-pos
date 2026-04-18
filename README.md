# SATRIAPOS

Proyek ini menggunakan Laravel 13, Inertia.js, React, Ant Design, dan Tailwind CSS v4.

## Kebutuhan

- PHP `^8.3`
- Composer
- Node.js `18+`
- npm

## Setup Cepat

Jalankan perintah berikut dari root project:

```bash
composer setup
```

Perintah itu akan:

- install dependency PHP
- membuat file `.env` jika belum ada
- generate `APP_KEY`
- menjalankan migrasi database
- install dependency frontend
- build asset Vite

## Menjalankan Project Saat Development

Setelah setup selesai, jalankan:

```bash
composer dev
```

Command ini akan menyalakan:

- Laravel app di `http://127.0.0.1:8000`
- queue listener
- log watcher (`pail`)
- Vite dev server

## Menjalankan Manual Satu per Satu

Kalau ingin menjalankan servicenya terpisah:

```bash
php artisan serve
```

```bash
php artisan queue:listen --tries=1 --timeout=0
```

```bash
php artisan pail --timeout=0
```

```bash
npm run dev
```

## Konfigurasi Environment

Project ini default-nya menggunakan SQLite.

Pastikan file berikut tersedia:

```bash
database/database.sqlite
```

Jika `.env` belum ada:

```bash
cp .env.example .env
php artisan key:generate
```

Jika ingin refresh database:

```bash
php artisan migrate:fresh
```

## Build Production

Untuk build asset production:

```bash
npm run build
```

## Testing

Untuk menjalankan test:

```bash
composer test
```

## Catatan

- Frontend entry ada di `resources/js/app.jsx`
- SSR entry ada di `resources/js/ssr.jsx`
- Theme Ant Design dan token yang dipakai Tailwind ada di `resources/js/theme.js`
