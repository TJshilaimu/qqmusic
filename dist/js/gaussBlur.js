"use strict";(window.player||(window.player={})).blurImg=function(t,e){var r=document.createElement("canvas");e=e||document.body,r.width=100,r.height=100;var o=r.getContext("2d"),h=new Image;h.src=t,h.onload=function(){o.drawImage(h,0,0,h.width,h.height,0,0,r.width,r.height);var t=function(t){for(var a,e,r,o,h,n,i=t.data,d=t.width,g=t.height,f=[],u=0,w=10,c=1/(5*Math.sqrt(2*Math.PI)),m=-.02,l=0,I=-w;I<=w;I++,l++)r=c*Math.exp(m*I*I),u+=f[l]=r;for(l=0,n=f.length;l<n;l++)f[l]/=u;for(a=0;a<g;a++)for(I=0;I<d;I++){for(u=e=r=m=c=0,o=-w;o<=w;o++)0<=(h=I+o)&&h<d&&(e+=i[l=4*(a*d+h)]*f[o+w],r+=i[l+1]*f[o+w],m+=i[l+2]*f[o+w],u+=f[o+w]);i[l=4*(a*d+I)]=e/u,i[l+1]=r/u,i[l+2]=m/u}for(I=0;I<d;I++)for(a=0;a<g;a++){for(u=e=r=m=c=0,o=-w;o<=w;o++)0<=(h=a+o)&&h<g&&(e+=i[l=4*(h*d+I)]*f[o+w],r+=i[l+1]*f[o+w],m+=i[l+2]*f[o+w],u+=f[o+w]);i[l=4*(a*d+I)]=e/u,i[l+1]=r/u,i[l+2]=m/u}return t}(o.getImageData(0,0,r.width,r.height));o.putImageData(t,0,0);var a=r.toDataURL();e.style.backgroundImage="url("+a+")"}};