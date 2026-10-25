# Update sertifikat dan Content Studio

## Database yang sudah dipakai

1. Salin file ZIP lengkap. Pertahankan `config.php` dan folder `uploads` milikmu. Pastikan dua folder baru `assets/certificates` dan `assets/images/certificates` ikut tersalin.
2. Pilih database yang tercantum di `config.php` melalui HeidiSQL/phpMyAdmin.
3. Jalankan **database/update_certificates.sql** (isinya sama dengan file terpisah **update-sertifikat.sql**).
4. Buka admin → Sertifikat atau tombol sertifikat di website. Tekan Ctrl+F5.

Gunakan patch sertifikat saja untuk database aktif; tidak perlu impor ulang SQL utama. Patch menambah/melengkapi 20 dokumen dan badge dari arsip. Data sertifikat lain tidak dihapus. Sertifikat lama yang judulnya cocok (IoT, Cloud & AI, dan HIMTI Mengajar) dilengkapi dokumennya agar tidak menjadi duplikat. Pengulangan patch tidak menambah baris dengan judul/path sama. Data proyek, profil, akun, foto About Me, dan pengalaman tidak disentuh.

Untuk instalasi baru saja, `database/portfolio_alfi.sql` sudah mencakup pembaruan sertifikat ini. File tersebut bukan ekspor perubahan terbaru dari database lokalmu.

## Admin baru

Sidebar navy, dashboard dengan jumlah data sebenarnya, ringkasan konten terbaru, pencarian daftar, menu HP, tombol tampilkan password, dan form dengan tombol simpan yang mudah dijangkau. Semua CRUD dan opsi hapus foto tetap tersedia.

Pada **Sertifikat**:
- Foto sertifikat adalah preview yang tampil pada website; JPG/PNG/WebP maksimal 5 MB.
- Dokumen sertifikat / tautan dapat berisi URL http(s), file asli bawaan, atau PDF yang diupload lewat form.
- Upload PDF maksimal 10 MB. Jika ditolak oleh server, sesuaikan `upload_max_filesize` minimal 10M dan `post_max_size` minimal 24M pada PHP hosting/Laragon.
- Centang Hapus dokumen / tautan ini lalu Simpan perubahan untuk melepas dokumen. File bersama tidak dihapus secara fisik.
- Untuk PDF baru, isi preview gambar secara terpisah; thumbnail otomatis sudah dibuat untuk seluruh dokumen arsip ini.

Delapan PDF asli dipertahankan lengkap, termasuk halaman lampiran. Dua belas file gambar asli juga disertakan. Dua puluh preview disiapkan untuk website. Tanggal yang tidak tercantum dibiarkan kosong. Sertifikat pelatihan Cloud/AI dan sertifikat microcredential disimpan terpisah karena merupakan dua dokumen penghargaan yang berbeda.

## Daftar dokumen

| Sertifikat / badge | Periode tercantum | File sumber |
| --- | --- | --- |
| Panitia — Workshop on Computer Vision: Hand Gesture Game Controller | 2026 | (Bulk 1) (7).pdf |
| Web Developer Series 11.0 — Frontend | Tidak tercantum | 05eace36-55aa-4fcc-ad38-3ad5efd5156d.pdf |
| Panitia — HIMTI Mengajar bersama Indonesia Plastic Recycle | 2025 | 12.png |
| Panitia — Development of an IoT-Based Smart Trash Can | 29 Agustus 2024 | Development Of an IOT-Based Smart Trash Can.PNG |
| Introduction to Cloud and Artificial Intelligence Applications for Digital Business | 2024 | Introduction to Cloud and Artificial Intelligence Applications For Digital Business.pdf |
| Microcredential — Introduction to Cloud and Artificial Intelligence Applications for Digital Business | 2024 | MUHAMMAD ALFI - 1969555850-684.pdf |
| Keypro 30 — Peran UI/UX dalam Membangun Produk yang Sukses | 2024 | MUHAMMAD ALFI(1).png |
| Panitia — HIMTI Goes to School | Oktober 2024 | Muhammad Alfi 2.png |
| Industrial Visit FTKI × BRIN | 2026 | Muhammad Alfi(1).pdf |
| Sharing Session — Belajar dari Pengalaman: Sukses Mengikuti Magang dan Studi Independen | 19 Februari 2025 | Muhammad Alfi(2).pdf |
| Panitia — Brainstorming Enhances Quality and Collaboration | 26 Februari 2025 | Muhammad Alfi(2).png |
| Indonesia Viz Idol 2026 — Peserta Kompetisi Visualisasi Data | 27 November 2025 | Muhammad Alfi.jpeg |
| Panitia — Build Your First AI Project: Creating a Smart Chatbot | 24 Januari 2026 | Muhammad Alfi.pdf |
| Sharing Session — Robotic Home Industry | 27 Juni 2024 | Muhammad Alfi.png |
| APPRODI Book Club — Navigating Productivity in Campus | 5 Desember 2025 | PHOTO-2025-12-08-09-52-57.jpg |
| Penghargaan Pengurus HIMTI — Subdivisi Minat dan Bakat | 2024/2025 | Sertifikat HIMTI 2024-2025 M. Alfi.pdf |
| From Theory to Implementation: Building Practical Programming Skills | 17 Januari 2025 | Sertifikat Muhammad Alfi.pdf.png |
| Develop GenAI Apps with Gemini and Streamlit | Tidak tercantum | develop-genai-apps-with-gemini-and-streamlit-skill-.png |
| Prompt Design in Vertex AI | Tidak tercantum | prompt-design-in-vertex-ai-skill-badge(1).png |
| Pengenalan Lingkungan Budaya Akademik | 21–22 September 2023 | sertifikat_plba20231.jpeg |

## Validasi

Metadata diperiksa dari halaman dokumen. Patch dijalankan dua kali pada fixture SQLite tanpa duplikat; PHP menggunakan adapter SQLite hanya dalam pengujian. Login, menu HP, pencarian daftar, tambah/edit/hapus sertifikat, upload PDF asli, hapus dokumen, penolakan PDF tidak valid, CSRF, dan tautan PDF publik diuji dengan PHP 8.3 serta browser pada 320, 390, 768, dan 1440 px. MySQL/MariaDB tidak dijalankan pada lingkungan pengujian; paket produksi tetap memakai MySQL melalui config.php.
