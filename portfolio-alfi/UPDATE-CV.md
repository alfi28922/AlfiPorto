# Update CV

1. Salin file ZIP terbaru ke folder portofolio. Pertahankan config.php dan seluruh folder uploads yang sudah ada.
2. Di phpMyAdmin, pilih database portofolio aktif. Impor database/update_cv.sql, bukan SQL utama. Patch menambah kolom profile.cv_file dan mengaktifkan PDF CV bawaan pada pemasangan pertama. Aman dijalankan ulang; CV yang sudah diganti/dihapus di admin dipertahankan.
3. Buka Admin → Profil & Kontak → CV — dokumen PDF. Pilih PDF maksimal 10 MB, lalu Simpan perubahan.
4. Tombol Preview CV muncul di dekat bio halaman utama dan About Me. CV ditampilkan sebagai gambar halaman di pop-up dalam website. Gunakan tombol halaman untuk melihat lembar berikutnya. Tidak berpindah tab dan tidak memaksa unduhan.
5. Untuk mengganti, upload PDF baru lalu simpan. Untuk menghapus dari website, centang Hapus CV lalu simpan. File lama tidak dihapus secara fisik agar tautan/referensi lain tidak rusak.

CV Word yang Anda kirim sudah dikonversi ke PDF dua halaman di assets/cv/muhammad-alfi.pdf, tanpa mengubah isinya. Setelah patch diimpor, tombol Preview CV langsung tersedia. Jika CV dihapus lewat admin, tombol unduh ikut disembunyikan.

Tidak perlu impor ulang SQL sertifikat. Tautan Lihat sertifikat di kartu publik sudah dihapus; tombol preview buram tetap tersedia. Pada HP, daftar sertifikat menjadi satu baris kartu landscape yang digeser mendatar, sehingga tidak perlu menggulir daftar panjang ke bawah. Dokumen sertifikat lama tetap disimpan di admin/database.
