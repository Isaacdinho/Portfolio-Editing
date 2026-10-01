import assert from 'node:assert/strict';
import {createMatch,shoot,score,ZONES} from '../dist/penalty-engine.js';
assert.equal(ZONES.length,5);
for(let keeper=0;keeper<5;keeper++)for(let aim=0;aim<5;aim++){const m=createMatch(()=>keeper/5+.01);const r=shoot(m,aim);assert.equal(r.goal,keeper!==aim);assert.equal(score(m),keeper===aim?0:1);}
const m=createMatch(()=>0);assert.equal(shoot(m,-1),null);assert.equal(shoot(m,5),null);assert.equal(shoot(m,1.2),null);for(let i=0;i<5;i++)shoot(m,1);assert.equal(score(m),5);assert.equal(shoot(m,1),null);assert.equal(m.shots.length,5);assert.equal(createMatch().shots.length,0);console.log('PASS: all 25 aim/keeper combinations, invalid targets, five-shot limit and reset');
