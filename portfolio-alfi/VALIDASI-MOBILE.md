# Pemeriksaan revisi HP — 21 Oktober 2026

Dasar perubahan: arsip portfolio-alfi.rar yang dikirim pada permintaan ini, diekstrak terpisah dari proyek percobaan sebelumnya. Perubahan tampilan berada pada assets/mobile-desktop.css, dimuat setelah sky-theme.css di index.php dan about.php.

Preview menggunakan bundle hero produksi dari arsip, source Overview arsip, ketiga stylesheet arsip, markup footer bersama, dan data representatif sesuai screenshot. Chromium diperiksa pada viewport 320, 390, 430, 720 dan 1440 px. Sidebar di kiri panel, bio di kanan, featured di dalam panel, Fokus/Sertifikat berdampingan, serta footer baris horizontal diperiksa. Tidak ada overflow horizontal atau pageerror. Tab Fokus/Kolaborasi, pemicu sertifikat, dan toggle LFJ tetap bekerja. Layout desktop 1440 px dibandingkan dengan fixture tanpa stylesheet tambahan dan memiliki ukuran/posisi identik.

Ruang kosong hero akibat min-height layar penuh dihilangkan khusus HP. Tinggi sidebar dan panel disamakan. PHP index/about diperiksa dengan php-parser PHP 8.3; stylesheet baru diperiksa dengan PostCSS. Backend PHP/MySQL tidak dijalankan di lingkungan ini; pengujian koneksi akhir dilakukan pada Laragon/server pengguna. Tidak ada perubahan skema/data database, admin, config, uploads, atau source/bundle React.


## Revisi keterbacaan dan pop-up Experience

- Hero HP: teks bio minimum 10,5 px, dipisahkan dari bidang fokus dan proyek unggulan. Overview memakai teks isi 12 px dan susunan kartu vertikal untuk HP. Footer dipertahankan.
- Detail Experience inline dihapus pada HP/desktop. Klik ikon membuka native dialog via React portal. Detail dikunci ke ikon yang dipilih; autoplay berhenti saat dialog terbuka. Escape/tombol silang menutup, scroll latar dikunci dan fokus kembali ke pemicu. Tab keyboard ditahan di dialog.
- Build React produksi berhasil. Chromium preview source produksi pada 320, 390, 430, 1440 px: ukuran font, batas kotak tanpa tumpang tindih, tidak ada overflow horizontal, tab Overview, dialog awal tertutup, konten sesuai ikon, 4 kontribusi, Escape/silang, fokus dan kategori diperiksa; tidak ada pageerror.
- Pemeriksaan PHP index/about (parser PHP 8.3) dan stylesheet (PostCSS) berhasil. Preview frontend memakai markup/data representatif; backend PHP/MySQL tidak dijalankan. Config, admin, data SQL dan uploads tidak diubah.

Pemeriksaan tambahan: swipe sentuh native Chromium pada 390 px tidak membuka pop-up; reduced motion menghentikan gerak otomatis dan tetap mendukung pop-up; klik backdrop menutup pop-up pada desktop.


## Dock HP dan panel desktop Experience

Navigasi hero dipindahkan ke bawah panel khusus HP. Desktop tetap memakai sidebar kiri. Panel detail Experience dikembalikan hanya pada viewport di atas 720 px; HP tetap memakai pop-up. Konten panel/pop-up menggunakan komponen bersama agar data jabatan, organisasi, periode dan kontribusi konsisten. Pergantian breakpoint menutup pop-up mobile saat masuk desktop.

Build React produksi berhasil. Preview Chromium menggunakan source produksi untuk posisi dock/sidebar, tampilan detail sesuai ukuran layar, pemilihan ikon, kategori, dan overflow horizontal. PHP index/about diperiksa dengan parser PHP 8.3 serta stylesheet dengan PostCSS. Backend PHP/MySQL tidak dijalankan; data, config dan admin tidak diubah.

Ukuran yang diperiksa untuk revisi dock/panel: 320, 390, 430, 768, 1440 px. Di HP, dock berada di bawah hero dan detail hanya terbuka lewat ikon. Di desktop, panel berisi empat kontribusi muncul di samping galeri dan klik ikon memperbarui panel tanpa pop-up. Filter kerja/organisasi tetap berfungsi. Config, file admin, SQL dan uploads dibandingkan byte per byte dengan arsip asli dan tetap identik.


