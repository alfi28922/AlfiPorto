-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for portfolio_alfi
CREATE DATABASE IF NOT EXISTS `portfolio_alfi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `portfolio_alfi`;

-- Dumping structure for table portfolio_alfi.about_me
CREATE TABLE IF NOT EXISTS `about_me` (
  `id` tinyint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `intro` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hero_name` text COLLATE utf8mb4_unicode_ci,
  `hero_subtitle` text COLLATE utf8mb4_unicode_ci,
  `tagline` text COLLATE utf8mb4_unicode_ci,
  `specialties` longtext COLLATE utf8mb4_unicode_ci,
  `skill_highlights` longtext COLLATE utf8mb4_unicode_ci,
  `image_secondary` text COLLATE utf8mb4_unicode_ci,
  `footer_image` text COLLATE utf8mb4_unicode_ci,
  `hobbies` longtext COLLATE utf8mb4_unicode_ci,
  `image_story` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table portfolio_alfi.about_me: ~1 rows (approximately)
INSERT INTO `about_me` (`id`, `title`, `intro`, `body`, `image`, `hero_name`, `hero_subtitle`, `tagline`, `specialties`, `skill_highlights`, `image_secondary`, `footer_image`, `hobbies`, `image_story`) VALUES
	(1, 'Sedikit cerita tentang saya.', 'Selamat datang di halaman About Me. Ini adalah pengantar dummy yang bisa diganti melalui admin.', 'Halo! Halaman ini disiapkan untuk menceritakan perjalanan, minat, dan cara saya bekerja.\n\nBagian ini masih berupa konten dummy. Nantinya saya akan menambahkan cerita pribadi, hal yang sedang dipelajari, dan arah yang ingin saya kembangkan.', 'assets/images/about-alfi-main.png', NULL, NULL, NULL, NULL, NULL, 'assets/images/about-alfi-secondary.png', '', '[{"image":"assets\\/images\\/about-note-details.png","caption":"Small details"},{"image":"assets\\/images\\/about-note-mountain.png","caption":"Mountain days"},{"image":"assets\\/images\\/about-note-forest.png","caption":"Forest walks"},{"image":"assets\\/images\\/about-note-road.png","caption":"On the road"}]', 'uploads/d0b29e79de1b700d506b3ff818ce8291.jpg');

-- Dumping structure for table portfolio_alfi.admins
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table portfolio_alfi.admins: ~0 rows (approximately)
-- Admin credentials omitted. Create the first account using protected setup.


