# Mengelola bahasa Indonesia dan English

## Memakai tombol bahasa

Buka Home atau About Me dan pilih ID/EN. Pilihan bahasa disimpan selama satu tahun lewat cookie `portfolio_language`. Tautan `index.php?lang=en` dan `about.php?lang=en` dapat dibagikan untuk membuka bahasa Inggris langsung; `?lang=id` membuka bahasa Indonesia.

Pergantian bahasa memuat ulang halaman, lalu mengembalikan posisi baca pada halaman yang sama. Intro logo MA tidak diputar ulang ketika tombol bahasa dipakai. Bahasa admin dan data yang tersimpan tidak ikut diubah.

## Menambah terjemahan untuk data baru

Terjemahan isi portofolio yang sudah ada tersedia pada `assets/translations/en.json`. Nama orang, instansi resmi, merek, URL dan istilah teknis tidak perlu diterjemahkan. Untuk teks baru yang ditambahkan atau diubah melalui admin, buka file JSON tersebut dan tambahkan pasangan teks asal dan versi Inggrisnya. Contoh:

```json
"Membangun website katalog produk.": "Built a product catalog website."
```

Perhatikan koma di antara pasangan JSON, tanda kutip ganda, dan jangan menambahkan koma pada pasangan terakhir. Gunakan kalimat asal persis seperti di admin; kalimat Inggris akan diterapkan pada salinan data untuk tampilan EN. Teks tanpa padanan tetap ditampilkan dalam bahasa asal agar informasi tidak hilang. Tidak ada terjemahan otomatis atau layanan/API eksternal.

Setelah mengubah JSON, muat ulang halaman dengan EN aktif. Jika menambahkan label baru ke komponen React, gunakan helper `t()` dari `frontend/i18n.jsx` dan bangun bundle melalui `npm ci` lalu `npm run build` dari folder frontend. Mengedit terjemahan di JSON saja tidak perlu build ulang.

## File penting

- `includes/i18n.php`: pilihan bahasa, cookie, terjemahan data publik dan teks PHP.
- `assets/translations/en.json`: kamus terjemahan.
- `frontend/i18n.jsx`: label React dan tombol bahasa hero.
- `assets/language.js`: mempertahankan posisi baca saat pindah bahasa.
- `includes/footer.php`: footer bersama Home/About Me.

Jangan mengubah nilai kategori teknis `work`, `org`, ID, URL, nama file atau nilai angka demi mengganti bahasa. Pengelompokan proyek Enterprise System di filter Web Development tetap memakai kategori yang sama.

Opening MA hanya dilewati saat tombol bahasa dipakai. Membuka langsung atau me-refresh URL berparameter lang tetap menampilkan opening. Penanda klik bahasa bersifat sementara per tab dan habis setelah reload tersebut.