## Pembersihan elemen dan navigasi atas HP

Build React produksi mencakup Hero, Sections, Overview, Showcase dan Experience. Filter skill kategori dihapus sekaligus state kategori yang tidak lagi dipakai; pencarian tetap berdasarkan seluruh data skill. Bagian bawah fan carousel dihapus dari JSX, pemilihan dan pembukaan kartu memakai handler lama.

Syntax index/about PHP dan parse stylesheet berhasil. Preview lengkap bundle produksi memakai struktur PHP representatif dengan enam proyek, lima pengalaman dan lima contoh skill. Pemeriksaan meliputi urutan navigasi HP, ketiadaan elemen yang diminta dihapus, judul My Project, pemilihan proyek via keyboard/kartu, pemicu detail melalui kartu aktif, filter Web Development termasuk BPKP, pencarian skill beserta hasil kosong/reset, serta detail pengalaman sesuai viewport. Pengujian backend PHP/MySQL tidak dilakukan di lingkungan ini.

Hasil final: Chromium pada 320, 390, 430 dan 1440 px lolos seluruh pemeriksaan tersebut tanpa pageerror atau overflow horizontal. Tampilan hasil diperiksa melalui screenshot internal. Admin, SQL, uploads dan config dibandingkan dengan arsip asli dan identik.


## Ringkasan profil dan Indonesia/English

- Tiga tab Overview diganti satu ringkasan yang memuat fokus, organisasi dan lokasi sekaligus. Header utama diganti wordmark sederhana dan tautan kontak.
- Label React diterjemahkan melalui helper t(); teks PHP dan salinan record publik melalui includes/i18n.php. Bahasa ID/EN disimpan dengan cookie dan dipakai oleh Home/About Me. Data JSON untuk modal proyek/sertifikat juga dilokalkan. Tidak ada perubahan skema/database.
- Build React produksi, pemeriksaan syntax empat file PHP publik, node --check app/language/about JS, parse JSON dan stylesheet berhasil.
- Pemeriksaan fungsional memakai PHP 8.3 WebAssembly untuk template PHP publik dan helper bahasa yang sebenarnya, dengan record fixture dari SQL asli menggantikan query MySQL. Cookie preferensi, penggantian bahasa Home/About Me, terjemahan profil/detail proyek/kontribusi/sertifikat serta pencarian diuji di Chromium. Koneksi MySQL tidak dijalankan.

Hasil final: viewport 320, 390, 1440 px lolos pergantian ID/EN, ringkasan gabungan, modal dan perpindahan halaman tanpa overflow horizontal atau pageerror. Perbaikan header kontak satu baris dicek ulang pada 390/1440 px. Tampilan diperiksa lewat screenshot internal. Admin, SQL, uploads dan config identik dengan arsip asli.


## Opening monogram MA

- Sapaan bergilir diganti SVG monogram MA; fallback HTML menampilkan logo yang sama sebelum React siap. Warna navy/biru muda mengikuti tema. Lebar logo responsif 108–156 px.
- Logo masuk selama 650 ms, ditahan hingga 1.300 ms sejak script mulai, lalu fade out 420 ms. Layar pembuka memudar setelah 300 ms, halaman mulai masuk setelah 500 ms. Overlay dan inert dibersihkan pada 800 ms setelah exit dimulai.
- Build React produksi dan node --check berhasil. Pengujian state/timer dengan DOM simulasi lulus untuk load normal, load terlambat, fallback, pemanggilan finish berulang dan intro yang dilewati. Preferensi reduced motion dan skip saat mengganti bahasa dipertahankan.
- Browser Chromium tidak tersedia pada sesi ini; tampilan/kelancaran aktual di perangkat belum diuji ulang. Database/admin/config/uploads identik dengan arsip asli.


## MA tebal dan penghapusan elemen screenshot 1–8

