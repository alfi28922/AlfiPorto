# Portfolio Muhammad Alfi

Untuk versi final ini, mulai dari **PANDUAN-DEPLOY-VERCEL.md** dan **AUDIT-KEAMANAN.md**. Vercel memakai folder deploy/vercel sebagai gateway; halaman PHP, admin, MySQL, dan upload berjalan di origin PHP dengan penyimpanan permanen. Jangan mengunggah source PHP sebagai static site.

Konfigurasi produksi harus lewat environment server. SQL yang disertakan adalah snapshot untuk database BARU, tanpa akun/password admin; jangan impor ulang ke database aktif.

## Admin Content Studio dan sertifikat — 25 Oktober 2026

Admin didesain ulang untuk desktop dan HP. Dua puluh dokumen/badge kiriman disertakan bersama preview dan file aslinya. Untuk database yang sedang dipakai, salin folder assets baru lalu jalankan **database/update_certificates.sql** saja. Jangan impor ulang SQL utama. Panduan dan daftar dokumen ada di **UPDATE-SERTIFIKAT.md**. Pertahankan config.php dan uploads; Ctrl+F5 setelah update.

## Panel contoh foto dihapus

Panel Enam foto kiriman dan tombol Terapkan di admin sudah dihapus. Form foto utama, pendamping, empat posisi Side Notes, keterangan, serta upload/ganti/hapus tetap tersedia. Data foto di database tidak diubah; tidak perlu menjalankan SQL.

## Jika foto belum muncul

Pilih database portofolio aktif di HeidiSQL/phpMyAdmin, lalu jalankan `database/update_about_photos.sql` sekali. Patch ini hanya mengisi enam posisi foto. Pastikan `assets/images/about-*.png` dan template terbaru sudah disalin. Tidak perlu impor ulang SQL utama. Gunakan form Foto About Me untuk mengganti foto melalui admin.

## Enam foto About Me — 25 Oktober 2026

Enam foto kiriman disertakan di `assets/images/`. Kelola foto melalui **Admin → Foto About Me** dan **Simpan perubahan**. Setelah itu, tiap posisi memiliki upload, hapus, dan empat caption Side Notes yang dapat diedit. Tidak perlu migrasi atau impor ulang SQL. Foto tidak direset otomatis setelah diganti. Lihat **PENEMPATAN-FOTO-ABOUT-ME.md** untuk peta foto dan langkah lengkap.

## Revisi khusus versi redesign — 25 Oktober 2026

- Kontrol play/previous/next pada ringkasan carousel proyek dihapus. Nama/preview proyek melebar mengisi ruangnya. Pilih kartu, swipe/drag, keyboard, dan autoplay tetap tersedia.
- Keterangan organisasi aktif di ringkasan profil dihapus. Riwayat organisasi di Pengalaman tetap ada.
- Form admin mengikuti konten yang tampil. Field organisasi aktif, kutipan, label Instagram, dan foto footer yang tidak digunakan tidak ditampilkan; tambahan cerita tetap dipakai di About Me.
- Pada setiap foto/galeri, centang **Hapus foto ini**, lalu **Simpan perubahan**. Untuk file baru yang belum disimpan, gunakan **Hapus pilihan** atau **Batalkan pilihan file**. Upload baru menggantikan foto utama; upload galeri ditambahkan sesudah foto yang masih dipertahankan.
- Penghapusan melepaskan foto dari data tersebut. File bersama tetap tersedia untuk halaman/data lain. Cover proyek kosong memakai placeholder; foto About Me dan Side Notes kosong mengikuti fallback bawaan.
- Salin paket lengkap termasuk file baru `includes/admin-media.php` dan `assets/images/project-placeholder.svg`. Pertahankan `config.php` dan `uploads` yang sudah dipakai. Tidak perlu impor ulang SQL. Setelah update, Ctrl+F5.

Validasi: login admin, multipart upload, hapus/ganti foto utama, foto kedua, sertifikat, galeri, pembatalan pilihan file, validasi gagal, CSRF, serta tampilan proyek pada 320/390/1440 px diuji dengan PHP 8.3, database fixture SQLite, dan React produksi. MySQL tidak dijalankan di lingkungan pengujian.

# Portfolio Muhammad Alfi — PHP + MySQL

Versi ini dibuat dari isi `porto(1).rar`. PHP native, MySQL/MariaDB, CSS dan JavaScript lokal. Tidak membutuhkan Composer, npm, Tailwind CDN, atau koneksi internet untuk memuat tampilan website.

## Update terbaru — tombol Play carousel

Play kini langsung memindahkan kartu sekali, lalu meneruskan otomatis setiap 4 detik. Kursor yang tetap di atas carousel/kontrol serta fokus keyboard tidak lagi menjeda autoplay. Pause menghentikan pergeseran berikutnya. Memilih kartu secara manual, next/previous, swipe atau filter tetap menjeda sampai Play digunakan lagi. Tab tersembunyi, modal terbuka, viewport dan reduced motion tetap diperhatikan.

Untuk update dari versi sebelumnya cukup salin `index.php`, `assets/react-hero.js`, serta `frontend/showcase.jsx` jika menyimpan source. Tidak perlu impor database; tekan Ctrl+F5 setelah update.

## My Project coverflow 3D

My Project diubah mengikuti komposisi referensi coverflow: gambar proyek mendominasi kartu, kartu terpilih berada di tengah, sedangkan kartu samping miring dan mundur dengan perspektif 3D. Judul dan kategori berada di bagian bawah kartu. Palet biru muda/navy, data proyek, filter dan detail yang sudah ada tetap dipakai. Thumbnail proyek mobile memakai contain agar layar aplikasi tidak terpotong; thumbnail lain memakai cover, sedangkan gambar penuh tetap dapat dibuka lewat detail proyek.