-- Dumping structure for table portfolio_alfi.certificates
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table portfolio_alfi.certificates: ~4 rows (approximately)
INSERT INTO `certificates` (`id`, `title`, `category`, `period`, `issuer`, `image`, `url`, `sort_order`) VALUES
	(1, 'Troubleshooting Network Services On Client Server Networks', 'JARINGAN', '2023', '', '', '', 1),
	(2, 'Panitia — Development of an IoT-Based Smart Trash Can', 'INTERNET OF THINGS', '29 Agustus 2024', 'HIMTI UNAS', 'assets/images/certificates/iot-smart-trash.jpg', 'assets/certificates/iot-smart-trash.png', 2),
	(3, 'Introduction to Cloud and Artificial Intelligence Applications for Digital Business', 'CLOUD & AI', '2024', 'Digital Talent Scholarship · Kominfo', 'assets/images/certificates/cloud-ai-training.jpg', 'assets/certificates/cloud-ai-training.pdf', 3),
	(4, 'Panitia — HIMTI Mengajar bersama Indonesia Plastic Recycle', 'PENGABDIAN MASYARAKAT', '2025', 'HIMTI UNAS · Indonesia Plastic Recycle', 'assets/images/certificates/himti-mengajar.jpg', 'assets/certificates/himti-mengajar.png', 4),
	(5, 'Panitia — Workshop on Computer Vision: Hand Gesture Game Controller', 'WORKSHOP', '2026', 'HIMTI UNAS', 'assets/images/certificates/computer-vision-workshop.jpg', 'assets/certificates/computer-vision-workshop.pdf', 5),
	(6, 'Web Developer Series 11.0 — Frontend', 'WEB DEVELOPMENT', '', 'dibimbing.id', 'assets/images/certificates/frontend-dibimbing.jpg', 'assets/certificates/frontend-dibimbing.pdf', 6),
	(7, 'Microcredential — Introduction to Cloud and Artificial Intelligence Applications for Digital Business', 'CLOUD & AI', '2024', 'Kementerian Komunikasi dan Digital', 'assets/images/certificates/cloud-ai-microcredential.jpg', 'assets/certificates/cloud-ai-microcredential.pdf', 7),
	(8, 'Keypro 30 — Peran UI/UX dalam Membangun Produk yang Sukses', 'UI / UX', '2024', 'Klasspro.id', 'assets/images/certificates/keypro-uiux.jpg', 'assets/certificates/keypro-uiux.png', 8),
	(9, 'Panitia — HIMTI Goes to School', 'PENGABDIAN MASYARAKAT', 'Oktober 2024', 'HIMTI UNAS', 'assets/images/certificates/himti-goes-to-school.jpg', 'assets/certificates/himti-goes-to-school.png', 9),
	(10, 'Industrial Visit FTKI × BRIN', 'KUNJUNGAN INDUSTRI', '2026', 'FTKI UNAS · HIMTI · BRIN', 'assets/images/certificates/industrial-visit-brin.jpg', 'assets/certificates/industrial-visit-brin.pdf', 10),
	(11, 'Sharing Session — Belajar dari Pengalaman: Sukses Mengikuti Magang dan Studi Independen', 'PENGEMBANGAN DIRI', '19 Februari 2025', 'Program Studi Informatika UNAS', 'assets/images/certificates/sharing-magang.jpg', 'assets/certificates/sharing-magang.pdf', 11),
	(12, 'Panitia — Brainstorming Enhances Quality and Collaboration', 'ORGANISASI', '26 Februari 2025', 'HIMTI UNAS', 'assets/images/certificates/studi-banding.jpg', 'assets/certificates/studi-banding.png', 12),
	(13, 'Indonesia Viz Idol 2026 — Peserta Kompetisi Visualisasi Data', 'DATA VISUALIZATION', '27 November 2025', 'Zenith Academy · PT Solusi Digital Kreasindo', 'assets/images/certificates/indonesia-viz-idol.jpg', 'assets/certificates/indonesia-viz-idol.jpeg', 13),
	(14, 'Panitia — Build Your First AI Project: Creating a Smart Chatbot', 'ARTIFICIAL INTELLIGENCE', '24 Januari 2026', 'HIMTI UNAS · Zenith Academy', 'assets/images/certificates/smart-chatbot.jpg', 'assets/certificates/smart-chatbot.pdf', 14),
	(15, 'Sharing Session — Robotic Home Industry', 'ROBOTIKA', '27 Juni 2024', 'Program Studi Informatika UNAS', 'assets/images/certificates/robotic-home.jpg', 'assets/certificates/robotic-home.png', 15),
	(16, 'APPRODI Book Club — Navigating Productivity in Campus', 'PENGEMBANGAN DIRI', '5 Desember 2025', 'Asosiasi Profesi Produktivitas Indonesia (APPRODI)', 'assets/images/certificates/approdi-productivity.jpg', 'assets/certificates/approdi-productivity.jpg', 16),
	(17, 'Penghargaan Pengurus HIMTI — Subdivisi Minat dan Bakat', 'ORGANISASI', '2024/2025', 'HIMTI UNAS', 'assets/images/certificates/himti-member.jpg', 'assets/certificates/himti-member.pdf', 17),
	(18, 'From Theory to Implementation: Building Practical Programming Skills', 'PEMROGRAMAN', '17 Januari 2025', 'Data Science Laboratory · FTKI UNAS', 'assets/images/certificates/practical-programming.jpg', 'assets/certificates/practical-programming.png', 18),
	(19, 'Develop GenAI Apps with Gemini and Streamlit', 'GOOGLE CLOUD BADGE', '', 'Google Cloud', 'assets/images/certificates/gemini-streamlit.jpg', 'assets/certificates/gemini-streamlit.png', 19),
	(20, 'Prompt Design in Vertex AI', 'GOOGLE CLOUD BADGE', '', 'Google Cloud', 'assets/images/certificates/vertex-prompt.jpg', 'assets/certificates/vertex-prompt.png', 20);

