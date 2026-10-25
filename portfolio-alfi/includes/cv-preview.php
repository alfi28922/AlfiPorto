<dialog id="cv-image-dialog" class="cv-image-dialog" aria-labelledby="cv-preview-title">
 <div class="cv-preview-header"><div><p>CURRICULUM VITAE</p><h2 id="cv-preview-title"><?=te('Preview CV')?></h2></div><button type="button" class="cv-preview-close" aria-label="<?=te('Tutup preview CV')?>">×</button></div>
 <div class="cv-preview-stage" aria-busy="false"><p class="cv-preview-status" role="status"></p><img class="cv-preview-page" alt="<?=te('Halaman CV')?>" hidden><button type="button" class="cv-preview-retry" hidden><?=te('Coba lagi')?></button></div>
 <div class="cv-preview-controls"><button type="button" data-cv-prev aria-label="<?=te('Halaman sebelumnya')?>">‹</button><span data-cv-page role="status"></span><button type="button" data-cv-next aria-label="<?=te('Halaman berikutnya')?>">›</button></div>
</dialog>
<script defer src="assets/cv-preview.js?v=image-preview-20261025"></script>
