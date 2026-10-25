<?php
require __DIR__.'/../includes/app.php';require __DIR__.'/../includes/admin-media.php';require __DIR__.'/../includes/about-media.php';require __DIR__.'/../includes/admin-ui.php';require_admin();$sections=require __DIR__.'/../includes/fields.php';$section=(string)($_GET['section']??'dashboard');if(!isset($sections[$section]) && !in_array($section,['dashboard','account'],true)){http_response_code(404);exit('Halaman tidak ditemukan.');}
$error='';$notice=$_SESSION['notice']??'';unset($_SESSION['notice']);$edit=isset($_GET['edit']);$single=in_array($section,['profile','about_me'],true);$id=$single?1:(int)($_GET['edit']??0);$row=[];$rows=[];$adminProfile=[];$recentProjects=[];$recentCertificates=[];
try{
 $adminProfile=db()->query('SELECT * FROM profile WHERE id=1')->fetch()?:[];
 if($section==='dashboard'){$recentProjects=db()->query('SELECT * FROM projects ORDER BY id DESC LIMIT 3')->fetchAll();$recentCertificates=db()->query('SELECT * FROM certificates ORDER BY id DESC LIMIT 3')->fetchAll();}
 if(isset($sections[$section])){if($single){$row=db()->query("SELECT * FROM `$section` WHERE id=1")->fetch()?:[];$edit=true;if($section==='about_me'&&!$row)throw new RuntimeException('Impor database/portfolio_alfi.sql terlebih dahulu.');}else{$rows=records($section);if($id){$q=db()->prepare("SELECT * FROM `$section` WHERE id=?");$q->execute([$id]);$row=$q->fetch();if(!$row){http_response_code(404);exit('Data tidak ditemukan.');}}}}
 if($section==='about_me')$row=about_photo_form_row($row);
 if($_SERVER['REQUEST_METHOD']==='POST'){
  check_csrf();$action=(string)($_POST['action']??'save');
  if($section==='account'){
   $q=db()->prepare('SELECT password_hash FROM admins WHERE id=?');$q->execute([$_SESSION['admin_id']]);$hash=$q->fetchColumn();$password=(string)($_POST['password']??'');
   if(!password_verify((string)($_POST['current']??''),$hash))throw new RuntimeException('Password saat ini salah.');
   if(strlen($password)<10 || strlen($password)>72 || $password!==($_POST['confirm']??''))throw new RuntimeException('Password baru 10–72 karakter dan konfirmasi harus sama.');
   $q=db()->prepare('UPDATE admins SET password_hash=? WHERE id=?');$newHash=password_hash($password,PASSWORD_DEFAULT);$q->execute([$newHash,$_SESSION['admin_id']]);session_regenerate_id(true);$_SESSION['auth_fingerprint']=hash('sha256',$newHash);$_SESSION['csrf']=bin2hex(random_bytes(32));$_SESSION['notice']='Password berhasil diperbarui.';redirect('index.php?section=account');
  }
  if(!isset($sections[$section]))throw new RuntimeException('Form tidak valid.');
  if(!in_array($action,['save','delete'],true))throw new RuntimeException('Aksi form tidak valid.');
  if($action==='delete'){
   if($single)throw new RuntimeException('Halaman ini tidak dapat dihapus.');
   $q=db()->prepare("DELETE FROM `$section` WHERE id=?");$q->execute([(int)($_POST['id']??0)]);$_SESSION['notice']='Data berhasil dihapus.';redirect('index.php?section='.$section);
  }
  $values=[];$uploads=[];
  foreach($sections[$section]['fields'] as $field=>[$label,$type,$required]){
   $v=trim(input_string($_POST,$field));if(strlen($v)>20000)throw new RuntimeException($label.' terlalu panjang.');if($required && $v==='')throw new RuntimeException($label.' wajib diisi.');
   if($type==='email' && !filter_var($v,FILTER_VALIDATE_EMAIL))throw new RuntimeException('Alamat email tidak valid.');
   if($type==='url' && !safe_url($v))throw new RuntimeException($label.' harus menggunakan URL http:// atau https://.');
   if($type==='select' && !in_array($v,['work','org'],true))throw new RuntimeException('Pilih jenis pengalaman yang valid.');
   if($type==='cv_document'){$v=admin_document_value($_POST,$field,$v);if(!safe_cv_path($v))throw new RuntimeException('CV harus berupa PDF yang diunggah melalui admin.');$uploads[$field]=$field.'_file';}
   if($type==='document'){$v=admin_document_value($_POST,$field,$v);if(!safe_certificate_url($v))throw new RuntimeException('Gunakan tautan http(s) atau path dokumen sertifikat yang valid.');$uploads[$field]=$field.'_file';}
   if($type==='image'){
    $v=admin_image_value($_POST,$field,$v);
    if(!safe_url($v,true))throw new RuntimeException('Path gambar harus assets/images/nama.jpg atau uploads/nama.jpg.');
    $uploads[$field]=$field.'_file';
   }
   if(in_array($type,['lines','gallery','highlights'],true)){
    $lines=array_values(array_filter(array_map('trim',preg_split('/\R/',$v)),fn($line)=>$line!==''));
    if($type==='gallery'){$lines=admin_gallery_paths($v,$_POST['remove_gallery'][$field]??[]);foreach($lines as $line)if(!safe_url($line,true))throw new RuntimeException('Path galeri tidak valid: '.$line);$uploads[$field]='gallery_files';}
    if($type==='highlights')$lines=array_map(function($line){$parts=explode('|',$line,2);return ['title'=>trim($parts[0]),'text'=>trim($parts[1]??'')];},$lines);
    $v=json_encode($lines,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);
   }
   $values[$field]=$v;
  }
  $pending=[];
  try {
   foreach($uploads as $field=>$file){
    if(($sections[$section]['fields'][$field][1]??'')==='gallery'){
     $paths=json_list($values[$field]);$files=$_FILES[$file]??null;
     if($files){if(count($files['name'])>20)throw new RuntimeException('Maksimal 20 foto galeri sekali upload.');foreach($files['name'] as $i=>$filename){foreach(['name','type','tmp_name','error','size'] as $key)$_FILES['_gallery'][$key]=$files[$key][$i];$path=upload_image('_gallery');if($path){$paths[]=$path;$pending[]=$path;}}}
     $values[$field]=json_encode(array_values(array_unique($paths)),JSON_UNESCAPED_UNICODE);
    }else{$fieldType=$sections[$section]['fields'][$field][1]??'';$path=$fieldType==='cv_document'?upload_certificate_pdf($file,'cv'):($fieldType==='document'?upload_certificate_pdf($file):upload_image($file));if($path){$values[$field]=$path;$pending[]=$path;}}
   }
   if($section==='about_me')$values=about_photo_storage_values($values);
   if(!$single){$sort=filter_var($_POST['sort_order']??0,FILTER_VALIDATE_INT);if($sort===false || abs($sort)>100000)throw new RuntimeException('Urutan harus angka antara -100000 sampai 100000.');$values['sort_order']=$sort;}
   if($id){$sql="UPDATE `$section` SET ".implode(',',array_map(fn($k)=>"`$k`=?",array_keys($values))).' WHERE id=?';$params=[...array_values($values),$id];}
   else{$sql="INSERT INTO `$section` (".implode(',',array_map(fn($k)=>"`$k`",array_keys($values))).') VALUES ('.implode(',',array_fill(0,count($values),'?')).')';$params=array_values($values);}
   $q=db()->prepare($sql);$q->execute($params);
  }catch(Throwable $failure){foreach($pending as $path)@unlink(__DIR__.'/../'.$path);throw $failure;}
  $_SESSION['notice']='Data berhasil disimpan. Website menampilkan perubahan saat dibuka atau dimuat ulang.';redirect('index.php?section='.$section);
 }
}catch(Throwable $failure){$error=$failure instanceof PDOException?'Tidak dapat mengakses database. Periksa MySQL, config.php, dan file SQL.':$failure->getMessage();if($_SERVER['REQUEST_METHOD']==='POST' && isset($sections[$section]) && ($_POST['action']??'save')==='save'){$edit=true;foreach($sections[$section]['fields'] as $k=>$f)$row[$k]=$_POST[$k]??'';$row['sort_order']=$_POST['sort_order']??0;}}
function form_value($row,$name,$type,$post):string{$value=(string)($row[$name]??'');if(!$post){if(in_array($type,['lines','gallery'],true))return implode("\n",json_list($value));if($type==='highlights')return implode("\n",array_map(fn($h)=>$h['title'].' | '.$h['text'],json_list($value)));}return $value;}
?><!doctype html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Portfolio Admin</title><link rel="stylesheet" href="../assets/style.css?v=sky-20261020"><link rel="stylesheet" href="../assets/admin.css?v=admin-studio-20261025"><script defer src="../assets/admin.js?v=admin-studio-20261025"></script></head><body class="admin-body"><?php render_admin_sidebar($section,$sections,$adminProfile);?><main class="admin-main"><header class="admin-heading"><div><p class="eyebrow">CONTENT STUDIO / <?=e($section==='dashboard'?'OVERVIEW':strtoupper($sections[$section]['label']??'AKUN'))?></p><h1><?=e($sections[$section]['label']??($section==='account'?'Keamanan akun':'Dashboard'))?></h1><p class="admin-subtitle"><?=e(admin_section_description($section))?></p></div><div class="admin-heading-actions"><a class="admin-preview-link" href="../" target="_blank" rel="noopener">Lihat website <?=admin_icon('external')?></a><span class="admin-avatar" title="<?=e($_SESSION['username'])?>">MA</span></div></header><?php if($notice):?><div class="notice success" role="status"><?=e($notice)?></div><?php endif;?><?php if($error):?><div class="notice error" role="alert"><?=e($error)?></div><?php endif;?>
<?php if($section==='dashboard'):?><?php render_admin_dashboard($sections,$adminProfile,$recentProjects,$recentCertificates);?>
<?php elseif($section==='account'):?><form method="post" class="panel editor"><input type="hidden" name="csrf" value="<?=e(csrf())?>"><label>Password saat ini<input type="password" name="current" autocomplete="current-password" required></label><label>Password baru<input type="password" name="password" minlength="10" maxlength="72" autocomplete="new-password" required></label><label>Konfirmasi password baru<input type="password" name="confirm" minlength="10" maxlength="72" autocomplete="new-password" required></label><button class="button">Simpan password</button></form>
<?php elseif($edit):?><?php if($section==='about_me'):?><p class="notice">Nama, bio, fokus, kontak, dan cerita mengikuti Profil &amp; Kontak. Skill dan pengalaman mengikuti data halaman utama. Foto utama dipakai di Home dan About Me; foto cerita (potret besar), foto pendamping, serta empat posisi Side Notes mempunyai pengaturan terpisah di About Me. Masing-masing posisi mempunyai upload dan hapus sendiri.</p><?php endif;?><div class="editor-heading"><h2><?=$single?e($sections[$section]['label']):($id?'Edit data':'Tambah data')?></h2><?php if(!$single):?><a href="index.php?section=<?=$section?>">← Kembali ke daftar</a><?php endif;?></div><form method="post" enctype="multipart/form-data" class="panel editor"><input type="hidden" name="csrf" value="<?=e(csrf())?>"><input type="hidden" name="action" value="save">
<?php foreach($sections[$section]['fields'] as $name=>[$label,$type,$required]):$value=form_value($row,$name,$type,$_SERVER['REQUEST_METHOD']==='POST' && $error!=='');?><label><?=e($label)?><?=$required?' *':''?>
<?php if($type==='cv_document'):?><input type="hidden" name="<?=$name?>" value="<?=e($value)?>">
<?php elseif(in_array($type,['textarea','lines','gallery','highlights'],true)):?><textarea name="<?=$name?>" rows="<?=$type==='textarea'?5:4?>" <?=$required?'required':''?> maxlength="20000"><?=e($value)?></textarea>
<?php elseif($type==='select'):?><select name="<?=$name?>"><option value="work" <?=$value==='work'?'selected':''?>>Pengalaman kerja</option><option value="org" <?=$value==='org'?'selected':''?>>Organisasi</option></select>
<?php else:?><input name="<?=$name?>" type="<?=in_array($type,['url','email'],true)?$type:'text'?>" value="<?=e($value)?>" <?=$required?'required':''?> maxlength="20000"><?php endif;?></label>
<?php if(in_array($type,['image','gallery'],true)):?><?php render_admin_media($name,$type,$value);?>
<?php elseif($type==='cv_document'):?><?php render_admin_cv($value);?>
<?php elseif($type==='document'):?><?php render_admin_document($name,$value);?>
<?php elseif($type==='highlights'):?><small>Contoh: RESTful API | Membangun backend untuk penugasan massal.</small><?php endif;?>
<?php endforeach;?><?php if(!$single):?><label>Urutan tampil (angka kecil tampil lebih dahulu)<input name="sort_order" type="number" min="-100000" max="100000" value="<?=e($row['sort_order']??count($rows)+1)?>"></label><?php endif;?><div class="editor-actions"><button class="button" type="submit">Simpan perubahan ↗</button><?php if(!$single):?><a href="index.php?section=<?=$section?>">Batal</a><?php endif;?></div></form>
<?php else:?><div class="list-heading"><div><p><strong data-result-count><?=count($rows)?></strong> / <?=count($rows)?> data</p><label class="admin-list-search"><span class="sr-only">Cari data</span><?=admin_icon('search')?><input type="search" data-admin-search placeholder="Cari judul atau kategori…"></label></div><a class="button" href="index.php?section=<?=$section?>&edit=0">+ Tambah <?=e(strtolower($sections[$section]['label']))?></a></div><div class="panel data-list"><?php if(!$rows):?><p class="empty-state">Belum ada data. Klik tombol tambah untuk memulai.</p><?php endif;?><?php foreach($rows as $r):?><article class="data-row" data-admin-row><?php if(!empty($r['image'])):?><img src="../<?=e($r['image'])?>" alt=""><?php else:?><span class="data-row-icon"><?=admin_icon($section)?></span><?php endif;?><div><h3><?=e($r['title'])?></h3><p><?=e($r['category'])?> · Urutan <?=e($r['sort_order'])?></p></div><div class="row-actions"><a href="index.php?section=<?=$section?>&edit=<?=$r['id']?>">Edit ↗</a><form method="post" data-confirm="Hapus data ini? Data akan hilang dari website."><input type="hidden" name="csrf" value="<?=e(csrf())?>"><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?=$r['id']?>"><button class="delete-button">Hapus</button></form></div></article><?php endforeach;?><p class="empty-state" data-no-results hidden>Tidak ada data yang cocok.</p></div><?php endif;?>
</main></body></html>