-- Dumping structure for table portfolio_alfi.experiences
CREATE TABLE IF NOT EXISTS `experiences` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `organization` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `highlights` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table portfolio_alfi.experiences: ~5 rows (approximately)
INSERT INTO `experiences` (`id`, `title`, `organization`, `category`, `period`, `description`, `highlights`, `sort_order`) VALUES
	(1, 'Enterprise System – Intern', 'BPKP (Badan Pengawasan Keuangan dan Pembangunan)', 'work', '06/2026 – 09/2026', '', '[{"title": "RBAC Access Control", "text": "Sistem penugasan internal pakai RBAC buat delegasi tugas dan evaluasi berjenjang."}, {"title": "RESTful API Architecture", "text": "Bikin arsitektur backend REST API yang cepat buat handle penugasan massal (bulk-assign)."}, {"title": "MySQL Database", "text": "Ngedesain database MySQL yang aman buat simpan lampiran berkas & log penugasan."}, {"title": "Auto Email System", "text": "Ngehubungin notifikasi email otomatis biar progres kerja tim makin transparan."}]', 1),
	(2, 'SEO Specialist - Intern', 'PT. Global Resolusi Wafira – Jakarta, Indonesia', 'work', '01/2020 – 03/2020', '', '[{"title": "Riset Keyword", "text": "Riset kata kunci potensial buat naikin posisi website perusahaan di Google."}, {"title": "+45% Visibilitas", "text": "Berhasil naikin visibilitas web sebesar 45% cuma dalam waktu 3 bulan."}, {"title": "Technical SEO", "text": "Optimasi 20++ kata kunci utama, rapihin meta tag, dan percepat loading web."}, {"title": "Trafik & Konversi", "text": "Nerapin strategi SEO yang ngefek langsung ke kenaikan trafik organik."}]', 2),
	(3, 'Anggota Subdivisi Ekonomi Dan Bisnis', 'Himpunan Mahasiswa Teknik Informatika ( HIMTI )', 'org', '11/2025 - 10/2026', '', '[{"title":"Strategi Penjualan","text":"Ngerancang strategi jualan merchandise dan pelatihan buat nambah kas HIMTI."},{"title":"Sponsorship","text":"Ngalajuin kerja sama bareng sponsor eksternal buat danai acara HIMTI."},{"title":"Koordinasi Danus","text":"Ngekoordinasi tim Danus di acara skala besar seperti seminar & lomba IT."},{"title":"Transparansi Kas","text":"Ngejaga pencatatan uang masuk dan keluar divisi biar tetap rapi."}]', 3),
	(4, 'Anggota Subdivisi Pemberdayaan Mahasiswa', 'Himpunan Mahasiswa Teknik Informatika ( HIMTI )', 'org', '05/2024 – 09/2025', '', '[{"title": "Aspirasi Mahasiswa", "text": "Nampung dan nyalurin aspirasi temen-temen mahasiswa ke pihak prodi."}, {"title": "Tutor Sebaya", "text": "Bikin program tutor sebaya buat bantu mahasiswa yang kesulitan ngoding."}, {"title": "Kelompok Belajar", "text": "Ngedampingin kelompok belajar ICC biar makin siap pas ikutan lomba IT."}, {"title": "Forum Diskusi", "text": "Ngebuka ruang diskusi santai antara mahasiswa dan pengurus organisasi."}]', 4),
	(5, 'Panitia', 'Informatics Coding Community ( ICC )', 'org', '12/2024 – 08/2025', '', '[{"title": "Mentoring Skill", "text": "Bantu temen-temen komunitas ngasah skill ngoding dari nol sampai mahir."}, {"title": "Workshop Ngoding", "text": "Ngagendain workshop ngoding interaktif khusus mahasiswa Informatika."}, {"title": "Coding Challenges", "text": "Bikin tantangan ngoding internal buat ngelatih logika pemecahan masalah."}, {"title": "Pameran Proyek IT", "text": "Ngekoordinasi pameran showcase karya aplikasi buatan anggota ICC."}]', 5);

