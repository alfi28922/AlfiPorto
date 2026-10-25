<?php
function admin_icon(string $name):string {
    $paths=[
      'dashboard'=>'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
      'profile'=>'M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
      'about_me'=>'M3 4h18v16H3zM3 16l5-5 5 5 3-3 5 5M16 8h.01',
      'projects'=>'M3 6h7l2 3h9v12H3zM3 6V3h7l2 3h9v3',
      'experiences'=>'M3 7h18v14H3zM8 7V3h8v4M3 12h18M10 12v3h4v-3',
      'skills'=>'m8 5-6 7 6 7M16 5l6 7-6 7M14 3l-4 18',
      'certificates'=>'M5 3h14v13H5zM9 16l-1 6 4-2 4 2-1-6M9 7h6M9 11h6',
      'account'=>'M5 10h14v11H5zM8 10V6a4 4 0 0 1 8 0v4M12 15v2',
      'external'=>'M14 3h7v7M21 3 10 14M10 3H3v18h18v-7',
      'search'=>'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1 5 6 6',
      'menu'=>'M4 6h16M4 12h16M4 18h16',
      'logout'=>'M9 4H3v16h6M13 7l5 5-5 5M8 12h13',
    ];
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'.($paths[$name]??$paths['dashboard']).'"/></svg>';
}
function admin_section_description(string $section):string {
    return [
      'dashboard'=>'Ringkasan konten dan akses cepat untuk melanjutkan pekerjaan.',
      'profile'=>'Perbarui identitas, kontak, dan CV yang tampil di portofolio.',
      'about_me'=>'Atur potret dan empat posisi Side Notes, satu per satu.',
      'projects'=>'Kelola karya, galeri, teknologi, dan tautan proyek.',
      'experiences'=>'Simpan pengalaman kerja dan riwayat organisasi.',
      'skills'=>'Rapikan keahlian dan kategori yang tampil di website.',
      'certificates'=>'Kelola preview, dokumen asli, dan informasi sertifikat.',
      'account'=>'Perbarui password untuk akses admin.',
    ][$section]??'';
}
function render_admin_sidebar(string $section,array $sections,array $profile):void {?>
  <aside class="admin-sidebar">
    <div class="admin-sidebar-head"><a href="index.php" class="admin-brand"><span class="admin-brand-mark">MA</span><span><?=e($profile['brand']??'Alfi.Dev')?><small>CONTENT STUDIO</small></span></a><button type="button" class="admin-menu-toggle" data-admin-menu-toggle aria-controls="admin-navigation" aria-expanded="true" aria-label="Buka atau tutup menu"><?=admin_icon('menu')?></button></div>
    <div id="admin-navigation"><p class="admin-nav-label">WORKSPACE</p><nav aria-label="Menu admin"><a class="<?=$section==='dashboard'?'active':''?>" href="index.php" <?=$section==='dashboard'?'aria-current="page"':''?>><?=admin_icon('dashboard')?><span>Dashboard</span></a><?php foreach($sections as $key=>$def):?><a class="<?=$section===$key?'active':''?>" href="index.php?section=<?=e($key)?>" <?=$section===$key?'aria-current="page"':''?>><?=admin_icon($key)?><span><?=e($def['label'])?></span></a><?php endforeach;?><a class="<?=$section==='account'?'active':''?>" href="index.php?section=account" <?=$section==='account'?'aria-current="page"':''?>><?=admin_icon('account')?><span>Keamanan akun</span></a></nav><div class="sidebar-bottom"><a class="sidebar-site-link" href="../" target="_blank" rel="noopener"><?=admin_icon('external')?> Buka portofolio</a><form action="logout.php" method="post"><input type="hidden" name="csrf" value="<?=e(csrf())?>"><button class="logout-button"><?=admin_icon('logout')?> Keluar</button></form></div></div>
  </aside>
<?php }
function render_admin_dashboard(array $sections,array $profile,array $projects,array $certificates):void {?>
  <section class="admin-hero"><div><span class="admin-hero-kicker">RUANG KERJA PRIBADI</span><h2>Kelola portofolio,<br>satu tempat.</h2><p>Selamat datang, <?=e($profile['name']??$_SESSION['username'])?>. Tambahkan karya terbaru atau rapikan konten yang sudah ada.</p><div class="admin-hero-actions"><a class="button" href="index.php?section=projects&edit=0">+ Tambah proyek</a><a href="index.php?section=certificates&edit=0">Tambah sertifikat <?=admin_icon('external')?></a></div></div><div class="admin-hero-art" aria-hidden="true"><span>MA</span><i></i><b>PORTFOLIO / STUDIO</b></div></section>
  <div class="admin-stats"><?php foreach(['projects','experiences','skills','certificates'] as $t):try{$count=(int)db()->query("SELECT COUNT(*) FROM `$t`")->fetchColumn();}catch(Throwable $error){$count='—';}?><a class="panel" href="index.php?section=<?=e($t)?>"><span class="stat-icon"><?=admin_icon($t)?></span><span class="stat-label"><?=e($sections[$t]['label'])?></span><strong><?=e($count)?></strong><span class="stat-manage">Kelola <?=admin_icon('external')?></span></a><?php endforeach;?></div>
  <div class="admin-recent-grid"><?php foreach([['projects','Proyek terbaru',$projects],['certificates','Sertifikat terbaru',$certificates]] as [$key,$label,$rows]):?><section class="panel admin-recent"><header><h2><?=e($label)?></h2><a href="index.php?section=<?=e($key)?>">Lihat semua</a></header><?php foreach($rows as $r):?><a class="admin-recent-row" href="index.php?section=<?=e($key)?>&edit=<?=(int)$r['id']?>"><?php if(!empty($r['image'])&&safe_url($r['image'],true)):?><img src="../<?=e($r['image'])?>" alt="" loading="lazy"><?php else:?><span><?=admin_icon($key)?></span><?php endif;?><div><strong><?=e($r['title'])?></strong><small><?=e($r['category'])?></small></div><?=admin_icon('external')?></a><?php endforeach;?><?php if(!$rows):?><p class="empty-state">Belum ada data. Tambahkan saat sudah siap.</p><?php endif;?></section><?php endforeach;?></div>
<?php }
