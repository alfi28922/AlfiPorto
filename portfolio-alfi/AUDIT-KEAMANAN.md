# Audit keamanan portofolio

Tanggal pemeriksaan: 26 Oktober 2026. Sumber: RAR portfolio-alfi(1).rar yang diunggah pada revisi ini. Pemeriksaan ini bukan sertifikasi atau jaminan bebas seluruh celah. Desain tidak didesain ulang; aset foto/dokumen dipertahankan.

## Temuan dan perbaikan

| Temuan | Perbaikan |
| --- | --- |
| Login hanya dibatasi di session sehingga cookie baru melewati batas | Penghitung file privat dengan flock, dibagi antarsesi/worker pada satu origin; 6 percobaan per username dan 20 per IP dalam 15 menit |
| Setup akun pertama dapat dibuka siapa pun sebelum ada admin | Setup memerlukan ADMIN_SETUP_TOKEN acak 64-hex pada server dan form; otomatis terkunci setelah admin pertama, dapat dimatikan dengan menghapus env |
| Sesi admin tidak memiliki waktu kedaluwarsa aplikasi | Idle 30 menit dan masa absolut 8 jam, strict session ID, cookie-only, rotasi ID saat login/perubahan password |
| Sesi lain tetap aktif setelah password berubah | Fingerprint hash password diperiksa pada request admin; password yang berubah membatalkan sesi lama |
| HTTPS di belakang proxy dapat salah mendeteksi cookie | APP_SECURE_COOKIES untuk hosting HTTPS tepercaya; tidak mempercayai header forwarded sembarang |
| SQL bawaan memuat hash akun admin saat ini | INSERT akun/hash admin dihapus dari snapshot yang dikirim; buat admin sendiri untuk database baru. Akun pada DB aktif tidak dihapus |
| Kredensial produksi belum diwajibkan | config.php memakai environment, menolak env DB kosong pada production; contoh tanpa secret dan gitignore disediakan |
| URL/gambar lama dalam DB langsung ditampilkan | Sanitasi data saat dibaca, blokir URL berbahaya dan path traversal, tetap escape HTML / JSON_HEX untuk data halaman |
| Pengamanan response belum lengkap | no-store untuk PHP dinamis/admin, nosniff, DENY framing, referrer/permissions policy, CSP, HSTS pada production HTTPS |
| Validasi upload masih dapat diperketat | MIME, ukuran, is_uploaded_file, signature PDF, batas dimensi gambar, nama acak; penolakan executable/SVG melalui aturan uploads |
| Recipe container bernama dockerfile.php | Diubah menjadi Dockerfile, modul Apache/proteksi folder dan batas upload PHP dikonfigurasi |
| Risiko source PHP/SQL tersebar ketika deploy sebagai static site | Gateway Vercel terpisah, build root PHP ditolak, file internal diblokir pada Apache, origin-secret diperiksa pada endpoint PHP |

Query CRUD tetap memakai prepared statements; nama tabel berasal dari allowlist. CSRF dan hash password bcrypt tetap dipakai. Penghapusan referensi foto/CV tidak menghapus fisik file bersama yang mungkin masih dipakai bagian lain.

CSP masih mengizinkan unsafe-inline untuk script/style karena implementasi existing memakai script/style inline. Karena itu CSP ini merupakan lapisan tambahan, bukan pengganti escaping output. File PDF diproses oleh PDF.js lokal; preview CV tetap berupa gambar dalam pop-up.

## Validasi yang dijalankan

- Parsing seluruh file PHP proyek dengan target PHP 8.3.
- Pengujian HTTP/browser menggunakan PHP 8.3 dalam lingkungan terisolasi. Untuk database pengujian digunakan adaptor SQLite; kode MySQL produksi tidak diubah menjadi SQLite dalam paket.
- Admin anonim diarahkan ke login; POST tanpa CSRF ditolak 403.
- Setup dinonaktifkan bila token belum diatur.
- Percobaan login salah ke-7 ditolak 429 meskipun cookie dihapus pada tiap percobaan.
- Input SQL injection pada login tidak menghasilkan login.
- Cookie session HttpOnly, SameSite=Lax, path /; flag Secure dan HSTS diperiksa pada konfigurasi production HTTPS.
- POST admin dengan CSRF salah ditolak.
- Upload SVG/script dan PDF palsu ditolak; CV lama tetap tersimpan saat upload gagal.
- PDF asli dapat diunggah dan dirender sebagai gambar pada pop-up, termasuk saat CSP aktif.
- URL javascript dan path gambar traversal dibersihkan saat data dibaca.
- Pergantian password berhasil, session ID berubah, dan sesi dengan fingerprint lama tidak lagi diterima.
- Origin PHP menolak request tanpa secret ketika ORIGIN_SECRET aktif; request dengan secret yang cocok diterima.
- Validator gateway menolak domain placeholder, menerima format origin HTTPS yang sudah diisi, dan pengaman menolak deployment root PHP.
- npm audit pada lockfile frontend: 0 advisory yang dilaporkan pada waktu pemeriksaan. Ini hanya mencakup dependency pada lockfile npm, tidak membuktikan semua library/runtime bebas celah.
- Hash seluruh aset gambar, PDF, dan file uploads dibandingkan dengan RAR sumber agar aset pengguna tidak berubah.

## Batas validasi dan syarat sebelum online

MySQL produksi, konfigurasi Apache yang benar-benar aktif pada hosting, Vercel proxy, DNS, TLS provider, dan persistensi disk penyedia belum diuji end-to-end. Tidak ada deployment online dilakukan. Lakukan uji URL sensitif, login/CRUD, preview dan persistensi upload seperti pada PANDUAN-DEPLOY-VERCEL.md setelah origin tersedia.

Pembatasan login berbasis file ditujukan untuk satu origin atau storage bersama yang mendukung locking. Untuk beberapa replika yang tidak berbagi file, gunakan limiter terpusat sebelum menambah replika. Jangan aktifkan CDN cache pada halaman admin/form/PHP dinamis.

.env/DB_PASSWORD/ORIGIN_SECRET/token setup jangan dimasukkan ke Git, screenshot, atau chat. Jika pernah dipublikasikan di repository, ganti nilainya; menghapusnya dari versi terbaru tidak membersihkan riwayat. Gunakan password admin unik dan backup database serta uploads. SQL paket untuk DB baru, bukan update yang harus diimpor ke DB aktif.
