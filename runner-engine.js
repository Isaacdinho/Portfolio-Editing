/* Deterministic, rendering-independent runner simulation. Distances are logical pixels. */
export const WIDTH=960, FLOOR=292, DURATION=58;
export const hazards={
 render:{label:'RENDER ERROR',hint:'JUMP',width:86,height:51,offset:0,color:'#ef809e'},
 sync:{label:'AUDIO OUT OF SYNC',hint:'DUCK',width:136,height:37,offset:42,color:'#d3a7ff'},
 codec:{label:'MISSING CODEC',hint:'JUMP',width:101,height:60,offset:0,color:'#ffc488'}
};
export function createRun(random=Math.random){return {random,time:0,speed:250,y:0,velocity:0,duck:false,lives:3,invulnerable:0,spawnIn:1.3,obstacles:[],nextId:0,status:'running',distance:0,flash:0};}
export function stepRun(s,dt,input={}){
 if(s.status!=='running')return;dt=Math.max(0,Math.min(dt,.04));s.time=Math.min(DURATION,s.time+dt);s.speed=250+190*s.time/DURATION;s.distance+=s.speed*dt;s.invulnerable=Math.max(0,s.invulnerable-dt);s.flash=Math.max(0,s.flash-dt);
 s.duck=!!input.duck&&s.y===0;
 if(input.jump&&s.y===0&&!s.duck){s.velocity=600;s.y=.01;}
 s.y=Math.max(0,s.y+s.velocity*dt);s.velocity-=1350*dt;if(s.y===0)s.velocity=0;
 s.spawnIn-=dt;if(s.spawnIn<=0){const type=s.nextId===0?'render':s.nextId===1?'sync':['render','sync','codec'][Math.floor(s.random()*3)];s.obstacles.push({id:s.nextId++,type,x:WIDTH+30,hit:false});s.spawnIn=1.65-.35*s.time/DURATION+s.random()*.25;}
 const player={x:130,y:FLOOR-s.y-(s.duck?24:54),width:44,height:s.duck?24:54};
 for(const o of s.obstacles){o.x-=s.speed*dt;const h=hazards[o.type],oy=FLOOR-h.offset-h.height;if(!o.hit&&s.invulnerable===0&&player.x+player.width-6>o.x&&player.x+6<o.x+h.width&&player.y+player.height-4>oy&&player.y+4<oy+h.height){o.hit=true;s.lives--;s.invulnerable=1.3;s.flash=.18;if(s.lives===0)s.status='failed';}}
 s.obstacles=s.obstacles.filter(o=>o.x+hazards[o.type].width>-20);
 if(s.time>=DURATION&&s.status==='running')s.status='complete';
}
