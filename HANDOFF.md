# 项目交接 HANDOFF

更新时间：2026-09-10。项目按用户要求暂告一段落；本次仅整理交接，不继续改版或部署。

## 当前任务与状态

赵雪莲的个人作品集网站，身份为产品设计师 / AI 设计师 / UI 设计师。React + Vite，暗色、克制、科技感，PC 版心约 1700px，兼容手机。

- 项目完整路径：`C:\Users\zhaoshier\Documents\ChatGPT\zpj`
- 本地预览：`http://127.0.0.1:5173/`
- 用户部署的线上地址：`https://zpj-9hq.pages.dev/`
- 最新操作：PC / 平板头图换为用户的“视频制作需求 (4).mp4”，手机保留“视频制作需求 (3).mp4”。封面已同步更新，构建成功。
- 最新线上部署是否包含本地全部变更：尚未重新核实，不要将本地成功等同于线上已更新。
- 最近一次服务器启动使用保留进程会话 94058；会话可能已失效，继续工作前检查实际端口，不要假定仍在运行。

## 已完成内容

### 页面与交互

1. 全屏 Hero：视频背景、大标题、导航、个人介绍、联系入口、背景播放/暂停按钮。
2. 导航：滚过首页后顶部悬浮，磨砂玻璃效果；“联系我”使用线性邮箱图标。
3. 关于我：Q 版人物与 Figma、Axure、KeyShot、Ps、Ai、Rhino 玻璃方块；教育、实习工作内容已按简历补全。
4. 精选作品：分类导航、作品卡片、绿色大编号、点击打开完整案例弹窗；弹窗顶部 PROJECT / RESEARCH 编号和关闭按钮固定悬浮。
5. 个人优势：能力卡片与软件标签。
6. 04 结束页：THANK YOU、绿色空心句号、用户新生活照、微信二维码和联系方式；生活照与右侧内容上下对齐。
7. Grainient 暗绿颗粒背景、BorderGlow 卡片边缘光效。
8. 首屏遮罩揭开、标题分行压缩位移归位；模块标题进场、卡片 stagger、图片缓慢缩放揭示。使用原生 Web Animations + IntersectionObserver，没有安装 GSAP。

### 作品分类与编号（保持此规则）

总展示数 **09**，包括独立用户研究案例。`projects` 保持 8 个设计作品，`researchCases` 为独立案例，`displayedProjects` 合并用于展示和总数统计。

| 分类 | 编号 | 名称 |
| --- | --- | --- |
| 用户研究（最前） | 01（独立） | 民航机上餐饮体验优化研究 |
| 产品设计 | 01 | 转来·客家围楼文创灯具 |
| 产品设计 | 02 | meowfit ·猫咪体重管理家具 |
| 产品设计 | 03 | FunFocus |
| 产品设计 | 04 | WireMaster Box |
| UI 设计 | 05 | 与风相愈故事集 |
| UI 设计 | 06 | PartyYou · 海外社交APP |
| 平面视觉设计 | 07 | Stray Soul流浪共生品牌 |
| 平面视觉设计 | 08 | 物理五韵IP设计 |

最初用户曾要求总数维持 8，后来明确要求改为 9，已更新。不要再把独立研究案例插入原作品编号序列。

- 原有作品详情使用从作品集提取的完整过程页，包含研究、过程与最终设计。
- 用户研究详情：桌面文件夹“民航机上餐饮体验优化研究”的体验1–20.jpg，已按数字顺序复制到 `public/assets/aviation-research/page-01.jpg` 至 `page-20.jpg`。
- PartyYou：真实高保真界面、登录视频、字体/弹窗/缺省/色彩规范；一级界面为首页、活动、游戏、消息、我的，上三下二；其他模块保留登录、消息与资产等展示。
- PartyYou 手机样机使用 CSS 正面外框，灵动岛相对屏幕容器定位；长界面可滚动、点击原图。已删除样机下方的型号与操作提示文字。
- PartyYou 首图为生成式合成图：保留参考双手持机构图，换入真实登录界面。不是精确摄影合成，后续如要求像素级还原应另处理。

