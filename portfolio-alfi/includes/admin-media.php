<?php
declare(strict_types=1);

// Removing a reference never deletes a shared image from another portfolio section.
function admin_image_value(array $post,string $field,string $value):string {
    return is_array($post['remove_image']??null) && ($post['remove_image'][$field]??null)==='1' ? '' : $value;
}

function admin_gallery_paths(string $value,$removed=[]):array {
    if(!is_array($removed))throw new RuntimeException('Pilihan foto yang dihapus tidak valid.');
    foreach($removed as $path)if(!is_string($path))throw new RuntimeException('Pilihan foto yang dihapus tidak valid.');
    $paths=array_values(array_filter(array_map('trim',preg_split('/\R/',$value)),fn($path)=>$path!==''));
    return array_values(array_unique(array_filter($paths,fn($path)=>!in_array($path,$removed,true))));
}

function render_admin_media(string $field,string $type,string $value):void {
    $gallery=$type==='gallery';
    $remove=is_array($_POST['remove_image']??null)&&($_POST['remove_image'][$field]??null)==='1';
    $removed=$_POST['remove_gallery'][$field]??[];
    if(!is_array($removed))$removed=[];
    ?>
    <div class="media-editor" data-media-field="<?=e($field)?>" data-media-type="<?=e($type)?>">
      <label class="upload-label"><?=$gallery?'Tambah foto galeri':'Upload gambar (menggantikan path di atas)'?><input type="file" name="<?=$gallery?'gallery_files[]':e($field).'_file'?>" accept="image/jpeg,image/png,image/webp" <?=$gallery?'multiple':''?> data-media-upload></label>
      <p class="media-help">JPG, PNG, WebP. Maksimal 5 MB per foto. <?=$gallery?'Maksimal 20 foto per upload.':'Pilih gambar baru untuk mengganti foto saat ini.'?></p>
      <button class="delete-button media-cancel-upload" type="button" data-clear-upload hidden>Batalkan pilihan file</button>
      <div class="media-pending" data-pending-previews aria-live="polite"></div>
      <?php if(!$gallery):?>
        <img class="upload-preview" data-saved-preview src="<?=$value&&safe_url($value,true)?'../'.e($value):''?>" alt="Foto yang tersimpan" <?=$value&&safe_url($value,true)?'':'hidden'?>>
        <?php if($value!==''):?><label class="media-remove"><input type="checkbox" name="remove_image[<?=e($field)?>]" value="1" data-remove-image <?=$remove?'checked':''?>> Hapus foto ini</label><?php endif;?>
      <?php else:?>
        <div class="media-gallery">
          <?php foreach(admin_gallery_paths($value) as $path):if(!safe_url($path,true))continue;?>
            <div class="media-gallery-card" data-gallery-card>
              <img src="../<?=e($path)?>" alt="Foto galeri" loading="lazy">
              <label class="media-remove"><input type="checkbox" name="remove_gallery[<?=e($field)?>][]" value="<?=e($path)?>" <?=$removed&&in_array($path,$removed,true)?'checked':''?>> Hapus foto ini</label>
            </div>
          <?php endforeach;?>
        </div>
      <?php endif;?>
      <p class="media-help" data-media-status role="status">Penghapusan berlaku setelah klik Simpan perubahan.</p>
    </div>
    <?php
}

function safe_certificate_url(string $value):bool {
    if($value===''||preg_match('~^https?://~i',$value))return safe_url($value);
    return !str_contains($value,'..') && preg_match('~^(assets/certificates/[a-z0-9-]+\.(pdf|png|jpe?g|webp)|uploads/certificates/[a-f0-9]{32}\.pdf)$~',$value)===1;
}
function admin_document_value(array $post,string $field,string $value):string {
    return is_array($post['remove_document']??null)&&($post['remove_document'][$field]??null)==='1'?'':$value;
}
function upload_certificate_pdf(string $name,string $folder='certificates'):?string {
    if(!in_array($folder,['certificates','cv'],true))throw new RuntimeException('Folder dokumen tidak valid.');
    $file=$_FILES[$name]??null;
    if(!$file||$file['error']===UPLOAD_ERR_NO_FILE)return null;
    if(!is_array($file)||!isset($file['error'],$file['size'],$file['tmp_name'])||!is_int($file['error'])||$file['error']!==UPLOAD_ERR_OK||$file['size']>10*1024*1024||!is_uploaded_file($file['tmp_name']))throw new RuntimeException('Upload PDF gagal. Maksimal 10 MB; periksa batas upload PHP.');
    if((new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name'])!=='application/pdf'||file_get_contents($file['tmp_name'],false,null,0,5)!=='%PDF-')throw new RuntimeException('Gunakan dokumen PDF yang valid.');
    $directory=__DIR__.'/../uploads/'.$folder;if(!is_dir($directory)&&!mkdir($directory,0755,true)&&!is_dir($directory))throw new RuntimeException('Folder dokumen tidak dapat dibuat.');
    $path='uploads/'.$folder.'/'.bin2hex(random_bytes(16)).'.pdf';
    if(!move_uploaded_file($file['tmp_name'],__DIR__.'/../'.$path))throw new RuntimeException('Dokumen tidak dapat disimpan.');
    return $path;
}
function render_admin_document(string $field,string $value):void {?>
 <div class="media-editor document-editor" data-document-editor><label class="upload-label">Upload dokumen PDF<input type="file" name="<?=e($field)?>_file" accept="application/pdf,.pdf" data-document-upload></label><p class="media-help">PDF maksimal 10 MB. Upload menggantikan tautan di atas; preview gambar diatur pada Foto sertifikat.</p><p class="document-selection" data-document-selection role="status"></p><button type="button" class="delete-button" data-clear-document hidden>Batalkan pilihan PDF</button><?php if($value&&safe_certificate_url($value)):?><a class="document-link" data-saved-document href="<?=e(preg_match('~^https?://~i',$value)?$value:'../'.$value)?>" target="_blank" rel="noopener noreferrer">Buka dokumen tersimpan ↗</a><label class="media-remove"><input type="checkbox" name="remove_document[<?=e($field)?>]" value="1" data-remove-document> Hapus dokumen / tautan ini</label><?php endif;?><p class="media-help">Perubahan berlaku setelah Simpan perubahan.</p></div>
<?php }

function render_admin_cv(string $value):void {?>
 <div class="media-editor document-editor" data-document-editor>
 <label class="upload-label">Upload / ganti CV<input type="file" name="cv_file_file" accept="application/pdf,.pdf" data-document-upload></label>
 <p class="media-help">PDF maksimal 10 MB. Tombol Preview CV tampil di halaman utama dan About Me setelah disimpan. Upload baru menggantikan CV aktif.</p>
 <p class="document-selection" data-document-selection role="status"></p><button type="button" class="delete-button" data-clear-document hidden>Batalkan pilihan PDF</button>
 <?php if($value!==''&&safe_cv_path($value)):?><a class="document-link" data-saved-document href="../preview-cv.php" target="_blank" rel="noopener noreferrer">Buka CV tersimpan</a><label class="media-remove"><input type="checkbox" name="remove_document[cv_file]" value="1" data-remove-document> Hapus CV dari website</label><?php endif;?>
 <p class="media-help">Klik Simpan perubahan untuk menerapkan upload atau penghapusan.</p></div>
<?php }
