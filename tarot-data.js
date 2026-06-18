/* ========= 月镜言 · 完整 78 张塔罗牌库（马赛塔罗风格） =========
   结构：大阿卡那 22 张（独立场景图） + 小阿卡那 56 张（传统马赛点数牌）
   每张牌：name 牌名 / arcana 类别 / kw 关键词 / up 正位 / rev 逆位 / detail 象征解析 / svg 牌面
   svg() 返回完整 <svg viewBox="0 0 100 150">。

   牌面采用 Tarot de Marseille（马赛塔罗）经典版画风格：
   - 米白/羊皮纸底色 + 粗黑双线边框
   - 平涂五色调色板：朱红 / 墨绿 / 金黄 / 淡蓝 / 肉粉，黑色描边
   - 顶部罗马数字、底部牌名横幅（法文）
   - 小阿卡那为传统点数牌：花色符号按数量对称排列
*/

/* 马赛风格调色板（做旧矿物色） */
const MC = {
  ink:'#2a211a',     // 描边·暖墨褐黑
  inkSoft:'#6b5a48', // 浅墨（细节线）
  paper:'#efe1c2',   // 牌面底（羊皮纸·做旧）
  paperDk:'#e4d2ab', // 羊皮纸暗角
  cream:'#fbf3df',   // 高光·浅羊皮纸
  red:'#b23a2b',     // 暗朱红
  green:'#316b4f',   // 苔绿
  gold:'#d9a531',    // 土金黄
  goldDk:'#a87a1d',  // 暗金
  blue:'#3f6f86',    // 青金石蓝
  blueLt:'#9cc0d0',  // 淡青
  flesh:'#e7c39a',   // 赭石肤色
  fleshDk:'#c79468'  // 肤色阴影
};

/* 共享 defs：羊皮纸做旧底纹（所有牌复用同一组 id，外观一致） */
const MC_DEFS = `<defs>
    <radialGradient id="mcPaper" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="${MC.cream}"/>
      <stop offset="68%" stop-color="${MC.paper}"/>
      <stop offset="100%" stop-color="${MC.paperDk}"/>
    </radialGradient>
  </defs>`;

/* 四角马赛风装饰花纹（小百合 + 星点） */
function mcCorner(x, y, rot){
  return `<g transform="translate(${x},${y}) rotate(${rot})">
    <path d="M0 0 q5 0.5 8 4 M0 0 q0.5 5 4 8" fill="none" stroke="${MC.goldDk}" stroke-width="0.7"/>
    <path d="M9 9 l1.6 -3 1.6 3 -1.6 1z" fill="${MC.gold}"/>
    <circle cx="3.4" cy="3.4" r="0.9" fill="${MC.goldDk}"/>
  </g>`;
}

/* 通用底框：做旧羊皮纸底 + 粗黑双线边框 + 四角花纹 + 顶部罗马数字 + 底部牌名横幅 */
function frame(inner, roman, label){
  const top = roman
    ? `<text x="50" y="17.2" font-size="11.5" text-anchor="middle" fill="${MC.ink}" font-family="Georgia,'Times New Roman',serif" font-weight="700" letter-spacing="1.6" paint-order="stroke" stroke="${MC.cream}" stroke-width="1.4">${roman}</text>`
    : '';
  const bottom = label
    ? `<line x1="9" y1="131.6" x2="91" y2="131.6" stroke="${MC.ink}" stroke-width="0.9"/>
       <line x1="9" y1="133.4" x2="91" y2="133.4" stroke="${MC.inkSoft}" stroke-width="0.4"/>
       <text x="50" y="143" font-size="6.4" text-anchor="middle" fill="${MC.ink}" font-family="Georgia,'Times New Roman',serif" font-weight="700" letter-spacing="0.8">${label}</text>`
    : '';
  return `<svg class="card-svg" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    ${MC_DEFS}
    <rect width="100" height="150" fill="url(#mcPaper)"/>
    <rect x="3" y="3" width="94" height="144" fill="none" stroke="${MC.ink}" stroke-width="2.6" rx="1.5"/>
    <rect x="6" y="6" width="88" height="138" fill="none" stroke="${MC.ink}" stroke-width="0.7"/>
    <rect x="7.6" y="7.6" width="84.8" height="134.8" fill="none" stroke="${MC.goldDk}" stroke-width="0.4" opacity="0.7"/>
    ${mcCorner(8,8,0)}${mcCorner(92,8,90)}${mcCorner(92,142,180)}${mcCorner(8,142,270)}
    ${top}
    <g stroke-linejoin="round" stroke-linecap="round">${inner}</g>
    ${bottom}
  </svg>`;
}

/* ============================================================
   大阿卡那 22 张
   ============================================================ */
