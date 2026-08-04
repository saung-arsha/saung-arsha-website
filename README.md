# Saung Arsha — Website Statis

Website resmi untuk Saung Arsha, penginapan tersembunyi di tengah hutan. Dibangun murni dengan **HTML5, CSS3, dan Vanilla JavaScript (ES6)** — siap di-host langsung di GitHub Pages tanpa build process apa pun.

## Struktur Folder

```
saung-arsha/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── images/
    │   ├── hero.jpg
    │   ├── about.jpg
    │   ├── gallery-1.jpg ... gallery-9.jpg
    │   ├── highlight-1.jpg ... highlight-6.jpg
    │   ├── denah.jpg
    │   └── og-image.jpg
    └── icons/
        ├── favicon.png
        ├── favicon-32.png
        └── apple-touch-icon.png
```

## Cara Menjalankan

Cukup buka `index.html` langsung di browser, atau host di GitHub Pages:

1. Push seluruh folder ini ke repository GitHub.
2. Buka **Settings → Pages** pada repository.
3. Pilih branch `main` dan folder root (`/`).
4. Website akan langsung aktif di `https://username.github.io/nama-repo/`.

## Mengganti Foto

Semua foto di folder `assets/images/` saat ini adalah **placeholder gradien** bertuliskan nama filenya masing-masing, agar mudah dikenali. Cukup timpa (replace) file dengan nama yang sama menggunakan foto asli Saung Arsha — tidak perlu mengubah kode apa pun.

Rekomendasi ukuran foto:
- `hero.jpg` — minimal 1920×2400px (potret, penuh layar)
- `about.jpg` — 1400×1750px
- `gallery-1.jpg` s/d `gallery-9.jpg` — rasio bebas (masonry menyesuaikan otomatis)
- `highlight-1.jpg` s/d `highlight-6.jpg` — 1000×1250px (potret)
- `denah.jpg` — ilustrasi/peta kawasan, 1600×1200px

## Mengganti Data Kontak

Buka `index.html`, cari bagian `id="kontak"` untuk mengubah:
- Nomor WhatsApp (`https://wa.me/6281234567890` — ganti dengan format `62xxxxxxxxxxx`)
- Alamat, Instagram, jam operasional, email
- Link Google Maps embed (`src` pada `<iframe>`) — ganti koordinat/lokasi sesuai kebutuhan

## Mengganti Titik Denah

Cari bagian `id="denah"` pada `index.html`. Setiap titik marker menggunakan:
```html
<button class="denah__marker" style="top:28%; left:22%;" data-info="Mushola" data-desc="Deskripsi singkat.">
```
Ubah `top`/`left` (posisi persen terhadap gambar denah), `data-info` (judul), dan `data-desc` (deskripsi) sesuai kebutuhan.

## Fitur Utama

- Mobile-first, responsif di semua ukuran layar
- Loading screen, scroll progress bar, navbar blur saat scroll
- Reveal animation (fade-in / slide-up) saat elemen muncul di layar
- Galeri foto masonry dengan lightbox (hover zoom, next/prev, keyboard navigation)
- Slider highlight area yang bisa digeser (swipe di mobile)
- Denah kawasan interaktif dengan marker & tooltip
- FAQ accordion dengan animasi halus
- Tombol WhatsApp mengambang + tombol kembali ke atas
- Ripple effect pada tombol utama
- Highlight menu navigasi otomatis sesuai section yang sedang dilihat

## Palet Warna

| Nama | Hex |
|---|---|
| Forest Dark | `#1E3B2C` |
| Forest Mid | `#2C4A3B` |
| Orange | `#C97B3D` |
| Gold | `#D9A441` |
| Cream | `#F8F3E7` |
| White | `#FFFEFB` |

## Tipografi

- **Display / Heading:** Fraunces (serif hangat, elegan)
- **Body:** Manrope (sans-serif modern, nyaman dibaca)

Keduanya dimuat via Google Fonts (`<link>` di `index.html`) — tidak memerlukan file font lokal.
