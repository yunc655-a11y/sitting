var $=function(id){return document.getElementById(id)};
var FEEL=['Calm','Busy','Loud','Warm','Lonely'],SEAT=['Bench','Lawn','Shade','Chairs','Quiet','Water'];
var P=[
{id:'bryant',n:'Bryant Park',x:44,y:27,d:'Movable chairs, a big lawn and shade trees, with Midtown right behind you.',t:['Free seating','Lawn','Trees'],s:'Photo placeholder · 3:12 PM',g:['#7DB28F','#D7E8C9'],
photos:[
{src:'images/bryant-01-lawn.jpg',alt:'People sitting on the lawn at Bryant Park',cap:'People sitting on the lawn · 12:40 PM'},
{src:'images/bryant-02-chairs.jpg',alt:'Green movable chairs and tables',cap:'The movable green chairs · 1:05 PM'},
{src:'images/bryant-03-trees.jpg',alt:'Looking up through the trees',cap:'Looking up through the trees · 1:15 PM'},
{src:'images/bryant-04-bench.jpg',alt:'A person sitting alone, seen from behind',cap:'Someone sitting alone · 3:12 PM'},
{src:'images/bryant-05-edge.jpg',alt:'Buildings around the edge of the park',cap:'The city around the park · 3:30 PM'}],
th:[
['The chairs are movable, so everyone sits a little differently.','12:48 PM','Warm'],
['The city is loud on every side, but under the trees it felt quieter.','1:10 PM','Calm'],
['I looked up for the first time today. The leaves were still green.','1:18 PM','Calm'],
['Most people near me were on their phones. I almost did the same.','2:40 PM','Busy'],
['I sat alone for ten minutes. Nobody asked me to move or to buy anything.','3:15 PM','Lonely']]},
{id:'central',n:'Central Park, Sheep Meadow',x:58,y:44,d:'Wide open grass and benches along the path. The loudest thing here is wind.',t:['Benches','Grass','Open sky'],s:'Photo placeholder · 4:05 PM',g:['#8FB8D6','#E4EFDD'],photos:[],th:[['Sample: first time all week I looked at the sky.','4:12 PM','Calm']]},
{id:'stuy',n:'Stuyvesant Town Oval',x:76,y:71,d:'A ring of benches around a fountain, calm even when 14th St is not.',t:['Benches','Fountain','Quiet'],s:'Photo placeholder · 5:30 PM',g:['#9DB8A0','#EADFC6'],photos:[],th:[]}];

var cur=P[0],store={},mine=[],ff='All',fe='',adding=false,draft=null,seat=[];
try{store=JSON.parse(localStorage.getItem('swm')||'{}')}catch(e){}
try{mine=JSON.parse(localStorage.getItem('swmPlaces')||'[]')}catch(e){}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}

