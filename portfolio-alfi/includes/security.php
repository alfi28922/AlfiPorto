<?php
declare(strict_types=1);
if((getenv('APP_ENV')?:'local')==='production'){ini_set('display_errors','0');ini_set('log_errors','1');error_reporting(E_ALL);}
function request_is_secure():bool {
 // Do not trust arbitrary X-Forwarded-Proto from clients. Set this flag on a trusted HTTPS-only host.
 return getenv('APP_SECURE_COOKIES')==='1'||(!empty($_SERVER['HTTPS'])&&strtolower((string)$_SERVER['HTTPS'])!=='off');
}
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self'; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
if((getenv('APP_ENV')?:'local')==='production'&&request_is_secure())header('Strict-Transport-Security: max-age=31536000');
function trusted_proxy_request():bool {
 $secret=getenv('ORIGIN_SECRET')?:'';$provided=$_SERVER['HTTP_X_ORIGIN_SECRET']??'';
 return strlen($secret)>=32&&is_string($provided)&&hash_equals($secret,$provided);
}
$originSecret=getenv('ORIGIN_SECRET')?:'';
if($originSecret!==''&&!trusted_proxy_request()){http_response_code(403);exit('Akses origin ditolak. Gunakan alamat portofolio publik.');}
function client_ip():string {
 $ip=$_SERVER['REMOTE_ADDR']??'unknown';
 if(trusted_proxy_request()){$candidate=$_SERVER['HTTP_X_REAL_IP']??'';if(is_string($candidate)&&filter_var($candidate,FILTER_VALIDATE_IP))$ip=$candidate;}
 return $ip;
}
function input_string(array $source,string $key,string $default=''):string {
 $v=$source[$key]??$default;if(!is_string($v)&&!is_numeric($v))throw new RuntimeException('Format input tidak valid.');return (string)$v;
}
// File lock shares the limit across sessions/cookies and PHP workers on one origin.
// Use a shared persistent PRIVATE_STORAGE_PATH when the origin has multiple replicas.
function login_attempt_allowed(string $username):array {
 $dir=getenv('PRIVATE_STORAGE_PATH')?:sys_get_temp_dir().'/portfolio-private-'.substr(hash('sha256',__DIR__),0,16);
 if(!is_dir($dir)&&!mkdir($dir,0700,true)&&!is_dir($dir))throw new RuntimeException('Penyimpanan keamanan belum siap.');
 $resolved=realpath($dir);$webRoot=realpath(__DIR__.'/..');if(!$resolved||$resolved===$webRoot||str_starts_with($resolved,$webRoot.DIRECTORY_SEPARATOR))throw new RuntimeException('Penyimpanan keamanan harus di luar web root.');
 $file=fopen($dir.'/login-limits.json','c+');if(!$file||!flock($file,LOCK_EX))throw new RuntimeException('Pembatasan login belum siap.');
 try{
  $state=json_decode(stream_get_contents($file),true)?:[];$now=time();
  foreach($state as $key=>$entry)if(!is_array($entry)||($entry['until']??0)<=$now)unset($state[$key]);
  $keys=[hash('sha256','user:'.strtolower($username))=>6,hash('sha256','ip:'.client_ip())=>20];
  $retry=0;foreach($keys as $key=>$limit)if(($state[$key]['count']??0)>=$limit)$retry=max($retry,$state[$key]['until']-$now);
  if(!$retry&&count($state)>5000)$retry=900;
  if(!$retry)foreach($keys as $key=>$limit){$state[$key]??=['count'=>0,'until'=>$now+900];$state[$key]['count']++;}
  rewind($file);ftruncate($file,0);fwrite($file,json_encode($state,JSON_THROW_ON_ERROR));fflush($file);return [!$retry,max(1,$retry)];
 }finally{flock($file,LOCK_UN);fclose($file);}
}
function sanitize_public_data(array &$profile,array &$projects,array &$certificates):void {
 foreach(['linkedin','instagram'] as $key)if(!safe_url((string)($profile[$key]??'')))$profile[$key]='';
 if(!filter_var($profile['email']??'',FILTER_VALIDATE_EMAIL))$profile['email']='';
 foreach($projects as &$project){
  if(!safe_url((string)($project['url']??'')))$project['url']='';
  if(!safe_url((string)($project['image']??''),true))$project['image']='';
  $gallery=json_list($project['gallery']??'');$project['gallery']=json_encode(array_values(array_filter($gallery,fn($path)=>is_string($path)&&safe_url($path,true))));
 }unset($project);
 foreach($certificates as &$cert)if(!safe_url((string)($cert['image']??''),true))$cert['image']='';unset($cert);
}
