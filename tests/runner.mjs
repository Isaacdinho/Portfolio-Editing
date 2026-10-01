import assert from 'node:assert/strict';
import {createRun,stepRun,hazards,DURATION} from '../dist/runner-engine.js';
const idle=createRun(()=>.4);for(let i=0;i<60*70&&idle.status==='running';i++)stepRun(idle,1/60);assert.equal(idle.status,'failed');
for(const seed of [.05,.45,.9]){
 const run=createRun(()=>seed);for(let i=0;i<60*70&&run.status==='running';i++){
  const next=run.obstacles.find(o=>o.x+hazards[o.type].width>130&&!o.hit);
  const distance=next?next.x-174:Infinity;
  const danger=next&&distance<run.speed*.22;
  stepRun(run,1/60,{jump:danger&&next.type!=='sync',duck:danger&&next.type==='sync'});
 }
 assert.equal(run.status,'complete');assert.equal(run.time,DURATION);assert(run.lives>0);assert(run.speed>430);
 const time=run.time;stepRun(run,.04,{jump:true});assert.equal(run.time,time);
 console.log('PASS runner: 100% export, escalating speed, jump/duck path; pattern',seed,'recoveries left',run.lives);
}
const jump=createRun();stepRun(jump,1/60,{jump:true});assert(jump.y>0);for(let i=0;i<60;i++)stepRun(jump,1/60);assert.equal(jump.y,0);stepRun(jump,1/60,{duck:true});assert(jump.duck);console.log('PASS runner: idle failure, jump/landing, duck and terminal state');
