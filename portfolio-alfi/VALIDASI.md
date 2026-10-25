# Hasil validasi

Diperiksa dengan PHP 8.3 dan MariaDB 10.11 dalam lingkungan pengujian lokal.

- Semua file PHP lolos pemeriksaan sintaks.
- JavaScript publik dan admin lolos pemeriksaan sintaks Node.js.
- SQL membuat tabel dan memasukkan data awal tanpa kesalahan.
- Website publik merender data awal dari database.
- Setup membuat akun pertama dan terkunci setelahnya.
- Login, logout, proteksi halaman admin, dan pergantian password bekerja.
- Tambah, edit, hapus untuk proyek, pengalaman, skill, sertifikat berhasil; website membaca hasil perubahan dari MySQL.
- Profil berhasil diperbarui; teks HTML di-escape.
- Token CSRF salah ditolak dengan HTTP 403.
- Upload PNG berhasil dengan validasi MIME; file hasil upload disimpan dengan nama acak.
- Paket hanya berisi data awal dan gambar asli; akun dan data pengujian tidak disertakan.

Batas pemeriksaan: browser pengujian tidak tersedia, sehingga tampilan visual, transisi, fokus dialog, dan interaksi JavaScript belum diuji langsung dalam browser. CSS sudah memiliki aturan responsif dan reduced motion. Laragon pada perangkat pengguna belum diuji langsung; ikuti README.md untuk memasang.


## Revisi Experience 3D — 21 Oktober 2026

- Build React produksi berhasil melalui frontend/build.mjs.
- Syntax index.php/about.php diperiksa dengan php-parser (PHP 8.3); stylesheet baru berhasil diparse PostCSS.
- Chromium: preview komponen Experience menggunakan source React/CSS produksi dan lima pengalaman beserta 20 kontribusi dari SQL bawaan; viewport 1440, 390, 320 px. Aset tampil, tidak ada overflow horizontal atau pageerror. Tampilan desktop dan mobile diperiksa melalui screenshot internal.
- Pemilihan ikon, pilihan teks, panah keyboard, filter kerja/organisasi, tombol Jeda/Putar, swipe sentuh, autoplay 6,5 detik dan reduced motion diperiksa.
- Preview tidak menjalankan backend PHP/MySQL karena PHP CLI tidak tersedia. Struktur data, SQL, config dan admin tidak diubah; verifikasi koneksi database tetap dilakukan melalui Laragon/server pengguna.
- Aset tangan transparan dan prompt pembuatan dicatat di frontend/ART-DIRECTION.md. Tidak ada ikon atau salinan teks merek dari poster referensi.


## Koreksi carousel orbit berputar — 21 Oktober 2026

- Fixed-position float diganti animasi sudut bersama: ikon bergerak dalam lintasan elips, skala/opasitas mengikuti kedalaman, dan lewat di belakang/depan aset tangan melalui z-index.
- Pilihan ikon/teks memutar pengalaman terpilih ke depan; detail mengikuti pengalaman depan pada putaran otomatis. Pointer drag memutar secara langsung dan snap saat dilepas. Input sentuhan native melalui Chromium CDP juga diperiksa pada viewport 390 px dan berhasil memutar carousel.
- Build produksi React berhasil. Pemeriksaan syntax PHP index/about serta parse CSS berhasil.
- Chromium preview komponen dengan markup data dari SQL bawaan: viewport 1440/390/320 px. Posisi ikon berubah pada sampel waktu berbeda, posisi diam saat Jeda, kedalaman depan/belakang tersedia, klik dan mouse drag bekerja, filter menghasilkan 2 kerja/3 organisasi, tidak ada overflow horizontal. Reduced motion menghentikan putaran otomatis dan tetap mendukung pemilihan manual. Tidak ada pageerror.
- Pemeriksaan ini adalah preview frontend; backend PHP/MySQL tidak dijalankan di lingkungan ini. Database, admin dan aset tangan tidak diubah.


## Revisi laptop dan hapus strip pengalaman — 21 Oktober 2026

Aset tangan dihapus dari markup dan ZIP; diganti ilustrasi laptop SVG buatan kode. Seluruh direktori/kartu Jejak Pengalaman dihapus; tombol Jeda/Putar dipindahkan ke pojok visual. Efek pemusatan rail yang tidak dipakai juga dihapus.

Build React produksi, syntax index/about PHP, parse CSS serta XML SVG diperiksa. Preview Chromium menggunakan komponen produksi dan lima pengalaman dari SQL bawaan untuk memeriksa ketiadaan tangan/rail, pemuatan SVG, putaran ikon, klik/drag, kategori, reduced motion dan tampilan desktop/HP. Ini pemeriksaan frontend; PHP/MySQL tidak dijalankan di lingkungan ini. Struktur database dan admin tidak diubah.


## Revisi latar polos — 21 Oktober 2026

- Latar Experience menjadi warna netral polos #f7f9fb dengan border tipis dan tanpa bayangan panel. Elemen curtain/halo, teks petunjuk, dan tombol pause visual dihapus dari DOM.
- Build React produksi dan parse CSS berhasil. Perubahan tidak menyentuh database/admin.
- Preview komponen produksi dipakai untuk memeriksa backgroundImage none, warna netral, ketiadaan elemen yang dihapus, dan tampilan desktop/HP. Backend PHP/MySQL tidak dijalankan di lingkungan ini.


## Filter Enterprise System juga masuk Web Development — 21 Oktober 2026

- Aturan filter produksi app.js diuji di Chromium dengan enam proyek: Web Development menampilkan BPKP, Sky Rent, HIMTI; Enterprise System hanya BPKP; Mobile App hanya Vanadis/DompetKu; Semua tetap enam kartu tanpa duplikasi.
- Filter pengalaman kerja tetap menampilkan kartu work saja. Event portfolio:filter tetap dikirim agar carousel React memperbarui koleksi yang terlihat.
- node --check app.js dan parse index.php dengan php-parser PHP 8.3 berhasil. Filter Web Development disediakan oleh PHP bila ada Enterprise System meskipun belum ada kategori web terpisah. Backend/database tidak dijalankan atau diubah.