const MAJORS = [
  {
    name:"愚人", arcana:"大阿卡那 · 0", kw:"新开始 · 自由 · 冒险",
    up:"全新的旅程正在展开。保持好奇与勇气，纵身一跃，未知里藏着惊喜。",
    rev:"提醒你三思而后行，别因冲动而忽视脚下的悬崖，做好准备再出发。",
    detail:"愚人站在悬崖边，背着行囊、手持白玫瑰，脚边的小白狗象征本能的提醒。他代表纯粹的可能性与未受拘束的灵魂，是一切旅程的起点。",
    svg:()=>frame(`
      <path d="M10 120 H90" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M10 120 q20 -6 40 0 t40 0" fill="none" stroke="${MC.green}" stroke-width="2"/>
      <circle cx="50" cy="40" r="9" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M41 38 q9 -10 18 0 l-2 -8 -6 3 -2 -4 -2 4 -6 -3z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M40 50 q10 -5 20 0 l4 50 -28 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M40 50 l-4 26 6 2z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M60 50 l5 24 -6 2z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M42 100 l-1 18 8 0 0 -16z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M52 100 l1 16 8 0 -1 -18z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M62 40 q12 -4 9 8" fill="none" stroke="${MC.ink}" stroke-width="1.4"/>
      <rect x="66" y="44" width="12" height="9" rx="1" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <line x1="64" y1="36" x2="64" y2="104" stroke="${MC.fleshDk}" stroke-width="2"/>
      <path d="M22 108 q8 -10 16 -2 q-2 8 -10 8 q-6 0 -6 -6z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle cx="26" cy="106" r="1.4" fill="${MC.ink}"/>
      <path d="M48 78 l-6 -6 a3.5 3.5 0 0 1 6 -1.6 a3.5 3.5 0 0 1 6 1.6z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1"/>
    `, "", "LE·MAT")
  },
  {
    name:"魔术师", arcana:"大阿卡那 · I", kw:"创造 · 行动力 · 显化",
    up:"你拥有实现目标的全部工具，专注意念，把想法化为现实的时机到了。",
    rev:"能量有些散乱或被误用，小心眼高手低与自我欺骗，先理清真正的目标。",
    detail:"魔术师一手指天、一手指地，桌上摆着权杖、圣杯、宝剑、星币四元素，头顶悬着无限符号。他象征意志与行动力的合一，是宇宙能量的导管。",
    svg:()=>frame(`
      <path d="M40 28 q10 -8 20 0 q-3 -7 -10 -7 q-7 0 -10 7z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="50" cy="40" r="8.5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="46.8" cy="39.5" rx="0.9" ry="1.2" fill="${MC.ink}"/><ellipse cx="53.2" cy="39.5" rx="0.9" ry="1.2" fill="${MC.ink}"/>
      <path d="M46.5 43.5 q3.5 2 7 0" fill="none" stroke="${MC.ink}" stroke-width="0.7"/>
      <path d="M41 49 q9 -5 18 0 l4 46 -26 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M41 49 l-5 22 6 2z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M59 49 l6 -10" stroke="${MC.flesh}" stroke-width="3.4" stroke-linecap="round"/>
      <line x1="65" y1="38" x2="65" y2="28" stroke="${MC.fleshDk}" stroke-width="2.2"/>
      <path d="M38 60 l-8 8" stroke="${MC.flesh}" stroke-width="3.4" stroke-linecap="round"/>
      <rect x="22" y="96" width="56" height="8" rx="1" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M22 96 l4 -10 4 10z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <rect x="40" y="88" width="8" height="8" rx="1" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M58 96 l5 -6 2 6z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="72" cy="92" r="4" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M10 120 H90" stroke="${MC.ink}" stroke-width="1"/>
    `, "I", "LE·BATELEVR")
  },
  {
    name:"女祭司", arcana:"大阿卡那 · II", kw:"直觉 · 潜意识 · 神秘",
    up:"答案藏在你的内心。静下来倾听直觉，耐心等待，真相会自然浮现。",
    rev:"你可能忽略了内在声音，或被表象迷惑。重新与自己的感受连接。",
    detail:"女祭司端坐于黑白双柱之间，头戴月冠，手持律法卷轴，身后垂帘绣着石榴。她象征潜意识、直觉与未被言说的智慧。",
    svg:()=>frame(`
      <rect x="20" y="30" width="9" height="92" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/>
      <rect x="71" y="30" width="9" height="92" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M40 28 q10 -6 20 0 l-2 -7 -8 3 -8 -3z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="50" cy="24" r="4" fill="none" stroke="${MC.gold}" stroke-width="1.4"/>
      <circle cx="50" cy="40" r="8.5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M42 48 q8 -5 16 0 l4 56 -24 0z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M42 48 q8 6 16 0 l2 56 -20 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M50 50 V104" stroke="${MC.blue}" stroke-width="1"/>
      <path d="M44 60 h12 l-2 8 h-8z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <line x1="50" y1="58" x2="50" y2="70" stroke="${MC.ink}" stroke-width="1"/><line x1="46" y1="63" x2="54" y2="63" stroke="${MC.ink}" stroke-width="1"/>
      <rect x="54" y="86" width="13" height="17" rx="1" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.1" transform="rotate(10 60 94)"/>
    `, "II", "LA·PAPESSE")
  },
  {
    name:"女皇", arcana:"大阿卡那 · III", kw:"丰饶 · 母性 · 滋养",
    up:"丰盛与创造力的祝福。万物在你的滋养下生长，是孕育成果的丰收时节。",
    rev:"过度操劳或依赖，提醒你先照顾好自己，让能量重新流动起来。",
    detail:"女皇头戴十二星之冠，端坐于丰饶的花园，手持权杖、身旁有心形之盾。她象征大地之母的丰饶、创造、孕育与无条件的滋养。",
    svg:()=>frame(`
      <rect x="26" y="56" width="48" height="52" rx="4" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.3"/>
      <path d="M37 60 q13 -7 26 0 l5 48 -36 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.3"/>
      <circle cx="50" cy="42" r="9" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="46.6" cy="41.5" rx="0.9" ry="1.2" fill="${MC.ink}"/><ellipse cx="53.4" cy="41.5" rx="0.9" ry="1.2" fill="${MC.ink}"/>
      <path d="M46 45.5 q4 2 8 0" fill="none" stroke="${MC.ink}" stroke-width="0.7"/>
      <path d="M40 35 q10 -6 20 0" fill="none" stroke="${MC.gold}" stroke-width="1.3"/>
      <g fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.5"><circle cx="42" cy="31" r="1.6"/><circle cx="50" cy="29" r="1.8"/><circle cx="58" cy="31" r="1.6"/></g>
      <line x1="68" y1="48" x2="68" y2="100" stroke="${MC.fleshDk}" stroke-width="2"/><circle cx="68" cy="46" r="3.4" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M28 98 l-6 -6 a3 3 0 0 1 6 -1.6 a3 3 0 0 1 6 1.6z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1"/>
    `, "III", "LIMPERATRICE")
  },
  {
    name:"皇帝", arcana:"大阿卡那 · IV", kw:"权威 · 秩序 · 掌控",
    up:"稳固的结构与领导力。以理性和决断建立秩序，你能掌控局面、奠定基业。",
    rev:"过度强硬或控制欲过强，提醒你适度放权、倾听他人的声音。",
    detail:"皇帝端坐于公羊纹饰的石座，手持权杖与宝球，目光坚定。他象征父性的权威、规则、秩序与现实世界的掌控力量。",
    svg:()=>frame(`
      <rect x="28" y="50" width="44" height="58" rx="3" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.3"/>
      <g fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.8"><path d="M30 50 l4 -7 4 7z"/><path d="M62 50 l4 -7 4 7z"/></g>
      <path d="M38 56 q12 -6 24 0 l3 50 -30 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.3"/>
      <circle cx="50" cy="40" r="8.5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="46.8" cy="39.5" rx="0.9" ry="1.2" fill="${MC.ink}"/><ellipse cx="53.2" cy="39.5" rx="0.9" ry="1.2" fill="${MC.ink}"/>
      <path d="M40 35 h20 l-2 -6 -3 3 -2 -5 -2 5 -3 -3z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M45 47 q5 5 10 0 l-1 7 -8 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1"/>
      <line x1="66" y1="54" x2="66" y2="98" stroke="${MC.fleshDk}" stroke-width="2"/><circle cx="66" cy="52" r="3" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
    `, "IV", "LEMPEREVR")
  },
  {
    name:"教皇", arcana:"大阿卡那 · V", kw:"信念 · 传统 · 指引",
    up:"来自传统与智慧的指引。遵循正统的方法、寻求良师，你会获得心灵的支持。",
    rev:"对教条的质疑或叛逆，提醒你倾听内心，找到属于自己的信念。",
    detail:"教皇头戴三重冠，手作祝福之姿，身前两位信徒聆听教诲。他象征精神导师、传统、信仰体系与道德层面的指引。",
    svg:()=>frame(`
      <rect x="26" y="52" width="48" height="56" rx="3" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M38 56 q12 -6 24 0 l3 50 -30 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.3"/>
      <circle cx="50" cy="42" r="8" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M43 35 h14 v-5 h-14z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M44 30 h12 v-5 h-12z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M45 25 h10 v-4 h-10z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M40 62 q4 -4 8 0" fill="none" stroke="${MC.flesh}" stroke-width="3" stroke-linecap="round"/>
      <line x1="68" y1="40" x2="68" y2="104" stroke="${MC.fleshDk}" stroke-width="2"/>
      <path d="M64 46 h8 M65 50 h6 M66 54 h4" stroke="${MC.gold}" stroke-width="1.4"/>
    `, "V", "LE·PAPE")
  },
  {
    name:"恋人", arcana:"大阿卡那 · VI", kw:"爱 · 结合 · 选择",
    up:"和谐的关系与重要的选择。跟随内心，真诚的连接会带来圆满。",
    rev:"关系中出现失衡或价值观分歧，需要更坦诚的沟通与重新审视。",
    detail:"亚当与夏娃立于伊甸园中，天使拉斐尔在金色阳光中赐福。背后是知识之树与生命之树。象征爱、结合，以及价值观层面的重要抉择。",
    svg:()=>frame(`
      <circle cx="50" cy="28" r="8" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <g stroke="${MC.gold}" stroke-width="1.1"><line x1="50" y1="14" x2="50" y2="42"/><line x1="38" y1="28" x2="62" y2="28"/><line x1="41" y1="19" x2="59" y2="37"/><line x1="59" y1="19" x2="41" y2="37"/></g>
      <circle cx="50" cy="28" r="4" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="30" cy="62" r="7" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M23 72 q7 -6 14 0 l2 38 -18 0z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle cx="70" cy="62" r="7" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M63 72 q7 -6 14 0 l2 38 -18 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M50 88 l-6 -6 a3.5 3.5 0 0 1 6 -1.6 a3.5 3.5 0 0 1 6 1.6z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <line x1="16" y1="84" x2="16" y2="112" stroke="${MC.fleshDk}" stroke-width="2"/><circle cx="16" cy="80" r="6" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.1"/>
      <line x1="84" y1="84" x2="84" y2="112" stroke="${MC.fleshDk}" stroke-width="2"/><circle cx="84" cy="80" r="6" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M10 118 H90" stroke="${MC.ink}" stroke-width="1"/>
    `, "VI", "L'AMOVREVX")
  },
  {
    name:"战车", arcana:"大阿卡那 · VII", kw:"意志 · 胜利 · 掌控方向",
    up:"凭坚定的意志驾驭对立的力量，向目标全速前进，胜利在望。",
    rev:"方向迷失或失控，提醒你重新握紧缰绳，平衡内在相反的冲动。",
    detail:"战士头戴星冠，立于双狮（或双马）牵引的战车之上，目光坚定地驶向前方。象征意志力、自律、掌控方向与突破重围的胜利。",
    svg:()=>frame(`
      <rect x="30" y="70" width="40" height="30" rx="3" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.3"/>
      <path d="M30 70 q20 -6 40 0" fill="none" stroke="${MC.gold}" stroke-width="1.2"/>
      <circle cx="38" cy="104" r="7" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/><circle cx="62" cy="104" r="7" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <g stroke="${MC.ink}" stroke-width="0.8"><line x1="38" y1="97" x2="38" y2="111"/><line x1="31" y1="104" x2="45" y2="104"/><line x1="62" y1="97" x2="62" y2="111"/><line x1="55" y1="104" x2="69" y2="104"/></g>
      <circle cx="50" cy="44" r="8" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M42 36 q8 -5 16 0 l-2 -6 -6 3 -6 -3z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M42 52 q8 -4 16 0 l2 18 -20 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M22 84 q6 -10 16 -10" fill="none" stroke="${MC.cream}" stroke-width="3" stroke-linecap="round"/>
      <path d="M78 84 q-6 -10 -16 -10" fill="none" stroke="${MC.green}" stroke-width="3" stroke-linecap="round"/>
    `, "VII", "LE·CHARIOT")
  },
  {
    name:"正义", arcana:"大阿卡那 · VIII", kw:"公正 · 因果 · 平衡",
    up:"凡事讲求公正与平衡。为自己的选择负责，真相与因果终将带来公允的结果。",
    rev:"失衡、偏颇或逃避责任，提醒你诚实面对，重新校准内心的天平。",
    detail:"正义女神一手持天平、一手持利剑，端坐于双柱之间。象征公正、真理、因果法则，以及为自身行为承担后果的责任。",
    svg:()=>frame(`
      <rect x="28" y="54" width="44" height="54" rx="3" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M38 58 q12 -6 24 0 l3 48 -30 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.3"/>
      <circle cx="50" cy="42" r="8.5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="46.8" cy="41.5" rx="0.9" ry="1.2" fill="${MC.ink}"/><ellipse cx="53.2" cy="41.5" rx="0.9" ry="1.2" fill="${MC.ink}"/>
      <path d="M41 36 q9 -5 18 0 l-2 -6 -7 3 -7 -3z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <line x1="66" y1="42" x2="66" y2="96" stroke="${MC.blue}" stroke-width="3"/><line x1="66" y1="42" x2="66" y2="96" stroke="${MC.ink}" stroke-width="0.8"/><path d="M66 42 l-2 5 2 -1 2 1z" fill="${MC.ink}"/>
      <g stroke="${MC.ink}" stroke-width="1"><line x1="30" y1="58" x2="30" y2="72"/><line x1="22" y1="72" x2="38" y2="72"/></g>
      <path d="M22 72 a4 4 0 0 0 8 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M30 72 a4 4 0 0 0 8 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
    `, "VIII", "LA·IVSTICE")
  },
  {
    name:"隐士", arcana:"大阿卡那 · IX", kw:"内省 · 智慧 · 独处",
    up:"是向内探寻的时刻。放慢脚步、独处沉淀，内在的明灯会照亮前路。",
    rev:"过度孤立或逃避现实，提醒你别把自己关得太久，适时回到人群。",
    detail:"隐士披着斗篷立于山巅，高举一盏内含星芒的提灯，拄杖前行。象征智慧的追寻、内省、独处的沉淀与精神层面的指引。",
    svg:()=>frame(`
      <path d="M36 42 q14 -16 28 0 l6 64 -40 0z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.4"/>
      <path d="M40 46 q10 -8 20 0" fill="none" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="50" cy="48" r="7" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M45 54 q5 7 10 0 l-1 8 -8 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1"/>
      <line x1="30" y1="42" x2="30" y2="112" stroke="${MC.fleshDk}" stroke-width="2.2"/>
      <g transform="translate(70,58)"><rect x="-5" y="-6" width="10" height="13" rx="1.5" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/><path d="M0 -3 l1.6 4 -3.2 0z" fill="${MC.cream}"/></g>
    `, "IX", "L'HERMITE")
  },
  {
    name:"命运之轮", arcana:"大阿卡那 · X", kw:"转机 · 循环 · 机遇",
    up:"命运的齿轮开始转动，好运正在靠近。顺势而为，把握当下的机遇。",
    rev:"遭遇阻滞或坏运的循环，提醒你接受变化，别与无常硬碰硬。",
    detail:"巨轮悬于空中，四角的天使、鹰、狮、牛各自研读经书，轮上有神秘字母与炼金符号。它象征命运的循环、转折与不可抗拒的变化。",
    svg:()=>frame(`
      <line x1="50" y1="32" x2="50" y2="122" stroke="${MC.fleshDk}" stroke-width="2"/>
      <circle cx="50" cy="72" r="30" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.8"/>
      <circle cx="50" cy="72" r="20" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle cx="50" cy="72" r="10" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <g stroke="${MC.ink}" stroke-width="1.4"><line x1="50" y1="42" x2="50" y2="102"/><line x1="20" y1="72" x2="80" y2="72"/><line x1="29" y1="51" x2="71" y2="93"/><line x1="71" y1="51" x2="29" y2="93"/></g>
      <circle cx="50" cy="72" r="3.4" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M72 100 q9 4 7 16 q-9 -4 -7 -16z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M28 100 q-9 4 -7 16 q9 -4 7 -16z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M50 38 l-5 6 10 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
    `, "X", "LA·ROVE")
  },
  {
    name:"力量", arcana:"大阿卡那 · XI", kw:"勇气 · 温柔 · 内在力量",
    up:"以柔克刚。用耐心与善意驯服内心的躁动，你比想象中更强大。",
    rev:"自我怀疑或情绪失控正在消耗你，先与内在的恐惧温柔和解。",
    detail:"身着白袍、头戴花环的女子温柔地合上雄狮之口，头顶悬着无限符号。她以慈爱而非暴力驯服野性，象征内在的勇气、耐心与精神力量。",
    svg:()=>frame(`
      <path d="M40 24 q8 8 16 0 q0 -6 -8 -6 q-8 0 -8 6z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="42" cy="40" r="8" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M34 48 q8 -5 16 0 l3 50 -22 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M34 48 l-4 20 5 2z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <ellipse cx="64" cy="88" rx="18" ry="14" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M80 96 q9 4 11 12 q-7 -1 -11 -6z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M88 108 q3 2 2 6 q-3 -1 -3 -5z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.8"/>
      <g fill="${MC.goldDk}" stroke="${MC.ink}" stroke-width="0.6">
        <path d="M74 64 l-3 6 5 -2z"/><path d="M84 66 l3 6 -5 -1z"/>
        <path d="M62 70 l-7 1 6 3z"/><path d="M86 72 l8 2 -7 3z"/>
        <path d="M60 80 l-8 -1 7 4z"/><path d="M88 82 l9 0 -8 4z"/>
        <path d="M64 92 l-7 4 7 1z"/><path d="M84 94 l8 4 -7 1z"/>
      </g>
      <circle cx="74" cy="80" r="11" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <g fill="${MC.fleshDk}" stroke="${MC.ink}" stroke-width="0.7"><path d="M66 72 l-4 -5 6 3z"/><path d="M82 72 l4 -5 -6 3z"/></g>
      <ellipse cx="70" cy="79" rx="1.6" ry="1.9" fill="${MC.ink}"/><ellipse cx="79" cy="79" rx="1.6" ry="1.9" fill="${MC.ink}"/>
      <path d="M73 84 l1.5 2 1.5 -2z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.6"/>
      <path d="M74.5 86 v2 M74.5 88 q-3 2 -6 1 M74.5 88 q3 2 6 1" fill="none" stroke="${MC.ink}" stroke-width="0.9"/>
      <g stroke="${MC.inkSoft}" stroke-width="0.4"><path d="M68 85 l-7 -1"/><path d="M68 87 l-7 1"/><path d="M81 85 l7 -1"/><path d="M81 87 l7 1"/></g>
      <g fill="${MC.cream}" stroke="${MC.ink}" stroke-width="0.4"><path d="M50 100 l-3 4 3 0z"/><path d="M54 102 l-3 4 3 0z"/><path d="M58 103 l-3 4 3 0z"/></g>
      <path d="M50 72 q8 4 14 10" fill="none" stroke="${MC.flesh}" stroke-width="3" stroke-linecap="round"/>
      <path d="M10 120 H90" stroke="${MC.ink}" stroke-width="1"/>
    `, "XI", "LA·FORCE")
  },
  {
    name:"倒吊人", arcana:"大阿卡那 · XII", kw:"放下 · 转念 · 牺牲",
    up:"换一个角度看世界。暂停与臣服并非失败，主动的放下会带来全新的领悟。",
    rev:"无谓的拖延或牺牲，提醒你别再原地空等，是时候采取行动了。",
    detail:"一人以单脚倒悬于 T 形木架，神情平静，头顶散发光晕。象征主动的牺牲、视角的转换、臣服当下与放下执念后的顿悟。",
    svg:()=>frame(`
      <line x1="20" y1="34" x2="80" y2="34" stroke="${MC.fleshDk}" stroke-width="3"/>
      <line x1="24" y1="34" x2="24" y2="118" stroke="${MC.fleshDk}" stroke-width="3"/>
      <line x1="76" y1="34" x2="76" y2="118" stroke="${MC.fleshDk}" stroke-width="3"/>
      <line x1="50" y1="34" x2="50" y2="44" stroke="${MC.ink}" stroke-width="1.4"/>
      <circle cx="50" cy="92" r="8.5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <g fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.5"><circle cx="42" cy="96" r="1.4"/><circle cx="50" cy="101" r="1.4"/><circle cx="58" cy="96" r="1.4"/></g>
      <path d="M42 84 q8 -4 16 0 l-3 -38 -10 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.3"/>
      <path d="M45 46 l10 0 -1 6 -8 0z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M53 50 l9 -8" stroke="${MC.blue}" stroke-width="3" stroke-linecap="round"/>
    `, "XII", "LE·PENDV")
  },
  {
    name:"死神", arcana:"大阿卡那 · XIII", kw:"结束 · 转化 · 重生",
    up:"一段旅程的终结，正是另一段的开始。放下过去，迎接必然的蜕变。",
    rev:"你在抗拒改变，停滞不前。允许旧的离开，新的才有空间生长。",
    detail:"身披黑甲的骷髅骑士手持镰刀前行，无论国王、孩童或主教皆无法阻挡。远方双塔间太阳升起。象征终结、转化与必然的重生。",
    svg:()=>frame(`
      <path d="M14 116 H86" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="48" cy="40" r="10" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.4"/>
      <ellipse cx="44" cy="39" rx="2" ry="2.6" fill="${MC.ink}"/><ellipse cx="52" cy="39" rx="2" ry="2.6" fill="${MC.ink}"/>
      <path d="M43 46 l2 4 2 -4 2 4 2 -4" fill="none" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M40 52 q8 -4 16 0 l3 56 -22 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.4"/>
      <g stroke="${MC.ink}" stroke-width="1.1"><line x1="44" y1="62" x2="44" y2="100"/><line x1="48" y1="62" x2="48" y2="100"/><line x1="52" y1="62" x2="52" y2="100"/></g>
      <path d="M72 20 q14 18 0 40" fill="none" stroke="${MC.ink}" stroke-width="2.2"/>
      <line x1="72" y1="20" x2="58" y2="108" stroke="${MC.fleshDk}" stroke-width="2.4"/>
      <path d="M16 30 l7 12 7 -12z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M22 104 q6 -8 14 -2" fill="none" stroke="${MC.gold}" stroke-width="1.6"/>
    `, "XIII", "LA·MORT")
  },
  {
    name:"节制", arcana:"大阿卡那 · XIV", kw:"平衡 · 调和 · 耐心",
    up:"以耐心调和对立，找到恰到好处的中道。温和的节制带来身心的疗愈。",
    rev:"失衡或过度放纵，提醒你重新调整节奏，别走极端。",
    detail:"天使一脚踏水、一脚踏地，将两只杯中的水来回倾倒，调和成生命之流。象征平衡、节制、耐心与不同能量之间的和谐融合。",
    svg:()=>frame(`
      <circle cx="50" cy="38" r="8" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle cx="50" cy="27" r="2" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.5"/>
      <path d="M40 46 q10 -5 20 0 l4 54 -28 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.3"/>
      <path d="M30 56 q-10 6 -8 20 q10 -4 12 -16z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M70 56 q10 6 8 20 q-10 -4 -12 -16z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M34 74 h12 l-2 7 a3.4 3.4 0 0 1 -8 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M54 64 h12 l-2 7 a3.4 3.4 0 0 1 -8 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M56 71 q-7 4 -14 6" fill="none" stroke="${MC.blue}" stroke-width="1.6"/>
    `, "XIV", "TEMPERANCE")
  },
  {
    name:"恶魔", arcana:"大阿卡那 · XV", kw:"束缚 · 欲望 · 执着",
    up:"留意那些束缚你的执念与诱惑——物欲、依赖或恐惧，看清它，才能挣脱。",
    rev:"你正开始觉察并挣脱枷锁，重获自由与掌控。",
    detail:"长角的恶魔盘踞高台，台下两人被松垮的锁链拴住——其实只要愿意便能挣脱。象征欲望、物质的束缚、成瘾与自我设限的枷锁。",
    svg:()=>frame(`
      <circle cx="50" cy="40" r="11" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.3"/>
      <path d="M40 32 l-4 -8 6 4z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/><path d="M60 32 l4 -8 -6 4z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="45" cy="39" r="1.6" fill="${MC.ink}"/><circle cx="55" cy="39" r="1.6" fill="${MC.ink}"/>
      <path d="M44 45 q6 4 12 0" fill="none" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M42 52 q8 -4 16 0 l2 24 -20 0z" fill="${MC.fleshDk}" stroke="${MC.ink}" stroke-width="1.2"/>
      <rect x="34" y="100" width="32" height="10" rx="2" fill="${MC.ink}"/>
      <circle cx="30" cy="92" r="5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1"/><circle cx="70" cy="92" r="5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1"/>
      <line x1="50" y1="78" x2="30" y2="88" stroke="${MC.ink}" stroke-width="0.8"/><line x1="50" y1="78" x2="70" y2="88" stroke="${MC.ink}" stroke-width="0.8"/>
    `, "XV", "LE·DIABLE")
  },
  {
    name:"高塔", arcana:"大阿卡那 · XVI", kw:"剧变 · 觉醒 · 释放",
    up:"突如其来的变动打破旧有结构。看似破坏，实则是为新生扫清障碍。",
    rev:"你正努力避免一场必要的崩塌，或灾难已渐平息，重建的时刻来临。",
    detail:"闪电击中高塔，王冠被掀飞，两人从塔上坠落。象征旧结构的骤然瓦解、幻象的破灭，以及随之而来的觉醒与释放。",
    svg:()=>frame(`
      <rect x="37" y="48" width="26" height="74" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.4"/>
      <g stroke="${MC.ink}" stroke-width="0.9"><line x1="37" y1="66" x2="63" y2="66"/><line x1="37" y1="86" x2="63" y2="86"/><line x1="37" y1="106" x2="63" y2="106"/><line x1="50" y1="48" x2="50" y2="122"/></g>
      <rect x="44" y="56" width="5" height="8" fill="${MC.ink}"/><rect x="51" y="56" width="5" height="8" fill="${MC.ink}"/>
      <path d="M34 48 L66 48 L60 36 L40 36 Z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M22 18 L38 44 L31 44 L46 64 L34 50 L40 50 Z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="26" cy="92" r="5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/><path d="M22 98 h8 l2 14 -12 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="74" cy="86" r="5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/><path d="M70 92 h8 l2 14 -12 0z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.1"/>
      <g fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.6"><path d="M16 72 l1.6 4 1.6 -4 -1.6 -3z"/><path d="M84 66 l1.6 4 1.6 -4 -1.6 -3z"/><path d="M68 110 l1.4 4 1.4 -4 -1.4 -3z"/></g>
    `, "XVI", "LA·MAISON·DIEV")
  },
  {
    name:"星星", arcana:"大阿卡那 · XVII", kw:"希望 · 疗愈 · 灵感",
    up:"风雨之后的宁静与希望。心怀信念，宇宙正温柔地指引你疗愈与重生。",
    rev:"暂时的失望或信心动摇，别放弃希望，光芒只是被乌云遮住了。",
    detail:"裸身少女单膝跪于水边，将两壶清水分别倾入池中与大地，天空一颗大星与七颗小星闪耀。象征希望、疗愈、灵感与心灵的宁静。",
    svg:()=>frame(`
      <path d="M50 22 l3 8 8 1 -6 5.5 2 8 -7 -4.5 -7 4.5 2 -8 -6 -5.5 8 -1z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <g fill="${MC.blue}" stroke="${MC.ink}" stroke-width="0.7"><path d="M24 34 l1.6 4 4 .5 -3 2.6 1 4 -3.6 -2.4 -3.6 2.4 1 -4 -3 -2.6 4 -.5z"/><path d="M76 32 l1.6 4 4 .5 -3 2.6 1 4 -3.6 -2.4 -3.6 2.4 1 -4 -3 -2.6 4 -.5z"/></g>
      <g fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.6"><path d="M18 52 l1.2 3 3 .4 -2.2 2 .7 3 -2.7 -1.7 -2.7 1.7 .7 -3 -2.2 -2 3 -.4z"/><path d="M82 50 l1.2 3 3 .4 -2.2 2 .7 3 -2.7 -1.7 -2.7 1.7 .7 -3 -2.2 -2 3 -.4z"/></g>
      <path d="M10 104 q40 -10 80 0 V122 H10z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle cx="50" cy="72" r="7" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M43 82 q7 -6 14 0 l2 22 -18 0z" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M40 96 q-9 4 -11 14" fill="none" stroke="${MC.blue}" stroke-width="2"/>
      <path d="M60 96 q9 4 11 14" fill="none" stroke="${MC.blue}" stroke-width="2"/>
      <path d="M33 64 l-6 6 4 2z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M67 64 l6 6 -4 2z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
    `, "XVII", "L'ESTOILLE")
  },
  {
    name:"月亮", arcana:"大阿卡那 · XVIII", kw:"潜意识 · 迷惑 · 直觉",
    up:"潜意识浮现，情绪与想象格外丰富。穿过迷雾，倾听内心真实的声音。",
    rev:"迷雾正在散去，误会与不安逐渐澄清，你重新看清了方向。",
    detail:"月亮高悬，洒下露珠，一犬一狼对月嗥叫，小龙虾从池中爬出，远处双塔守着未知之路。象征潜意识、幻象、恐惧与直觉的深海。",
    svg:()=>frame(`
      <circle cx="50" cy="38" r="15" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.4"/>
      <path d="M50 23 a15 15 0 0 0 0 30 a11 11 0 0 1 0 -30z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="0.8"/>
      <circle cx="46" cy="35" r="1.3" fill="${MC.ink}"/><path d="M44 42 q3 2 5 0" fill="none" stroke="${MC.ink}" stroke-width="1"/>
      <g fill="${MC.red}"><path d="M50 58 l1.4 4 1.4 -4 -1.4 -3z"/><path d="M34 64 l1 3 1 -3 -1 -2.4z"/><path d="M66 64 l1 3 1 -3 -1 -2.4z"/></g>
      <rect x="11" y="66" width="13" height="40" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/><path d="M11 66 l6.5 -10 6.5 10z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <rect x="76" y="66" width="13" height="40" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/><path d="M76 66 l6.5 -10 6.5 10z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M28 108 q-3 -14 3 -19 q1.6 -3 3 0 q4 8 1.5 19z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M29 92 l-4 -3 4 0z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="0.7"/>
      <path d="M30 90 q-1 -3 1 -5" fill="none" stroke="${MC.ink}" stroke-width="0.7"/>
      <circle cx="30" cy="94" r="0.8" fill="${MC.ink}"/>
      <g stroke="${MC.inkSoft}" stroke-width="0.4"><path d="M30 100 l4 1"/><path d="M30 104 l4 1"/></g>
      <path d="M72 108 q3 -14 -3 -19 q-1.6 -3 -3 0 q-4 8 -1.5 19z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M71 92 l4 -3 -4 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.7"/>
      <path d="M70 90 q1 -3 -1 -5" fill="none" stroke="${MC.ink}" stroke-width="0.7"/>
      <circle cx="70" cy="94" r="0.8" fill="${MC.ink}"/>
      <g stroke="${MC.goldDk}" stroke-width="0.4"><path d="M70 100 l-4 1"/><path d="M70 104 l-4 1"/></g>
      <ellipse cx="50" cy="118" rx="18" ry="7" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M38 117 q12 -4 24 0" fill="none" stroke="${MC.blueLt}" stroke-width="0.6"/>
      <ellipse cx="50" cy="116" rx="5" ry="3.2" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.9"/>
      <g stroke="${MC.ink}" stroke-width="0.5"><path d="M46 115 q-1 1 -1 2.4"/><path d="M50 114.5 v3"/><path d="M54 115 q1 1 1 2.4"/></g>
      <path d="M45 114.5 l-3.6 -1.6 q-1 1.2 0.4 2 z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.7"/>
      <path d="M55 114.5 l3.6 -1.6 q1 1.2 -0.4 2 z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.7"/>
      <path d="M48 119 l-1.4 2.4 M52 119 l1.4 2.4" stroke="${MC.ink}" stroke-width="0.9"/>
      <circle cx="48.4" cy="115" r="0.5" fill="${MC.ink}"/><circle cx="51.6" cy="115" r="0.5" fill="${MC.ink}"/>
    `, "XVIII", "LA·LVNE")
  },
  {
    name:"太阳", arcana:"大阿卡那 · XIX", kw:"喜悦 · 成功 · 光明",
    up:"最明亮的祝福。坦诚地表达自己，喜悦、成功与温暖正向你走来。",
    rev:"快乐被暂时遮蔽，或过于乐观。调整心态，光明依旧在前方。",
    detail:"灿烂的太阳放射光芒，一个戴花冠的孩子骑着白马，举着红色旗帜，身后是向日葵盛开的花墙。象征喜悦、成功、生命力与纯真的幸福。",
    svg:()=>frame(`
      <g stroke="${MC.ink}" stroke-width="0.8">
        <g fill="${MC.red}"><path d="M50 20 l4 14 -8 0z"/><path d="M80 50 l-14 4 0 -8z"/><path d="M50 80 l-4 -14 8 0z"/><path d="M20 50 l14 -4 0 8z"/></g>
        <g fill="${MC.gold}"><path d="M71 29 l-8 12 -4 -5z"/><path d="M71 71 l-12 -8 5 -4z"/><path d="M29 71 l8 -12 4 5z"/><path d="M29 29 l12 8 -5 4z"/></g>
      </g>
      <circle cx="50" cy="50" r="19" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.6"/>
      <circle cx="43" cy="47" r="1.8" fill="${MC.ink}"/><circle cx="57" cy="47" r="1.8" fill="${MC.ink}"/>
      <path d="M50 50 l0 4" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M42 57 q8 6 16 0" fill="none" stroke="${MC.ink}" stroke-width="1.4"/>
      <g fill="${MC.red}"><circle cx="40" cy="42" r="1.4"/><circle cx="60" cy="42" r="1.4"/></g>
      <rect x="14" y="104" width="72" height="18" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.2"/>
      <line x1="30" y1="104" x2="30" y2="122" stroke="${MC.ink}" stroke-width="0.9"/><line x1="50" y1="104" x2="50" y2="122" stroke="${MC.ink}" stroke-width="0.9"/><line x1="70" y1="104" x2="70" y2="122" stroke="${MC.ink}" stroke-width="0.9"/>
      <circle cx="50" cy="92" r="6" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M44 100 q6 -6 12 0 l1 6 -14 0z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.1"/>
    `, "XVIIII", "LE·SOLEIL")
  },
  {
    name:"审判", arcana:"大阿卡那 · XX", kw:"觉醒 · 召唤 · 重生",
    up:"内在的召唤响起，是觉醒与重新出发的时刻。听从感召，迎接焕然一新的自己。",
    rev:"对召唤的迟疑或自我怀疑，提醒你别让过去的悔恨困住前行的脚步。",
    detail:"天使吹响号角，亡者从墓中起身、张开双臂回应召唤。象征觉醒、宽恕、对过往的清算，以及生命迈入更高阶段的重生。",
    svg:()=>frame(`
      <circle cx="50" cy="30" r="8" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M42 38 q8 -4 16 0 l3 18 -22 0z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/>
      <line x1="58" y1="34" x2="76" y2="26" stroke="${MC.gold}" stroke-width="3" stroke-linecap="round"/>
      <path d="M76 22 l5 1 -3 7z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.8"/>
      <circle cx="34" cy="88" r="6" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.1"/><path d="M28 96 h12 l1 16 -14 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="66" cy="88" r="6" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.1"/><path d="M60 96 h12 l1 16 -14 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="50" cy="96" r="5.5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.1"/><path d="M44 104 h12 l1 10 -14 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.1"/>
    `, "XX", "LE·IVGEMENT")
  },
  {
    name:"世界", arcana:"大阿卡那 · XXI", kw:"圆满 · 成就 · 整合",
    up:"一个旅程的圆满完成。所有努力在此整合，你迎来成就、和谐与新的天地。",
    rev:"距离圆满只差一步，别在临门时松懈，完成它才能开启下一段旅程。",
    detail:"舞者在月桂花环中翩然起舞，四角分别是天使、鹰、狮、牛。象征圆满、成就、整合与生命循环的完成，也预示新旅程的开端。",
    svg:()=>frame(`
      <ellipse cx="50" cy="72" rx="24" ry="40" fill="none" stroke="${MC.green}" stroke-width="3"/>
      <ellipse cx="50" cy="72" rx="24" ry="40" fill="none" stroke="${MC.ink}" stroke-width="0.8"/>
      <circle cx="50" cy="56" r="7" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M44 64 q6 -4 12 0 l2 30 -16 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M44 96 l-3 14 6 0z" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1"/><path d="M54 96 l4 12 -6 2z" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1"/>
      <g stroke="${MC.ink}" stroke-width="0.7"><path d="M16 26 q5 -6 10 0 q-2 6 -10 4z" fill="${MC.gold}"/><path d="M84 26 q-5 -6 -10 0 q2 6 10 4z" fill="${MC.blue}"/><path d="M16 120 q5 6 10 0 q-2 -6 -10 -4z" fill="${MC.red}"/><path d="M84 120 q-5 6 -10 0 q2 -6 10 -4z" fill="${MC.gold}"/></g>
    `, "XXI", "LE·MONDE")
  }
];