Dock kaca di bawah menyediakan sebelumnya, putar/jeda, berikutnya, ringkasan proyek terpilih, indikator urutan dan akses detail. Swipe/drag, keyboard panah/Home/End, serta klik kartu samping tetap bekerja. Putar otomatis berjarak 4 detik dan berhenti sementara di luar viewport, tab tersembunyi, modal terbuka, atau reveal scroll belum selesai. Interaksi manual/filter menghentikan autoplay sampai tombol putar dipakai lagi. Reduced motion menonaktifkan autoplay dan transisi gerak. Kategori kosong dan kategori berisi satu proyek ditangani tanpa kontrol yang tidak relevan.

**Update dari paket sebelumnya:** salin `index.php`, `about.php`, `assets/react-hero.js`, `assets/mobile-desktop.css`, `assets/translations/en.json`, serta `frontend/showcase.jsx` bila menyimpan source. Cara paling mudah tetap menyalin paket lengkap sambil mempertahankan `config.php` dan isi `uploads` milikmu. Tidak perlu impor ulang SQL; tekan Ctrl+F5 setelah update.

## Opening MA kembali dan scroll wipe mengikuti gerakan

Opening MA kini memakai alur bersama pada Home dan About Me. Membuka atau me-refresh website, termasuk URL `?lang=id` / `?lang=en`, menampilkan MA lebih dahulu, lalu fade out sebelum halaman masuk. Yang melewati opening hanya perpindahan halaman melalui page transition, klik tombol bahasa yang sebenarnya, atau preferensi reduced motion. Opening dikelola file lokal `assets/opening.js`; markup logo dicetak dari `includes/opening-screen.php`, lalu dirender React ketika bundle siap.

Efek scroll sebelumnya diganti menjadi sapuan bidang biru pada masing-masing blok konten, mengikuti konsep video referensi. Kemajuan scroll membuka bidang warna dan mengangkat konten secara bertahap. Berhenti scroll di tengah efek mempertahankan tahap reveal itu. Setelah terbuka penuh, konten tetap terbuka selama masih berada di area baca. Elemen di-reset setelah keluar jauh dari viewport. Bagian terakhir/footer dipastikan terbuka penuh saat mencapai akhir halaman. Animasi memakai posisi scroll sebenarnya tanpa mengambil alih wheel/touch; tidak memunculkan overlay MA ketika scroll biasa.

**Cara update:** ekstrak **seluruh folder portfolio-alfi dari ZIP terbaru**, lalu salin seluruh file ke proyek, dengan tetap mempertahankan `config.php` serta isi `uploads` milikmu. Jangan hanya mengganti CSS atau bundle React: versi ini menambah **`assets/opening.js`** dan **`includes/opening-screen.php`**, serta memperbarui `index.php`, `about.php`, `includes/transition-head.php`, `assets/scroll-reveal.js`, `assets/app.js`, `assets/language.js`, `assets/mobile-desktop.css`, kedua bundle React dan folder `frontend/`. Paket sudah dibangun; server tidak membutuhkan npm. **Tidak perlu impor ulang SQL.** Tekan Ctrl+F5 / bersihkan cache website pada HP setelah seluruh file tersalin.

## Reveal saat scrolling sebelumnya

Konten di bawah layar disembunyikan terlebih dahulu, lalu fade in dengan gerakan naik 22 px ketika memasuki sekitar 88% tinggi viewport. Durasi 700 ms dan jeda pendek antar kartu menjaga animasi tetap tenang. Jika elemen sudah sepenuhnya melewati margin layar, efek bisa diputar lagi saat kembali. Scroll manual tidak menampilkan logo/lapisan page transition. Hero awal dan opening MA tetap memakai perilaku sebelumnya.

Efek berlaku pada kartu Overview, proyek React, pengalaman, skill, footer, serta bagian About Me. State reveal disimpan pada atribut tersendiri agar tidak tertimpa pembaruan React/carousel. Konten tetap muncul ketika difokuskan lewat keyboard, pada reduced motion, atau saat dicetak. Jika script reveal gagal dimuat, fallback membuka konten kembali setelah 4.5 detik.

**Update dari versi sebelumnya:** salin `index.php`, `about.php`, `includes/transition-head.php`, file baru `assets/scroll-reveal.js`, `assets/app.js`, `assets/about.js`, `assets/react-hero.js`, serta `assets/mobile-desktop.css`. Simpan folder `frontend/` juga jika ingin mengedit source. Paket sudah dibangun; server tidak memerlukan npm. Tidak perlu impor ulang database; tekan Ctrl+F5 setelah update.

## Page transition React

Perpindahan Home/About Me dan klik navigasi section sekarang memakai transisi React dengan lapisan biru muda, logo MA dan nama tujuan. Lapisan masuk 260 ms, kemudian memudar selama 440 ms setelah konten tujuan siap. Scroll manual tidak memicu page transition. Opening MA awal tetap digunakan pada kunjungan langsung; ketika kembali dari About Me lewat tautan, hanya transisi halaman yang diputar.

Navigasi tetap memakai halaman PHP yang sebenarnya, sehingga data/admin dan tautan langsung tetap bekerja. Transisi tidak mengambil alih tautan email, situs luar, download, tab baru, ganti bahasa, atau admin. Preferensi reduced motion melewati animasi. Wheel, sentuhan, Escape dan tombol scroll dapat membatalkan transisi yang sedang berjalan. Tombol Back tetap memakai riwayat browser. Saat halaman tujuan sedang dimuat, waktunya mengikuti kecepatan jaringan/server.

