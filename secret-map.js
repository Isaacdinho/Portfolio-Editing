import {shell,el,button} from './secret-ui.js?v=5';
export function open(onClose){
 const ui=shell('After-hours field notes',onClose);ui.d.classList.add('map-shell');const wrap=el('section','secret-map');ui.body.append(wrap);
 wrap.append(el('p','secret-kicker','ICB / RECOVERED PROJECT FILE / 1986'),el('h1','','Nothing here is accidental.'),el('p','map-intro','A few notes were left in the margins. Follow the clues; the doors still need opening.'));
 const notes=[
 ['01 / THE CUTTING ROOM','Every film begins with a slate. Five knocks, before the moment passes.','Some signatures open more than a home page.'],
 ['02 / THE OTHER ISAAC','The face in the frame has another opponent in mind. Third time’s the charm.','A portrait can make the first move.'],
 ['03 / THE SMALL PRINT','Ownership is a curious thing. Look for the smallest claim at the very end.','One little circle knows a lot about its owner.'],
 ['04 / THE LONG NIGHT','Count what you’ve uncovered. Even the count has somewhere to run.','A finished timeline is not always a finished export.'],
 ['05 / THE OLD SIGNAL','An old arcade remembers the way: rise twice, fall twice, then look both ways twice. Two letters finish the thought.','The alphabet takes one step backwards. Start at B.'],
 ['06 / THE PERFECT CUT','Eight takes. No mistakes. Let the applause settle…','Some rewards would rather fight than be found.'],
 ['07 / UNDER THE FLOODLIGHTS','The third chapter has a home advantage. Touch its number twice and tune into the away end.','Two digits. Two touches. Five chances from the spot.']
 ];
 const trail=el('div','map-trail');notes.forEach(([title,clue,hint],i)=>{const card=el('article','map-note');card.append(el('span','map-node',String(i+1).padStart(2,'0')),el('p','secret-kicker',title),el('h2','',clue));const details=el('details','map-hint');details.append(el('summary','','Unfold one more hint'),el('p','',hint));card.append(details);trail.append(card);});wrap.append(trail,el('p','map-footnote','No shortcuts. No coordinates. The original doors are still yours to find.'),button('Back to the hunt ↗',ui.close,'primary'));
}
