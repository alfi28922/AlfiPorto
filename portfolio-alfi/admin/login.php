<?php
require __DIR__.'/../includes/app.php';session_start_safe();if(!empty($_SESSION['admin_id']))redirect('index.php');$error='';
if($_SERVER['REQUEST_METHOD']==='POST'){
 check_csrf();
 try{
  $username=trim(input_string($_POST,'username'));$password=input_string($_POST,'password');
  if(strlen($username)>100||strlen($password)>72)throw new RuntimeException('Invalid input');
  [$allowed,$retry]=login_attempt_allowed($username);
  if(!$allowed){http_response_code(429);header('Retry-After: '.$retry);$error='Terlalu banyak percobaan login. Coba lagi dalam 15 menit.';}
  else{
   $q=db()->prepare('SELECT * FROM admins WHERE username=?');$q->execute([$username]);$user=$q->fetch();
   // A dummy bcrypt hash keeps nonexistent usernames on the password-verification path.
   $valid=password_verify($password,$user['password_hash']??'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.');
   if($user&&$valid){session_regenerate_id(true);$_SESSION=['admin_id'=>$user['id'],'username'=>$user['username'],'signed_in'=>time(),'last_seen'=>time(),'auth_fingerprint'=>hash('sha256',$user['password_hash']),'csrf'=>bin2hex(random_bytes(32))];redirect('index.php');}
   $error='Username atau password salah.';
  }
 }catch(Throwable $failure){$error='Login belum dapat diproses. Periksa konfigurasi server.';}
}
?><!doctype html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin Login</title><link rel="stylesheet" href="../assets/style.css?v=sky-20261020"><link rel="stylesheet" href="../assets/admin.css?v=admin-studio-20261025"><script defer src="../assets/admin.js?v=admin-studio-20261025"></script></head><body class="auth-body"><div class="auth-layout"><aside class="auth-story"><span class="auth-monogram">MA</span><span class="eyebrow">ALFI / CONTENT STUDIO</span><h2>Portofolio,<br>tetap terurus.</h2><p>Satu ruang untuk memperbarui karya, pengalaman, dan pencapaianmu.</p><div class="auth-topics"><span>Projects</span><span>Experience</span><span>Certificates</span></div></aside><main class="auth-card panel"><a href="../" class="brand">&lt; Alfi.Dev /&gt;</a><p class="eyebrow">PORTFOLIO MANAGEMENT</p><h1>Welcome back.</h1><p>Masuk untuk mengelola isi portofolio.</p><?php if(isset($_GET['created'])):?><div class="notice success" role="status">Akun berhasil dibuat. Silakan login.</div><?php endif;?><?php if($error):?><div class="notice error" role="alert"><?=e($error)?></div><?php endif;?><form method="post"><input type="hidden" name="csrf" value="<?=e(csrf())?>"><label>Username<input name="username" required autocomplete="username" maxlength="100"></label><label>Password<input name="password" type="password" required autocomplete="current-password"></label><button class="button" type="submit">Masuk ↗</button></form><p class="auth-foot"><a href="setup.php">Pertama kali? Buat akun admin.</a></p><a href="../" class="back-link">← Kembali ke website</a></main></div></body></html>
