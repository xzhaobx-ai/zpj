import './PartyYou.css';
const base='/assets/partyyou-20260914/';
export function PartyYouCover(){return <img className="party-updated-cover" src={base+'page-01.jpg'} alt="PartyYou 海外社交APP UI与UX体验优化作品封面" loading="lazy"/>}
export default function PartyYouDetails(){return <div className="party-updated-pages">{Array.from({length:13},(_,i)=>{const src=base+(i===6?'page-07-20260917.jpg':'page-'+String(i+1).padStart(2,'0')+'.jpg');return <a key={src} href={src} target="_blank" rel="noreferrer" aria-label={'查看 PartyYou 第 '+(i+1)+' 页原图'}><img src={src} alt={'PartyYou UI与UX体验优化 · 第 '+(i+1)+' 页'} width="1920" height="1080" loading={i===0?'eager':'lazy'}/></a>})}</div>}
