# Undangan Digital Khitanan

Undangan digital untuk acara khitanan yang dihosting di GitHub Pages.

## 🌟 Fitur

- ✅ Opening screen dengan nama tamu dari URL parameter
- ✅ Hero section dengan efek particle animasi
- ✅ Kutipan Al-Quran
- ✅ Profil anak dengan foto
- ✅ Detail acara lengkap (tanggal, waktu, lokasi)
- ✅ Countdown timer
- ✅ Galeri foto dengan lightbox
- ✅ Form ucapan & doa (tersimpan di localStorage)
- ✅ Amplop digital (rekening bank & alamat)
- ✅ Background music
- ✅ Responsive mobile-first design
- ✅ Smooth scroll animations
- ✅ Premium Islamic themed design

## 🚀 Cara Hosting di GitHub Pages

1. Buat repository baru di GitHub
2. Push semua file ke repository
3. Buka **Settings** > **Pages**
4. Pilih source: **Deploy from a branch**
5. Pilih branch: **main** dan folder **/ (root)**
6. Klik **Save**
7. Tunggu beberapa menit, undangan akan live di `https://username.github.io/nama-repo/`

## 🔗 Cara Kirim Undangan

Tambahkan parameter `?kpd=` di URL untuk personalisasi nama tamu:

```
https://username.github.io/undangankhitanan/?kpd=Bapak%20Budi
https://username.github.io/undangankhitanan/?kpd=Ibu%20Sari
```

## ✏️ Cara Edit Data

Edit file `index.html` untuk mengubah:
- Nama anak
- Nama orang tua
- Tanggal acara
- Waktu acara
- Lokasi acara
- Link Google Maps
- Nomor rekening

Edit file `assets/js/script.js` untuk mengubah:
- Tanggal countdown (`CONFIG.eventDate`)

## 📁 Struktur File

```
undangankhitanan/
├── index.html              # Halaman utama
├── README.md               # Dokumentasi
├── assets/
│   ├── css/
│   │   └── style.css       # Stylesheet
│   ├── js/
│   │   └── script.js       # JavaScript
│   └── images/
│       ├── hero_bg.png         # Background hero
│       ├── boy_photo.png       # Foto anak
│       ├── mosque_decoration.png
│       ├── corner_decoration.png
│       ├── border_bottom.png
│       ├── floral_pattern.png
│       ├── gallery_1.png
│       ├── gallery_2.png
│       └── gallery_3.png
```

## 🎨 Tema

Desain menggunakan tema Islamic premium dengan palet warna:
- **Primary**: Navy Blue (#0a4c7a)
- **Gold**: Elegant Gold (#c5975b)
- **Cream**: Warm Cream (#fdf8f0)

Font yang digunakan:
- **Great Vibes** - Untuk judul dekoratif
- **Playfair Display** - Untuk heading
- **Poppins** - Untuk body text
- **Amiri** - Untuk teks Arab