## 最新头图配置（关键）

`src/main.jsx` 根据 `src/heroDevice.js` 的 `isPhoneDevice()` 选择视频：

| 设备 | 当前资源 | 对应用户原文件 |
| --- | --- | --- |
| PC、平板 | `public/assets/hero-pc-v4.mp4` | `C:/Users/zhaoshier/Downloads/视频制作需求 (4).mp4` |
| 手机 | `public/assets/hero-phone-v3.mp4` | `C:/Users/zhaoshier/Downloads/视频制作需求 (3).mp4` |

封面为 `hero-pc-v4-poster.jpg` 与 `hero-phone-v3.jpg`。

- 手机识别：iPhone/iPod/Windows Phone；Android UA 带 Mobile；最后回退 `userAgentData.mobile`。
- iPad、Android 平板、以 Macintosh UA 标识且多点触控的 iPad 使用 PC 版本。
- 不再根据窗口宽度切视频，避免电脑窄窗口误用手机竖版。
- `object-fit: contain` 保留完整画面，容器与视频比例不同时允许深色留边。不要改回 cover，除非用户明确接受裁切。
- 视频静音、内联循环，通过 play() 尝试播放；失败时保留封面及手动播放按钮；尊重 prefers-reduced-motion。
- 黑色低透明度颗粒、轻微磨砂和底部渐暗，手机关闭 backdrop blur。首屏视频不再做放大动画，以免裁掉边缘。
- 旧视频仍在 assets 中，但不代表正在使用；以 main.jsx 的实际引用为准。

## 卡住或未完成的问题

1. **绿色微信二维码替换尚未完成**：用户曾直接贴绿色二维码图片，但该附件没有可读取的本地路径。已请求用户提供图片文件或路径。当前 `public/assets/wechat-qr.png` 仍是原作品集提取的黑色二维码。不要声称已替换，也不要用生成式图像工具重画二维码。
2. **线上最终版本未知**：早前确认线上还在使用最初 hero.mp4，缺少 PartyYou、研究案例等，属于旧部署。用户之后称已重新部署；最新 v4 视频是否已上线未验证。
3. **真机覆盖有限**：设备判断做过 Windows、Mac、iPhone、Android 手机/平板、iPad 桌面 UA 的逻辑检查；没有在所有真实手机/微信浏览器验证。手机桌面模式或伪装 UA 仍可能误判。
4. **旧 GitHub 压缩包已过时**：`output/xuelian-portfolio-github-20260910.zip`（约68.8 MB）创建于手机视频兼容及后续双端替换之前，不能作为最终最新版再次交付。需重新打包。
5. 当前没有必须继续推进的阻塞任务，用户主动暂停项目。

## 下一步计划（用户恢复项目时）

1. 先读本文件、检查当前源码与 git 状态，避免覆盖用户之后的改动。
2. 如需要部署：重新 build，再更新 GitHub 仓库源码或完整上传 dist；不要上传旧 ZIP。
3. 对比线上 index.html 的 JS/CSS 哈希与本地 dist，检查视频路径和响应，确认生产部署更新。
4. 验证 PC、平板、手机竖横屏：视频选择、完整画面、标题位置、自动播放失败回退、全部模块可见、案例弹窗滚动和关闭。
5. 用户提供绿色二维码原文件后直接替换，并扫码验证。
6. 如要优化包体，先按源码引用整理旧素材；不要未经核对删掉动态生成的作品页文件。

## 踩过的坑

