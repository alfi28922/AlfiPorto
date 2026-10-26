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


## Revisi terbatas — Side Notes, My Project, indikator scroll

- Side Notes pada HP tetap memakai susunan kipas seperti desktop. Lebar, jarak dan sudut foto diperkecil sesuai lebar layar; berlaku untuk ID dan EN.
- My Project mendukung autoplay (sekitar 4 detik per proyek) dan swipe/drag dua arah. Setelah interaksi manual, autoplay menunggu minimal 6,5 detik tanpa interaksi, lalu lanjut pada tick berikutnya. Autoplay hanya berjalan saat carousel terlihat, tab aktif dan tidak ada dialog terbuka; preferensi reduced motion tetap dihormati.
- Indikator scroll di HP menjaga jarak 16 piksel di atas floating navbar berdasarkan tinggi navbar sebenarnya, termasuk posisi safe area. About Me tidak memiliki navbar bawah sehingga indikatornya tetap dekat bawah layar.
- Data, gambar, CV, SQL, halaman lain dan pengaturan Vercel tidak diubah.

Untuk memperbarui: ganti folder portfolio-alfi-static pada repository dengan folder dalam ZIP ini, Commit lalu Push ke branch yang terhubung dengan Vercel. Tunggu deployment terbaru Ready, lalu muat ulang website di HP. Root Directory dan Output Directory tetap seperti sebelumnya.

Pemeriksaan: layout Side Notes 320px, carousel 384px (swipe dua arah, autoplay dan lanjut otomatis setelah manual), jarak indikator/navbar, validasi semua file media. Pengujian browser ini tidak menggantikan pengujian sentuhan Safari di iPhone fisik.


## Revisi swipe native dan kesamaan bahasa

- Side Notes ID/EN menggunakan stylesheet baru yang sama. Kipas foto HP tidak lagi bergantung pada progres scroll; susunan dan batas foto sama untuk kedua bahasa.
- My Project pada layar <=720px memakai overflow horizontal native dan scroll snap. Touch tidak memakai pointer capture atau transform drag buatan, sehingga browser mengatur momentum dan arah swipe. Drag mouse pada track tetap tersedia; desktop mempertahankan carousel sebelumnya.
- Autoplay dan jeda setelah interaksi manual tetap tersedia. Aset baru bernama react-hero-native-v3.js dan mobile-interaction-v3.css untuk menghindari penggunaan kode lama dari cache.
- Data, foto, CV, pengaturan Vercel dan jarak floating navbar tidak diubah.

Update dengan mengganti seluruh folder portfolio-alfi-static dari ZIP, Commit dan Push. Tunggu deployment commit terbaru Ready sebelum membuka ulang halaman Indonesia maupun Inggris di HP.

Pemeriksaan: geometri empat foto ID/EN sama di viewport 320px; drag track pada 384px dan pemeriksaan handler touch agar tidak melawan scroll native. Safari/iPhone fisik tetap perlu dicoba setelah deploy.


## Side Notes HP — revisi 4

Galeri HP menggunakan empat foto yang sama, dengan posisi kipas tetap seperti referensi. Markup dan CSS khusus HP dipisahkan dari kelas foto lama agar tidak ikut transform/reveal/penyebaran scroll. Berlaku sama untuk bahasa Indonesia dan Inggris. Galeri desktop tetap seperti sebelumnya; carousel proyek dan bagian lain tidak diubah.

Diperiksa pada viewport 320 dan 414 piksel: semua foto terbaca dan keempat bingkai berada dalam batas galeri. Ganti seluruh folder portfolio-alfi-static di repository, commit/push, tunggu deployment terbaru Ready lalu buka ulang halaman About Me di HP.
