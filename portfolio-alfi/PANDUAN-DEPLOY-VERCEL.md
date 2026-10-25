# Setup portofolio di Vercel dengan backend PHP dan MySQL

Paket ini mempertahankan desain, konten, foto, admin, dan preview CV dari RAR terbaru Anda. Yang berubah adalah pengamanan dan persiapan deployment. Belum ada akun hosting atau deployment online yang dibuat oleh revisi ini.

## Arsitektur yang disiapkan

Browser → alamat Vercel → origin HTTPS yang menjalankan PHP → MySQL online.

Halaman publik, admin, foto upload, dan preview CV semuanya diteruskan ke origin yang sama. Karena itu admin tetap terhubung dengan website, tanpa menyalin konten menjadi HTML statis setiap kali ada perubahan.

PHP dalam proyek ini merender index.php/about.php, memakai sesi admin, dan menulis file upload ke disk. Upload source ini sebagai static website di Vercel tidak akan menjalankan PHP. Vercel Functions juga bukan disk permanen untuk upload. Folder deploy/vercel adalah gateway reverse proxy yang sudah disiapkan; PHP, database, dan upload tetap harus tersedia di origin. Ini tidak sama dengan migrasi seluruh backend ke Vercel Functions.

Dokumentasi resmi, diperiksa 26 Oktober 2026:
- https://vercel.com/docs/functions/runtimes
- https://vercel.com/docs/routing/rewrites
- https://vercel.com/docs/getting-started-with-vercel
- https://vercel.com/docs/project-configuration/project-settings

## 1. Siapkan origin PHP terlebih dahulu

Gunakan hosting yang mendukung PHP 8.3+, PDO MySQL, fileinfo, session, HTTPS, dan penyimpanan upload permanen. Paket ini menyediakan Dockerfile untuk Apache; hosting Apache yang mengizinkan .htaccess juga dapat dipakai. Pilihan penyedia dan biayanya belum ditentukan.

Jika masih memakai Render, origin harus menjalankan Docker/PHP dan mempunyai persistent disk untuk upload. MySQL harus tersedia secara online terpisah jika paket hosting tidak menyediakannya. Jangan menaruh upload hanya di filesystem container sementara. Untuk satu server gunakan disk permanen; beberapa replika memerlukan storage bersama untuk upload dan pembatasan login.

1. Pasang folder portfolio-alfi sebagai root origin, misalnya https://backend.domainanda.com/, bukan di subfolder.
2. Untuk Docker, gunakan file **Dockerfile**, bukan dockerfile.php. Hapus dockerfile.php lama bila masih tertinggal setelah menyalin revisi. Mount penyimpanan permanen ke /var/www/html/uploads. Aplikasi mendengarkan port 80; sesuaikan pengaturan target port penyedia.
3. Salin isi uploads lama dari ZIP ke disk permanen. Jangan hanya menyalin SQL: SQL menyimpan path, bukan isi file. Folder assets juga harus lengkap.
4. Gunakan MySQL online. Laragon/127.0.0.1 di laptop Anda tidak dapat dipakai sebagai database server publik ini. 127.0.0.1 hanya benar jika MySQL berjalan di server origin yang sama.
5. Untuk database BARU, impor database/portfolio_alfi.sql dari ZIP lewat phpMyAdmin atau klien MySQL penyedia. Snapshot ini mengikuti data RAR, tetapi akun/password admin sengaja tidak disertakan.
6. Untuk database AKTIF yang sudah berisi data Anda, backup dahulu dan pertahankan database itu. Tidak ada perubahan skema database untuk audit keamanan ini. Jangan impor ulang snapshot karena INSERT dapat berbenturan dengan ID yang sudah ada.
7. Gunakan akun database aplikasi dengan hak SELECT, INSERT, UPDATE, DELETE. Jalankan import menggunakan akun pengelola database, bukan memberi aplikasi hak GRANT/DROP.

## 2. Atur environment di origin PHP

Isi melalui dashboard/environment server. Jangan masukkan password ke Git atau chat. File .env.example hanya panduan nama variabel; aplikasi ini tidak otomatis membaca file .env.

