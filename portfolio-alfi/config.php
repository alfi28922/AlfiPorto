<?php
// Credentials belong in server environment variables, never in Git.
$production=(getenv('APP_ENV')?:'local')==='production';
$required=['DB_HOST','DB_DATABASE','DB_USERNAME','DB_PASSWORD'];
if($production)foreach($required as $name)if(getenv($name)===false||getenv($name)==='')throw new RuntimeException('Database environment is incomplete.');
return ['host'=>getenv('DB_HOST')?:'127.0.0.1','port'=>getenv('DB_PORT')?:'3306',
'database'=>getenv('DB_DATABASE')?:'portfolio_alfi','username'=>getenv('DB_USERNAME')?:'root',
'password'=>getenv('DB_PASSWORD')?:'','ssl_ca'=>getenv('DB_SSL_CA')?:''];