/* ============================================================
   小阿卡那 56 张 —— 传统马赛点数牌
   ============================================================ */

/* 花色信息 */
const SUIT_INFO = {
  baton: { cn:"权杖", fr:"BASTON", field:"事业、行动与热情", col:MC.green, court:"棒" },
  coupe: { cn:"圣杯", fr:"COVPE",  field:"情感、关系与心灵", col:MC.red,   court:"杯" },
  epee:  { cn:"宝剑", fr:"ESPÉE",  field:"思想、沟通与决断", col:MC.blue,  court:"剑" },
  denier:{ cn:"星币", fr:"DENIER", field:"财富、工作与现实", col:MC.gold,  court:"币" }
};
const SUIT_ORDER = ["baton","coupe","epee","denier"];
const ROMAN = ["","I","II","III","IIII","V","VI","VII","VIII","VIIII","X"];
const RANK_NAME = {1:"王牌",2:"二",3:"三",4:"四",5:"五",6:"六",7:"七",8:"八",9:"九",10:"十"};
const COURT_NAME = { page:"侍从", knight:"骑士", queen:"王后", king:"国王" };
const COURT_FR   = { page:"VALET", knight:"CAVALIER", queen:"REYNE", king:"ROY" };

/* 数字牌含义模板（{cn}=花色名 {field}=领域） */
const RANK_INFO = {
  1:{ kw:"起点 · 潜能 · 契机",
      up:"{cn}牌代表{field}领域一个全新的开端，一份充满潜力的礼物正等待你把握。",
      rev:"起步的能量受阻或时机未到，先沉淀方向，别急于求成。",
      detail:"{cn}王牌是该花色纯粹能量的种子，象征{field}方面崭新的可能与契机。" },
  2:{ kw:"平衡 · 选择 · 合作",
      up:"你正面临{field}上的平衡与抉择，权衡两端或与人协作会带来进展。",
      rev:"失衡或犹豫不决，提醒你重新校准{field}里的优先次序。",
      detail:"{cn}二象征二元的平衡与初步的联结，关乎{field}中的选择与合作。" },
  3:{ kw:"成长 · 初成 · 协力",
      up:"{field}上的努力初见成果，合作与协力让事情稳步成长。",
      rev:"协作出现分歧或进度延宕，需重新凝聚共识。",
      detail:"{cn}三代表初步的成长与成果，象征{field}里协力创造的阶段。" },
  4:{ kw:"稳定 · 根基 · 巩固",
      up:"{field}进入稳固的阶段，适合巩固既有的成果与根基。",
      rev:"过度保守或停滞不前，小心因固守而错失流动的机会。",
      detail:"{cn}四象征稳定与结构，关乎{field}中根基的建立与守护。" },
  5:{ kw:"冲突 · 挑战 · 考验",
      up:"{field}遭遇一些波折与挑战，这是成长必经的考验，别轻言放弃。",
      rev:"冲突渐趋平息，你正从{field}的低谷中走出来。",
      detail:"{cn}五象征失衡与冲突，是{field}领域的一次磨砺与转机。" },
  6:{ kw:"和谐 · 顺遂 · 互惠",
      up:"{field}迎来和谐与顺遂，给予与回报之间流动着温暖的能量。",
      rev:"付出与回报暂时失衡，留意人际或事务里的小亏欠。",
      detail:"{cn}六象征和谐与平衡的流动，关乎{field}中的互惠与顺境。" },
  7:{ kw:"坚持 · 评估 · 抉择",
      up:"{field}需要你坚守立场、审慎评估，耐心会换来应得的结果。",
      rev:"动摇或防御过度，重新评估{field}里值得坚持的事。",
      detail:"{cn}七象征坚持与评估，是{field}领域考验耐心与判断的关口。" },
  8:{ kw:"推进 · 行动 · 精进",
      up:"{field}的能量加速推进，专注投入与持续精进将带来突破。",
      rev:"进展受阻或方向分散，先理清节奏再发力。",
      detail:"{cn}八象征行动与精进，关乎{field}中迅速推进与专注投入。" },
  9:{ kw:"坚韧 · 将成 · 蓄力",
      up:"{field}已接近圆满，凭着坚韧与积累，你即将收获努力的果实。",
      rev:"临门一脚的疲惫或防备，别在最后阶段松懈或过度紧绷。",
      detail:"{cn}九象征坚韧与将成，是{field}领域积累深厚、接近收成的阶段。" },
  10:{ kw:"圆满 · 周期 · 圆熟",
      up:"{field}走到一个圆满的周期终点，丰盛与责任并存，可安心收束。",
      rev:"负荷过重或周期延宕，学会放下与重新分配。",
      detail:"{cn}十象征周期的圆满与饱和，关乎{field}领域的完成与承担。" }
};

