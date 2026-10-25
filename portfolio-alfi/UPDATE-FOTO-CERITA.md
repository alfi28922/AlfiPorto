# Foto cerita terpisah dan preview CV

1. Salin file terbaru sambil mempertahankan config.php dan semua uploads lama.
2. Pilih database aktif di phpMyAdmin, lalu impor database/update_story_photo.sql (tersedia juga sebagai update-foto-cerita.sql terpisah). Jangan impor ulang SQL utama.
3. Buka Admin → Foto About Me → Foto cerita — potret besar About Me. Upload foto yang berbeda lalu Simpan perubahan. Foto utama tetap mengatur Home dan pembuka About Me; foto cerita hanya mengatur potret besar pada bagian cerita. Upload/hapus keduanya saling independen.
4. Patch menyalin foto utama lama sebagai nilai awal foto cerita pada pemasangan pertama agar tampilan tidak kosong. Setelah itu, perubahan foto utama tidak memengaruhi foto cerita. Mengulang patch tidak mereset foto yang sudah Anda atur.
5. Tombol Preview CV di Home dan About Me membuka gambar halaman CV di pop-up dalam website, tanpa pindah tab atau memaksa download. Kenal lebih dekat dan Preview CV kini sejajar, termasuk pada HP.
6. Penggantian/penghapusan CV tetap melalui Admin → Profil & Kontak. Jika patch CV sebelumnya belum diimpor, jalankan database/update_cv.sql juga. Jika sudah, tidak perlu mengimpornya lagi.