**Update dari versi sebelumnya:** salin `index.php`, `about.php`, file baru `includes/transition-head.php`, file baru `assets/page-transition.js`, `assets/react-hero.js`, `assets/app.js`, serta `assets/mobile-desktop.css`. Salin folder `frontend/` bila menyimpan source; `frontend/build.mjs` kini membangun kedua bundle React. Paket sudah menyertakan bundle produksi, jadi server tidak membutuhkan npm. Pertahankan `config.php` dan uploads milikmu. Tidak perlu impor ulang database; tekan Ctrl+F5 setelah update.

## Posisi logo MA

Logo MA di navigasi desktop kini memenuhi lebar area logonya dan rata tengah, sejajar dengan pusat ikon navigasi. Susunan horizontal pada HP tetap memakai lebar logo otomatis. Untuk update dari versi sebelumnya cukup salin `index.php` dan `assets/mobile-desktop.css`, lalu Ctrl+F5. Tidak perlu impor database.

## MA pada navigasi dan jam WIB

Tanda A. pada navigasi hero diganti MA dengan jenis huruf yang sama seperti opening. Kartu Selected Work/jumlah proyek diganti jam digital HH:MM:SS, zona WIB/Jakarta, serta hari dan tanggal. Jam diperbarui setiap detik dan disegarkan saat halaman kembali aktif. Zona waktu selalu Asia/Jakarta; tanggal mengikuti pilihan bahasa ID/EN. Jam memakai waktu perangkat pengunjung, tanpa layanan eksternal atau query database.

Untuk update dari paket sebelumnya, salin `index.php`, `assets/react-hero.js`, `assets/mobile-desktop.css`, serta folder `frontend/` bila menyimpan source. File `frontend/clock.jsx` adalah source komponen jam baru. Tidak perlu npm pada server karena bundle produksi sudah disertakan. Tidak perlu impor ulang database; tekan Ctrl+F5 setelah update.

## Hover kalimat About Me

Kalimat bidang keahlian di About Me tidak memiliki pilihan aktif saat halaman dibuka. Hanya teks di bawah kursor yang berubah menjadi navy lebih gelap; saat kursor keluar, warnanya kembali normal. Hover pada ruang kosong baris tidak menyorot teks. Fokus keyboard memberi penanda yang sama; layar sentuh tidak menyimpan highlight setelah tap.

Untuk update dari paket sebelumnya, salin `about.php`, `assets/about.js` dan `assets/mobile-desktop.css`, lalu tekan Ctrl+F5. Tidak perlu impor ulang database.

## Logo MA dan penyederhanaan elemen

Opening memakai huruf MA tebal dengan font Manrope ExtraBold lokal dan sedikit kemiringan. Logo fade in lalu fade out sebelum halaman masuk; preferensi reduced motion dan skip saat mengganti bahasa tetap berlaku.

Elemen pada screenshot dihapus: blok foto/nama/lokasi di atas Overview, LEARNING NEVER STOPS, Terus belajar, Buka koleksi, Baca cerita saya, IDE · DESAIN · DEVELOPMENT dan dua kalimat pengantar proyek. Pemisah bintang pada ticker diganti titik; dekorasi bintang carousel juga memakai titik. Kartu sertifikat tetap dapat diklik untuk membuka koleksi. Judul My Project, navigasi About Me, isi profil dan data proyek tetap tersedia.

Untuk update dari paket sebelumnya, salin `index.php`, `assets/sky-theme.css`, `assets/mobile-desktop.css` dan `assets/react-hero.js`. Pastikan `assets/fonts/manrope-800.ttf` tersedia. Salin folder `frontend/` bila menyimpan source. Tekan Ctrl+F5 setelah update. Tidak perlu impor database.

## Ringkasan profil, header sederhana, dan Indonesia/English

Kartu profil kini memuat bidang fokus, kolaborasi/organisasi, dan lokasi sekaligus. Tidak ada tiga tab yang perlu dipindah-pindah. Susunan ini berlaku pada HP dan desktop.

Header utama disederhanakan menjadi wordmark brand, pilihan bahasa dan tautan kontak. Dekorasi kode `< />`, tombol kontak besar, dan bingkai kapsul dihapus. Navigasi hero dan halaman lain tetap berfungsi.

Tombol **ID / EN** tersedia di hero, header saat scrolling dan About Me. Klik bahasa memuat ulang halaman dengan seluruh terjemahan yang tersedia, termasuk bio, ringkasan profil, judul/detail proyek, periode, kontribusi pengalaman, sertifikat, label dan pesan pencarian. Pilihan diingat dengan cookie agar tetap dipakai saat berpindah Home/About Me. Posisi baca dipertahankan saat mengganti bahasa pada halaman yang sama. Halaman admin tetap memakai bahasa sebelumnya.

**Update dari versi sebelumnya:** paling mudah salin seluruh paket sambil mempertahankan `config.php` dan `uploads` milikmu. Bila menyalin selektif, wajib menyertakan `index.php`, `about.php`, `includes/footer.php`, file baru **`includes/i18n.php`**, **`assets/translations/en.json`**, **`assets/language.js`**, serta `assets/mobile-desktop.css`, `assets/react-hero.js`, `assets/app.js`, dan `assets/about.js`. Untuk mengedit source, salin folder `frontend/` juga. Semua aset harus berada pada lokasi yang sama seperti dalam ZIP. Tekan **Ctrl+F5** atau hapus cache browser HP. Bundle React sudah dibangun; npm tidak diperlukan di server.