- MA menggunakan Manrope 800 lokal, ditampilkan lewat markup yang sama pada fallback HTML dan komponen React. Font dipreload; transisi/timer intro tidak diubah.
- Overview menghapus blok profil kecil, label motivasi dan dua CTA yang ditandai; judul sertifikat dan interaksi tombol koleksi dipertahankan. Footer ringkasan tetap memuat IPK bila tersedia.
- Pengantar carousel dihapus hingga hanya judul My Project. Simbol bintang ticker/carousel diganti titik. Perubahan berlaku pada ID/EN dan desktop/HP karena markup sumber yang sama.
- Build produksi dan node --check berhasil. Chromium menguji komponen React asli dengan stylesheet asli dan fixture profil/proyek pada 390 dan 1440 px: logo MA/font weight 800, inert selama intro, overlay dibersihkan, elemen yang dihapus tidak muncul, klik sertifikat diteruskan, navigasi keyboard carousel dan pembukaan kartu aktif bekerja. Tidak ada pageerror/overflow horizontal. Reduced motion melewati intro. Screenshot internal diperiksa untuk opening dan Overview pada kedua viewport.
- Uji ini memakai fixture frontend, bukan koneksi MySQL. Database, admin, config dan uploads identik dengan arsip asli.


## Hover kalimat About Me

Pilihan awal is-active dan aria-pressed serta handler pilihan persisten dihapus. Teks dibungkus span inline sehingga hover mengikuti area teks, bukan seluruh tombol. CSS membedakan warna diam #7b8fa0 dan aktif #24435f; titik penanda mengikuti hover/fokus. Aturan hover khusus perangkat pointer presisi menghindari hover tersimpan di HP. Transisi dinonaktifkan pada reduced motion.

Node --check assets/about.js lulus. Chromium menguji markup tombol aktual dari about.php dengan keempat stylesheet aktual pada 390/1440 px: kondisi awal netral, hanya satu kalimat tersorot, hover ruang kosong tidak aktif, kursor keluar menghapus highlight, Tab memindahkan highlight. Emulasi touch mengonfirmasi warna kembali netral setelah tap. Reduced motion, overflow horizontal dan pageerror juga diperiksa. Screenshot desktop diperiksa secara internal. Fixture ini tidak memakai koneksi MySQL; database/admin/config/uploads tetap identik dengan arsip asli.


## MA navigasi dan jam WIB

- Logo A. di hero diganti MA. Kartu counter proyek diganti komponen LiveClock, tanpa tautan ke proyek. Tampilan HH:MM:SS dan tanggal dibentuk dengan Intl.DateTimeFormat pada Asia/Jakarta. Interval 1 detik serta listener visibilitychange dibersihkan saat unmount; aria-live off mencegah pembacaan detik berulang oleh screen reader.
- Build produksi dan node --check lulus. Chromium memuat bundle Hero produksi dan stylesheet aktual dengan fixture profil pada 320/390/1440 px. Logo/href Home, role timer, ketiadaan tautan kartu, lebar konten jam, ketiadaan tabrakan dengan nama pada HP, overflow horizontal dan pageerror diperiksa. Screenshot internal 320/1440 diperiksa.
- Jam diuji dengan clock browser terkontrol melewati tengah malam. Waktu/tanggal mengikuti WIB walaupun zona browser America/New_York. Pergantian tanggal 21 ke 22 Oktober, terjemahan bulan ID/EN, pembaruan detik dan sinkronisasi saat visibilitychange lolos. Uji memakai fixture frontend; database tidak dijalankan.


## Logo MA rata tengah

Lebar anchor logo desktop diubah menjadi 100% dengan flex center; padding samping dihapus. Pada HP width auto dipertahankan. Chromium memuat bundle Hero produksi pada 320/390/1440 px setelah font siap. Pusat gabungan huruf M/A di desktop diperiksa terhadap pusat ikon Home dengan selisih kurang dari 2 px. Pemeriksaan overflow dan jam WIB sebelumnya juga lulus; screenshot desktop diperiksa secara internal.


## Page transition React

Komponen React Curtain dan koordinator navigasi baru dibangun sebagai assets/page-transition.js. Kedua halaman publik memuat boot kecil untuk mempertahankan lapisan saat navigasi PHP penuh. Arrival disimpan sementara per tab, dibatasi path dan umur 12 detik, lalu dihapus. Boot memiliki fallback 4.5 detik jika bundle tidak termuat. Navigasi Home yang datang melalui transisi melewati intro awal agar tidak ada animasi ganda. Halaman error setup About tidak memuat transisi.