/* 宫廷牌含义模板 */
const COURT_INFO = {
  page:{ kw:"学习 · 消息 · 好奇",
    up:"一位好学者的能量，{field}上有新消息或学习的契机，保持好奇与开放。",
    rev:"分心或拖延，{field}的学习与消息需要更脚踏实地。",
    detail:"{cn}侍从象征{field}领域的学徒与信使，代表好奇、学习与初探。" },
  knight:{ kw:"行动 · 追求 · 前进",
    up:"一股勇往直前的动力，推动你在{field}上主动追求、果断前进。",
    rev:"冲动或方向不定，{field}的行动需要更稳的节奏。",
    detail:"{cn}骑士象征{field}领域的行动者，代表追求、热忱与前进的冲劲。" },
  queen:{ kw:"滋养 · 成熟 · 内在掌握",
    up:"以成熟而包容的姿态驾驭{field}，你善于滋养也懂得自我照顾。",
    rev:"情绪或精力外耗，记得先把{field}里的自己照顾好。",
    detail:"{cn}王后象征{field}领域内在的成熟与掌握，代表滋养、包容与深度。" },
  king:{ kw:"掌控 · 权威 · 成就",
    up:"以成熟的权威掌控{field}，你的经验与决断带来稳定的成就。",
    rev:"掌控欲过强或权威受挑战，柔软一些会更有力量。",
    detail:"{cn}国王象征{field}领域的权威与成就，代表掌控、担当与成熟的领导。" }
};

