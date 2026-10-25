<?php
// Label, jenis input, wajib. Tabel dan nama kolom selalu berasal dari daftar ini.
return [
 'profile'=>['label'=>'Profil & Kontak','fields'=>[
 'name'=>['Nama','text',true],'brand'=>['Nama brand','text',true],'bio'=>['Deskripsi hero','textarea',true],'location'=>['Domisili','text',false],
 'roles'=>['Bidang fokus (satu per baris)','lines',true],'gpa'=>['IPK','text',false], 'status'=>['Status ketersediaan','text',false],
 'expertise'=>['Fokus ringkas (About Me)','text',false],'expertise_detail'=>['Detail keahlian','text',false],
 'email'=>['Email','email',true],'linkedin'=>['URL LinkedIn','url',false],'instagram'=>['URL Instagram','url',false],
 'cv_file'=>['CV — dokumen PDF','cv_document',false],
 'footer_bio'=>['Tambahan cerita About Me','textarea',false]]],
 'about_me'=>['label'=>'Foto About Me','fields'=>[
 'image'=>['Foto utama — Home dan pembuka About Me','image',false],
 'image_story'=>['Foto cerita — potret besar About Me (terpisah dari foto utama)','image',false],
 'image_secondary'=>['Foto pendamping — potret kecil di bagian cerita','image',false],
 'notes_image_1'=>['Side Notes 1 — foto','image',false],
 'notes_caption_1'=>['Side Notes 1 — keterangan','text',false],
 'notes_image_2'=>['Side Notes 2 — foto','image',false],
 'notes_caption_2'=>['Side Notes 2 — keterangan','text',false],
 'notes_image_3'=>['Side Notes 3 — foto','image',false],
 'notes_caption_3'=>['Side Notes 3 — keterangan','text',false],
 'notes_image_4'=>['Side Notes 4 — foto','image',false],
 'notes_caption_4'=>['Side Notes 4 — keterangan','text',false]
 ]],
 'projects'=>['label'=>'Proyek','fields'=>['title'=>['Judul','text',true],'category'=>['Kategori','text',true],'period'=>['Periode','text',false],'description'=>['Deskripsi lengkap','textarea',true],'image'=>['Gambar utama','image',false],'gallery'=>['Galeri (satu path gambar per baris)','gallery',false],'tags'=>['Teknologi / fitur (satu per baris)','lines',false],'url'=>['URL demo atau repository','url',false]]],
 'experiences'=>['label'=>'Pengalaman','fields'=>['title'=>['Jabatan','text',true],'organization'=>['Nama instansi / organisasi','text',true],'category'=>['Jenis','select',true],'period'=>['Periode','text',false],'description'=>['Deskripsi tambahan','textarea',false],'highlights'=>['Pencapaian (Judul | Deskripsi, satu per baris)','highlights',false]]],
 'skills'=>['label'=>'Skill','fields'=>['title'=>['Nama skill','text',true],'category'=>['Kategori','text',true]]],
 'certificates'=>['label'=>'Sertifikat','fields'=>['title'=>['Nama sertifikat','text',true],'category'=>['Bidang','text',false],'period'=>['Tahun / periode','text',false],'issuer'=>['Penyelenggara','text',false],'image'=>['Foto sertifikat','image',false],'url'=>['Dokumen sertifikat / tautan','document',false]]]
];
