(function(){
var slug=document.body.dataset.slug,E=["jpg","jpeg","png","webp"];
var CR='<svg class="cr"><use href="#cr"/></svg>';
function probeImg(i,cb,n){n=n||0;if(n>=E.length)return cb(null);var im=new Image();im.onload=function(){cb(im.src)};im.onerror=function(){probeImg(i,cb,n+1)};im.src="images/"+slug+"/"+i+"."+E[n]}
function probeVideo(src,cb){var v=document.createElement("video");v.preload="metadata";v.onloadedmetadata=function(){cb(true)};v.onerror=function(){cb(false)};v.src=src}
window.PJ={slug:slug,probeImg:probeImg,probeVideo:probeVideo};
var lb=document.createElement("div");lb.className="lb";lb.innerHTML='<button type="button">Close</button><img alt="">';document.body.appendChild(lb);
var lbi=lb.querySelector("img");lb.onclick=function(){lb.classList.remove("on")};addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("on")});
document.querySelectorAll(".slot:not(.vslot)").forEach(function(el,k){var i=el.dataset.i||k+1;
el.insertAdjacentHTML("beforeend",'<div class="ph">'+CR+'<b>Image '+i+'</b><small>images/'+slug+'/'+i+'.jpg</small></div>');
probeImg(i,function(src){if(!src)return;el.innerHTML='<img loading="lazy" alt="Project image '+i+'">';el.firstChild.src=src;el.classList.add("ok");el.onclick=function(){lbi.src=src;lb.classList.add("on")}})});
function embed(u){var m=u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);if(m)return"https://www.youtube.com/embed/"+m[1];m=u.match(/drive\.google\.com\/file\/d\/([\w-]+)/);return m?"https://drive.google.com/file/d/"+m[1]+"/preview":""}
document.querySelectorAll(".vslot").forEach(function(el,k){var i=el.dataset.i||k+1,link=(window.VIDEO_LINKS||{})[i];
el.insertAdjacentHTML("beforeend",'<div class="ph">'+CR+'<b>Video '+i+'</b><small>videos/'+slug+'/'+i+'.mp4<br>or paste a YouTube or Google Drive link</small></div>');
var src=link&&embed(link);
if(src){el.innerHTML='<iframe allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>';el.firstChild.src=src;return}
var f="videos/"+slug+"/"+i+".mp4";probeVideo(f,function(ok){if(!ok)return;el.innerHTML='<video controls playsinline preload="metadata"></video>';el.firstChild.src=f})});
})();
