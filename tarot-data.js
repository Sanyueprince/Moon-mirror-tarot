/* ========= 月镜言 · 塔罗牌库与解读数据（马赛塔罗风格） =========
   每张牌：name 牌名 / arcana 类别 / kw 关键词 / up 正位 / rev 逆位 / detail 象征解析 / svg 牌面
   svg() 返回完整 <svg viewBox="0 0 100 150">。

   牌面采用 Tarot de Marseille（马赛塔罗）经典版画风格：
   - 米白/羊皮纸底色 + 粗黑双线边框
   - 平涂五色调色板：朱红 / 墨绿 / 金黄 / 淡蓝 / 肉粉，黑色描边
   - 顶部罗马数字、底部牌名横幅（法文）
*/

/* 马赛风格调色板 */
const MC = {
  ink:'#1c1a17',     // 描边黑
  paper:'#fbf4e2',   // 牌面底（羊皮纸）
  cream:'#fffdf4',   // 高光白
  red:'#c5402b',     // 朱红
  green:'#2f7d5e',   // 墨绿/青绿
  gold:'#e8b53a',    // 金黄
  blue:'#a9c7d4',    // 淡蓝
  flesh:'#f0cba0',   // 肉粉
  fleshDk:'#d9a06f'  // 肤色阴影
};

/* 通用底框：羊皮纸底 + 粗黑双线边框 + 顶部罗马数字 + 底部牌名横幅 */
function frame(inner, roman, label){
  const top = roman
    ? `<text x="50" y="17" font-size="12" text-anchor="middle" fill="${MC.ink}" font-family="Georgia,'Times New Roman',serif" font-weight="700" letter-spacing="1.5">${roman}</text>`
    : '';
  const bottom = label
    ? `<line x1="9" y1="132.5" x2="91" y2="132.5" stroke="${MC.ink}" stroke-width="0.8"/>
       <text x="50" y="142.5" font-size="7" text-anchor="middle" fill="${MC.ink}" font-family="Georgia,'Times New Roman',serif" font-weight="700" letter-spacing="1">${label}</text>`
    : '';
  return `<svg class="card-svg" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="150" fill="${MC.paper}"/>
    <rect x="3" y="3" width="94" height="144" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="2.4" rx="1"/>
    <rect x="6" y="6" width="88" height="138" fill="none" stroke="${MC.ink}" stroke-width="0.8"/>
    ${top}
    <g stroke-linejoin="round" stroke-linecap="round">${inner}</g>
    ${bottom}
  </svg>`;
}