**Tidak perlu impor ulang SQL.** Bahasa hanya mengubah salinan data untuk tampilan; isi database, admin, config dan uploads tidak diubah. Terjemahan konten yang sekarang disertakan. Untuk kalimat baru dari admin, tambahkan padanan Inggrisnya di `assets/translations/en.json` agar konten baru ikut berbahasa Inggris. Lihat **PANDUAN-BAHASA.md**.

## Instalasi di Laragon

1. Ekstrak ZIP. Pindahkan folder **portfolio-alfi** ke `C:\laragon\www\portfolio-alfi`.
2. Buka Laragon, klik **Start All**. Pastikan Apache dan MySQL aktif. Pilih PHP **8.1 atau lebih baru**. Ekstensi `pdo_mysql` dan `fileinfo` harus aktif (biasanya sudah tersedia).
3. Klik **Database** di Laragon. Pada HeidiSQL, sambungkan ke server lokal, buka menu **File → Load SQL file**, pilih `database/portfolio_alfi.sql`, lalu jalankan file tersebut. Jika memakai phpMyAdmin: buka halaman server, tab **Import**, pilih SQL yang sama, lalu klik **Go**. SQL sudah membuat database `portfolio_alfi` beserta seluruh tabel dan data awal.
4. Buka `config.php`. Default: host `127.0.0.1`, port `3306`, database `portfolio_alfi`, username `root`, password kosong. Ubah bila pengaturan MySQL kamu berbeda. Jika Laragon memakai MariaDB, kode tetap kompatibel.
5. Buka **http://localhost/portfolio-alfi/admin/setup.php**. Buat username dan password kamu sendiri (10–72 karakter). Setup terkunci otomatis setelah akun pertama dibuat.
6. Login di **http://localhost/portfolio-alfi/admin/login.php**.
7. Website utama: **http://localhost/portfolio-alfi/**.

Alternatif impor melalui terminal Laragon, dari folder proyek:

```bat
mysql -u root < database\portfolio_alfi.sql
```

Jika MySQL punya password, gunakan `mysql -u root -p < database\portfolio_alfi.sql`.

**Jangan membuka index.php dengan klik ganda / file:// atau Live Server VS Code.** Website perlu dijalankan melalui Apache/PHP di Laragon. Setelah memindahkan ke perangkat lain, ekspor database terbaru melalui HeidiSQL/phpMyAdmin, salin seluruh folder termasuk `uploads`, lalu impor database tersebut di perangkat tujuan. SQL bawaan hanya berisi data awal, bukan perubahan admin terbaru.

## Isi data awal

- Profil, IPK **3.83**, domisili, bidang fokus, kontak, organisasi, status, deskripsi footer, dan kutipan.
- **4 proyek**: BPKP Enterprise Task & Performance Tracking, Vanadis Lounge, The Revenant’s Oath, DompetKu Pro.
- **5 pengalaman** kerja/organisasi lengkap dengan **20 pencapaian**.
- **12 kelompok skill** dan **4 sertifikat**.
- **9 gambar asli** beserta referensi galeri proyek.

Isi dan periode mengikuti file unggahan, termasuk periode BPKP dan SEO. Perbaiki melalui admin bila perlu. Tautan sertifikat lama adalah `#`, sehingga belum ada dokumen atau URL sertifikat yang dapat dibuka; versi ini menampilkan “Dokumen sertifikat belum dilampirkan” hingga kamu mengunggah gambar atau mengisi URL yang valid.

## Mengelola konten

- **Profil & Kontak**: ubah nama, brand, bio, IPK, bidang fokus, kontak, status, serta tambahan cerita About Me.
- **Proyek**: tambah, edit, hapus; gambar utama, galeri, teknologi/fitur, periode, URL demo/repository.
- **Pengalaman**: tambah, edit, hapus; pilih kerja/organisasi; rincian pencapaian ditulis satu per baris dengan format `Judul | Deskripsi`.
- **Skill**: tambah, edit, hapus nama skill dan kategorinya.
- **Sertifikat**: tambah, edit, hapus; foto sertifikat atau URL dokumen eksternal. Upload file hanya menerima gambar JPG/PNG/WebP; PDF bisa dihubungkan lewat URL http/https.
- **Password**: ganti password dengan memasukkan password saat ini.
- **Urutan tampil**: angka kecil tampil lebih dahulu. Jika sama, ID menjadi penentu.

Klik **Simpan perubahan**, lalu buka atau muat ulang website utama. Halaman mengambil konten langsung dari MySQL setiap request; halaman yang sudah terbuka tidak otomatis memuat ulang.

## Gambar dan galeri

Upload gambar lewat admin adalah cara termudah. File disimpan otomatis dengan nama acak di `uploads/`. Ukuran maksimal **5 MB per gambar**. Cover proyek disarankan **1600 × 1000 px**; detail menampilkan gambar penuh dengan `object-fit: contain`. Galeri bisa upload maksimal 20 gambar sekaligus.

Gambar bawaan berada di `assets/images/`. Kolom path contoh: `assets/images/Vanadis.jpg`. Tidak perlu menulis `../` atau URL localhost. Centang Hapus foto ini pada thumbnail galeri lalu Simpan perubahan, atau hapus baris path untuk mengeluarkannya dari galeri. Menghapus data tidak menghapus file gambar dari disk, sehingga foto yang dipakai bersama tetap tersedia. Untuk membersihkan file lama, pastikan tidak ada proyek/sertifikat lain yang memakainya.

## Tampilan & transisi

Desain biru dengan hero dan kartu bento, gambar cover proyek, filter kategori, timeline pengalaman, grid skill, dan dialog detail dengan galeri. Animasi masuk saat scroll, transisi filter dan modal, hover kartu, spotlight mengikuti kursor desktop, ticker, pergantian teks bidang fokus, indikator scroll, serta navigasi aktif mengikuti posisi halaman. Tampilan responsif; pengguna yang mengaktifkan reduced motion mendapat animasi minimal. Dialog mendukung Escape dan fokus keyboard.