function fillTpl(tpl, suit){
  const s = SUIT_INFO[suit];
  return tpl.replace(/\{cn\}/g, s.cn).replace(/\{field\}/g, s.field);
}

/* 花色符号（点数牌单元，高约 16px）—— 马赛版画风格，描边厚、细节繁复 */
function pip(suit, cx, cy){
  if(suit === "denier"){
    // 星币：双环 + 内嵌五角刻纹 + 花瓣外缘 + 中心宝石
    return `<g transform="translate(${cx},${cy})">
      <circle r="7" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle r="7" fill="none" stroke="${MC.goldDk}" stroke-width="0.5"/>
      <circle r="5.4" fill="none" stroke="${MC.ink}" stroke-width="0.7"/>
      <circle r="5.4" fill="none" stroke="${MC.cream}" stroke-width="0.3" opacity="0.6"/>
      <path d="M0 -4.6 L1.08 -1.42 4.37 -1.42 1.71 0.54 2.7 3.72 0 1.76 -2.7 3.72 -1.71 0.54 -4.37 -1.42 -1.08 -1.42 Z" fill="none" stroke="${MC.goldDk}" stroke-width="0.6"/>
      <g stroke="${MC.goldDk}" stroke-width="0.5">
        <path d="M0 -7 l-1 1.6 1 0.6 1 -0.6z"/><path d="M0 7 l-1 -1.6 1 -0.6 1 0.6z"/>
        <path d="M-7 0 l1.6 -1 0.6 1 -0.6 1z"/><path d="M7 0 l-1.6 -1 -0.6 1 0.6 1z"/>
      </g>
      <circle r="1.6" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.5"/>
      <circle cx="-0.5" cy="-0.5" r="0.5" fill="${MC.cream}"/></g>`;
  }
  if(suit === "coupe"){
    // 圣杯：杯口透视椭圆 + 杯身浮雕带 + 高足 + 圆座 + 杯沿光泽
    return `<g transform="translate(${cx},${cy})">
      <ellipse cx="0" cy="-7" rx="5.6" ry="1.7" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.9"/>
      <ellipse cx="0" cy="-7" rx="4" ry="1.1" fill="${MC.goldDk}" stroke="none" opacity="0.5"/>
      <path d="M-5.4 -6.8 q5.4 3 10.8 0 l-2 5.4 a3.4 3.4 0 0 1 -6.8 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M-4.7 -4.2 q4.7 2 9.4 0" fill="none" stroke="${MC.goldDk}" stroke-width="0.5"/>
      <circle cx="0" cy="-2.4" r="1" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.4"/>
      <rect x="-1.2" y="1.4" width="2.4" height="4.6" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.7"/>
      <circle cx="0" cy="3.6" r="1" fill="${MC.goldDk}" stroke="${MC.ink}" stroke-width="0.4"/>
      <path d="M-4.6 7 q4.6 -2.6 9.2 0 q-4.6 2.4 -9.2 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.7"/>
      <path d="M-3.6 -6.4 q1.2 1.4 0 2.6" fill="none" stroke="${MC.cream}" stroke-width="0.6" opacity="0.7"/></g>`;
  }
  if(suit === "epee"){
    // 宝剑：双面开刃 + 中脊高光 + 护手缠绕 + 柄头宝石
    return `<g transform="translate(${cx},${cy})">
      <path d="M0 -10 l-2.2 3.6 0 9.4 4.4 0 0 -9.4z" fill="${MC.blueLt}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M0 -9 l-1 2 0 8 2 0 0 -8z" fill="${MC.cream}" stroke="none" opacity="0.55"/>
      <line x1="0" y1="-7.6" x2="0" y2="2.4" stroke="${MC.ink}" stroke-width="0.5"/>
      <line x1="-1.6" y1="-5" x2="-1.6" y2="2.2" stroke="${MC.blue}" stroke-width="0.4" opacity="0.6"/>
      <line x1="-5" y1="4.4" x2="5" y2="4.4" stroke="${MC.gold}" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="-5" y1="4.4" x2="5" y2="4.4" stroke="${MC.ink}" stroke-width="0.5"/>
      <rect x="-0.9" y="4.8" width="1.8" height="3.2" fill="${MC.fleshDk}" stroke="${MC.ink}" stroke-width="0.4"/>
      <path d="M-0.9 5.6 h1.8 M-0.9 6.6 h1.8" stroke="${MC.ink}" stroke-width="0.3"/>
      <circle cx="0" cy="8.8" r="1.9" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.7"/>
      <circle cx="0" cy="8.8" r="0.7" fill="${MC.red}"/></g>`;
  }
  // baton 权杖：木纹结节 + 顶端嫩芽叶 + 缠藤
  return `<g transform="translate(${cx},${cy})">
    <rect x="-1.9" y="-8" width="3.8" height="16" rx="1.7" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1"/>
    <line x1="-0.4" y1="-7" x2="-0.4" y2="7" stroke="${MC.cream}" stroke-width="0.4" opacity="0.5"/>
    <g stroke="${MC.ink}" stroke-width="0.4" fill="none">
      <path d="M-1.9 -3.4 q1.9 -1.4 3.8 0"/><path d="M-1.9 0.6 q1.9 -1.4 3.8 0"/><path d="M-1.9 4.6 q1.9 -1.4 3.8 0"/>
    </g>
    <circle cx="0" cy="-3.4" r="0.6" fill="${MC.ink}"/><circle cx="0" cy="4.6" r="0.6" fill="${MC.ink}"/>
    <path d="M0 -8 q-3.2 -1 -3.6 -4 q3 0.6 3.6 4z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="0.7"/>
    <path d="M0 -8 q3.2 -1 3.6 -4 q-3 0.6 -3.6 4z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="0.7"/>
    <ellipse cx="0" cy="-8" rx="2.4" ry="2.8" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.8"/>
    <ellipse cx="0" cy="8" rx="2.4" ry="2.8" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.8"/>
    <circle cx="-0.6" cy="-8.6" r="0.6" fill="${MC.cream}" opacity="0.7"/></g>`;
}

