<?php
// Public-site language only. Admin input and stored database values are left intact.
$requestedLanguage=$_GET['lang']??null;
$portfolioLanguage=is_string($requestedLanguage)&&in_array($requestedLanguage,['id','en'],true)?$requestedLanguage:($_COOKIE['portfolio_language']??'id');
if(!is_string($portfolioLanguage))$portfolioLanguage='id';
if(!in_array($portfolioLanguage,['id','en'],true))$portfolioLanguage='id';
if(is_string($requestedLanguage)&&in_array($requestedLanguage,['id','en'],true))setcookie('portfolio_language',$portfolioLanguage,['expires'=>time()+31536000,'path'=>'/','secure'=>request_is_secure(),'httponly'=>true,'samesite'=>'Lax']);
$portfolioEnglish=json_decode((string)file_get_contents(__DIR__.'/../assets/translations/en.json'),true)?:[];
function portfolio_t(string $text):string {
 global $portfolioLanguage,$portfolioEnglish;
 if($portfolioLanguage!=='en'||trim($text)==='')return $text;
 $key=preg_replace('/\s+/u',' ',trim(html_entity_decode($text,ENT_QUOTES,'UTF-8')));
 $translated=$portfolioEnglish[$key]??null;
 if($translated===null){static $folded=null;if($folded===null){$folded=[];foreach($portfolioEnglish as $source=>$value)$folded[strtolower($source)]=$value;}$translated=$folded[strtolower($key)]??null;}
 if($translated===null)return $text;
 preg_match('/^\s*/u',$text,$lead);preg_match('/\s*$/u',$text,$tail);
 return ($lead[0]??'').$translated.($tail[0]??'');
}
function te(string $text):string{return e(portfolio_t($text));}
function portfolio_translate_json(string $json):string {
 $values=json_decode($json,true);if(!is_array($values))return $json;
 array_walk_recursive($values,static function(&$value){if(is_string($value))$value=portfolio_t($value);});
 return json_encode($values,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}
function portfolio_localize(array &$profile,array &$projects,array &$experiences,array &$skills,array &$certificates):void {
 global $portfolioLanguage;if($portfolioLanguage!=='en')return;
 foreach(['bio','location','status','expertise','expertise_detail','organization_detail','footer_bio'] as $key)if(isset($profile[$key]))$profile[$key]=portfolio_t((string)$profile[$key]);
 $profile['roles']=portfolio_translate_json((string)($profile['roles']??'[]'));
 foreach([&$projects,&$experiences,&$skills,&$certificates] as &$rows){foreach($rows as &$row){foreach(['title','category','period','description','issuer'] as $key)if(isset($row[$key]))$row[$key]=portfolio_t((string)$row[$key]);foreach(['tags','highlights'] as $key)if(isset($row[$key]))$row[$key]=portfolio_translate_json((string)$row[$key]);}unset($row);}unset($rows);
}
function portfolio_language_payload():void {
 global $portfolioLanguage,$portfolioEnglish;
 echo '<script>window.PORTFOLIO_I18N='.json_encode(['lang'=>$portfolioLanguage,'strings'=>$portfolioEnglish],JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT|JSON_UNESCAPED_UNICODE).';</script>';
}
function portfolio_language_switch(string $class=''):void {
 global $portfolioLanguage;
 echo '<nav class="language-switch '.e($class).'" aria-label="'.te('Bahasa halaman').'">';
 foreach(['id'=>'ID','en'=>'EN'] as $locale=>$label)echo '<a data-language="'.$locale.'" href="?lang='.$locale.'" lang="'.$locale.'" aria-label="'.($locale==='id'?'Bahasa Indonesia':'English').'"'.($portfolioLanguage===$locale?' aria-current="true"':'').'>'.$label.'</a>';
 echo '</nav>';
}