## Struktur

- `index.php`: website publik dari database.
- `admin/`: setup, login, dashboard, CRUD dan logout.
- `config.php`: koneksi database.
- `includes/app.php`: koneksi PDO, session, CSRF, validasi dan upload.
- `includes/fields.php`: definisi formulir admin.
- `database/portfolio_alfi.sql`: skema + semua data awal (impor file ini).
- `database/portfolio_alfi.sql`: hanya skema kosong; tidak perlu diimpor jika memakai SQL lengkap.
- `assets/style.css`, `assets/app.js`: tampilan dan interaksi website.
- `assets/admin.css`, `assets/admin.js`: tampilan dan interaksi admin.
- `assets/images/`, `uploads/`: gambar bawaan dan gambar upload.

## Jika ada kendala

- **Hampir siap / database belum siap**: Start All, pastikan impor SQL lengkap, nama database benar dan kredensial cocok.
- **Could not find driver**: aktifkan `pdo_mysql` pada PHP Laragon lalu restart Apache.
- **Upload gagal**: cek ukuran 5 MB, format gambar dan izin tulis folder uploads. Untuk banyak gambar, atur `upload_max_filesize=5M`, `post_max_size=110M`, `max_file_uploads=20` pada php.ini lalu restart Apache.
- **404**: pastikan folder tepat di `C:\laragon\www\portfolio-alfi`, bukan satu folder tambahan di dalamnya.
- **CSS belum berubah**: muat ulang paksa dengan Ctrl+F5.
- **Port MySQL berbeda**: sesuaikan port di config.php. Jika Apache memakai 8080, gunakan `http://localhost:8080/portfolio-alfi/`.
- **Impor ulang SQL bawaan**: `INSERT IGNORE` tidak menimpa baris dengan ID yang sudah ada. Jangan impor ulang untuk mereset; gunakan backup database terbaru ketika pindah perangkat.

Password disimpan sebagai hash, query memakai prepared statements, aksi simpan/hapus/logout memakai token CSRF, dan upload memvalidasi MIME serta ukuran. File `.htaccess` ditujukan untuk Apache Laragon. Jika nanti memakai Nginx/hosting, terapkan aturan setara untuk melindungi config, includes, database dan mencegah eksekusi skrip di uploads. Jalankan setup pertama secara lokal sebelum mempublikasikan website.

## Mengganti foto Home, About Me, dan Side Notes

Login ke `/admin/login.php`, lalu buka **Foto About Me**:

| Lokasi gambar | Kolom admin |
| --- | --- |
| Foto besar halaman awal dan hero About Me | Foto utama |
| Foto kecil kedua di About Me | Foto pendamping |
| Empat kartu Side Notes | Side Notes 1–4; masing-masing memiliki upload dan keterangan |

Pilih file pada input upload yang sesuai, lalu klik **Simpan perubahan** dan muat ulang halaman publik. Format JPG, PNG, atau WebP, maksimal 5 MB setiap foto. Foto utama sebaiknya portrait (misalnya 1200 × 1600 px); PNG transparan cocok untuk hero. Foto Side Notes sebaiknya rasio 3:4. Foto dipotong otomatis agar sesuai bingkai.

Untuk mengganti foto Side Notes yang sudah ada, centang Hapus foto ini pada foto lama, lalu upload penggantinya dan Simpan perubahan. Setiap slot diganti secara terpisah; mengosongkan satu slot tidak menggeser slot lainnya. Slot yang belum diisi memakai ilustrasi dummy. Pengaturan tersimpan di tabel `about_me` pada database portofolio yang sama.

### Memasang revisi ticker dan pengaturan foto

Perbarui `index.php`, `about.php`, `assets/style.css`, dan `includes/fields.php` dari paket ini. Pertahankan `config.php`, folder `uploads/`, dan database yang sedang dipakai. Tidak perlu impor ulang SQL untuk revisi ini pada versi sebelumnya yang sudah memiliki kolom `about_me.hobbies`. Muat ulang dengan Ctrl+F5. Tombol About Me dan Lihat proyek di bawah cover dihapus; tautan About Me lainnya tetap tersedia.

## Tambahan proyek Sky Rent dan HIMTI UNAS

Dua proyek baru beserta empat screenshot disertakan. Untuk database yang sudah berjalan, ikuti `UPDATE-PROJECTS.txt` dan jalankan hanya `database/add_projects_sky_rent_himti.sql` pada database portofolio aktif. File ini menambah data tanpa mengubah proyek lama; pengulangan impor tidak menambah duplikat dengan judul atau cover yang sama. Instalasi baru memakai `database/portfolio_alfi.sql` seperti biasa.

## Revisi periode organisasi HIMTI

Periode Anggota Subdivisi Ekonomi Dan Bisnis diperbarui menjadi **11/25 - 10/26**. Untuk database aktif, pilih `portfolio_alfi` lalu jalankan `database/update_experience_period.sql`. Tidak perlu impor ulang SQL utama. Perubahan juga terbaca otomatis di About Me.

## Footer terbaru

Blok ajakan kontak terang (IDE BAGUS. JADI NYATA., tombol bulat, dan baris email) dihapus dari Home serta About Me. Footer navy berisi identitas, navigasi, sosial, lokasi, dan tautan kembali ke atas tetap tersedia. Perbarui `includes/footer.php`, `assets/style.css`, `index.php`, dan `about.php`, lalu Ctrl+F5. Tidak ada perubahan database.

## Versi alternatif: Anime Concept React

