/* Animated river material and factual markers are separate layers. No visual size is a rank. */
(() => {
  'use strict';
  const G=RIVER_GEOMETRY,canvas=document.getElementById('river'),overlay=document.getElementById('lights');
  const ctx=overlay.getContext('2d'),labelHost=document.getElementById('river-labels');
  let gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'high-performance',preserveDrawingBuffer:true});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const palette=['#f08e71','#e9c286','#b6c9fa','#f1deac','#72d0c7','#99bfe2','#c4cce0'];
  const labels=['领袖与变革者','商业与巨擘','艺术与文化','偶像与英雄','先驱与创新','思想与科学','原榜未细分 / 其他'];
  const camera={x:.5,y:.5,zoom:1},pointer={x:.5,y:.5};
  let width=innerWidth,height=innerHeight,dpr=1,year=null,key=null,lane=null,routeIds=null,focusId=null;
  let cameraMotion=null,navigationTarget={...camera},selectionOrigin=null,hitMarkers=[];
  let paused=reduced.matches,elapsed=0,lastTime=0,needsOverlay=true,labelsDirty=true,hovered=null,drag=null,dragDistance=0;
  const noiseId=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0)/4294967296;};
  const nodes=RIVER_DATA.entries.map(r=>({...r,t:G.yearT(r.year)+(noiseId(r.id+'t')-.5)*.023,u:(noiseId(r.id+'u')-.5)*1.63}));
  const nodePosition=n=>G.position(year===n.year&&!key?n.t+(noiseId(n.id+'focus')-.5)*.065:n.t,n.u);
  const screen=n=>G.project(nodePosition(n),camera,width,height);
  const active=n=>key?n.key===key:year?n.year===year:lane!==null?n.lane===lane:routeIds?routeIds.has(n.id):true;
  const duration=()=>reduced.matches||window.RIVER_INPUT==='keyboard'?0:.95;
  function navigationFocus(){
    const ns=focusId!==null?nodes.filter(n=>n.id===focusId):year?nodes.filter(n=>n.year===year):[];
    if(!ns.length)return undefined;const ys=ns.map(n=>nodePosition(n).y);return{minY:Math.min(...ys),maxY:Math.max(...ys)};
  }
  function notifyView(){
    needsOverlay=true;document.body.classList.toggle('zoomed',camera.zoom>1.08||!!year||!!key);
    window.dispatchEvent(new CustomEvent('river-view',{detail:{zoom:camera.zoom,mode:focusId!==null?'人物':year?'年度':routeIds?'主线':camera.zoom>1.08?'河道':'全景',canZoomIn:camera.zoom<5.16,canZoomOut:camera.zoom>1.04}}));
  }
  function moveCamera(target,seconds=duration()){
    const next=G.constrainCamera({...camera,...target},{focus:navigationFocus()});navigationTarget={...next};
    cameraMotion?.kill();gsap.killTweensOf(camera);
    const distance=Math.hypot(next.x-camera.x,next.y-camera.y);
    if(seconds>=.8&&distance>.24&&camera.zoom>1.8&&next.zoom>1.8){
      cameraMotion=gsap.timeline({onUpdate:notifyView,onComplete:notifyView});
      cameraMotion.to(camera,{zoom:1.3,duration:.2,ease:'power2.inOut'}).to(camera,{x:next.x,y:next.y,duration:.42,ease:'power2.inOut'}).to(camera,{zoom:next.zoom,duration:.3,ease:'power3.out'});
    }else cameraMotion=gsap.to(camera,{...next,duration:seconds,ease:'power3.inOut',overwrite:true,onUpdate:notifyView,onComplete:notifyView});
  }
  function stateChanged(){needsOverlay=true;labelsDirty=true;document.body.classList.toggle('zoomed',camera.zoom>1.05||!!year||!!key);}
  function focusNodes(ns,maxZoom=3.6){
    if(!ns.length)return;const ps=ns.map(nodePosition),xs=ps.map(p=>p.x),ys=ps.map(p=>p.y);
    const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
    const freeRatio=width>700?Math.max(.3,(width-410)/width):1;
    const z=Math.max(1,Math.min(maxZoom,(freeRatio-.1)/Math.max(.09,x1-x0),(width<700?.27:.5)/Math.max(.09,y1-y0)));
    moveCamera({zoom:z,x:(x0+x1)/2+(.5-freeRatio/2)/z,y:(y0+y1)/2+(width<700?.20/z:.025)},duration()? .32:0);
  }
  function zoomAround(z,point){
    let anchor=point;
    if(!anchor&&focusId!==null)anchor=nodePosition(nodes.find(n=>n.id===focusId));
    if(!anchor&&year)anchor=G.position(G.yearT(year),0);
    if(!anchor)anchor=G.riverAnchor({x:camera.x,y:camera.y});
    const pixel=G.project(anchor,camera,width,height);
    moveCamera({zoom:z,x:anchor.x-(pixel.x/width-.5)/z,y:anchor.y-(pixel.y/height-.5)/z},reduced.matches?0:.3);
    window.dispatchEvent(new Event('river-interact'));
  }
  const vertex=`attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
  const fragment=`
  precision highp float;
  varying vec2 uv;
  uniform vec2 resolution;
  uniform vec3 camera;
  uniform vec2 pointer;
  uniform float time;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
  float center(float t){return .61+.205*sin(t*5.5+.12);}
  float breadth(float t){return .014+.39*pow(max(0.,t),1.68);}
  void main(){
    vec2 screen=vec2(uv.x,1.-uv.y);
    vec2 p=(screen-.5)/camera.z+camera.xy;
    float t=(p.y-.16)/.88;
    float w=breadth(t),u=(p.x-center(t))/w;
    float side=sign(u);
    float coastWidth=.98+.064*sin(t*27.+side*1.7)+.035*sin(t*71.+side*4.2)+.034*(noise(vec2(t*116.,side*7.))-.5);
    float coast=abs(u)-coastWidth;
    float inside=1.-smoothstep(-.014,.028,coast);
    float branch=1.-smoothstep(.008,.032,abs(abs(u)-(1.085+.095*sin(t*21.+side*2.))));
    branch*=smoothstep(.34,.42,t)*(1.-smoothstep(.66,.77,t));
    inside=max(inside,branch*.72);
    float terrain=noise(p*vec2(12.,18.))*.6+noise(p*vec2(45.,75.))*.25;
    vec3 bank=mix(vec3(.006,.014,.042),vec3(.035,.05,.105),terrain);
    float shore=exp(-abs(coast)*29.);
    float contour=pow(.5+.5*sin(abs(u)*37.+terrain*13.+t*14.),9.);
    bank+=vec3(.13,.06,.022)*shore*(.45+terrain)+vec3(.022,.029,.048)*contour*exp(-max(0.,abs(u)-1.)*1.9);
    bank*=.64+.36*smoothstep(.04,.7,p.y);
    if(t<-.03||t>1.6){gl_FragColor=vec4(bank,1.);return;}
    float flow=t*85.-time*1.3;
    float warp=sin(t*21.-time*.18)*2.1+sin(t*43.+u*4.+time*.12)*.9;
    float f=u*(75.+90.*clamp(t,0.,1.))+warp+noise(vec2(u*11.,t*35.-time*.075))*3.8;
    float strand=.5+.5*sin(f*6.28318);
    float fine=.5+.5*sin(f*14.7+sin(flow*.36)*.9);
    float folds=.5+.5*sin(u*14.+t*24.-time*.23+sin(t*35.+u*2.)*1.4);
    float ripples=.5+.5*sin(flow*1.7+u*3.+noise(vec2(u*18.,t*30.))*3.);
    vec3 water=mix(vec3(.006,.029,.15),vec3(.018,.12,.49),folds);
    water+=vec3(.025,.065,.17)*pow(strand,7.)*(.4+ripples*.6);
    water*=.58+.42*fine;
    float reflection=.5+.5*sin(u*5.6+t*17.+sin(t*9.)*2.4+time*.11);
    float patch=smoothstep(.30,.92,reflection)*(.35+.65*noise(vec2(u*7.+1.,t*23.-time*.07)));
    float goldZone=exp(-pow((u+.2+.24*sin(t*13.+time*.045))/.47,2.))*(.35+.65*noise(vec2(u*5.,t*36.-time*.09)));
    float metal=pow(strand,14.)*(.06+patch*1.95+goldZone*1.8)*(.12+.88*pow(ripples,2.));
    vec3 gold=mix(vec3(.5,.20,.025),vec3(1.24,.76,.15),ripples);
    water+=gold*metal*1.7;
    water+=vec3(.25,.48,.72)*pow(fine,28.)*(1.-patch)*.38;
    // Small broken highlights advect downriver instead of blinking at fixed positions.
    vec2 cell=vec2(f*1.75,t*660.-time*3.5);
    vec2 ip=floor(cell),fp=fract(cell);
    float flake=step(.952,hash(ip))*smoothstep(.08,.22,fp.x)*(1.-smoothstep(.75,.94,fp.x));
    flake*=smoothstep(.05,.2,fp.y)*(1.-smoothstep(.58,.9,fp.y));
    flake*=.3+patch*2.5+goldZone*2.;
    water+=vec3(2.2,1.3,.22)*flake;
    water+=vec3(1.05,.65,.10)*pow(ripples,12.)*pow(strand,4.)*goldZone;
    float nearGlow=pow(max(0.,1.-abs(u+.18+sin(t*12.)*.21)),8.)*pow(ripples,9.)*patch;
    water+=vec3(.37,.20,.053)*nearGlow;
    float redVein=pow(.5+.5*sin(u*30.+t*29.+sin(t*17.)),24.);
    water+=vec3(.22,.027,.008)*redVein*(.2+patch*.25);
    float edge=1.-smoothstep(-.34,.03,coast);water*=.48+.52*edge;
    water+=vec3(.17,.29,.47)*shore*.3;
    vec3 col=mix(bank,water,inside*smoothstep(-.015,.03,t));
    float grain=(hash(gl_FragCoord.xy+floor(time*8.))-.5)*.013;
    col+=grain;col*=1.-.22*pow(length(screen-.5),1.4);
    col=pow(max(col,0.),vec3(.91));
    gl_FragColor=vec4(col,1.);
  }`;
  let program=null,uniforms={};
  function compile(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
  function fallback(){canvas.hidden=true;document.getElementById('view-hint').textContent='静态河面 · 人物与名单仍可浏览';document.body.classList.add('static-river');paused=true;}
  if(gl){try{
    program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    for(const n of ['resolution','camera','pointer','time'])uniforms[n]=gl.getUniformLocation(program,n);
  }catch{gl=null;}}
  if(!gl)fallback();
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();gl=null;fallback();window.dispatchEvent(new Event('river-renderer-change'));});
  const featured=[['Steve Jobs',2004],['Barack Obama',2008],['Mark Zuckerberg',2011],['Malala Yousafzai',2013],['Taylor Swift',2010],['Greta Thunberg',2019],['Katalin Kariko',2021],['Sam Altman',2023],['Jensen Huang',2024],['C.C. Wei',2026]];
  let labelItems=[];
  function makeAvatar(n){
    const el=document.createElement('span');el.className='person-avatar';const initials=document.createElement('span');initials.className='avatar-fallback';initials.setAttribute('aria-hidden','true');initials.textContent=n.name.split(/\s+/).slice(0,2).map(s=>s[0]).join('');el.append(initials);
    if(n.portrait){const img=document.createElement('img');img.src=n.portrait;img.alt='';img.loading='lazy';img.decoding='async';img.onerror=()=>el.classList.add('image-unavailable');el.append(img);}return el;
  }
  function rebuildLabels(){
    labelHost.replaceChildren();
    let ns=key?nodes.filter(n=>n.year===nodes.find(x=>x.id===focusId)?.year):year?nodes.filter(n=>n.year===year):routeIds?nodes.filter(n=>routeIds.has(n.id)):featured.map(([name,yr])=>nodes.find(n=>n.name===name&&n.year===yr)).filter(Boolean);
    ns.sort((a,b)=>(b.id===focusId)-(a.id===focusId));
    if(lane!==null)ns=ns.filter(n=>n.lane===lane);
    labelItems=ns.map(n=>{const el=document.createElement('button');el.className='river-label';el.dataset.person=n.id;el.hidden=true;el.setAttribute('aria-label',`${RIVER_CONTENT.aliases[n.name]||n.name}，${n.year} 年，查看事迹`);const text=document.createElement('span');text.className='label-name';text.textContent=RIVER_CONTENT.aliases[n.name]||n.name;const small=document.createElement('small');small.textContent=n.year;text.append(small);el.append(makeAvatar(n),text);labelHost.append(el);return{n,el};});labelsDirty=false;
  }
  function paintOverlay(){
    if(labelsDirty)rebuildLabels();ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
    const selected=!!year||!!key||lane!==null||!!routeIds;
    const chosen=key?nodes.filter(n=>n.key===key):routeIds?nodes.filter(n=>routeIds.has(n.id)):[];
    if(chosen.length>1){ctx.beginPath();for(let i=0;i<chosen.length;i++){const p=screen(chosen[i]);if(!i)ctx.moveTo(p.x,p.y);else{const prev=screen(chosen[i-1]);ctx.bezierCurveTo(prev.x,(prev.y+p.y)/2,p.x,(prev.y+p.y)/2,p.x,p.y);}}ctx.strokeStyle='#ead29b';ctx.lineWidth=1.1;ctx.setLineDash(routeIds?[3,5]:[]);ctx.stroke();ctx.setLineDash([]);}
    const drawerOpen=document.body.classList.contains('drawer-open'),right=drawerOpen&&width>700?width-425:width-18,bottom=drawerOpen&&width<700?height*.39:height-150;
    const candidates=nodes.map(n=>({n,p:screen(n),priority:n.id===focusId?1000:active(n)&&selected?200:featured.some(([name,yr])=>n.name===name&&n.year===yr)?100:0})).filter(m=>m.p.x>22&&m.p.x<right&&m.p.y>100&&m.p.y<bottom).sort((a,b)=>b.priority-a.priority||noiseId(a.n.id+'order')-noiseId(b.n.id+'order'));
    hitMarkers=[];const spacing=width<700?19:year||camera.zoom>2?15:24;
    for(const marker of candidates){const {n,p}=marker;if(hitMarkers.some(m=>Math.hypot(m.p.x-p.x,m.p.y-p.y)<spacing))continue;hitMarkers.push(marker);const focused=n.id===focusId,over=hovered?.id===n.id,radius=focused?7:over?5.8:3.8;
      ctx.globalAlpha=1;ctx.fillStyle='#07152d';ctx.beginPath();ctx.arc(p.x,p.y,radius+2.4,0,6.283);ctx.fill();ctx.strokeStyle=focused?'#f4cd81':'#eef3f7';ctx.lineWidth=focused?2.2:1.25;ctx.beginPath();ctx.arc(p.x,p.y,radius,0,6.283);ctx.stroke();ctx.fillStyle=focused?'#f4cd81':'#eef3f7';ctx.beginPath();ctx.arc(p.x,p.y,focused?2.5:1.25,0,6.283);ctx.fill();
    }
    ctx.globalAlpha=1;
    const occupied=[];let count=0;
    for(const item of labelItems){const p=screen(item.n),name=RIVER_CONTENT.aliases[item.n.name]||item.n.name,textWidth=Math.min(width<700?210:260,[...name].reduce((sum,c)=>sum+(/[\u3400-\u9fff]/.test(c)?11:6.1),0)+56),limit=width<700?4:year?12:9;
      let visible=p.x>60&&p.x<width-75&&p.y>height*.19&&p.y<height-.23*height;
      if(drawerOpen&&width<700&&p.y>height*.36)visible=false;
      if(!selected&&p.x<width*.39&&p.y<height*.68)visible=false;
      if(width<700&&!document.body.classList.contains('exploring')&&p.y<height*.48)visible=false;
      if(document.body.classList.contains('drawer-open')&&width>700&&p.x>width-440)visible=false;
      const edge=document.body.classList.contains('drawer-open')&&width>700?width-440:width-18;
      const labelX=p.x+textWidth+12>edge?Math.max(10,p.x-textWidth-12):p.x+8;
      if(occupied.some(o=>labelX<o.x+o.w+12&&labelX+textWidth+12>o.x&&Math.abs(o.y-p.y)<50)||count>=limit)visible=false;
      item.el.hidden=!visible;
      if(visible){item.el.style.transform=`translate3d(${labelX}px,${p.y-21}px,0)`;occupied.push({x:labelX,y:p.y,w:textWidth});count++;}
    }
    if(hovered){const p=screen(hovered);ctx.beginPath();ctx.arc(p.x,p.y,7,0,6.283);ctx.strokeStyle='#fff2d0';ctx.lineWidth=1;ctx.stroke();}
    needsOverlay=false;
  }
  function resize(){const r=canvas.parentElement.getBoundingClientRect();width=r.width;height=r.height;dpr=Math.min(devicePixelRatio||1,width<700?1.5:1.6);const glRatio=Math.min(dpr,1.25);canvas.width=Math.round(width*glRatio);canvas.height=Math.round(height*glRatio);overlay.width=Math.round(width*dpr);overlay.height=Math.round(height*dpr);if(gl)gl.viewport(0,0,canvas.width,canvas.height);Object.assign(camera,G.constrainCamera(camera,{focus:navigationFocus()}));navigationTarget={...camera};notifyView();}
  function findAt(x,y){
    let near=null,distance=width<700?18:12;
    for(const {n,p} of hitMarkers){const d=Math.hypot(p.x-x,p.y-y);if(d<distance){distance=d;near=n;}}return near;
  }
  const tooltip=document.getElementById('tooltip');
  const local=e=>{const r=overlay.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};};
  function tip(n,x,y){tooltip.hidden=!n;if(!n)return;tooltip.replaceChildren();const head=document.createElement('div');head.className='tip-heading';const text=document.createElement('div'),small=document.createElement('small'),strong=document.createElement('strong');small.textContent=n.year+' · '+n.category;strong.textContent=RIVER_CONTENT.aliases[n.name]||n.name;text.append(small,strong);head.append(makeAvatar(n),text);const fact=document.createElement('p');fact.textContent=n.summary||'事迹摘要正在核对。';tooltip.append(head,fact);tooltip.style.transform=`translate3d(${Math.max(8,Math.min(x+18,width-330))}px,${Math.max(95,Math.min(y+14,height-345))}px,0)`;}
  function down(e){if(e.target.closest('button,a,input,select'))return;drag={x:e.clientX,y:e.clientY,cx:camera.x,cy:camera.y};dragDistance=0;cameraMotion?.kill();gsap.killTweensOf(camera);navigationTarget={...camera};overlay.setPointerCapture(e.pointerId);tooltip.hidden=true;}
  overlay.addEventListener('pointerdown',down);
  overlay.addEventListener('pointermove',e=>{const p=local(e);pointer.x=p.x/width;pointer.y=p.y/height;if(drag&&e.buttons){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;dragDistance=Math.hypot(dx,dy);if(dragDistance>5){Object.assign(camera,G.constrainCamera({...camera,x:drag.cx-dx/width/camera.zoom,y:drag.cy-dy/height/camera.zoom},{focus:navigationFocus()}));navigationTarget={...camera};notifyView();window.dispatchEvent(new Event('river-interact'));}return;}hovered=findAt(p.x,p.y);overlay.style.cursor=hovered?'pointer':camera.zoom>1.1?'grab':'default';tip(hovered,p.x,p.y);needsOverlay=true;});
  overlay.addEventListener('pointerup',e=>{if(drag&&dragDistance<5){const p=local(e),n=findAt(p.x,p.y);if(n)window.dispatchEvent(new CustomEvent('river-person',{detail:n.id}));else window.dispatchEvent(new Event('river-dismiss'));}drag=null;});
  overlay.addEventListener('pointercancel',()=>drag=null);overlay.addEventListener('pointerleave',()=>{hovered=null;tooltip.hidden=true;needsOverlay=true;});
  const wheel=e=>{e.preventDefault();const p=local(e),delta=Math.max(-90,Math.min(90,e.deltaY)),z=Math.max(1,Math.min(5.2,navigationTarget.zoom*Math.exp(-delta*.0018))),near=findAt(p.x,p.y),anchor=near?nodePosition(near):G.riverAnchor(G.unproject(p,camera,width,height));zoomAround(z,focusId!==null||year?undefined:anchor);};
  for(const surface of [overlay,labelHost])surface.addEventListener('wheel',wheel,{passive:false});
  overlay.addEventListener('dblclick',e=>{const p=local(e),near=findAt(p.x,p.y);if(near)window.dispatchEvent(new CustomEvent('river-person',{detail:near.id}));else zoomAround(G.nextZoom(navigationTarget.zoom,1),G.riverAnchor(G.unproject(p,camera,width,height)));});
  function render(now){
    requestAnimationFrame(render);const delta=lastTime?Math.min(50,now-lastTime):0;lastTime=now;
    if(document.hidden)return;if(!paused)elapsed+=delta/1000;
    if(gl&&(!paused||needsOverlay)){gl.useProgram(program);gl.uniform2f(uniforms.resolution,canvas.width,canvas.height);gl.uniform3f(uniforms.camera,camera.x,camera.y,camera.zoom);gl.uniform2f(uniforms.pointer,pointer.x,pointer.y);gl.uniform1f(uniforms.time,elapsed);gl.drawArrays(gl.TRIANGLES,0,6);}
    if(needsOverlay)paintOverlay();
  }
  reduced.addEventListener('change',()=>{paused=reduced.matches;cameraMotion?.kill();gsap.killTweensOf(camera);navigationTarget={...camera};needsOverlay=true;});
  window.RIVER={palette,labels,nodes,
    focusYear(y,close=true){selectionOrigin=null;year=y;key=null;lane=null;routeIds=null;focusId=null;stateChanged();if(close)focusNodes(nodes.filter(n=>n.year===y),5.2);},
    selectKey(k,id){if(!selectionOrigin)selectionOrigin={year,lane,routeIds,camera:{...camera}};const switching=focusId!==null;key=k;year=null;lane=null;routeIds=null;focusId=id??nodes.find(n=>n.key===k)?.id??null;stateChanged();const ns=nodes.filter(n=>n.id===focusId),p=screen(ns[0]);if(!switching||p.x<70||p.x>width-(width>700?470:45)||p.y<140||p.y>height*(width<700?.34:.74))focusNodes(ns,2.8);},
    releaseSelection(){if(!selectionOrigin)return;const origin=selectionOrigin;selectionOrigin=null;year=origin.year;lane=origin.lane;routeIds=origin.routeIds;key=null;focusId=null;stateChanged();moveCamera(origin.camera,duration()?.28:0);},
    setLane(l){selectionOrigin=null;lane=l;year=null;key=null;routeIds=null;focusId=null;stateChanged();moveCamera({x:.5,y:.5,zoom:1});},
    setRoute(ids){selectionOrigin=null;routeIds=ids?new Set(ids):null;year=null;key=null;lane=null;focusId=null;stateChanged();moveCamera({x:.5,y:.5,zoom:1});},
    focusRoute(ids,id){selectionOrigin=null;routeIds=new Set(ids);year=null;key=null;lane=null;focusId=id??null;stateChanged();const n=nodes.find(n=>n.id===id);if(n)focusNodes([n],3.2);else moveCamera({x:.5,y:.5,zoom:1});},
    zoomBy(f){zoomAround(G.nextZoom(navigationTarget.zoom,f>1?1:-1));},
    reset(){selectionOrigin=null;year=null;key=null;lane=null;routeIds=null;focusId=null;stateChanged();moveCamera({x:.5,y:.5,zoom:1});document.body.classList.remove('zoomed');},
    toggleMotion(){paused=!paused;needsOverlay=true;return paused;},
    get paused(){return paused;},get elapsed(){return elapsed;},get camera(){return{...camera};},get webgl(){return!!gl;},get visibleMarkers(){return hitMarkers.map(m=>({id:m.n.id,x:m.p.x,y:m.p.y}));},project(id){const n=nodes.find(n=>n.id===id);return n?screen(n):null;},refresh(){needsOverlay=true;}
  };
  resize();addEventListener('resize',resize);requestAnimationFrame(render);document.getElementById('loading').hidden=true;
})();