- **滚动动画导致内容全隐藏**：给待观察元素设置完全裁切的 clip-path，会影响 IntersectionObserver 的相交检测，造成永不揭开。已删除预隐藏样式，默认内容可见，只在进入视野时执行一次动画。不允许再以动画成功作为显示内容的前提。
- **只构建成功不等于界面正常**：此前构建通过但动画仍隐藏内容；修复后已在浏览器看到真实作品卡片恢复。涉及布局/动效时需要实际检查。
- **窗口大小不等于设备类型**：max-width 断点和低高度粗指针规则曾让 PC 误用手机视频，已改设备识别。
- **手机自动播放不能保证**：省电、减少动态或浏览器策略可能阻止 play()。必须捕获失败并显示同视频封面与可点击入口。
- **负 z-index 视频层**：手机合成可能异常，已改视频0、遮罩1、内容2，确保叠层清晰。
- **视频 cover 会裁切**：为完整呈现人物与 PORTFOLIO 字样改为 contain；曾做上下补边竖版，现在已经被用户提供的专用手机版替代。
- **灵动岛不能相对外框随意定位**：边框厚度在不同大小样机上不同，已改为相对 display 容器居中定位。
- **Vite 预览与 dist 是两份状态**：源码热更新不会自动更新部署成品；每次发布前必须重新 build，并上传 index.html + 全部 assets。
- **GitHub 上传 ZIP 不会自动成为源码工程**：应先解压，把文件放仓库根目录；素材多时使用 GitHub Desktop。静态平台构建输出目录为 dist。
- **进程状态不可假定**：本地服务器多次退出；先请求 localhost 确认，再启动。端口占用时先确认是否本项目，不要随意杀进程。
- **Figma 链接访问曾失败**：PartyYou 最终采用用户本地导出图片，不需要继续追 Figma 权限。
- **本地 ffmpeg 权限**：工具在 tmp/python-libs 下，普通访问可能拒绝；之前通过审批提升权限后读取运行。不要因 import 失败反复安装或变更模型。
- 样式多为历史追加覆盖，修改前查看最终有效规则，避免相同选择器互相抵消。

## 文件与运行说明

主要文件：
- `src/main.jsx`：页面、作品数据、视频选择、弹窗。
- `src/style.css`：全站样式与响应式覆盖。
- `src/heroDevice.js`：手机识别。
- `src/usePortfolioMotion.js`、`src/Motion.css`：首屏与滚动动效，清理及 reduced-motion 支持。
- `src/PartyYou.jsx`、`src/PartyYou.css`：PartyYou 专属排版。
- `src/Grainient*`、`src/BorderGlow*`：背景与卡片效果。
- `public/assets/`：所有对外网站素材。
- `components/ui/dialog.tsx`：弹窗基础组件。
- `vite.config.ts`：默认127.0.0.1:5173，strictPort开启。

Node.js要求 >=22.13.0；依赖锁文件为 pnpm-lock.yaml。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

现有依赖安装完毕时，也可直接：

```sh
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173
node node_modules/vite/bin/vite.js build
```

Cloudflare Pages 构建命令 `pnpm build`，输出 `dist`。本地最新地址 `http://127.0.0.1:5173/`。

最后确认构建成功的资源：
- JS：`assets/index-DKdTPIAm.js`
- CSS：`assets/index-D9dz-R9F.css`
这些哈希仅代表交接时构建，后续有变化应以新 dist/index.html 为准。

视频工具：`tmp/python-libs/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe`。
Python：`C:/Users/zhaoshier/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`。

原素材：桌面 offer作品集/赵雪莲作品集.pdf、简历+作品集/赵雪莲平面作品集.pdf、海外社交APP/、民航机上餐饮体验优化研究/。生活照已复制为 `public/assets/closing-lifestyle.jpg`，不再依赖微信临时目录。

## 协作约定

用中文简洁说明结果；用户偏好直接完成授权工作，少做重复确认。部署和源码修改是不同动作，未经实际发布不能宣称线上已更新。当前任务已按用户意愿暂停，后续等用户新指令。


## 2026-09-14 更新：PartyYou 内容替换

用户提供桌面 `Partyyou` 文件夹的 P1.jpg–P13.jpg。已将 06 PartyYou 卡片封面替换为 P1，详情按数字顺序完整展示 13 页，支持点击原图。新素材目录 `public/assets/partyyou-20260914/`；`src/PartyYou.jsx` 已改为页面图片展示，旧版样机拼版和登录视频不再渲染，旧资产保留。分类、编号、总数和头图视频配置未变。需重新部署新构建；此前本文描述的 PartyYou 旧排版由此更新取代。
