export const ZONES=[{name:'Top left',x:204,y:134},{name:'Top right',x:516,y:134},{name:'Centre',x:360,y:194},{name:'Bottom left',x:204,y:242},{name:'Bottom right',x:516,y:242}];
export function createMatch(random=Math.random){return {shots:[],keeper:Math.min(4,Math.max(0,Math.floor(random()*5))),random};}
export function shoot(match,zone){if(!Number.isInteger(zone)||zone<0||zone>4||match.shots.length>=5)return null;const result={zone,keeper:match.keeper,goal:zone!==match.keeper};match.shots.push(result);match.keeper=Math.min(4,Math.max(0,Math.floor(match.random()*5)));return result;}
export function score(match){return match.shots.filter(s=>s.goal).length;}
