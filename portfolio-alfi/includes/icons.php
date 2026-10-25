<?php
function skill_icon(string $title,string $category): string {
 $value=strtolower($title.' '.$category);
 $icons=['python'=>'python','flutter'=>'flutter','mikrotik'=>'network','network'=>'network','mysql'=>'database','database'=>'database','seo'=>'chart','digital'=>'chart','figma'=>'figma','problem'=>'brain','attention'=>'eye','team'=>'users','adapt'=>'refresh','time'=>'clock','mobile'=>'flutter'];
 foreach($icons as $key=>$icon)if(str_contains($value,$key))return $icon;
 return 'code';
}
