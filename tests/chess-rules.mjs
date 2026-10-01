import assert from 'node:assert/strict';
import {Chess} from '../dist/vendor/chess.js';
import {chooseMove} from '../dist/chess-ai.js';
import {questions,NBA_TEAM,reactions} from '../dist/quiz-data.js';
const g=new Chess();assert.equal(g.moves().length,20);assert.equal(g.perft(3),8902);
const castle=new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');castle.move('O-O');assert.equal(castle.get('f1').type,'r');
const ep=new Chess();['e4','a6','e5','d5','exd6'].forEach(m=>ep.move(m));assert.equal(ep.get('d5'),undefined);assert.equal(ep.get('d6').type,'p');
const promotion=new Chess('7k/P7/8/8/8/8/8/7K w - - 0 1');promotion.move({from:'a7',to:'a8',promotion:'n'});assert.equal(promotion.get('a8').type,'n');
const mate=new Chess();['f3','e5','g4','Qh4#'].forEach(m=>mate.move(m));assert(mate.isCheckmate());
assert(new Chess('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1').isStalemate());
assert(new Chess('7k/8/8/8/8/8/8/7K w - - 0 1').isInsufficientMaterial());
const rep=new Chess();['Nf3','Nf6','Ng1','Ng8','Nf3','Nf6','Ng1','Ng8'].forEach(m=>rep.move(m));assert(rep.isThreefoldRepetition());
const bot=new Chess();bot.move('e4');for(let i=0;i<8;i++){const move=chooseMove(bot.fen());assert(bot.moves().includes(move));}assert.equal(questions.length,8);assert.equal(NBA_TEAM,'New York Knicks');assert.equal(reactions.length,9);for(const [q,a,w]of questions){assert.equal(new Set([a,...w]).size,4);assert(q);}
console.log('PASS: perft, castling, en passant, promotion, mate, stalemate, material, repetition, bot legality, quiz configuration');