Navigasi klik ditangani pada capture; handler Hero menghormati defaultPrevented agar tidak menggandakan klik navbar. Custom event menyiapkan reveal lama setelah pindah section. Pemilihan fokus ke target, pushState hash, abort/cancel animasi, pageshow BFCache dan reduced motion ditangani. Tidak ada scroll hijacking atau permintaan data SPA.

Build produksi kedua bundle serta node --check app/page-transition lulus. Chromium pada 390/1440 px memakai komponen Hero dan bundle transition produksi, boot aktual, stylesheet aktual, serta fixture dua halaman dengan About JS aktual. Pengujian lolos: opening pertama; fade saat klik section; satu perpindahan tanpa handler navbar ganda; hash/fokus target; pembatalan wheel; transisi PHP/Home–About; tautan About ke Home#projects tanpa intro berulang; Back tanpa overlay tersisa; reduced motion; dan ketiadaan overflow/pageerror. Screenshot internal lapisan pada HP/desktop diperiksa. Tautan email/download/bahasa/tab baru/admin/luar dikecualikan. Bundle sengaja diblokir untuk menguji fallback boot hingga halaman dapat dilihat lagi.

Uji menggunakan fixture frontend; koneksi MySQL tidak dijalankan. Admin, SQL, config dan uploads dibandingkan dengan arsip asli dan tetap identik.


## Scroll reveal Home dan About Me

Observer bersama di assets/scroll-reveal.js menggantikan observer reveal lama di app/about. Markup React diberi data-scroll-reveal pada heading/kartu Overview, root fan carousel, root pengalaman dan pencarian skill. MutationObserver mendaftarkan mount baru dan melepas node yang sudah dihapus. State disimpan di data-reveal-state, sehingga perubahan className dari React tidak menghapus status reveal.

Konten mendatang opacity 0 dan translate Y 22 px; muncul ketika mendekati 88% tinggi viewport. Dua IntersectionObserver memisahkan masuk layar dan reset setelah melewati margin 140 px agar tidak berkedip di tepi layar. Ambang masuk memakai pixel berdasarkan tinggi viewport dan diperbarui saat resize. Kelompok kartu diberi jeda maksimal 165 ms. Tidak ada overlay/page transition yang dipicu oleh scroll.

Boot menambahkan kelas awal sebelum render dan memiliki fallback 4.5 detik. Reduced motion melewati efek, fokus keyboard membuka ancestor yang diperlukan, dan print menampilkan seluruh konten. Animasi panel/skill lama dinonaktifkan ketika observer baru aktif agar tidak bertumpuk.

Build bundle React dan node --check scroll-reveal/app/about berhasil. Chromium pada 390/1440 px memuat Hero/Sections produksi dan stylesheet aktual dengan fixture profil/proyek/pengalaman/skill, serta About JS aktual. Lulus: konten React di luar viewport tersembunyi; reveal saat scroll; reset lalu masuk kembali; mount dinamis; klik sertifikat/proyek; pencarian skill; fokus keyboard; About reveal; reduced motion; tidak ada overlay saat scroll; tidak ada overflow/pageerror. Screenshot internal diperiksa. Tes page transition Home/About/navbar/Back/cancel dijalankan ulang bersama script reveal dan lulus. Koneksi MySQL tidak dijalankan; admin, SQL, config dan uploads tidak diubah.


## Video referensi: opening MA dan scroll wipe

Video 8 detik yang diunggah diperiksa melalui frame: referensi menampilkan bidang warna yang menyapu konten, bukan hanya fade berbasis ambang viewport. Mesin reveal diganti menjadi perhitungan progress scroll di requestAnimationFrame, dengan bidang biru lokal melalui pseudo-element, opacity dan gerak naik pendek. Tahap reveal mengikuti posisi scroll; latch dipakai setelah terbuka penuh, dan reset terjadi setelah elemen keluar dari viewport beserta margin. Perhitungan memperhitungkan translate yang sedang dirender agar tidak berosilasi. Near-bottom completion menjamin footer dan kartu terakhir tetap terbuka penuh walaupun tidak ada ruang scroll lanjutan. Completed blocks diperiksa ulang saat scroll besar agar reset tidak bergantung hanya pada notifikasi IntersectionObserver.

