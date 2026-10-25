<?php
declare(strict_types=1);

function about_note_slots(string $value):array {
    $items=json_list($value);
    $defaults=['Small details','Mountain days','Forest walks','On the road'];
    $slots=[];
    for($i=0;$i<4;$i++){
        $item=$items[$i]??'';
        $image=is_array($item)?($item['image']??''):$item;
        $caption=is_array($item)?($item['caption']??''):$defaults[$i];
        $slots[]=['image'=>is_string($image)&&safe_url($image,true)?$image:'','caption'=>is_string($caption)?$caption:''];
    }
    return $slots;
}

function about_photo_form_row(array $row):array {
    foreach(about_note_slots((string)($row['hobbies']??'')) as $i=>$slot){
        $row['notes_image_'.($i+1)]=$slot['image'];
        $row['notes_caption_'.($i+1)]=$slot['caption'];
    }
    return $row;
}

function about_photo_storage_values(array $values):array {
    $slots=[];
    for($i=1;$i<=4;$i++){
        $slots[]=['image'=>(string)($values['notes_image_'.$i]??''),'caption'=>(string)($values['notes_caption_'.$i]??'')];
        unset($values['notes_image_'.$i],$values['notes_caption_'.$i]);
    }
    $values['hobbies']=json_encode($slots,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);
    return $values;
}
