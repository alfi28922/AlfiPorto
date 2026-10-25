<?php
// One contact footer for Home and About Me; content follows the main profile.
$footerName=(string)$profile['name'];
$footerHome=isset($about)?'index.php#home':'#home';
$footerRoles=json_list($profile['roles']??'');
if(!$footerRoles){
  $footerRoles=['FULL STACK DEVELOPMENT','WEB ARCHITECTURE','UI / UX ENGINEERING','DEEP LEARNING & COMPUTER VISION','DATABASE DESIGN','SYSTEM INTEGRATION'];
}
$tickerItems=array_merge($footerRoles,$footerRoles);
?>
<footer id="contact" class="portfolio-footer pf-studio pf-command-deck reveal ae-reveal">
  <div class="pf-deck-frame">
    <div class="pf-deck-topstrip" aria-hidden="true">
      <div class="pf-deck-notch">
        <a class="pf-notch-logo" href="index.php" aria-label="<?=e($profile['brand'])?>">
          <svg class="ma-geometric-logo" viewBox="0 0 156 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path class="ma-letter-m" d="M8 86L22 14H41L53 52L65 14H84L70 86H53L60 44L47 80H35L28 44L21 86H8Z" fill="currentColor"/>
            <path class="ma-letter-a" fill-rule="evenodd" clip-rule="evenodd" d="M108 14H129L148 86H130L126 70H102L96 86H78L108 14ZM116 34L107 56H122L116 34Z" fill="#3c8edb"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="pf-deck-canvas">
      <svg class="pf-deck-contours" viewBox="0 0 1600 640" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <path d="M800 -90C1160 -100 1500 80 1520 320C1540 560 1190 740 800 730C410 720 70 550 80 310C90 70 440 -80 800 -90Z"/>
        <path d="M800 -10C1090 -20 1360 120 1375 320C1390 520 1110 660 800 650C490 640 215 505 225 310C235 115 510 0 800 -10Z"/>
        <path d="M800 70C1010 62 1210 165 1222 320C1234 475 1030 580 800 572C570 564 365 460 375 310C385 160 590 78 800 70Z"/>
        <path d="M800 148C935 142 1065 210 1072 320C1079 430 945 502 800 496C655 490 525 418 532 310C539 202 665 154 800 148Z"/>
        <path d="M800 222C872 218 938 258 942 320C946 382 876 424 800 420C724 416 658 374 662 312C666 250 728 226 800 222Z"/>
      </svg>

      <div class="pf-deck-grid">
        <nav class="pf-deck-col pf-col-left" aria-label="<?=te('Navigasi halaman')?>">
          <small><?=te('Explore')?></small>
          <a href="index.php#home">HOME</a>
          <a href="index.php#projects">PROJECTS</a>
          <a href="index.php#experience">EXPERIENCE</a>
          <a href="index.php#skills">SKILLS</a>
          <a href="about.php">ABOUT ME</a>
        </nav>

        <nav class="pf-deck-col pf-col-right" aria-label="<?=te('Tautan sosial')?>">
          <small><?=te('Connect')?></small>
          <?php if(!empty($profile['github'])):?><a href="<?=e($profile['github'])?>" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><?php endif;?>
          <?php if(!empty($profile['linkedin'])):?><a href="<?=e($profile['linkedin'])?>" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><?php endif;?>
          <?php if(!empty($profile['instagram'])):?><a href="<?=e($profile['instagram'])?>" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a><?php endif;?>
          <a href="mailto:<?=e($profile['email'])?>">EMAIL ↗</a>
        </nav>
      </div>

      <div class="pf-deck-ticker" aria-hidden="true">
        <div class="pf-ticker-track">
          <?php foreach($tickerItems as $item):?>
            <span><?=e(strtoupper((string)$item))?></span><b>◆</b>
          <?php endforeach;?>
          <span>WEB DEVELOPMENT</span><b>◆</b>
          <span>SOFTWARE ENGINEERING</span><b>◆</b>
          <span>CLEAN ARCHITECTURE</span><b>◆</b>
        </div>
      </div>

      <div class="pf-deck-bottombar">
        <p class="pf-deck-copy">© <?=date('Y')?> <?=e(strtoupper($footerName))?>. <span>All rights reserved.</span></p>
        <a class="pf-deck-dockcta" href="mailto:<?=e($profile['email'])?>">
          <span><?=te('CONTACT ME')?></span>
          <i aria-hidden="true">↗</i>
        </a>
        <a class="pf-deck-backtop" href="<?=e($footerHome)?>">
          <span><?=te('Back to Top')?></span>
          <i aria-hidden="true">↑</i>
        </a>
      </div>
    </div>
  </div>
</footer>
