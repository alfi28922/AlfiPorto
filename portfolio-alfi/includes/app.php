<?php
declare(strict_types=1);
require_once __DIR__.'/security.php';
function db(): PDO {
    static $pdo;
    if (!$pdo) {
        $c = require __DIR__.'/../config.php';
        $options=[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false];
        if(!empty($c['ssl_ca'])){$options[PDO::MYSQL_ATTR_SSL_CA]=$c['ssl_ca'];$options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT]=true;}
        $pdo = new PDO("mysql:host={$c['host']};port={$c['port']};dbname={$c['database']};charset=utf8mb4", $c['username'], $c['password'], $options);
    }
    return $pdo;
}
function e($value): string { return htmlspecialchars((string)($value ?? ''), ENT_QUOTES, 'UTF-8'); }
function json_list($value): array { $list=json_decode((string)$value,true);return is_array($list)?$list:[]; }
function records(string $table): array { if(!in_array($table,['projects','experiences','skills','certificates'],true))throw new InvalidArgumentException('Invalid table');return db()->query("SELECT * FROM `$table` ORDER BY sort_order,id")->fetchAll(); }
function session_start_safe(): void {
    if (session_status()!==PHP_SESSION_ACTIVE) {
        ini_set('session.use_strict_mode','1');ini_set('session.use_only_cookies','1');ini_set('session.use_trans_sid','0');session_name('portfolio_admin');
        session_set_cookie_params(['path'=>'/','httponly'=>true,'samesite'=>'Lax','secure'=>request_is_secure()]);
        header('Cache-Control: no-store, private');header('Vary: Cookie');
        session_start();
    }
}
function csrf(): string { session_start_safe(); return $_SESSION['csrf'] ??= bin2hex(random_bytes(32)); }
function check_csrf(): void { if (!hash_equals(csrf(),(is_string($_POST['csrf']??null)?$_POST['csrf']:''))) { http_response_code(403); exit('Sesi formulir tidak valid. Muat ulang halaman.'); } }
function redirect(string $url): void { header('Location: '.$url); exit; }
function require_admin(): void {
 session_start_safe();if(empty($_SESSION['admin_id']))redirect('login.php');
 $now=time();$expired=$now-($_SESSION['last_seen']??0)>1800||$now-($_SESSION['signed_in']??0)>28800;
 $q=db()->prepare('SELECT password_hash FROM admins WHERE id=?');$q->execute([$_SESSION['admin_id']]);$hash=$q->fetchColumn();
 if($expired||!$hash||!hash_equals(hash('sha256',(string)$hash),(string)($_SESSION['auth_fingerprint']??''))){$_SESSION=[];session_regenerate_id(true);redirect('login.php');}
 $_SESSION['last_seen']=$now;
}
function safe_url(string $value,bool $image=false): bool {
    if ($value==='') return true;
    if (preg_match('~^https?://~i',$value)) return !$image && filter_var($value,FILTER_VALIDATE_URL)!==false;
    return $image && preg_match('~^(assets/images/certificates|assets/images|uploads)/[\pL\pN _().-]+\.(jpe?g|png|webp)$~ui',$value)===1 && !str_contains($value,'..');
}
function upload_image(string $name): ?string {
    $f=$_FILES[$name] ?? null;
    if (!$f || $f['error']===UPLOAD_ERR_NO_FILE) return null;
    if (!is_array($f)||!isset($f['error'],$f['size'],$f['tmp_name'])||!is_int($f['error'])||$f['error']!==UPLOAD_ERR_OK || $f['size']>5*1024*1024 || !is_uploaded_file($f['tmp_name'])) throw new RuntimeException('Upload gagal. Maksimal gambar 5 MB.');
    $mime=(new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
    $ext=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'][$mime] ?? null;
    $dimensions=@getimagesize($f['tmp_name']);
    if (!$ext || !$dimensions || $dimensions[0]*$dimensions[1]>40000000) throw new RuntimeException('Gunakan gambar JPG, PNG, atau WebP.');
    if(!is_dir(__DIR__.'/../uploads')&&!mkdir(__DIR__.'/../uploads',0755,true))throw new RuntimeException('Folder upload belum siap.');
    $path='uploads/'.bin2hex(random_bytes(16)).'.'.$ext;
    if (!move_uploaded_file($f['tmp_name'],__DIR__.'/../'.$path)) throw new RuntimeException('Tidak bisa menyimpan gambar. Periksa izin folder uploads.');
    return $path;
}

// Only local PDFs uploaded by the admin can be offered as the active CV.
function safe_cv_path(string $path):bool {
    return $path==='' || preg_match('~^(uploads/cv/[a-f0-9]{32}|assets/cv/[a-z0-9-]+)\.pdf$~D',$path)===1;
}
function cv_available(array $profile):bool {
    $path=(string)($profile['cv_file']??'');
    return $path!=='' && safe_cv_path($path) && is_file(__DIR__.'/../'.$path) && is_readable(__DIR__.'/../'.$path);
}
