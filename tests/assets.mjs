import {fileURLToPath} from 'node:url';
import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url),context={window:{}};vm.runInNewContext(fs.readFileSync(new URL('content.js',root),'utf8'),context);
function inspect(value){if(typeof value==='string'&&value.startsWith('assets/'))assert.ok(fs.existsSync(new URL(value,root)),`Missing asset: ${value}`);else if(value&&typeof value==='object')Object.values(value).forEach(inspect);}
inspect(context.window.portfolio);
const html=fs.readFileSync(new URL('index.html',root),'utf8');for(const [,ref] of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(/^(https?:|mailto:)/.test(ref))continue;assert.ok(fs.existsSync(new URL(ref.split('?')[0],root)),`Missing HTML resource: ${ref}`);}
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else assert.ok(fs.statSync(file).size<25*1024*1024,`Too large for browser GitHub upload: ${file}`);}}
walk(fileURLToPath(root));console.log('PASS: content assets, HTML resources and GitHub browser-upload file sizes');
