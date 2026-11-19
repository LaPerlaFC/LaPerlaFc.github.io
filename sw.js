const C="laperla-v3",M="laperla-media";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./icon-192.png","./icon-512.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!==M).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.origin===location.origin){
  e.respondWith(fetch(r,{cache:"no-store"}).then(x=>{if(x.ok){const c=x.clone();caches.open(C).then(k=>k.put(r,c))}return x}).catch(()=>caches.match(r)));return}
 if(u.hostname==="cdn.jsdelivr.net"||(r.destination==="image"&&u.pathname.includes("/storage/v1/object/public/"))){
  const name=u.hostname==="cdn.jsdelivr.net"?C:M;
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==="opaque"){const c=x.clone();caches.open(name).then(k=>k.put(r,c))}return x})))}});