Paket ini adalah alternatif terpisah dari versi poster. Simpan cadangan versi sebelumnya sebelum mencoba. Home memakai panel graphite berlekuk, sidebar navigasi berbentuk islands, karakter anime orisinal yang keluar dari bingkai, serta kartu proyek pilihan. Nama, bio, bidang, lokasi, LFJ, jumlah proyek dan profil kecil tetap berasal dari database yang sama. Kartu proyek mengambil proyek terakhir pada daftar yang diurutkan server dan membuka modal detail yang sudah ada.

React mengatur bidang berganti otomatis/manual, LFJ, entrance bertahap dan parallax ringan. Klik menu memakai transisi navigasi yang sudah ada; scroll tetap native. Gerak berulang berhenti saat hero tidak terlihat dan mengikuti prefers-reduced-motion. Sidebar berubah horizontal pada HP. Header dan navbar lama muncul kembali setelah meninggalkan hero.

Untuk mencoba pada instalasi yang sudah berjalan: cadangkan folder lama, lalu salin `index.php`, `assets/style.css`, `assets/react-hero.js`, `assets/images/anime-hero-original.png`, dan `assets/fonts/anton-latin.woff2`. Pertahankan config.php, uploads, serta database aktif. Tidak perlu impor SQL lagi. Muat ulang Ctrl+F5. Instalasi baru tetap mengikuti panduan Laragon di atas.

Foto kecil About Me di sidebar mengikuti Foto About Me > Foto utama. Ilustrasi karakter utama adalah aset dekoratif terpisah; untuk menggantinya, ganti `assets/images/anime-hero-original.png` dengan PNG transparan berbentuk square. Detail pembuatan ada di `frontend/ART-DIRECTION.md`.

React dan React DOM sudah dibundle lokal. Source ada di `frontend/hero.jsx`. Untuk mengedit: buka folder frontend, jalankan `npm ci`, ubah JSX, lalu `npm run build`. Pengguna tidak perlu menjalankan npm untuk memakai paket ini. Projects, Experience, Skills, About Me, footer, admin dan database tetap disertakan.

## Penyatuan tampilan seluruh halaman publik

Home, overview, Projects, Experience, Skills, popup proyek/sertifikat, About Me, menu dan footer kini memakai graphite, panel biru abu-abu, aksen cyan serta sudut asimetris yang sama dengan hero anime. Foto About Me tetap memakai foto pribadi dari admin. Animasi reveal, carousel, scroll galeri dan transisi navbar yang sudah ada tetap digunakan; semua mengikuti pengaturan reduced motion.

Untuk memperbarui versi anime sebelumnya, salin **index.php**, **about.php**, dan file baru **assets/anime-theme.css**. File tema harus ikut diunggah. Setelah itu Ctrl+F5. Tidak ada perubahan skema, data, config.php maupun uploads; jangan impor ulang SQL untuk perubahan tampilan ini. Source React dan bundle hero tetap disertakan. Tema ini hanya berlaku pada halaman publik, sehingga form admin tetap memakai tampilan pengelolaannya.

Pemeriksaan: browser dengan CSS/script produksi dan fixture konten PHP pada lebar 1440, 390 dan 320 px; menu About Me, navigasi hero, LFJ, pilihan bidang, detail proyek dan reduced motion. Syntax PHP diperiksa dengan parser. Pengujian MySQL/PHP langsung memerlukan Laragon atau hosting karena runtime PHP tidak tersedia di lingkungan editor.

## React pada bagian 01–04

Empat bagian setelah lobi kini dilengkapi komponen React dengan chapter bar, garis progres mengikuti scroll, entrance judul berlapis, serta panel senada lobi. 01 memiliki profil bertab dan tautan About Me; 02 memiliki kontrol proyek dan indikator kartu aktif; 03 memiliki kontrol pengalaman yang memakai carousel existing; 04 memiliki pencarian dan filter kategori skill dari konten database. Filter tidak mengubah atau menghapus data di admin. Scroll, swipe, keyboard dan reduced motion tetap didukung.

Update dari versi anime sebelumnya: salin `index.php`, `assets/react-hero.js`, dan `assets/anime-theme.css`, lalu Ctrl+F5. Source baru ada di `frontend/sections.jsx`, diimpor dari `frontend/hero.jsx`; salin folder frontend juga bila ingin mengedit source. Tidak perlu npm untuk menjalankan bundle yang disertakan, dan tidak perlu impor SQL. Data proyek/pengalaman/skill tetap dirender server dari MySQL; React menambahkan interaksi di atasnya sehingga konten utama tetap tersedia ketika JavaScript tidak aktif.

Validasi browser produksi pada 1440/390/320 px: empat chapter terpasang, tab profil, next/previous proyek dan pengalaman, pencarian skill, empty state, filter kategori, reset filter, tanpa overflow horizontal, serta reduced motion. Syntax PHP dan CSS diperiksa. Validasi memakai fixture HTML berisi struktur PHP dan aset/script produksi; pengujian PHP/MySQL langsung memerlukan Laragon/hosting.

## Perbaikan carousel proyek horizontal

Desktop menampilkan dua kartu utuh dengan ukuran seimbang; tablet/HP menampilkan satu kartu dan pratinjau kartu berikutnya. Screenshot proyek memakai object-fit: contain agar seluruh gambar tetap terlihat. Scrollbar bawaan disembunyikan, digantikan garis progres di kontrol React. Tombol next/previous dan keyboard berpindah ke tepi kartu yang sebenarnya, bukan persentase lebar carousel. Tombol pada ujung awal/akhir menjadi nonaktif; Home/End menuju ujung carousel. Filter kategori tetap mereset posisi.