const TAROT = [
  /* ===== 大阿卡那 ===== */
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
    name:"力量", arcana:"大阿卡那 · XI", kw:"勇气 · 温柔 · 内在力量",
    up:"以柔克刚。用耐心与善意驯服内心的躁动，你比想象中更强大。",
    rev:"自我怀疑或情绪失控正在消耗你，先与内在的恐惧温柔和解。",
    detail:"身着白袍、头戴花环的女子温柔地合上雄狮之口，头顶悬着无限符号。她以慈爱而非暴力驯服野性，象征内在的勇气、耐心与精神力量。",
    svg:()=>frame(`
      <path d="M40 24 q8 8 16 0 q0 -6 -8 -6 q-8 0 -8 6z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="42" cy="40" r="8" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M34 48 q8 -5 16 0 l3 50 -22 0z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M34 48 l-4 20 5 2z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <ellipse cx="64" cy="86" rx="17" ry="13" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle cx="74" cy="78" r="10" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.2"/>
      <g fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.8"><path d="M66 70 l-4 -5 5 3z"/><path d="M82 70 l4 -5 -5 3z"/></g>
      <circle cx="71" cy="77" r="1.4" fill="${MC.ink}"/><circle cx="78" cy="77" r="1.4" fill="${MC.ink}"/>
      <path d="M70 84 q4 3 8 0" fill="none" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M50 72 q8 4 14 8" fill="none" stroke="${MC.flesh}" stroke-width="3" stroke-linecap="round"/>
      <path d="M10 120 H90" stroke="${MC.ink}" stroke-width="1"/>
    `, "XI", "LA·FORCE")
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
      <path d="M30 106 q-2 -12 3 -16 q1.5 -3 3 0 q3.5 7 1 16z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M70 106 q2 -12 -3 -16 q-1.5 -3 -3 0 q-3.5 7 -1 16z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
      <ellipse cx="50" cy="118" rx="18" ry="7" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="50" cy="116" rx="5" ry="3" fill="${MC.red}" stroke="${MC.ink}" stroke-width="0.9"/>
      <path d="M45 116 l-3 2.5 M55 116 l3 2.5 M47 114 l-1 -2.5 M53 114 l1 -2.5" stroke="${MC.ink}" stroke-width="0.9"/>
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

  /* ===== 小阿卡那 ===== */
  {
    name:"星币三", arcana:"小阿卡那 · 星币", kw:"协作 · 用心 · 打磨",
    up:"你的努力与用心正在被看见。与他人协作共建，将打下坚实的基础。",
    rev:"协作出现分歧或敷衍，提醒你重视细节、重新投入真诚。",
    detail:"年轻的石匠在修道院中展示作品，僧侣与设计师手持图纸与他商讨。三枚星币嵌于拱顶。象征技艺、协作、用心打磨与初步的成就认可。",
    svg:()=>frame(`
      <path d="M18 96 V58 Q50 24 82 58 V96 Z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.6"/>
      <path d="M26 96 V60 Q50 32 74 60 V96 Z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="1"/>
      <g stroke="${MC.ink}" stroke-width="0.8" opacity="0.7"><path d="M50 34 V60"/><path d="M36 39 L42 60"/><path d="M64 39 L58 60"/></g>
      ${coin(50,46,7)}
      ${coin(36,70,6)}
      ${coin(64,70,6)}
      <path d="M22 112 H78" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="50" cy="92" r="5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M44 100 q6 -6 12 0 l1 12 -14 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.1"/>
    `, "III", "III·DE·DENIERS")
  },
  {
    name:"圣杯二", arcana:"小阿卡那 · 圣杯", kw:"结合 · 互信 · 情感连接",
    up:"两颗心的真诚连接，象征和谐的伴侣关系或合作，彼此滋养。",
    rev:"关系失衡或信任受损，需要修复沟通，找回平等与尊重。",
    detail:"一男一女举杯相对，杯上盘绕着赫尔墨斯之杖与狮首。象征平等的情感交流、承诺、伙伴关系与心灵的相互滋养。",
    svg:()=>frame(`
      <path d="M14 116 H86" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="32" cy="54" r="7" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M25 64 q7 -6 14 0 l2 40 -18 0z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle cx="68" cy="54" r="7" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M61 64 q7 -6 14 0 l2 40 -18 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.2"/>
      ${cup(42,78)}
      ${cup(58,78)}
      <path d="M50 48 l-5 -5 a3 3 0 0 1 5 -1.6 a3 3 0 0 1 5 1.6z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1"/>
      <path d="M44 50 q6 -10 12 0 q-6 6 -12 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
    `, "II", "II·DE·COVPE")
  },
  {
    name:"宝剑三", arcana:"小阿卡那 · 宝剑", kw:"心碎 · 释放 · 真相",
    up:"难免的伤痛与失落，但痛过之后是清明。允许自己哀伤，再重新出发。",
    rev:"你正从伤痛中复原，愿意原谅与放下，乌云即将散去。",
    detail:"三柄长剑穿透一颗红心，背景是阴云密布的暴雨天空。象征心碎、悲伤、被真相刺痛，以及哀伤之后所带来的清明与释放。",
    svg:()=>frame(`
      <g fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1"><ellipse cx="30" cy="34" rx="14" ry="7"/><ellipse cx="68" cy="38" rx="15" ry="7.5"/></g>
      <path d="M50 54 q-18 7 -20 30 q20 10 20 10 q0 0 20 -10 q-2 -23 -20 -30z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.4"/>
      <g stroke="${MC.ink}" stroke-width="1"><line x1="50" y1="44" x2="50" y2="104" stroke-width="3.6" stroke="${MC.blue}"/><line x1="30" y1="50" x2="70" y2="94" stroke-width="3.6" stroke="${MC.blue}"/><line x1="70" y1="50" x2="30" y2="94" stroke-width="3.6" stroke="${MC.blue}"/></g>
      <g stroke="${MC.ink}" stroke-width="1.1"><line x1="50" y1="44" x2="50" y2="104"/><line x1="30" y1="50" x2="70" y2="94"/><line x1="70" y1="50" x2="30" y2="94"/></g>
      <g fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.8"><circle cx="50" cy="42" r="2.6"/><circle cx="29" cy="48" r="2.6"/><circle cx="71" cy="48" r="2.6"/></g>
      <g stroke="${MC.blue}" stroke-width="1.4"><line x1="22" y1="108" x2="26" y2="118"/><line x1="42" y1="110" x2="46" y2="120"/><line x1="58" y1="110" x2="62" y2="120"/><line x1="76" y1="108" x2="80" y2="118"/></g>
    `, "III", "III·DESPÉE")
  },
  {
    name:"权杖王牌", arcana:"小阿卡那 · 权杖", kw:"灵感 · 行动 · 新机会",
    up:"一股全新的创造力与热情涌现，大胆开始，火花将燃成燎原之势。",
    rev:"动力受阻或方向不明，先找回最初的热情，再重新点火。",
    detail:"云中伸出一只手，紧握一根新生嫩芽的权杖，叶片纷纷飘落。象征灵感的火花、创造的冲动、全新的机会与原始的生命动力。",
    svg:()=>frame(`
      <rect x="46" y="28" width="8" height="86" rx="3" fill="${MC.fleshDk}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M46 40 q-7 -5 -11 -13 M54 36 q7 -5 11 -13 M50 30 q0 -8 0 -14" stroke="${MC.ink}" stroke-width="1.4" fill="none"/>
      <g fill="${MC.green}" stroke="${MC.ink}" stroke-width="1"><ellipse cx="34" cy="28" rx="5" ry="9" transform="rotate(-30 34 28)"/><ellipse cx="66" cy="24" rx="5" ry="9" transform="rotate(30 66 24)"/><ellipse cx="50" cy="17" rx="5" ry="9"/></g>
      <g fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.9"><ellipse cx="24" cy="58" rx="3" ry="6" transform="rotate(-40 24 58)"/><ellipse cx="76" cy="54" rx="3" ry="6" transform="rotate(40 76 54)"/><ellipse cx="22" cy="86" rx="3" ry="6" transform="rotate(-40 22 86)"/><ellipse cx="78" cy="90" rx="3" ry="6" transform="rotate(40 78 90)"/></g>
      <path d="M30 100 q20 -8 40 0 V120 H30z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/>
      <ellipse cx="50" cy="100" rx="12" ry="6" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.2"/>
      <path d="M40 100 q10 -6 20 0" fill="none" stroke="${MC.ink}" stroke-width="1.1"/>
    `, "I", "AS·DE·BASTON")
  },
  {
    name:"圣杯十", arcana:"小阿卡那 · 圣杯", kw:"圆满 · 幸福 · 家庭",
    up:"情感的圆满与家庭的和乐。你所珍视的关系正绽放出温暖的光彩。",
    rev:"表面和谐下藏着小裂痕，用心经营，幸福需要持续地呵护。",
    detail:"一对夫妇张开双臂仰望天空，彩虹中浮现十只金杯，孩子在一旁欢快玩耍，远处是温馨的家园。象征圆满的幸福、家庭的和谐与情感的丰盈。",
    svg:()=>frame(`
      <path d="M16 48 Q50 22 84 48" fill="none" stroke="${MC.red}" stroke-width="3"/>
      <path d="M16 52 Q50 26 84 52" fill="none" stroke="${MC.gold}" stroke-width="3"/>
      <path d="M16 56 Q50 30 84 56" fill="none" stroke="${MC.green}" stroke-width="3"/>
      <g fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.7"><path d="M26 40 l5 0 -1 6 -3 0z"/><path d="M37 34 l5 0 -1 6 -3 0z"/><path d="M48 32 l5 0 -1 6 -3 0z"/><path d="M59 34 l5 0 -1 6 -3 0z"/><path d="M70 40 l5 0 -1 6 -3 0z"/></g>
      <path d="M14 118 H86" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="38" cy="74" r="6" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.1"/><path d="M32 82 q6 -5 12 0 l1 32 -14 0z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="62" cy="74" r="6" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.1"/><path d="M56 82 q6 -5 12 0 l1 32 -14 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.1"/>
      <circle cx="22" cy="98" r="4" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1"/><path d="M19 102 h6 l1 14 -8 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1"/>
      <circle cx="80" cy="100" r="3.6" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1"/><path d="M77 104 h6 l1 12 -8 0z" fill="${MC.green}" stroke="${MC.ink}" stroke-width="1"/>
    `, "X", "X·DE·COVPE")
  },
  {
    name:"圣杯八", arcana:"小阿卡那 · 圣杯", kw:"离开 · 追寻 · 转身",
    up:"你已意识到当前的不再适合自己，鼓起勇气转身，去追寻更深的意义。",
    rev:"在去留之间徘徊不定，听从内心，别因留恋而困住自己。",
    detail:"一个披红袍的人拄杖背对八只排列整齐的金杯，向月夜中的群山走去。象征主动的放下、对更高意义的追寻，以及离开舒适区的勇气。",
    svg:()=>frame(`
      <path d="M10 100 L32 88 L60 100 L90 86 V122 H10z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.2"/>
      <circle cx="44" cy="34" r="12" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.4"/>
      <path d="M44 22 a12 12 0 0 0 0 24 a9 9 0 0 1 0 -24z" fill="${MC.cream}" stroke="${MC.ink}" stroke-width="0.8"/>
      ${cupSm(26,90)}${cupSm(36,90)}${cupSm(46,90)}
      ${cupSm(31,80)}${cupSm(41,80)}
      <circle cx="72" cy="60" r="5" fill="${MC.flesh}" stroke="${MC.ink}" stroke-width="1.1"/>
      <path d="M65 68 q7 -6 14 0 l3 48 -20 0z" fill="${MC.red}" stroke="${MC.ink}" stroke-width="1.2"/>
      <line x1="82" y1="62" x2="82" y2="116" stroke="${MC.fleshDk}" stroke-width="2"/>
    `, "VIII", "VIII·DE·COVPE")
  },
  {
    name:"星币十", arcana:"小阿卡那 · 星币", kw:"富足 · 传承 · 稳定",
    up:"长久的富足与稳定。家业、财富与传承的圆满，回报你过往的耕耘。",
    rev:"对稳定的过度执着或财务的小波动，提醒你平衡物质与情感。",
    detail:"白发长者坐于拱门下，身旁有伴侣、孩童与忠犬，十枚星币如生命之树般排布，背景是繁荣的家宅。象征财富的积累、家族传承与长久的稳定。",
    svg:()=>frame(`
      <path d="M16 46 V120 H36 V46 Q26 38 16 46z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.3"/><rect x="19" y="52" width="14" height="18" fill="${MC.green}" stroke="${MC.ink}" stroke-width="0.9"/>
      <path d="M64 46 V120 H84 V46 Q74 38 64 46z" fill="${MC.blue}" stroke="${MC.ink}" stroke-width="1.3"/><rect x="67" y="52" width="14" height="18" fill="${MC.green}" stroke="${MC.ink}" stroke-width="0.9"/>
      ${coin(42,40,4.4)}${coin(58,40,4.4)}${coin(50,52,4.4)}
      ${coin(40,62,4.4)}${coin(60,62,4.4)}${coin(50,74,4.4)}
      ${coin(42,86,4.4)}${coin(58,86,4.4)}
      ${coin(46,100,4.4)}${coin(58,102,4.4)}
      <path d="M16 120 H84" stroke="${MC.ink}" stroke-width="1"/>
    `, "X", "X·DE·DENIERS")
  }
];

