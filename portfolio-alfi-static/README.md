# Portfolio Alfi — versi statis

Versi sementara tanpa admin, PHP, Laragon, dan MySQL. Desain serta interaksi publik dipertahankan: opening MA, transisi, scroll reveal, proyek/filter/detail, pengalaman, skill, sertifikat, About Me, pilihan ID/EN, jam realtime dan preview CV.

Data berasal dari SQL dalam RAR yang dikirim: 1 profil, 1 About Me, 6 proyek, 5 pengalaman, 12 skill, 20 sertifikat. Semua folder media disertakan. Sertifikat pertama memang tidak memiliki gambar di data asal. Data yang hanya tersimpan di MySQL lokal Anda setelah ekspor terakhir tidak bisa diambil dari RAR ini.

## Menjalankan di komputer

1. Ekstrak ZIP. Buka folder `portfolio-alfi-static` di VS Code.
2. Dengan ekstensi Live Server, klik kanan `public/index.html`, pilih Open with Live Server.
3. Alternatif jika Python tersedia: buka terminal di folder ini, jalankan `python -m http.server 8000 --directory public` (Windows juga bisa `py -m http.server 8000 --directory public`). Buka http://localhost:8000.
4. Tidak perlu menyalakan Laragon/MySQL atau mengimpor SQL. Gunakan server lokal agar preview PDF dan animasi bekerja; jangan hanya klik dua kali HTML.

## Deploy Vercel melalui GitHub

1. Tambahkan folder `portfolio-alfi-static` hasil ekstrak ke repository GitHub, commit lalu push. Folder `public` harus tetap di dalamnya.
2. Di project Vercel > Settings > Build and Deployment, ganti Root Directory ke lokasi folder tersebut, misalnya `portfolio-alfi-static`. Jika diletakkan di folder lain, sesuaikan lokasinya.
3. Framework Preset: Other. Build Command dan Install Command: kosong. Output Directory: `public`. Konfigurasi ini juga tersedia di vercel.json.
4. Hapus pengaturan proxy PHP lama, Build Command `node assert-config.mjs`, serta environment variable ORIGIN_SECRET/ORIGIN_URL jika sebelumnya dipakai. Versi ini tidak memerlukan environment variable.
5. Deploy/redeploy. Gunakan alamat bawaan `.vercel.app`; domain sendiri dan hosting PHP tidak diperlukan.
6. Coba Home, About Me, bahasa, proyek, sertifikat, preview CV serta tampilan HP. Jika masih muncul versi lama, cek Root Directory dan commit yang dideploy.

## Data dan perubahan berikutnya

- File website yang dilayani hanya `public/`. Tidak ada login/admin atau koneksi database.
- `public/data/portfolio.json` menyimpan salinan semua konten publik sebagai referensi/cadangan. HTML sudah dihasilkan dari data ini: mengedit JSON saja belum mengubah tampilan. Untuk saat ini edit HTML ID/EN dan data JSON yang ditanam pada halaman secara konsisten, atau minta ekspor ulang dari SQL terbaru.
- Mengganti foto paling mudah dengan menimpa file gambar di lokasi yang sama, lalu commit/push ulang. Untuk CV, ganti `public/assets/cv/muhammad-alfi.pdf` dengan nama yang sama.
- `backup-data/portfolio_alfi.sql` berada di luar public dan tidak dilayani Vercel. Simpan RAR asli sebagai cadangan lengkap PHP/admin. Admin bisa dikembalikan nanti menggunakan versi asli beserta database; versi statis ini terpisah.
- Jangan masukkan config.php, kredensial database, SQL cadangan atau folder admin ke public.

Dokumentasi pengaturan build Vercel: https://vercel.com/docs/builds/configure-a-build
