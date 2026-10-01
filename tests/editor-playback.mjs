import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../dist/editor-workspace.js',import.meta.url),'utf8');
const start=source.indexOf(' function setPlaying('),end=source.indexOf(' function tick(',start);
const context={scheduled:0,cancelled:0,performance:{now:()=>10},shell:{classList:{toggle(){}}},play:{setAttribute(){}},requestAnimationFrame(){return ++context.scheduled;},cancelAnimationFrame(){context.cancelled++;},tick(){}};
vm.createContext(context);vm.runInContext('let playing=false,watching=false,last=0,frame=0;'+source.slice(start,end),context);
vm.runInContext('setPlaying(true);setPlaying(true);setPlaying(true)',context);assert.equal(context.scheduled,1);
vm.runInContext('setPlaying(false);setPlaying(false)',context);assert.equal(context.cancelled,1);
vm.runInContext('setPlaying(true)',context);assert.equal(context.scheduled,2);console.log('PASS editor: repeated play/pause commands keep exactly one animation loop');