/* ===== 小图元：星币与圣杯（马赛风格） ===== */
function coin(cx,cy,r){
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.55}" fill="none" stroke="${MC.ink}" stroke-width="0.8"/>
    <circle cx="${cx}" cy="${cy}" r="${r*0.18}" fill="${MC.red}"/>`;
}
function cup(cx,cy){
  return `<path d="M${cx-6} ${cy-8} h12 l-2 9 a4 4 0 0 1 -8 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="1.1"/>
    <rect x="${cx-1.4}" y="${cy+1}" width="2.8" height="9" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.8"/>
    <rect x="${cx-5}" y="${cy+10}" width="10" height="3" rx="1" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.9"/>`;
}
function cupSm(cx,cy){
  return `<path d="M${cx-3.5} ${cy-4} h7 l-1 6 a2.4 2.4 0 0 1 -5 0z" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.9"/>
    <rect x="${cx-3}" y="${cy+5}" width="6" height="2" rx="0.6" fill="${MC.gold}" stroke="${MC.ink}" stroke-width="0.7"/>`;
}


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
  { t:"大阿卡那与小阿卡那", c:"78 张牌分为两部分：22 张「大阿卡那」描绘人生重大主题与灵魂成长阶段（如愚人、恋人、太阳）；56 张「小阿卡那」分为权杖（火·行动）、圣杯（水·情感）、宝剑（风·思想）、星币（土·物质）四种花色，对应日常生活的细节。" },
  { t:"马赛塔罗", c:"本套牌面采用经典的「马赛塔罗（Tarot de Marseille）」风格——起源于法国南部的木刻版画传统，以厚重的黑色描边、平涂的朱红、群青、明黄等纯色，以及质朴对称的构图著称，是流传最广、最具历史感的塔罗体系之一。" },
  { t:"正位与逆位", c:"牌面正立为「正位」，通常表达该牌能量的正向流动；牌面颠倒为「逆位」，可能代表能量受阻、内化或过度。逆位并非「坏」，而是提醒我们换一个角度看待问题。" },
  { t:"如何提出好问题", c:"塔罗擅长回答「开放式」而非「是非题」。把「我会复合吗」换成「我该如何面对这段关系」，聚焦在自己能掌控的部分，会得到更有启发的指引。" },
  { t:"塔罗的正确心态", c:"塔罗揭示的是「当下能量的趋势」，而非不可改变的命运。它是一面镜子，帮助你更清晰地认识自己，最终的选择权始终在你手中。" }
];