/* chip helper */
function chips(box,list,multi,onChange){
  list.forEach(function(name){
    var b=document.createElement('button');b.type='button';b.textContent=name;b.setAttribute('aria-pressed','false');
    b.onclick=function(){
      if(!multi){box.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true')}
      else b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');
      onChange(name,b.getAttribute('aria-pressed')==='true');
    };box.appendChild(b);
  });
}

/* tabs */
var tabs=document.querySelectorAll('.tabs button');
function go(v){
  tabs.forEach(function(b){b.setAttribute('aria-selected',b.dataset.v===v)});
  ['explore','add','sit','notice','thought'].forEach(function(k){$('v-'+k).hidden=(k!==v)});
}
tabs.forEach(function(b){b.onclick=function(){stopAdd();go(b.dataset.v)}});
document.querySelectorAll('[data-go]').forEach(function(b){b.onclick=function(){go(b.dataset.go)}});

/* pins + cards */
var map=$('map'),places=$('places');
function addPlaceUI(p){
  var b=document.createElement('button');b.className='pin';b.style.left=p.x+'%';b.style.top=p.y+'%';
  b.setAttribute('aria-label',p.n);b.setAttribute('aria-pressed','false');
  b.innerHTML='<i></i><span></span>';b.querySelector('span').textContent=p.n.split(',')[0];
  b.onclick=function(e){e.stopPropagation();if(!adding)select(p,'sit')};p.el=b;map.appendChild(b);
  var c=document.createElement('button');c.type='button';c.setAttribute('aria-pressed','false');
  c.innerHTML='<b></b><small></small>';c.querySelector('b').textContent=p.n;c.querySelector('small').textContent=p.t.join(' · ');
  c.onclick=function(){select(p,'sit')};p.card=c;places.appendChild(c);
}
mine.forEach(function(m){m.photos=[];m.th=m.th||[];P.push(m)});
P.forEach(addPlaceUI);

/* photos */
function setPhoto(i){
  var p=cur,ph=p.photos[i],grad='linear-gradient(160deg,'+p.g[0]+','+p.g[1]+')',el=$('photo');
  el.style.backgroundImage=ph?'url("'+ph.src+'"),'+grad:grad;
  el.setAttribute('role','img');el.setAttribute('aria-label',ph?ph.alt:p.n);
  $('stamp').textContent=ph?ph.cap:p.s;
  if(ph){var im=new Image();im.onerror=function(){$('stamp').textContent='Image not found: '+ph.src};im.src=ph.src}
  var tb=$('thumbs').children;for(var k=0;k<tb.length;k++)tb[k].setAttribute('aria-pressed',k===i);
}

/* select a place */
function select(p,view){
  cur=p;ff='All';
  P.forEach(function(q){q.el.setAttribute('aria-pressed',q===p);q.card.setAttribute('aria-pressed',q===p)});
  $('pname').textContent=p.n;$('pdesc').textContent=p.d;
  $('ptags').innerHTML='';p.t.forEach(function(x){var s=document.createElement('span');s.textContent=x;$('ptags').appendChild(s)});
  var th=$('thumbs');th.innerHTML='';
  p.photos.forEach(function(ph,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Photo '+(i+1)+': '+ph.alt);b.style.backgroundImage='url("'+ph.src+'")';b.onclick=function(){setPhoto(i)};th.appendChild(b)});
  setPhoto(0);
  $('nh').textContent='Notice, at '+p.n.split(',')[0];
  $('th').textContent='Thoughts left at '+p.n.split(',')[0];
  buildFilter();renderThoughts();
  if(view)go(view);
}

/* thoughts: filter + feeling + post */
function buildFilter(){
  var box=$('ffilter');box.innerHTML='';
  ['All'].concat(FEEL).forEach(function(n){
    var b=document.createElement('button');b.type='button';b.textContent=n;b.setAttribute('aria-pressed',n===ff);
    b.onclick=function(){ff=n;buildFilter();renderThoughts()};box.appendChild(b);
  });
}
function renderThoughts(){
  var all=cur.th.concat(store[cur.id]||[]).filter(function(x){return ff==='All'||x[2]===ff}),ul=$('plist');ul.innerHTML='';
  if(!all.length){var e=document.createElement('li');e.textContent=ff==='All'?'No thoughts yet. Sit here and be the first.':'No '+ff.toLowerCase()+' thoughts here yet.';ul.appendChild(e)}
  all.forEach(function(x){var li=document.createElement('li');li.textContent=x[0];var s=document.createElement('small');s.textContent=x[1]+(x[2]?' · '+x[2]:'');li.appendChild(s);ul.appendChild(li)});
}
chips($('feel'),FEEL,false,function(n){fe=n});
$('tf').onsubmit=function(e){
  e.preventDefault();var i=$('ti'),v=i.value.trim();if(!v)return;
  var t=new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
  (store[cur.id]=store[cur.id]||[]).push([v,t,fe]);save('swm',store);
  i.value='';ff='All';buildFilter();renderThoughts();
};

/* add a place */
chips($('seatChips'),SEAT,true,function(n,on){var k=seat.indexOf(n);if(on&&k<0)seat.push(n);if(!on&&k>=0)seat.splice(k,1)});
function stopAdd(){adding=false;map.classList.remove('adding');$('hint').hidden=true;if(draft){draft.remove();draft=null}}
$('addBtn').onclick=function(){
  adding=true;map.classList.add('adding');$('hint').hidden=false;
  $('an').value='';$('af').value='';seat=[];
  $('seatChips').querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed','false')});
  $('addStep').textContent='Tap the map to drop a pin where you sat.';go('add');
};
map.onclick=function(e){
  if(!adding)return;
  var r=map.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;
  if(!draft){draft=document.createElement('div');draft.className='draft';map.appendChild(draft)}
  draft.style.left=x+'%';draft.style.top=y+'%';draft.dataset.x=x;draft.dataset.y=y;
  $('addStep').textContent='Pin placed. Name it and choose the seating.';
};
$('cancelBtn').onclick=function(){stopAdd();go('explore')};
$('saveBtn').onclick=function(){
  var name=$('an').value.trim();
  if(!draft){$('addStep').textContent='First tap the map to drop a pin.';return}
  if(!name){$('addStep').textContent='Give your place a name.';$('an').focus();return}
  var t=new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
  var p={id:'u'+Date.now(),n:name,x:+draft.dataset.x,y:+draft.dataset.y,d:'Added by you at '+t+'.',t:seat.length?seat.slice():['Seating'],s:name+' · '+t,g:['#9DB8A0','#EADFC6'],photos:[],th:[]};
  var f=$('af').files[0];
  if(f){p.photos.push({src:URL.createObjectURL(f),alt:name,cap:name+' · '+t})}
  var rec={id:p.id,n:p.n,x:p.x,y:p.y,d:p.d,t:p.t,s:p.s,g:p.g};
  mine.push(rec);save('swmPlaces',mine);
  P.push(p);addPlaceUI(p);stopAdd();select(p,'sit');
};

select(P[0]);go('explore');

/* Look up: full-screen sky + 60-second breathing circle */
var Q=['Find the highest branch you can see.','Count how many different greens are in view.','Notice what the wind is moving.','Follow one cloud until it leaves.','Listen for the farthest sound.'],qi=0,sky=$('sky'),pr=$('prompt'),siv=null;
function q(){pr.textContent=Q[qi%Q.length];qi++}
function stopSky(){if(siv){clearInterval(siv);siv=null}$('scircle').classList.remove('breathe')}
function startSky(){
  stopSky();q();sky.classList.add('on');
  var n=60;
  $('scount').textContent=n;$('slabel').textContent='breathe in';
  $('again').hidden=true;$('tothought').hidden=true;$('next').hidden=false;
  var c=$('scircle');c.classList.remove('breathe');void c.offsetWidth;c.classList.add('breathe');
  $('next').focus();
  siv=setInterval(function(){
    n--;$('scount').textContent=n;
    $('slabel').textContent=((60-n)%8<4)?'breathe in':'breathe out';
    if(n<=0){
      stopSky();
      $('scount').textContent='Done';$('slabel').textContent='welcome back';
      $('next').hidden=true;$('again').hidden=false;$('tothought').hidden=false;
    }
  },1000);
}
function closeSky(){stopSky();sky.classList.remove('on')}
$('openSky').onclick=startSky;$('openSky2').onclick=startSky;