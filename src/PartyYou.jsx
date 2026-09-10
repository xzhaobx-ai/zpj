import './PartyYou.css';
const base='/assets/partyyou/';
function Phone({file,label}){return <div className="party-iphone" aria-label={'iPhone 17 Pro · '+label}><i className="party-phone-buttons"/><div className="party-phone-display"><div className="party-phone-screen"><img src={base+file} alt={label} loading="lazy"/></div><i className="party-island"/></div></div>}
const groups=[
 {title:'从第一眼，开始连接',en:'01 / ONBOARDING',description:'品牌登录、账号登录与个人资料填写。',screens:[['login.png','品牌登录'],['login-form.png','账号登录'],['personal.jpg','个人资料']]},
 {title:'五个入口，连接社交日常',en:'02 / MAIN SCREENS',description:'首页、活动、游戏、消息、我的，呈现完整的一级界面。',screens:[['home.png','首页'],['activity.png','活动'],['game.png','游戏'],['messages.png','消息'],['profile.png','我的']]},
 {title:'让对话，自然发生',en:'03 / CONNECTION',description:'消息聚合、好友列表与聊天界面。',screens:[['messages.png','消息中心'],['friends.png','好友列表'],['chat.jpg','聊天']]},
 {title:'属于自己的社交空间',en:'04 / PROFILE & ASSETS',description:'个人中心与金币、钻石资产管理。',screens:[['profile.png','个人中心'],['wallet.jpg','金币钱包'],['diamonds.jpg','钻石资产']]},
];
export function PartyYouCover(){return <div className="party-cover"><div className="party-cover-copy"><strong>PartyYou<span>MEET. CHAT. CONNECT.</span></strong><span className="party-cover-label">SOCIAL APP / UI DESIGN</span></div><div className="party-cover-phones">{['messages.png','login.png','home.png'].map((f,i)=><Phone key={f} file={f} label={['PartyYou 消息界面','PartyYou 登录界面','PartyYou 发现界面'][i]}/>)}</div></div>}
export default function PartyYouDetails(){return <div className="party-case">
 <div className="party-case-hero"><img src={base+'hero-hands.png'} alt="双手握持 iPhone 17 Pro 展示 PartyYou 登录界面"/></div>
 <section className="party-motion"><div className="party-heading"><p>DESIGN IN MOTION</p><h3>登录体验 · 动态展示</h3></div><video controls playsInline preload="metadata" poster={base+'login.png'}><source src={base+'login-motion.mp4'} type="video/mp4"/>你的浏览器暂不支持视频播放。</video></section>
 {groups.map(g=><section className="party-group" key={g.en}><div className="party-heading"><p>{g.en}</p><h3>{g.title}</h3><span>{g.description}</span></div><div className={'party-screen-grid'+(g.screens.length===5?' five':g.screens.length===4?' four':'')}>{g.screens.map(([f,label])=><figure key={f}><a href={base+f} target="_blank" rel="noreferrer" aria-label={'打开'+label+'原图'}><Phone file={f} label={'PartyYou '+label+'高保真界面'}/></a><figcaption>{label}<span>↗</span></figcaption></figure>)}</div></section>)}
 <section className="party-group"><div className="party-heading"><p>05 / STATES & FEEDBACK</p><h3>覆盖体验中的细节</h3><span>字体层级、缺省状态与弹窗规范。</span></div><div className="party-states">{[['typography.jpg','字体规范'],['empty-system.png','缺省状态规范'],['popups.png','弹窗规范']].map(([f,label])=><figure key={f}><a href={base+f} target="_blank" rel="noreferrer"><img src={base+f} alt={label} loading="lazy"/></a><figcaption>{label} ↗</figcaption></figure>)}</div></section>
 <section className="party-group"><div className="party-heading"><p>06 / VISUAL FOUNDATION</p><h3>统一的色彩语言</h3><span>主色、辅助色与中性色的完整规范。</span></div><a href={base+'palette.png'} target="_blank" rel="noreferrer"><img className="party-palette" src={base+'palette.png'} alt="PartyYou 完整色彩规范" loading="lazy"/></a></section>
 <div className="party-case-end">PartyYou <span>THANK YOU FOR WATCHING</span></div>
 </div>}