-- Dumping structure for table portfolio_alfi.profile
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `gpa` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expertise` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expertise_detail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `organization` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `organization_detail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `linkedin` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instagram` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instagram_label` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `footer_bio` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `quote` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `quote_author` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cv_file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table portfolio_alfi.profile: ~1 rows (approximately)
INSERT INTO `profile` (`id`, `name`, `brand`, `bio`, `location`, `roles`, `gpa`, `status`, `expertise`, `expertise_detail`, `organization`, `organization_detail`, `email`, `linkedin`, `instagram`, `instagram_label`, `footer_bio`, `quote`, `quote_author`, `cv_file`) VALUES
	(1, 'Muhammad Alfi', 'Alfi.Dev', 'Mahasiswa aktif Semester 7 yang Berfokus pada Web Development, Software Engineering dan Data & System Development.', 'Kota Bekasi, Indonesia', '["DATA & SYSTEM DEVELOPMENT","SOFTWARE ENGINEERING","WEB DEVELOPMENT"]', '3.85', 'Looking For Job', 'Ini Lah My Keahlian Gue', 'Software Engineering, Web Development, Data & System Dev', '', '', 'malfi4299@gmail.com', 'https://linkedin.com/in/muhammadalfi299', 'https://instagram.com/mhmmdalfi7', '@mhmmdalfi7', 'Mahasiswa Teknik Informatika Universitas Nasional Jakarta yang berfokus pada Web Development, Software Engineering, Data & System Development.', '', '', 'assets/cv/muhammad-alfi.pdf');

