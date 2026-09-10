import {useEffect} from 'react';
import './Motion.css';

// One-shot compositor animations; no continuous scroll handler or animation loop.
export default function usePortfolioMotion(){
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let observer;const running=new Set();const pending=new Set();
  const play=(el,frames,delay=0,duration=1500)=>{
   if(typeof el.animate!=='function')return;
   const anim=el.animate(frames,{duration,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
   running.add(anim);anim.finished.then(()=>{anim.cancel();running.delete(anim)}).catch(()=>{});
  };
  const restore=()=>{observer?.disconnect();running.forEach(a=>a.cancel());running.clear();pending.forEach(el=>el.classList.remove('motion-pending'));pending.clear()};
  const start=()=>{
   restore();if(media.matches)return;
   const atHome=(!location.hash||location.hash==='#home')&&scrollY<100;
   if(atHome){
    document.querySelectorAll('.hero-title-line>span').forEach((el,i)=>play(el,[{transform:'translateY(115%) scaleY(.65) rotate(3deg)'},{transform:'translateY(0) scaleY(1) rotate(0)'}],500+i*200,1850));
    const curtain=document.querySelector('.opening-curtain');
    if(curtain)play(curtain,[{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 0 100% 0)'}],0,1500);
    const video=document.querySelector('.hero-video');if(video)play(video,[{transform:'scale(1.12)'},{transform:'scale(1)'}],0,2400);
    document.querySelectorAll('.hero-content>.eyebrow,.hero-intro,.hero-bottom').forEach((el,i)=>play(el,[{clipPath:'inset(100% 0 0 0)',transform:'translateY(35px)'},{clipPath:'inset(0 0 0 0)',transform:'translateY(0)'}],1100+i*180,1350));
   }
   if(typeof IntersectionObserver==='undefined')return;
   const selector='.about-content h2,.heading-row h2,.work-group-heading,.experience h3,.closing-title,.portrait-block,.experience-row,.project-glow,.skill-grid>*,.closing-photo,.closing-wechat';
   observer=new IntersectionObserver(entries=>{
    entries.filter(e=>e.isIntersecting).forEach(({target:el})=>{
     observer.unobserve(el);pending.delete(el);el.classList.remove('motion-pending');
     const heading=el.matches('h2,h3,.work-group-heading');
     const siblings=[...el.parentElement.children];const stagger=el.matches('.project-glow,.skill-grid>*')?250+(siblings.indexOf(el)%3)*180:0;
     play(el,heading?[{transform:'translateY(85px) scaleY(.75)',clipPath:'inset(100% 0 0 0)'},{transform:'translateY(0) scaleY(1)',clipPath:'inset(0 0 0 0)'}]:[{transform:'translateY(100px)',clipPath:'inset(0 0 100% 0)'},{transform:'translateY(0)',clipPath:'inset(0 0 0 0)'}],stagger,heading?1700:1500);
     const image=el.matches('.portrait-block')?el.querySelector(':scope>img'):el.querySelector('.project-image>img');
     if(image)play(image,[{transform:'scale(1.16) translateY(3%)'},{transform:'scale(1) translateY(0)'}],stagger,2100);
    });
   },{threshold:.08,rootMargin:'0px 0px -35px 0px'});
   document.querySelectorAll(selector).forEach(el=>{
    if(el.getBoundingClientRect().bottom<0)return;
    // Keep content visible while observing: a clipped target can have zero intersection.
    pending.add(el);observer.observe(el);
   });
  };
  start();media.addEventListener('change',start);
  const revealFocus=e=>{for(const el of pending)if(el.contains(e.target)){el.classList.remove('motion-pending');pending.delete(el);observer.unobserve(el)}};
  document.addEventListener('focusin',revealFocus);
  return()=>{restore();media.removeEventListener('change',start);document.removeEventListener('focusin',revealFocus)};
 },[]);
}
