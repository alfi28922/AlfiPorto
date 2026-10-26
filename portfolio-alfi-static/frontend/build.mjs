import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
await build({entryPoints:{'react-hero':path.join(here,'hero.jsx'),'page-transition':path.join(here,'page-transition.jsx')},bundle:true,minify:true,outdir:path.join(here,'../public/assets'),define:{'process.env.NODE_ENV':'"production"'},target:['es2020'],legalComments:'eof'});
