# SatriaPOS AI Assistant Guidelines

## 1. Project Overview
**Name:** SatriaPOS
**Description:** Sistem Point of Sale (POS) dan Manajemen Inventori khusus koperasi. Fitur utama mencakup manajemen stok menggunakan metode FIFO, sistem promosi kompleks (Voucher & Tebus Murah), dan antarmuka kasir berkinerja tinggi.

## 2. Tech Stack
* **Backend:** Laravel (PHP 8+)
* **Bridge:** Inertia.js
* **Frontend:** React.js
* **UI Framework:** Ant Design (antd)
* **Database:** PostgreSQL / MySQL

## 3. Backend Architecture & Laravel Guidelines
* **Separation of Concerns:** Jangan letakkan logika bisnis yang kompleks (seperti kalkulasi FIFO stok, validasi keranjang, dan perhitungan tebus murah) di dalam Controller. Gunakan **Service Pattern** atau Action classes.
* **Data Validation:** Selalu gunakan Form Requests atau **Data Transfer Object (DTO)** untuk memvalidasi dan mentransformasi data *payload* yang masuk sebelum diproses.
* **Database Integrity:** Wajib menggunakan `DB::beginTransaction()`, `DB::commit()`, dan `DB::rollBack()` untuk setiap operasi tulis/ubah yang melibatkan lebih dari satu tabel, khususnya pada modul *Checkout* POS dan *Good Receive Note*.
* **Eloquent Relationships:** Definisikan relasi secara eksplisit. Gunakan *Eager Loading* (`with()`) untuk menghindari masalah N+1 query, terutama saat memuat data produk beserta *batch* FIFO dan promosi yang aktif.

## 4. Frontend Architecture & React + Ant Design Guidelines
* **Component Structure:** Gunakan *Functional Components* dan React Hooks. Pisahkan komponen UI yang *reusable* ke dalam folder `components/`.
* **Ant Design Integration:** * Maksimalkan penggunaan komponen bawaan antd seperti `Table`, `Form`, `Modal` (sangat berguna untuk filter pencarian dan pop-up Tebus Murah), serta `Upload` untuk manajemen gambar.
    * Gunakan sistem *Grid* bawaan antd untuk *layouting* yang responsif.
* **Inertia.js:** Gunakan `useForm` dari Inertia untuk menangani pengiriman data *form* dan menampilkan pesan *error* validasi dari Laravel.
* **State Management:** Untuk *state* lokal yang kompleks di halaman kasir (seperti keranjang belanja sementara), gunakan `useReducer` atau *custom hooks* agar logika terpisah dari komponen visual.

## 5. Coding Standards & Naming Conventions
* **Database & Migrations:** Gunakan *snake_case* (contoh: `product_batches`, `tebus_murah_rules`).
* **PHP/Laravel:** Gunakan *PascalCase* untuk Class, Model, dan Controller. Gunakan *camelCase* untuk variabel dan *method*.
* **React:** Gunakan *PascalCase* untuk nama file komponen (contoh: `ProductModal.jsx`) dan *camelCase* untuk variabel/fungsi.
* **Responses:** Kembalikan *response* Inertia (`Inertia::render()`) untuk *page view*, atau standard JSON response jika membuat *endpoint* API khusus.

## 6. Development Workflow (Linux/Unix Environment)
* Pastikan *path* dan huruf besar/kecil (*case sensitivity*) akurat karena *environment* berjalan pada sistem berbasis Linux.
* Saat diminta untuk membuat *scaffolding*, berikan perintah terminal (Artisan/NPM) yang relevan terlebih dahulu.

## 7. UI/UX & Theming Guidelines
* **Color Palette (Dark Theme):**
    - Primary/Accent: `#ff6a00`
    - Background Base: `#050505`
    - Panel/Container: `#0b0b0b`
    - Elevated (Modal/Popover): `#111111`
    - Border: `#202020`
    - Text Primary: `rgba(255, 255, 255, 0.88)`
    - Text Secondary: `rgba(255, 255, 255, 0.64)`
* **Ant Design Config:** Selalu asumsikan komponen berada di bawah `ConfigProvider` dengan token warna di atas. Jika membutuhkan *custom styling* tambahan (misal via Tailwind atau CSS-in-JS), patuhi variabel warna ini.
