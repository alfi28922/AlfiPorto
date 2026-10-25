<?php
require __DIR__.'/includes/app.php';
try {
    $profile=db()->query('SELECT * FROM profile WHERE id=1')->fetch()?:[];
    if(!cv_available($profile)){http_response_code(404);exit('CV belum tersedia.');}
    $file=__DIR__.'/'.$profile['cv_file'];
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="CV-Muhammad-Alfi.pdf"');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    header('Content-Length: '.filesize($file));
    readfile($file);
} catch(Throwable $error){http_response_code(503);echo 'CV belum dapat ditampilkan. Silakan coba kembali.';}