Update dari versi sebelumnya: salin `index.php`, `assets/app.js`, `assets/react-hero.js`, dan `assets/anime-theme.css`, lalu Ctrl+F5. Source React terbaru ada di `frontend/sections.jsx`. Tidak ada perubahan database. Pemeriksaan browser meliputi dua kartu utuh pada desktop, tanpa overflow halaman pada 1440/390/320 px, tombol awal/akhir, next/previous, reset filter, reduced motion, dan syntax PHP/JS/CSS.

Animasi geser juga diperbaiki agar tidak tersangkut beberapa piksel sebelum tujuan pada browser yang membulatkan scrollLeft. Perhitungan tombol memakai titik kartu terdekat sehingga perubahan ukuran subpiksel tidak menghasilkan langkah pendek yang salah.

## React Work Showcase — desain baru carousel

Carousel proyek diubah menjadi panggung editorial: informasi proyek di kiri, preview screenshot pada bingkai browser berlapis di kanan, indeks besar samar, dan deretan thumbnail di bawah. Pada HP, preview muncul lebih dulu dan informasi berada di bawah. Screenshot tetap utuh. Gambar berganti dengan animasi wipe/crossfade; judul dan deskripsi masuk bertahap; bingkai bereaksi pada hover dan drag. Semua gerakan dibatasi dan reduced motion mematikannya.

Komponen React baru `frontend/showcase.jsx` mendukung next/previous berulang, pilih thumbnail, drag mouse, swipe horizontal, ArrowLeft/ArrowRight dan Home/End. Thumbnail aktif ikut bergeser ke area terlihat. Scroll vertikal HP tetap native. Tidak ada autoplay. Filter kategori yang sudah ada tetap terhubung, dan tombol Lihat detail proyek membuka dialog asli dengan galeri serta data lengkap dari database. Fokus kembali ke tombol setelah dialog ditutup.

Konten diambil dari kartu PHP/MySQL yang dirender server. Kartu asli menjadi fallback tanpa JavaScript; saat React aktif, kartu asli disembunyikan dan dipakai sebagai sumber data serta koneksi dialog. Tidak ada data proyek dummy baru maupun perubahan SQL.

Untuk update dari versi sebelumnya, salin `index.php`, `assets/app.js`, `assets/react-hero.js`, dan `assets/anime-theme.css`, lalu Ctrl+F5. Jika mengedit source, salin juga folder `frontend/` lalu jalankan npm ci dan npm run build. Bundle produksi sudah disertakan sehingga npm tidak diperlukan untuk menjalankan portofolio.

Validasi: fixture browser memakai struktur PHP dan aset produksi pada 1440/390/320 px; next/previous, thumbnail, loop, drag, keyboard, dialog/fokus, filter, empty state, tanpa overflow, reduced motion, serta syntax PHP/JS/CSS. Pengujian server PHP dan MySQL langsung tetap dilakukan di Laragon/hosting.

## Revisi transisi halus dan sidebar berlekuk

Transisi showcase kini memakai perpindahan pendek dan crossfade berbasis transform/opacity; clip-path wipe dan filter blur saat pergantian dihapus untuk mengurangi repaint. Area judul, deskripsi dan tag memiliki tinggi stabil agar proyek dengan judul panjang tidak menggeser ukuran panel. Gambar tujuan disiapkan dengan Image.decode sebelum konten berganti; gambar tetangga dipersiapkan lebih awal. Klik cepat disimpan sebagai tujuan terbaru dan dijalankan setelah transisi aktif selesai, sehingga tidak memotong animasi atau menumpuk lapisan. Filter, preferensi reduced motion, dan unmount membatalkan pekerjaan transisi yang tertunda.

Sidebar desktop kini menyatukan menu dan profil dalam bingkai graphite berlekuk dengan panel sosial terpisah. Monogram A. mengikuti nama Alfi; link Home, Projects, Experience, Skills, About Me dan sosial tetap memakai fungsi/data yang sama. Pada HP, navigasi tetap horizontal agar tidak mengambil ruang konten.

Update dari versi showcase sebelumnya: salin `index.php`, `assets/react-hero.js`, dan `assets/anime-theme.css`, lalu Ctrl+F5. Source terbaru ada di `frontend/hero.jsx` dan `frontend/showcase.jsx`. Tidak ada perubahan database atau impor SQL.

Validasi browser pada 1440/390/320 px: carousel, thumbnail, keyboard, drag, modal/fokus, filter, empty state, reduced motion dan tanpa overflow. Pengukuran dengan judul berbeda memastikan tinggi panel tetap sama; klik cepat berulang mencapai tujuan akhir dan lapisan keluar dibersihkan setelah transisi. Syntax PHP/CSS dan build bundle produksi juga diperiksa. Pengujian memakai fixture struktur halaman PHP dan aset produksi; server PHP/MySQL langsung memerlukan Laragon atau hosting.

## Koleksi proyek berbentuk kipas — referensi Game Store

Bagian Selected Work sekarang mengikuti komposisi referensi: judul di tengah, kartu aktif lebih besar, dan kartu tetangga tersusun miring seperti kipas. Setiap kartu memakai gambar, kategori, periode, serta judul proyek dari database. Variasi aksen warna tetap lembut di atas graphite/biru portofolio. Logo, karakter game, mata uang, dan data toko dari referensi tidak ditambahkan.

Kartu merupakan elemen React yang tetap terpasang; perpindahan memakai transform/opacity sehingga posisi berubah mulus tanpa mengganti seluruh panggung. Klik kartu samping untuk memilihnya, lalu klik kartu aktif untuk membuka dialog detail asli. Tombol navigasi, indeks pilihan, keyboard, swipe, drag, filter kategori dan reduced motion tetap tersedia. Gambar tujuan disiapkan sebelum pergantian dan input cepat tetap diurutkan. Pada HP, kartu tengah tetap menonjol dengan preview kartu di sisi kiri/kanan, dan scroll vertikal tetap native.