-- Dumping structure for table portfolio_alfi.projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `gallery` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table portfolio_alfi.projects: ~6 rows (approximately)
INSERT INTO `projects` (`id`, `title`, `category`, `period`, `description`, `image`, `gallery`, `tags`, `url`, `sort_order`) VALUES
	(1, 'BPKP Multi-Tier Enterprise Task & Performance Tracking System', 'ENTERPRISE SYSTEM', 'JUNI 2026 – SEPTEMBER 2026', 'Proyek magang di BPKP buat bikin sistem penugasan internal terpusat pakai Role-Based Access Control (RBAC). Di sini saya ngebangun backend RESTful API & database MySQL yang aman buat proses penugasan massal (bulk-assign) plus upload file. Sistem ini juga dilengkapi notifikasi email otomatis biar pemantauan progres tim jadi jauh lebih transparan dan efisien.', 'assets/images/WhatsApp Image 2026-08-03 at 15.08.49.jpeg', '["assets/images/WhatsApp Image 2026-08-03 at 15.08.49.jpeg", "assets/images/366bd054-8d37-4d61-bac4-7b37aca23455.jpg", "assets/images/b89d9bc8-befe-4afd-8b9d-d3137ebbcd6d.jpg", "assets/images/WhatsApp Image 2026-08-03 at 15.08.50 - Diedit.jpg"]', '["Role-Based Access Control (RBAC)", "RESTful API", "MySQL Database", "Bulk-Assign System", "Automated Email Notification", "Enterprise Performance Tracking"]', '', 1),
	(2, 'Vanadis Lounge Coffee App', 'MOBILE APP', 'MEI 2025', 'Bikin antarmuka pengguna (UI) aplikasi Android dari layar utama, katalog produk kopi, sampai aliran checkout pemesanan. Fokus utamanya ngebikin alur pemesanan gampang dipakai dan kinerjanya mulus di HP Android.', 'assets/images/Vanadis.jpg', '["assets/images/Vanadis.jpg"]', '["Android App", "Coffee App Developer", "Mobile UI/UX Design", "Android SDK", "Interactive Workflow"]', '', 2),
	(3, 'The Revenant’s Oath (2D Unity Game)', 'GAME DEV', 'NOVEMBER 2025 – JANUARI 2026', 'Mengembangkan game 2D di Unity berbasis C#. Di proyek ini saya ngerancang logika utama game—termasuk pergerakan karakter, sistem bertarung (combat), sistem HP, sampai perilaku AI musuhnya. Aset visual dan UI diintegrasi dengan rapi biar game lancar dimainkan di PC.', 'assets/images/revenant-title.jpg', '["assets/images/revenant-title.jpg", "assets/images/revenant-gameplay.jpg"]', '["Unity 2D Engine", "C# Scripting", "2D AI Enemy Behavior", "UI/UX Game Design", "PC Platform"]', '', 3),
	(4, 'DompetKu Pro - Personal Finance Tracker', 'MOBILE APP', 'JULI 2026', 'Aplikasi pencatatan keuangan pribadi modern dengan gaya desain Neubrutalism UI yang bold dan interaktif. Pengguna bisa dengan mudah melacak total saldo terbaru, rincian pengeluaran per kategori dalam bentuk chart, riwayat transaksi, hingga fitur auto-fill dengan cara mengunggah struk/nota belanja.', 'assets/images/image_72f93a.png', '["assets/images/image_72f93a.png", "assets/images/image_72f8de.png"]', '["Flutter Mobile App", "Dart Scripting", "Neubrutalism UI Design", "Interactive Charts", "Firebase Database", "Image Processing / OCR"]', '', 4),
	(6, 'Sky Rent Solution’s — Website Rental Mobil', 'WEB DEVELOPMENT', '2026', 'Website rental mobil Sky Rent Solution’s untuk memperkenalkan layanan, menampilkan pilihan armada, dan membantu calon pelanggan menemukan paket perjalanan. Katalog dilengkapi filter kategori serta pencarian mobil, informasi harga harian dan bulanan, dan tautan konsultasi melalui WhatsApp. Galeri menampilkan halaman utama, katalog armada, serta pilihan paket perjalanan.', 'assets/images/sky-rent-home.jpg', '["assets/images/sky-rent-home.jpg", "assets/images/sky-rent-armada.jpg", "assets/images/sky-rent-paket.jpg"]', '["Website Rental Mobil", "Katalog & Filter Armada", "Paket Perjalanan", "Konsultasi WhatsApp"]', '', 5),
	(7, 'Website HIMTI UNAS', 'WEB DEVELOPMENT', '2026 — Dalam pengembangan', 'Website Himpunan Mahasiswa Informatika Universitas Nasional yang sedang saya kerjakan. Halaman awal menampilkan identitas HIMTI dan foto pengurus, dengan navigasi menuju informasi organisasi, kepengurusan, kabar HIMTI, dan kontak. Proyek masih dalam pengembangan; tampilan dan kontennya akan terus disempurnakan.', 'assets/images/himti-unas-home.png', '["assets/images/himti-unas-home.png"]', '["Website Organisasi", "Profil HIMTI UNAS", "Kepengurusan", "Dalam Pengembangan"]', '', 6);

-- Dumping structure for table portfolio_alfi.skills
CREATE TABLE IF NOT EXISTS `skills` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table portfolio_alfi.skills: ~12 rows (approximately)
INSERT INTO `skills` (`id`, `title`, `category`, `sort_order`) VALUES
	(1, 'C++, HTML5, CSS3', 'LANGUAGES', 1),
	(2, 'Python & Dart', 'LANGUAGES', 2),
	(3, 'Flutter Dev', 'MOBILE', 3),
	(4, 'MikroTik RouterOS', 'NETWORK', 4),
	(5, 'MySQL & Firebase', 'DATABASE', 5),
	(6, 'SEO Optimization', 'DIGITAL', 6),
	(7, 'Figma, Canva, MS Office', 'OTHER', 7),
	(8, 'Problem Solving', 'SOFT SKILL', 8),
	(9, 'Attention To Detail', 'SOFT SKILL', 9),
	(10, 'Teamwork & Comm', 'SOFT SKILL', 10),
	(11, 'Adaptability', 'SOFT SKILL', 11),
	(12, 'Time Management', 'SOFT SKILL', 12);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
