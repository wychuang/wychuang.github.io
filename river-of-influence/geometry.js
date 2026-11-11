(function(root){
  const center=t=>.61+.205*Math.sin(t*5.5+.12);
  const breadth=t=>.014+.39*Math.pow(Math.max(0,t),1.68);
  const yearT=year=>.075+(year-2004)/22*.79;
  const position=(t,u)=>({x:center(t)+u*breadth(t),y:.16+t*.88});
  const project=(p,c,w,h)=>({x:((p.x-c.x)*c.zoom+.5)*w,y:((p.y-c.y)*c.zoom+.5)*h});
  const unproject=(p,c,w,h)=>({x:(p.x/w-.5)/c.zoom+c.x,y:(p.y/h-.5)/c.zoom+c.y});
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const zoomStops=[1,1.5,2.2,3.2,4.4,5.2];
  function nextZoom(z,direction){return direction>0?(zoomStops.find(s=>s>z+.04)??5.2):([...zoomStops].reverse().find(s=>s<z-.04)??1);}
  function constrainCamera(c,{focus}={}){
    const zoom=clamp(c.zoom,1,5.2);if(zoom===1&&!focus)return{x:.5,y:.5,zoom:1};
    let minY=.18,maxY=.98;
    if(focus&&zoom>1.3){minY=Math.max(minY,focus.minY-.16/zoom);maxY=Math.min(maxY,focus.maxY+.16/zoom);}
    const y=clamp(c.y,minY,maxY),t=clamp((y-.16)/.88,0,1),half=breadth(t)+.2/zoom;
    return{x:clamp(c.x,center(t)-half,center(t)+half),y,zoom};
  }
  function riverAnchor(p){const t=clamp((p.y-.16)/.88,.05,.92),w=breadth(t);return position(t,clamp((p.x-center(t))/w,-.7,.7));}
  const api={center,breadth,yearT,position,project,unproject,zoomStops,nextZoom,constrainCamera,riverAnchor};
  if(typeof module!=='undefined')module.exports=api;else root.RIVER_GEOMETRY=api;
})(typeof window!=='undefined'?window:globalThis);