Update dari versi sebelumnya: salin `index.php`, `assets/react-hero.js`, dan `assets/anime-theme.css`, lalu Ctrl+F5. Source yang berubah: `frontend/showcase.jsx` dan `frontend/sections.jsx`. Bundle produksi sudah disertakan, tidak perlu menjalankan npm untuk memakai website. Database, config.php dan uploads tidak berubah; tidak perlu impor SQL.

Pemeriksaan menggunakan fixture struktur PHP dan aset produksi pada 1440/390/320 px: next/previous, loop, indeks, keyboard, swipe/drag, filter, dialog dan pemulihan fokus, reduced motion, empty state, serta tidak ada overflow halaman. Pemilihan kartu samping dan pembukaan dialog lewat kartu aktif juga diperiksa. PHP/CSS lolos parser dan bundle React berhasil dibangun. Pengujian server PHP/MySQL langsung memerlukan Laragon/hosting.

## Revisi penghapusan elemen dan palet Mercedes 2019

Warna dasar kini mengikuti referensi: #004146 (hijau tua), #018076 (teal), #03BFB5 (turquoise), #949398 (abu-abu), dan #EFF5F9 (putih). Turunan gelap/terang dipakai untuk lapisan dan kontras. Tema diterapkan pada Home, Projects, Experience, Skills, About Me, footer, dialog, navigasi, serta halaman admin/login. Foto pribadi dan screenshot proyek tidak diubah warnanya; ilustrasi SVG dummy mengikuti palet baru.

Elemen yang dihapus sesuai screenshot: label ANIME CONCEPT dan ILLUSTRATION × CODE di bawah lobi; karakter anime dan backdrop ilustrasinya; penanda chapter 01/02/03/04; hitungan proyek dengan tombol panah di bawah kipas; teks “x dari x proyek”; bar kontrol pengalaman; hitungan “x dari x skill”. Kartu dan isi proyek/pengalaman tetap ada. Kipas proyek masih dapat dipilih lewat kartu, indeks kecil, swipe/drag serta keyboard. Experience masih memakai swipe/manual dan autoplay yang sudah ada. Pencarian/filter skill tetap berfungsi.

Lobi disusun ulang menjadi nama besar dan bio terpisah agar tidak meninggalkan ruang kosong setelah karakter dihapus. Ilustrasi anime tidak lagi dimuat oleh halaman. Foto About Me, profil, dan footer tetap berasal dari data admin.

Untuk memperbarui instalasi yang sudah ada, salin `index.php`, `about.php`, `assets/style.css`, `assets/anime-theme.css`, `assets/react-hero.js`, `assets/admin.css`, serta SVG dummy di `assets/images/notes-*.svg` dan `assets/images/portrait-dummy.svg`. Versi cache stylesheet pada file PHP di folder admin juga diperbarui; file tersebut disertakan. Source React yang berubah ada di folder frontend. Pertahankan config.php, folder uploads, dan database aktif; **tidak perlu impor SQL**. Setelah menyalin, lakukan Ctrl+F5.

Validasi: fixture browser dengan aset produksi pada 1440/390/320 px untuk Home dan About Me; elemen terhapus tidak ada di DOM, file anime tidak diminta browser, tidak ada overflow horizontal, pemilihan proyek lewat keyboard/indeks dan dialog masih bekerja, pencarian skill serta menu About Me tetap aktif. Tampilan admin/form diperiksa pada desktop/HP, 12 file PHP lolos pemeriksaan syntax dan 3 stylesheet lolos parser. Pengujian server PHP/MySQL langsung memerlukan Laragon atau hosting.

## Catatan revisi desain biru muda

Overview React baru ada di `frontend/overview.jsx`: tab Fokus/Kolaborasi/Lokasi, tautan About Me, IPK dari profil, dan kartu sertifikat berbentuk lembar dokumen. Tombol sertifikat membuka dialog data yang sama; kartu bertingkat lama menjadi fallback tanpa JavaScript.

Experience React baru ada di `frontend/experience.jsx`: daftar pilihan di kiri dan panel detail di kanan. Pada HP daftar bisa digeser horizontal dan detail berada di bawah. Filter kerja/organisasi memakai data lama. Pergantian otomatis setiap 6,5 detik hanya berjalan ketika panel terlihat; berhenti saat hover, fokus, tab browser tersembunyi, tombol Jeda aktif, atau prefers-reduced-motion. Keyboard panah memilih pengalaman dan spasi mengatur jeda. Pilihan aktif di HP ikut digeser ke area terlihat.

Sapaan pembuka (`frontend/welcome.jsx`) memiliki durasi terbatas dan fallback waktu; tanpa JavaScript atau dengan reduced motion tidak mengunci halaman. Font Caveat berasal dari Google Fonts dan disertai lisensi SIL OFL lokal. Foto pribadi dan screenshot proyek tidak diwarnai ulang. Admin, About Me, footer, modal, Skills dan kartu proyek mengikuti palet biru muda.

Validasi: build bundle produksi, syntax 12 file PHP/JS dan 4 stylesheet; fixture browser dengan markup PHP serta aset produksi pada lebar 1440, 390 dan 320 px untuk Home/About Me; urutan tiga sapaan, tab Overview, modal sertifikat, daftar/filter/keyboard pengalaman, autoplay, modal proyek, menu About Me, reduced motion dan tanpa overflow horizontal. Tampilan form/admin juga diperiksa. Pengujian PHP/MySQL langsung memerlukan Laragon/hosting.
