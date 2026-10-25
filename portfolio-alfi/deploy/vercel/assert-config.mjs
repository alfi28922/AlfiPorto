import fs from 'node:fs';
const config=JSON.parse(fs.readFileSync(new URL('./vercel.json',import.meta.url),'utf8'));
const destination=config.routes.find(route=>route.dest)?.dest;
const url=new URL(destination);
if(url.protocol!=='https:'||url.hostname.endsWith('.invalid')||url.hostname==='localhost'||url.username||url.password||url.pathname!=='/$1'||url.search||url.hash)throw new Error('Ganti domain backend HTTPS di deploy/vercel/vercel.json. Backend harus dipasang di root domain, bukan subfolder.');
if(!/^[a-f0-9]{64}$/i.test(process.env.ORIGIN_SECRET||''))throw new Error('Atur ORIGIN_SECRET 64 karakter hex acak di Environment Variables Vercel. Jangan simpan nilainya di Git.');
console.log('Konfigurasi gateway siap. Pastikan backend mempunyai ORIGIN_SECRET yang sama.');
