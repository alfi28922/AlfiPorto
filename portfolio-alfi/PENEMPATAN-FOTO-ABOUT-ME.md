# Penempatan enam foto About Me

Foto bernomor mengikuti urutan kiriman di chat.

| Foto | Isi foto | Tempat tampil | Pengaturan admin |
| --- | --- | --- | --- |
| 1 | Selfie cermin, jaket cokelat | Potret pembuka About Me dan foto besar di bagian cerita | Foto utama |
| 2 | Bunga di meja | Side Notes kiri/posisi 1, Small details | Side Notes 1 — foto/keterangan |
| 3 | Selfie cermin, batik dan jaket | Foto kecil pendamping di bagian cerita | Foto pendamping |
| 4 | Gunung dan langit biru | Side Notes posisi 2, Mountain days | Side Notes 2 — foto/keterangan |
| 5 | Hutan dan papan informasi | Side Notes posisi 3, Forest walks | Side Notes 3 — foto/keterangan |
| 6 | Selfie memakai helm | Side Notes kanan/posisi 4, On the road | Side Notes 4 — foto/keterangan |

## Pengelolaan foto

Panel contoh Enam foto kiriman sudah dihapus. Data foto yang telah disimpan tetap digunakan dan tidak perlu diimpor lagi. Salin paket dengan mempertahankan config.php dan uploads, lalu buka Admin → Foto About Me untuk mengubah tiap posisi.

Foto utama juga dipakai sebagai foto profil di Home.

## Mengganti lagi nanti

Gunakan kolom upload pada posisi yang ingin diganti, lalu **Simpan perubahan**. Empat caption Side Notes juga bisa diedit masing-masing. Centang **Hapus foto ini** dan simpan untuk mengosongkan satu posisi. Slot Side Notes yang kosong memakai ilustrasi bawaan tanpa menggeser foto di posisi lain. Tidak ada pemasangan foto otomatis saat halaman dimuat ulang.

Data foto utama/pendamping tetap memakai kolom `image` dan `image_secondary`; empat posisi Side Notes beserta caption memakai JSON `hobbies`. Data galeri lama berbentuk daftar path tetap dibaca. File foto bersama tidak dihapus dari disk ketika salah satu referensinya dikosongkan.