Opening dipisahkan dari app.js menjadi assets/opening.js, dipasang di kedua halaman melalui markup shared includes/opening-screen.php. Deteksi skip bahasa kini memakai penanda klik bahasa bertimestamp; parameter lang saja tidak lagi menonaktifkan opening. Welcome React dipasang oleh page-transition bundle agar berlaku pada About Me juga. Home/Sections bundle tidak memasang root Welcome kedua.

Build produksi, node --check opening/scroll-reveal/app/language/page-transition berhasil. Chromium pada 390/1440 px menguji: MA terlihat pada Home berparameter lang; inert selama opening; overlay dibersihkan; direct/reload About menampilkan MA; klik route/bahasa tidak memutar opening ganda; refresh sesudah ganti bahasa kembali menampilkan MA. Progress scroll diuji pada tiga posisi dan berhenti di tengah: skala bidang warna berkurang mengikuti input dan tetap sama ketika input berhenti. Tidak ada overlay page transition saat scroll. Footer terbuka penuh di akhir halaman. Reduced motion melewati kedua efek. Screenshot internal opening dan wipe setengah jalan diperiksa.

Pengujian fitur React dengan fixture profil/proyek/pengalaman/skill pada kedua viewport juga lulus: kondisi awal offscreen tersembunyi, scroll reveal/reset/re-entry, node dinamis, klik sertifikat/proyek, pencarian skill, ancestor yang difokuskan, About reveal, tanpa overflow/pageerror. Page transition Home/About/navbar/Back/cancel beserta pengecualian tautan dan fallback bundle juga diuji ulang dan lulus. Koneksi MySQL tidak dijalankan; database/admin/config/uploads tetap identik dengan arsip asli.


## My Project — coverflow 3D

JSX Showcase diganti menjadi kartu gambar/caption dan dock kontrol; handler pemilihan, pemuatan gambar, swipe dan pembukaan project-card sumber dipertahankan. CSS coverflow scoped pada .coverflow-showcase menimpa kipas lama dengan perspektif, rotateY dan kedalaman kartu. Caption/background kartu dibuat opak supaya teks kartu belakang tidak menembus kartu tengah. Dock dan tombol otomatis memiliki label ID/EN.

Autoplay memakai interval 6 detik yang dibersihkan ketika dependency/unmount berubah. Pemutaran memeriksa visibility viewport/tab, hover, fokus keyboard, modal terbuka dan state scroll reveal. Pemilihan manual/filter menjeda autoplay; toggle putar dapat melanjutkan. Observer dipasang kembali setelah filter kosong beralih menjadi ada proyek.

Build React produksi, node --check bundle dan parse JSON terjemahan berhasil. Chromium dengan bundle Hero/Sections dan stylesheet aktual memakai fixture enam proyek dari data SQL/gambar proyek lokal pada 320/390/1440 px. Lulus: lima kartu terlihat dari enam; pusat lebih dominan dengan matrix3d; next/previous/wrap; keyboard; drag/swipe; detail dari kartu aktif dan dock sesuai ID; filter serta recovery kosong/satu proyek; kontrol disable pada satu proyek; autoplay dan jeda; reduced motion; tidak ada overflow horizontal atau pageerror. Screenshot internal HP/desktop diperiksa menggunakan gambar proyek sendiri. Koneksi MySQL tidak dijalankan; database/admin/config/uploads tetap identik dengan arsip asli.


## Perbaikan tombol Play

Gate hover/fokus yang menyebabkan tombol Pause terlihat aktif tetapi kartu diam dihapus. Play eksplisit langsung memanggil pemilihan berikutnya, kemudian interval berjalan setiap 4 detik. Gate tab/viewport/modal/reveal serta reduced motion tetap dipertahankan.

Build React produksi dan node --check bundle lulus. Chromium pada 390/1440 px dengan bundle produksi menguji Play tanpa memindahkan kursor dari tombol: kartu bergeser segera dan bergeser lagi setelah interval; Pause menahan posisi lebih dari 4 detik. Enter pada tombol Play juga melanjutkan segera dan tetap memutar saat fokus berada di kontrol. Navigasi manual menghentikan autoplay dan reduced motion menonaktifkan tombol. Tidak ada overflow/pageerror. Backend tidak diubah.