| Variabel | Isi |
| --- | --- |
| APP_ENV | production |
| APP_SECURE_COOKIES | 1, karena origin dan alamat publik wajib HTTPS |
| DB_HOST | Host MySQL dari penyedia |
| DB_PORT | Biasanya 3306, ikuti penyedia |
| DB_DATABASE | Nama database |
| DB_USERNAME | User database aplikasi |
| DB_PASSWORD | Password database |
| DB_SSL_CA | Opsional: path absolut sertifikat CA di server, jika koneksi DB memakai TLS |
| ADMIN_SETUP_TOKEN | Token hex acak 64 karakter untuk membuat admin pertama |
| PRIVATE_STORAGE_PATH | Opsional: direktori privat di luar web root untuk rate limit login |
| ORIGIN_SECRET | Kosongkan dahulu saat mengetes origin; nanti sama dengan secret di Vercel |

Buat dua nilai acak yang BERBEDA untuk ADMIN_SETUP_TOKEN dan ORIGIN_SECRET. Di komputer yang mempunyai PHP, jalankan perintah ini dua kali dan simpan hasilnya secara privat:

```bash
php -r 'echo bin2hex(random_bytes(32)), PHP_EOL;'
```

Jangan menggunakan teks placeholder dari .env.example sebagai token. Jika memakai MySQL lintas jaringan, ikuti petunjuk TLS penyedia; DB_SSL_CA harus menunjuk file CA yang benar, verifikasi sertifikat tetap aktif.

## 3. Periksa origin sebelum masuk Vercel

1. Buka https://backend.domainanda.com/. Halaman harus tampil, bukan source PHP.
2. Jika database baru, buka /admin/setup.php, masukkan token setup serta username/password baru. Setup memerlukan token acak dan otomatis terkunci saat admin sudah ada.
3. Jika database lama masih menyimpan admin Anda, login seperti biasa lalu ganti password. Revisi ini membatalkan sesi lama sehingga perlu login ulang.
4. Hapus ADMIN_SETUP_TOKEN dari environment setelah admin siap. Halaman setup kemudian mengembalikan 403; ini perilaku yang diharapkan.
5. Uji upload/ganti/hapus foto dan CV. Tombol Preview CV harus menampilkan gambar halaman di pop-up.
6. Setelah restart/redeploy origin, pastikan foto/CV yang baru diupload masih ada. Jika hilang, mount disk belum benar.
7. Coba URL /database/portfolio_alfi.sql, /config.php, /.env, /Dockerfile, /includes/app.php, dan /frontend/package-lock.json. Semuanya harus 403/404, tidak boleh menampilkan isinya. Pengamanan folder bergantung pada konfigurasi Apache/.htaccess; jika hosting memakai Nginx, administrator server harus memasang aturan setara sebelum go live.

## 4. Masukkan kode ke GitHub

Gunakan repository privat untuk tahap setup. Jangan commit .env, backup SQL, atau file konfigurasi yang berisi password. .gitignore sudah disediakan; file yang TELANJUR pernah dicommit tidak otomatis hilang dari riwayat Git hanya karena ditambahkan ke .gitignore. Jika secret/password pernah masuk repository publik, rotasi nilainya dan bersihkan riwayat sebelum melanjutkan.

