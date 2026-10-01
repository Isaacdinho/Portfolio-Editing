import {shell,el,button} from './secret-ui.js?v=5';
import {ZONES,createMatch,shoot,score} from './penalty-engine.js';
export function open(onClose){
 const ui=shell('Fratton after dark — penalty shoot-out',onClose);ui.d.classList.add('penalty-shell');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const wrap=el('section','penalty-wrap'),top=el('div','penalty-heading');top.append(el('p','secret-kicker','CHANNEL 03 / ICB SPORTS / LIVE FROM THE SOUTH COAST'),el('h1','','FRATTON AFTER DARK'),el('p','','Five kicks. Four goals to beat Isaac. Pick your spot.'));
 const board=el('div','penalty-score'),status=el('p','penalty-status','Tuning into the home end…');status.setAttribute('role','status');
 const screen=el('div','penalty-screen'),canvas=el('canvas');canvas.width=720;canvas.height=360;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Pixel-art Fratton Park-inspired stadium. Isaac guards the goal in a blue Pompey shirt, white shorts and red socks.');screen.append(canvas);
 const controls=el('div','penalty-controls');controls.setAttribute('aria-label','Choose where to shoot');const buttons=ZONES.map((z,i)=>button(['↖','↗','●','↙','↘'][i]+' '+z.name,()=>kick(i)));buttons.forEach((b,i)=>{b.style.gridArea=['tl','tr','mid','bl','br'][i];b.disabled=true;controls.append(b);});
 const next=button('Next penalty →',resetShot,'primary');next.hidden=true;const replay=button('Play again',restart,'primary');replay.hidden=true;
 wrap.append(top,board,screen,status,controls,next,replay,el('p','penalty-help','Click or tap a target. Keyboard: Tab to choose, Enter to shoot. Escape returns to the portfolio.'));ui.body.append(wrap);
 const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;let match=createMatch(),anim=null,raf=0,closed=false,ready=false;const timers=[];
 const later=(fn,ms)=>{const id=setTimeout(()=>{if(!closed)fn();},ms);timers.push(id);};
 function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
 function label(text,x,y,size=12,c='#e6eff7'){ctx.fillStyle=c;ctx.font=`bold ${size}px monospace`;ctx.textAlign='center';ctx.fillText(text,x,y);}
 function keeper(x,y,angle){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.rotate(angle);rect(-14,-62,28,26,'#bc855f');rect(-16,-67,32,10,'#493324');rect(-16,-60,7,12,'#63452e');rect(10,-60,6,12,'#63452e');rect(-7,-51,3,3,'#171c28');rect(5,-51,3,3,'#171c28');rect(-5,-43,10,4,'#684432');rect(-18,-36,36,32,'#165acd');rect(-7,-35,14,4,'#edf3fa');rect(-7,-25,14,3,'#fff');rect(-28,-33,10,22,'#196ee5');rect(18,-33,10,22,'#196ee5');rect(-31,-14,12,10,'#e8e9bb');rect(19,-14,12,10,'#e8e9bb');rect(-17,-4,34,13,'#f3eee4');rect(-15,9,11,20,'#c52e40');rect(4,9,11,20,'#c52e40');rect(-19,27,16,7,'#111a2c');rect(3,27,16,7,'#111a2c');ctx.restore();}
 function draw(now=0){
 rect(0,0,720,360,'#101c38');rect(0,50,720,110,'#162849');rect(0,65,720,9,'#7b91a4');rect(0,74,720,9,'#263e56');
 for(let x=0;x<720;x+=24){rect(x,85,6,80,'#526c7f');for(let y=100;y<179;y+=15){rect(x+8,y,5,6,(x+y)%3?'#3064ab':'#d9c5a3');rect(x+6,y+6,10,6,'#152445');}}
 for(const x of [44,666]){rect(x,10,5,126,'#6b8296');rect(x-21,8,48,17,'#95a9bb');for(let a=0;a<4;a++)rect(x-17+a*12,10,8,10,'#f9edc3');}
 rect(0,170,720,27,'#113d86');label('FRATTON PARK',360,189,15);label('PLAY UP POMPEY',98,188,10);label('THE FRATTON END',624,188,10);
 rect(0,197,720,163,'#285b45');for(let y=213;y<360;y+=40)rect(0,y,720,20,'#30674c');rect(0,278,720,3,'#bed3be');rect(180,278,3,82,'#b1cfb7');rect(537,278,3,82,'#b1cfb7');rect(354,327,12,4,'#e4e5d9');
 rect(169,113,382,150,'#142e2e');ctx.strokeStyle='#668e83';ctx.lineWidth=1;for(let x=174;x<550;x+=16){ctx.beginPath();ctx.moveTo(x,114);ctx.lineTo(x,263);ctx.stroke();}for(let y=118;y<264;y+=14){ctx.beginPath();ctx.moveTo(170,y);ctx.lineTo(550,y);ctx.stroke();}rect(164,107,392,6,'#edf1df');rect(164,107,6,163,'#edf1df');rect(550,107,6,163,'#edf1df');
 let kx=360,ky=227,angle=0,bx=360,by=329,bs=11;
 if(anim){const f=reduced?1:Math.min(1,(now-anim.start)/700),ease=1-Math.pow(1-f,3),target=ZONES[anim.result.zone],dive=ZONES[anim.result.keeper];kx+=(dive.x-360)*ease;ky+=(dive.y-227+30)*ease;angle=(dive.x-360)/156*.95*ease;bx+=(target.x-360)*f;by+=(target.y-329)*f-Math.sin(f*Math.PI)*42;bs=11-5*f;if(f===1&&anim.result.goal)by+=8;}
 keeper(kx,ky,angle);rect(bx-bs,by-bs,bs*2,bs*2,'#f4f1df');rect(bx-3,by-3,6,6,'#223149');label('ISAAC / NO. 01',360,305,10,'#f8edbd');
 if(anim&&now-anim.start<(reduced?1:700))raf=requestAnimationFrame(draw);
 }
 function updateBoard(){board.textContent=`YOU ${score(match)}  —  ISAAC ${match.shots.length-score(match)}   /   KICKS ${match.shots.length}/5`;}
 function resetShot(){anim=null;ready=true;next.hidden=true;buttons.forEach(b=>b.disabled=false);status.textContent=`Penalty ${match.shots.length+1} of 5 — where are you putting it?`;draw();buttons[0].focus({preventScroll:true});}
 function kick(zone){if(!ready)return;ready=false;buttons.forEach(b=>b.disabled=true);const result=shoot(match,zone);anim={result,start:performance.now()};draw(anim.start);status.textContent='Isaac commits…';later(()=>{updateBoard();const feedback=result.goal?'GOAL! You sent Isaac the wrong way.':'SAVED! Isaac read that one.';if(match.shots.length===5){status.textContent=feedback+' '+(score(match)>=4?'FULL TIME — you win at Fratton!':'FULL TIME — Isaac holds the home end.')+` ${score(match)} goals from five.`;replay.hidden=false;replay.focus({preventScroll:true});}else{status.textContent=feedback;next.hidden=false;next.focus({preventScroll:true});}},reduced?100:950);}
 function restart(){match=createMatch();replay.hidden=true;updateBoard();resetShot();}
 updateBoard();draw();
 const tune=el('div','penalty-tune'),channel=el('strong','','CH 01 / NO SIGNAL');tune.setAttribute('aria-hidden','true');tune.append(channel,el('span','','SEARCHING FOR A BETTER SATURDAY…'));ui.body.append(tune);ui.d.classList.add('is-tuning');later(()=>{channel.textContent='CH 08 / TRACKING';},350);later(()=>{channel.textContent='CH 03 / ICB SPORTS';},750);later(()=>{tune.remove();ui.d.classList.remove('is-tuning');resetShot();},reduced?180:1250);
 ui.cleanup.push(()=>{closed=true;timers.forEach(clearTimeout);cancelAnimationFrame(raf);});
}
