<?php
require __DIR__.'/includes/app.php';
require __DIR__.'/includes/i18n.php';
require __DIR__.'/includes/about-media.php';
try {
 $profile=db()->query('SELECT * FROM profile WHERE id=1')->fetch();
 if(!$profile)throw new RuntimeException('Data profil belum tersedia.');
 $experiences=records('experiences');$skills=records('skills');$projects=records('projects');
 // Photo settings are optional; the page content always comes from the main portfolio.
 try{$about=db()->query('SELECT * FROM about_me WHERE id=1')->fetch()?:[];}catch(PDOException $photoError){$about=[];}
} catch(Throwable $error) {
 http_response_code(503);
 ?><!doctype html><html lang="<?=e($portfolioLanguage)?>"><head><?php portfolio_language_payload();?><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>About Me belum siap</title><link rel="stylesheet" href="assets/style.css?v=rev-20261025-v4"><script defer src="assets/motion.js?v=rev-20261025-v4"></script><script defer src="assets/language.js?v=rev-20261025-v4"></script></head><body><main class="section setup panel"><h1>About Me belum siap.</h1><p>Jalankan file <code>database/portfolio_alfi.sql</code> pada database portofolio yang sama.</p><a class="button" href="index.php#contact">Kembali</a></main><?php require __DIR__.'/includes/cv-preview.php';?></body></html><?php exit;
}
$certificates=[];sanitize_public_data($profile,$projects,$certificates);portfolio_localize($profile,$projects,$experiences,$skills,$certificates);
function about_text(array $row,string $key,string $fallback=''):string {return trim((string)($row[$key]??''))?:$fallback;}
function about_picture(string $path,string $alt,string $class=''):void {
 if($path!==''&&safe_url($path,true)){?><img class="<?=e($class)?>" src="<?=e($path)?>" alt="<?=e($alt)?>" loading="lazy"><?php }
 else {?><div class="ae-photo-placeholder <?=e($class)?>"><span><?=e(strtoupper(substr(trim($alt),0,1).substr(strrchr(trim($alt),' ')?:'',1,1)))?></span><small><?=e($alt)?></small></div><?php }
}
$name=trim((string)$profile['name']);$parts=preg_split('/\s+/',$name);$last=array_pop($parts);
$heroName=$last?:$name;$subName=implode(' ',$parts);
$roles=array_values(array_filter(json_list($profile['roles']),fn($role)=>is_string($role)&&trim($role)!==''));
if(!$roles && trim((string)$profile['expertise'])!=='')$roles=[(string)$profile['expertise']];
$details=[];$groups=[];
foreach($skills as $skill)$groups[$skill['category']][]=$skill['title'];
foreach($groups as $label=>$list)$details[]=['title'=>$label,'text'=>implode(' · ',$list)];
$noteSlots=about_note_slots($about['hobbies']??'');
$heroIntro=(string)$profile['bio'];
$storyParts=array_values(array_unique(array_filter([(string)$profile['expertise_detail'],(string)$profile['footer_bio']],fn($value)=>trim($value)!=='')));
$story=implode("\n\n",$storyParts)?:$heroIntro;
?><!doctype html><html lang="<?=e($portfolioLanguage)?>"><head><?php portfolio_language_payload();require __DIR__.'/includes/transition-head.php';?><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="description" content="<?=e($heroIntro)?>"><title>About Me | <?=e($name)?></title><link rel="preload" href="assets/fonts/bricolage-variable.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="assets/style.css?v=rev-20261025-v4"><link rel="stylesheet" href="assets/anime-theme.css?v=rev-20261025-v4"><link rel="stylesheet" href="assets/sky-theme.css?v=rev-20261025-v4"><link rel="stylesheet" href="assets/mobile-desktop.css?v=cv-image-20261025"><script defer src="assets/opening.js?v=rev-20261025-v4"></script><script defer src="assets/scroll-reveal.js?v=rev-20261025-v4"></script><script defer src="assets/about.js?v=rev-20261025-v4"></script><script defer src="assets/motion.js?v=rev-20261025-v4"></script><script defer src="assets/language.js?v=rev-20261025-v4"></script><script defer src="assets/page-transition.js?v=rev-20261025-v4"></script></head>
<body class="about-editorial anime-theme"><?php require __DIR__.'/includes/opening-screen.php';?><a class="skip-link" href="#about-main"><?=te('Lewati navigasi')?></a>
<button class="ae-menu-toggle" type="button" aria-label="<?=te('Buka menu')?>" aria-controls="ae-menu" aria-expanded="false"><span></span><span></span></button>
<nav id="ae-menu" class="ae-menu" aria-label="<?=te('Menu About Me')?>" hidden><a href="index.php#home">Home</a><a href="index.php#projects">Projects</a><a href="about.php" aria-current="page">About Me</a><a href="index.php#contact">Contact</a></nav>
<main id="about-main">
<section class="ae-hero personal-hero"><div class="ae-topline"><a href="index.php"><?=e($profile['brand'])?></a><?php portfolio_language_switch('about-language');?></div>
<div class="ph-layout"><div class="ph-copy"><h1 class="ph-heading"><span class="ph-given"><?=e($subName)?></span><span class="ph-last"><?=e($heroName)?><i>.</i></span></h1><p class="ph-bio"><?=nl2br(e($heroIntro))?></p><div class="ph-roles"><?php foreach(array_slice($roles,0,3) as $role):?><span><?=e($role)?></span><?php endforeach;?></div><div class="ph-bio-actions"><?php if(cv_available($profile)):?><a class="portfolio-cv-link" href="preview-cv.php" rel="external" data-cv-preview aria-haspopup="dialog" aria-controls="cv-image-dialog"><?=te('Preview CV')?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M8 3H4v17h16V10M13 3h8v8M10 14 21 3"/></svg></a><?php endif;?><a class="ph-discover" href="#about-story"><?=te('Kenal lebih dekat ')?><span aria-hidden="true">↓</span></a></div></div>
<div class="ph-visual" data-portrait-tilt><div class="ph-orbit" aria-hidden="true"></div><div class="ph-photo"><?php about_picture(about_text($about,'image'),$name,'about-photo-primary');?></div><?php if($profile['status']):?><div class="ph-status"><span></span><?=e($profile['status'])?></div><?php endif;?><div class="ph-location"><?=e($profile['location'])?></div><div class="ph-caption"><span><?=e($profile['brand'])?></span></div></div></div>
<div class="ph-stats"><a href="index.php#projects"><strong><?=str_pad((string)count($projects),2,'0',STR_PAD_LEFT)?></strong><span><?=te('Proyek')?></span></a><a href="index.php#experience"><strong><?=str_pad((string)count($experiences),2,'0',STR_PAD_LEFT)?></strong><span><?=te('Pengalaman')?></span></a><a href="index.php#skills"><strong><?=str_pad((string)count($skills),2,'0',STR_PAD_LEFT)?></strong><span><?=te('Skill & tools')?></span></a><span class="ph-stats-note"><?=e($profile['expertise'])?></span></div></section>
<section id="about-story" class="ae-profile ae-light"><div class="ae-specialties ae-reveal"><?php foreach($roles as $i=>$role):?><button class="ae-specialty" type="button" data-specialty="<?=$i?>"><span class="ae-specialty-text"><?=e($role)?></span><i class="ae-specialty-marker" aria-hidden="true"></i></button><?php endforeach;?><div class="ae-cube" aria-hidden="true"></div></div>
<div class="ae-photo-composition ae-reveal"><div class="ae-ring" aria-hidden="true"></div><figure class="ae-photo-main"><?php about_picture(about_text($about,'image_story'),$name,'about-photo-primary');?></figure><figure class="ae-photo-small"><?php about_picture(about_text($about,'image_secondary'),$name,'about-photo-secondary');?></figure></div>
<p class="ae-story ae-reveal"><?=nl2br(e($story))?></p><dl class="ae-facts ae-reveal"><div><dt>BASED IN</dt><dd><?=e($profile['location'])?></dd></div><div><dt>FOCUS</dt><dd><?=e($roles[0]??$profile['expertise'])?></dd></div><div><dt>STATUS</dt><dd><?=e($profile['status'])?></dd></div><div><dt><?=te('IPK')?></dt><dd><?=e($profile['gpa'])?></dd></div></dl></section>
<section class="ae-skills ae-light"><h2 class="ae-display ae-reveal">MY<br>SKILLS</h2><div class="ae-skill-list"><?php foreach($details as $i=>$detail):?><article class="ae-skill-row ae-reveal"><h3><?=e($detail['title']??'')?></h3><p><?=nl2br(e($detail['text']??''))?></p></article><?php endforeach;?></div></section>
<section class="ae-experience"><h2 class="ae-display ae-reveal">EXPERIENCE</h2><div class="ae-experience-list"><?php foreach($experiences as $exp):?><article class="ae-experience-row ae-reveal" tabindex="0"><span><?=e($exp['period'])?></span><h3><?=e($exp['title'])?></h3><strong><?=e($exp['organization'])?></strong><p><?=e($exp['description']?:implode(' · ',array_column(json_list($exp['highlights']),'title')))?></p></article><?php endforeach;?><?php if(!$experiences):?><p><?=te('Pengalaman akan tampil setelah ditambahkan melalui admin.')?></p><?php endif;?></div></section>
<section class="ae-offscreen ae-light side-notes"><h2 class="ae-offscreen-title ae-reveal"><span>SIDE</span><em>NOTES</em><small>visual journal</small></h2><p class="sn-intro ae-reveal"><?=te('Ruang kecil untuk cerita di luar layar.')?></p><div class="ae-polaroids" aria-label="<?=te('Galeri Side Notes')?>"><?php foreach($noteSlots as $i=>$note):$caption=$note['caption'];$noteImage=$note['image']?:('assets/images/notes-'.['coffee','landscape','studio','sound'][$i].'.svg');?><figure class="ae-polaroid" style="--card-index:<?=$i?>;--spread:<?=($i-1.5)?>"><img src="<?=e($noteImage)?>" alt="<?=e($caption?:'Side Notes '.($i+1))?>" loading="lazy"><figcaption><?=e($caption)?></figcaption></figure><?php endforeach;?></div></section>
</main>
<?php require __DIR__.'/includes/footer.php';?>
<?php require __DIR__.'/includes/cv-preview.php';?></body></html>