/* 点数牌排列坐标（对称布局） */
const PIPS = {
  1:[[50,72]],
  2:[[50,50],[50,96]],
  3:[[50,44],[50,72],[50,100]],
  4:[[40,52],[60,52],[40,96],[60,96]],
  5:[[40,50],[60,50],[50,72],[40,98],[60,98]],
  6:[[40,48],[60,48],[40,72],[60,72],[40,98],[60,98]],
  7:[[40,46],[60,46],[40,68],[60,68],[50,86],[40,106],[60,106]],
  8:[[40,44],[60,44],[40,64],[60,64],[40,86],[60,86],[40,108],[60,108]],
  9:[[38,46],[50,46],[62,46],[38,72],[50,72],[62,72],[38,98],[50,98],[62,98]],
  10:[[40,42],[60,42],[40,58],[60,58],[40,74],[60,74],[40,90],[60,90],[40,106],[60,106]]
};

/* 宫廷牌牌面 */
function courtSvg(suit, rank){
  const c = SUIT_INFO[suit].col;
  let inner = "";
  if(rank === "knight"){
    // 骑士：策马前行（马鬃、马具、缰绳细节）
    inner = `
      <path d="M22 74 q26 -12 52 0 l-2 30 -9 0 -2 -18 -26 0 -2 18 -9 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.3"/>
      <g stroke="${MC.ink}" stroke-width="0.5"><path d="M30 76 v24"/><path d="M58 76 v22"/></g>
      <path d="M22 74 q-9 -8 -13 -5 q3 6 8 8 l-4 2 q4 4 9 2z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M13 70 l-3 -5 4 1z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="0.9"/>
      <circle cx="14" cy="71" r="0.7" fill="${MC.ink}"/>
      <g stroke="${c}" stroke-width="1.1" fill="none"><path d="M16 73 q-3 4 -2 9"/><path d="M20 72 q-2 5 -1 10"/></g>
      <path d="M22 74 q14 -4 14 8" fill="none" stroke="${MC.fleshDk}" stroke-width="0.7"/>
      <circle cx="50" cy="34" r="7" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="47.6" cy="33.5" rx="0.8" ry="1" fill="${MC.ink}"/><ellipse cx="52.4" cy="33.5" rx="0.8" ry="1" fill="${MC.ink}"/>
      <path d="M47 37 q3 1.5 6 0" fill="none" stroke="${MC.ink}" stroke-width="0.7"/>
      <path d="M42 30 q8 -5 16 0 l-2 -7 -6 3 -6 -3z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M44 27 l1 -5 1 4 z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.5"/>
      <path d="M43 41 q7 -4 14 0 l3 24 -20 0z" fill="${c}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M50 41 v24" stroke="${MC.ink}" stroke-width="0.4" opacity="0.5"/>
      ${pip(suit,72,52)}`;
  } else if(rank === "page"){
    // 侍从：站立少年（五官、衣袍褶皱）
    inner = `
      <path d="M40 108 H60" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="50" cy="40" r="8.5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="46.8" cy="39.5" rx="0.9" ry="1.2" fill="${MC.ink}"/><ellipse cx="53.2" cy="39.5" rx="0.9" ry="1.2" fill="${MC.ink}"/>
      <path d="M46 43.5 q4 2 8 0" fill="none" stroke="${MC.ink}" stroke-width="0.8"/>
      <path d="M44 36 q2 -1.5 4 -0.5 M52 35.5 q2 -1 4 0.5" fill="none" stroke="${MC.ink}" stroke-width="0.6"/>
      <path d="M41 33 q9 -5 18 0 l-2 -7 -7 3 -7 -3z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M48 27 l2 -5 2 5z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.5"/>
      <path d="M40 49 q10 -5 20 0 l3 56 -26 0z" fill="${c}" stroke="${MC.ink}" stroke-width="1.2"/>
      <g stroke="${MC.ink}" stroke-width="0.4" opacity="0.55" fill="none"><path d="M45 56 q5 -2 10 0"/><path d="M44 70 q6 -2 12 0"/><path d="M43 86 q7 -2 14 0"/></g>
      ${pip(suit,50,80)}`;
  } else {
    // 王后 / 国王：端坐于宝座（王冠刻面、五官、宝座纹饰）
    const king = (rank === "king");
    const crown = king
      ? `<path d="M38 32 l3 -10 4 7 5 -9 5 9 4 -7 3 10z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
         <g fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.4"><circle cx="42" cy="25" r="1"/><circle cx="50" cy="23" r="1.2"/><circle cx="58" cy="25" r="1"/></g>
         <path d="M38 32 h24" stroke="${MC.goldDk}" stroke-width="0.6"/>`
      : `<path d="M40 33 q10 -6 20 0 l-3 -8 -7 4 -7 -4z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
         <circle cx="50" cy="25" r="1.4" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.4"/>
         <path d="M40 33 h20" stroke="${MC.goldDk}" stroke-width="0.6"/>`;
    const scepter = king
      ? `<line x1="70" y1="46" x2="70" y2="104" stroke="${MC.fleshDk}" stroke-width="2"/><circle cx="70" cy="44" r="3.2" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/><path d="M70 41 l-2 3 4 0z" fill="${MC.goldDk}"/>`
      : `<line x1="70" y1="58" x2="70" y2="100" stroke="${MC.fleshDk}" stroke-width="1.6"/><path d="M70 56 l-2.6 -2.6 a3.6 3.6 0 0 1 5.2 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.8"/>`;
    inner = `
      <rect x="26" y="50" width="48" height="58" rx="3" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.2"/>
      <g fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.7"><path d="M27 50 l3 -7 3 7z"/><path d="M67 50 l3 -7 3 7z"/></g>
      <line x1="30" y1="58" x2="70" y2="58" stroke="${MC.goldDk}" stroke-width="0.6"/>
      <path d="M36 54 q14 -6 28 0 l4 54 -36 0z" fill="${c}" stroke="${MC.ink}" stroke-width="1.3"/>
      <path d="M50 56 v50" stroke="${MC.ink}" stroke-width="0.4" opacity="0.5"/>
      <g stroke="${MC.ink}" stroke-width="0.4" opacity="0.5" fill="none"><path d="M40 74 q10 -3 20 0"/><path d="M39 90 q11 -3 22 0"/></g>
      <circle cx="50" cy="42" r="8.5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="46.6" cy="41.5" rx="0.9" ry="1.2" fill="${MC.ink}"/><ellipse cx="53.4" cy="41.5" rx="0.9" ry="1.2" fill="${MC.ink}"/>
      <path d="M46 45.5 q4 2 8 0" fill="none" stroke="${MC.ink}" stroke-width="0.8"/>
      ${king?`<path d="M44 48 q6 5 12 0 l-1 5 -10 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="0.7"/>`:''}
      ${crown}
      ${scepter}
      ${pip(suit,32,80)}`;
  }
  return frame(inner, "", `${COURT_FR[rank]}·DE·${SUIT_INFO[suit].fr}`);
}

/* 生成数字牌对象 */
function makeNumberCard(suit, n){
  const s = SUIT_INFO[suit], r = RANK_INFO[n];
  return {
    name: s.cn + RANK_NAME[n],
    arcana: "小阿卡那 · " + s.cn,
    kw: r.kw,
    up: fillTpl(r.up, suit),
    rev: fillTpl(r.rev, suit),
    detail: fillTpl(r.detail, suit),
    svg: () => frame(
      PIPS[n].map(p => pip(suit, p[0], p[1])).join(""),
      ROMAN[n],
      `${ROMAN[n]}·DE·${s.fr}`
    )
  };
}

/* 生成宫廷牌对象 */
function makeCourtCard(suit, rank){
  const s = SUIT_INFO[suit], r = COURT_INFO[rank];
  return {
    name: s.cn + COURT_NAME[rank],
    arcana: "小阿卡那 · " + s.cn,
    kw: r.kw,
    up: fillTpl(r.up, suit),
    rev: fillTpl(r.rev, suit),
    detail: fillTpl(r.detail, suit),
    svg: () => courtSvg(suit, rank)
  };
}

/* 组装 56 张小阿卡那 */
const MINORS = [];
SUIT_ORDER.forEach(suit => {
  for(let n = 1; n <= 10; n++) MINORS.push(makeNumberCard(suit, n));
  ["page","knight","queen","king"].forEach(rank => MINORS.push(makeCourtCard(suit, rank)));
});

/* ===== 完整 78 张牌库 ===== */
const TAROT = MAJORS.concat(MINORS);

/* ===== 牌阵定义 ===== */
const SPREADS = [
  { id:"daily", name:"每日一牌", ic:'<svg class="ico"><use href="#i-moon"/></svg>', desc:"当下指引 · 1张", positions:["当下指引"] },
  { id:"time",  name:"时间之流", ic:'<svg class="ico"><use href="#i-hourglass"/></svg>', desc:"过去/现在/未来 · 3张", positions:["过去","现在","未来"] },
  { id:"choice",name:"抉择之路", ic:'<svg class="ico"><use href="#i-fork"/></svg>', desc:"选项A/选项B/建议 · 3张", positions:["选项 A","选项 B","建议"] },
  { id:"love",  name:"恋人之心", ic:'<svg class="ico"><use href="#i-hearts"/></svg>', desc:"关系深度分析 · 5张", positions:["你","对方","关系","阻碍","结果"] },
  { id:"celtic",name:"凯尔特十字", ic:'<svg class="ico"><use href="#i-cross"/></svg>', desc:"综合全面剖析 · 10张", positions:["现状","阻碍","根基","过去","目标","未来","自我","环境","希望/恐惧","结果"] }
];

/* ===== 能量关系/幸运提示词库 ===== */
const ENERGY_HINTS = [
  "整体牌面能量流动顺畅，提示你顺势而为，把握当下的节奏。",
  "牌阵呈现先抑后扬的走势，跨过眼前的关卡，前方就是开阔。",
  "几张牌彼此呼应，提醒你内在与外在需要更协调一致。",
  "能量略有起伏，给自己一点缓冲的时间，沉淀后再行动会更好。"
];
const LUCKY = {
  colors:["金","靛蓝","月白","暖橘","深紫","祖母绿"],
  words:["坦诚","勇气","耐心","信任","放下","专注","温柔"],
  times:["清晨","黄昏","周日","满月夜","本周内","下一个新月"]
};

/* ===== 塔罗入门知识（百科首页） ===== */
const WIKI_INTRO = [
  { t:"什么是塔罗牌", c:"塔罗牌是一套共 78 张的图像卡牌，起源于 15 世纪的欧洲，最初用于游戏，后逐渐发展为自我探索与心灵指引的工具。它通过象征性的图像，映照我们内心的状态与潜意识。" },
  { t:"大阿卡那与小阿卡那", c:"78 张牌分为两部分：22 张「大阿卡那」描绘人生重大主题与灵魂成长阶段（如愚人、恋人、太阳）；56 张「小阿卡那」分为权杖（火·行动）、圣杯（水·情感）、宝剑（风·思想）、星币（土·物质）四种花色，每花色含 Ace 到 10 与侍从、骑士、王后、国王四张宫廷牌，对应日常生活的细节。" },
  { t:"马赛塔罗", c:"本套牌面采用经典的「马赛塔罗（Tarot de Marseille）」风格——起源于法国南部的木刻版画传统，以厚重的黑色描边、平涂的朱红、群青、明黄等纯色，以及质朴对称的构图著称。其小阿卡那多以花色符号对称排列的「点数牌」呈现，是流传最广、最具历史感的塔罗体系之一。" },
  { t:"正位与逆位", c:"牌面正立为「正位」，通常表达该牌能量的正向流动；牌面颠倒为「逆位」，可能代表能量受阻、内化或过度。逆位并非「坏」，而是提醒我们换一个角度看待问题。" },
  { t:"如何提出好问题", c:"塔罗擅长回答「开放式」而非「是非题」。把「我会复合吗」换成「我该如何面对这段关系」，聚焦在自己能掌控的部分，会得到更有启发的指引。" },
  { t:"塔罗的正确心态", c:"塔罗揭示的是「当下能量的趋势」，而非不可改变的命运。它是一面镜子，帮助你更清晰地认识自己，最终的选择权始终在你手中。" }
];


/* ============================================================
   共用牌背 —— 马赛塔罗风格：正面圆月 + 叠加半脸侧影（繁复版画）
   返回完整 <svg viewBox="0 0 100 150">，三处牌背统一复用
   ============================================================ */
function cardBackSVG(){
  const G='#e8c46a', Gd='#b9882a', Gdk='#8a6418', INK='#1d1838', NAVY='#221d4a', NAVY2='#15123a', RED='#b23a2b';
  // 放射光芒（围绕圆月一圈）
  let rays='';
  for(let i=0;i<24;i++){
    const a=i*15*Math.PI/180, r1=33, r2=(i%2? 42:39);
    const x1=(50+Math.cos(a)*r1).toFixed(2), y1=(66+Math.sin(a)*r1).toFixed(2);
    const x2=(50+Math.cos(a)*r2).toFixed(2), y2=(66+Math.sin(a)*r2).toFixed(2);
    rays+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${G}" stroke-width="${i%2?0.8:1.4}" opacity="0.85"/>`;
  }
  // 散落星点 / 露珠
  const stars=[[18,28,1.6],[82,30,1.4],[26,118,1.3],[76,116,1.5],[14,74,1.1],[86,70,1.2],[50,16,1.8],[50,120,1.5]];
  let star='';
  stars.forEach(([x,y,r])=>{
    star+=`<path d="M${x} ${y-r*2} l${r*0.5} ${r*1.5} ${r*1.5} ${r*0.5} -${r*1.5} ${r*0.5} -${r*0.5} ${r*1.5} -${r*0.5} -${r*1.5} -${r*1.5} -${r*0.5} ${r*1.5} -${r*0.5}z" fill="${G}" opacity="0.9"/>`;
  });
  return `<svg class="card-back-svg" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="cbBg" cx="50%" cy="44%" r="70%">
        <stop offset="0%" stop-color="#2c2658"/><stop offset="70%" stop-color="${NAVY}"/><stop offset="100%" stop-color="${NAVY2}"/>
      </radialGradient>
      <radialGradient id="cbMoon" cx="42%" cy="38%" r="68%">
        <stop offset="0%" stop-color="#fbe7b0"/><stop offset="55%" stop-color="${G}"/><stop offset="100%" stop-color="${Gd}"/>
      </radialGradient>
      <pattern id="cbGrid" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0 H10 M0 0 V10" stroke="${G}" stroke-width="0.4" opacity="0.18"/>
      </pattern>
    </defs>
    <rect width="100" height="150" fill="url(#cbBg)"/>
    <rect width="100" height="150" fill="url(#cbGrid)"/>
    <!-- 外框 -->
    <rect x="3" y="3" width="94" height="144" fill="none" stroke="${G}" stroke-width="2" rx="4"/>
    <rect x="6" y="6" width="88" height="138" fill="none" stroke="${Gd}" stroke-width="0.6" rx="3"/>
    <g stroke-linejoin="round" stroke-linecap="round">
      ${rays}
      <!-- 圆月盘 -->
      <circle cx="50" cy="66" r="30" fill="url(#cbMoon)" stroke="${Gdk}" stroke-width="1.4"/>
      <circle cx="50" cy="66" r="30" fill="none" stroke="${G}" stroke-width="0.5"/>
      <!-- 月面斑块（环形坑纹，点缀于月盘四周作为肌理） -->
      <g fill="${Gd}" opacity="0.2">
        <circle cx="68" cy="50" r="2.4"/><circle cx="72" cy="62" r="1.6"/><circle cx="30" cy="52" r="1.8"/><circle cx="28" cy="66" r="1.3"/>
      </g>
      <!-- ===== 月中央：埃及猫（Bastet 神猫）正面端坐 · 纯净剪影（无五官） =====
           瘦长挺拔、英气：高直双尖耳 + 修长收腰的身躯 + 细长前腿 + 优雅卷尾。 -->
      <!-- 身后淡淡暗晕 -->
      <ellipse cx="50" cy="71" rx="13" ry="24" fill="${NAVY2}" opacity="0.16"/>
      <!-- 优雅卷尾：贴身右侧、尾尖内收上扬（先画，置于身后） -->
      <path d="M58 90 C 67 90, 70 80, 66.5 74 C 64.5 70.5, 60.5 71, 60 74.5"
            fill="none" stroke="${G}" stroke-width="2.2" stroke-linecap="round"/>
      <!-- 整猫闭合剪影：高尖耳 → 窄脸 → 收窄脖颈 → 修长身躯 → 坐地 -->
      <path d="M50 52.5
               C 47.2 52.5, 45.4 51, 44.6 48
               L 43.4 40
               C 43.2 38.6, 43.9 38.2, 44.8 39.2
               C 46.4 41, 47.8 43.4, 48.6 46.2
               C 49.2 46, 50.8 46, 51.4 46.2
               C 52.2 43.4, 53.6 41, 55.2 39.2
               C 56.1 38.2, 56.8 38.6, 56.6 40
               L 55.4 48
               C 54.6 51, 52.8 52.5, 50 52.5
               C 53.6 53, 55.8 55.4, 56.6 59.5
               C 57.6 65, 58 73, 57.4 80.5
               C 57.1 84.5, 57.4 87.8, 58.2 90.6
               C 58.5 91.6, 57.8 92, 56.8 91.8
               C 54 91.2, 50.5 91, 47.5 91.4
               L 43.6 91.4
               C 42.6 91.4, 42.2 90.8, 42.4 89.6
               C 43 86, 43.2 81, 43.1 75.5
               C 43 69, 43.4 63, 44.4 58.5
               C 45.1 55.2, 46.6 53.2, 50 52.5 Z"
            fill="${G}" stroke="${Gdk}" stroke-width="0.8" stroke-linejoin="round"/>

      <!-- 月顶星点 -->
      <circle cx="64" cy="44" r="1.4" fill="${G}" stroke="${Gdk}" stroke-width="0.5"/>
      ${star}








    </g>
  </svg>`;
}