uploads dan database/*.sql sengaja diabaikan Git. Pindahkan foto upload serta SQL melalui kanal privat ke hosting; jangan mengharapkan GitHub memindahkan file yang diabaikan itu. Aset bawaan yang memang publik seperti gambar proyek/CV dalam assets tetap bagian dari website.

## 5. Atur gateway Vercel

1. Edit deploy/vercel/vercel.json. Ganti hanya domain GANTI-DOMAIN-BACKEND.invalid pada dest menjadi origin Anda, misalnya https://backend.domainanda.com/$1. Pertahankan /$1 dan seluruh transforms.
2. Origin harus berbeda dari domain Vercel yang sedang Anda buat agar tidak terjadi loop proxy. Jangan isi localhost atau alamat Laragon.
3. Login Vercel → Add New / New Project → Import repository GitHub.
4. Framework Preset: Other. Root Directory: **deploy/vercel** jika index.php berada di root repository; jika repository membungkusnya dalam folder portfolio-alfi, gunakan **portfolio-alfi/deploy/vercel**.
5. Build Command: node assert-config.mjs. Output Directory: public. Tidak perlu npm install/build React untuk folder gateway ini; aset React produksi sudah ada pada origin.
6. Tambahkan environment **ORIGIN_SECRET** berupa nilai hex acak 64 karakter. Jika memakai Preview Deployments juga, atur pada environment Preview yang relevan. Nilai ini berbeda dari token setup admin.
7. Deploy. Pemeriksaan build sengaja gagal jika domain masih placeholder atau secret belum diatur. Root proyek PHP juga mempunyai pengaman build agar tidak keliru diterbitkan sebagai file statis. Jangan menonaktifkan pemeriksaan tersebut untuk memaksa deploy.
8. Isi ORIGIN_SECRET pada hosting PHP dengan nilai yang SAMA, lalu restart/redeploy origin sesuai fasilitas penyedia. Konfigurasi Vercel meneruskan secret sebagai header; tidak ada password database di Vercel.
9. Setelah keduanya cocok, URL publik Vercel harus membuka portfolio. Permintaan langsung ke endpoint PHP origin tanpa secret akan ditolak 403. Aset gambar/CSS yang memang publik tetap dapat diakses; ini bukan rahasia.
10. Halaman admin tersedia di https://nama-proyek.vercel.app/admin/login.php. Semua form dan preview memakai alamat relatif sehingga tetap menuju origin yang sama lewat Vercel.

Jika memakai custom domain, tambahkan lewat pengaturan Domains Vercel dan ikuti catatan DNS yang ditampilkan akun Anda. Jangan mengarang record DNS sebelum domain/proyek yang benar dipilih.

## 6. Uji setelah online

- Home, About Me, pergantian bahasa, project, sertifikat dan preview CV tampil.
- Login admin berhasil dengan cookie Secure/HttpOnly/SameSite=Lax.
- Edit satu teks, refresh website, lalu kembalikan teksnya.
- Ganti foto/CV, pastikan preview memakai file baru dan file bertahan setelah redeploy origin.
- Logout bekerja, dan membuka admin tanpa login kembali meminta login.
- URL SQL/config/internal tidak dapat dibaca melalui origin maupun domain Vercel.
- Ulangi pengujian di HP. HTTPS harus aktif di kedua host.

## Jika muncul kendala

| Gejala | Pemeriksaan |
| --- | --- |
| Build Vercel menolak root | Pilih deploy/vercel sebagai Root Directory |
| Build menolak placeholder | Ubah dest ke domain HTTPS origin yang nyata |
| Akses origin ditolak / 403 pada semua halaman PHP | Samakan ORIGIN_SECRET pada Vercel dan origin, lalu redeploy; jangan tampilkan nilainya di screenshot |
| Setup admin 403 | Ini normal setelah token dinonaktifkan; untuk database baru, atur token 64-hex sementara |
| Login kembali terus | Pastikan HTTPS, cookie Secure, sesi PHP dapat ditulis, serta cache admin tidak diaktifkan |
| Too many login attempts / 429 | Tunggu sampai jendela 15 menit berakhir; cookie baru tidak mereset pembatasan |
| Database gagal | Periksa env DB, firewall koneksi MySQL, user/password, nama DB dan pengaturan TLS |
| Foto hilang sesudah redeploy | Isi uploads harus berada di disk permanen; database hanya menyimpan path |
| Foto ada path di admin tetapi tidak tampil | Cocokkan file fisik di origin dengan path pada DB; jangan mengimpor ulang SQL untuk menutupi file yang belum disalin |

Konfigurasi ini sudah disiapkan, tetapi pengujian jaringan Vercel/origin/MySQL produksi belum bisa dilakukan sebelum Anda memilih dan menyiapkan hosting tersebut. Tidak ada jaminan keamanan absolut; tetap gunakan backup, pembaruan dependency, dan password unik.
