/* ========= 月镜言 · 塔罗牌库与解读数据 =========
   每张牌：name 牌名 / arcana 类别 / kw 关键词 / up 正位 / rev 逆位 / detail 象征解析 / svg 牌面
   svg() 返回完整 <svg viewBox="0 0 100 150">。
*/

/* 通用底框：渐变背景 + 描金双边框 + 暖金光晕 + 四角描金装饰 */
let _fid = 0;
function frame(inner, c1, c2){
  const id = 'fg' + (_fid++);
  return `<svg class="card-svg" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2||c1}"/></linearGradient>
      <radialGradient id="${id}v" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>
    </defs>
    <rect width="100" height="150" fill="url(#${id})"/>
    ${inner}
    <rect width="100" height="150" fill="url(#${id}v)"/>
    <rect x="3" y="3" width="94" height="144" fill="none" stroke="#d4af6a" stroke-width="1.4" rx="5" opacity=".9"/>
    <rect x="5.5" y="5.5" width="89" height="139" fill="none" stroke="#d4af6a" stroke-width=".5" rx="3.5" opacity=".5"/>
    <g fill="#e9cf9a"><circle cx="10" cy="10" r="1.4"/><circle cx="90" cy="10" r="1.4"/><circle cx="10" cy="140" r="1.4"/><circle cx="90" cy="140" r="1.4"/></g>
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
      <path d="M0 118 L24 104 L48 116 L72 102 L100 120 L100 150 L0 150 Z" fill="#5a6a3a"/>
      <path d="M0 118 L24 104 L48 116 L72 102 L100 120" fill="none" stroke="#7a8a4a" stroke-width="1"/>
      <circle cx="80" cy="26" r="9" fill="#f6c945"/><g stroke="#f0c24a" stroke-width="1" opacity=".7"><line x1="80" y1="12" x2="80" y2="40"/><line x1="66" y1="26" x2="94" y2="26"/><line x1="70" y1="16" x2="90" y2="36"/><line x1="90" y1="16" x2="70" y2="36"/></g>
      <circle cx="44" cy="44" r="8" fill="#f4d0a4"/><path d="M37 40 q7 -8 14 0 l-2 4 -10 0 z" fill="#caa23a"/>
      <path d="M35 52 Q44 48 53 52 L57 96 L33 96 Z" fill="#7a5fc0"/>
      <path d="M35 52 L30 78 L36 80 Z" fill="#8a6fd0"/><path d="M53 52 L60 76 L54 80 Z" fill="#6a4fb0"/>
      <path d="M38 96 L37 116 L44 116 L45 96 Z" fill="#c9b27a"/><path d="M50 96 L52 116 L58 116 L55 96 Z" fill="#b9a26a"/>
      <rect x="56" y="40" width="2.6" height="62" fill="#9c7f44" transform="rotate(12 57 70)"/>
      <path d="M62 40 q10 -2 8 8 q-8 0 -8 -8 z" fill="#e3d6a0"/>
      <path d="M22 100 q8 -12 16 -4 q-2 8 -10 8 q-6 0 -6 -4 z" fill="#f0ece0"/>
      <circle cx="26" cy="102" r="4.5" fill="#fff"/><circle cx="24" cy="100" r="1" fill="#3a3a3a"/>
      <path d="M48 76 l-7 -7 a4 4 0 0 1 7 -2 a4 4 0 0 1 7 2 z" fill="#fff" opacity=".9"/>`, "#6fb0d8", "#3a6f9a")
  },
  {
    name:"魔术师", arcana:"大阿卡那 · I", kw:"创造 · 行动力 · 显化",
    up:"你拥有实现目标的全部工具，专注意念，把想法化为现实的时机到了。",
    rev:"能量有些散乱或被误用，小心眼高手低与自我欺骗，先理清真正的目标。",
    detail:"魔术师一手指天、一手指地，桌上摆着权杖、圣杯、宝剑、星币四元素，头顶悬着无限符号。他象征意志与行动力的合一，是宇宙能量的导管。",
    svg:()=>frame(`
      <path d="M0 116 L100 116 L100 150 L0 150 Z" fill="#3a2f5a"/>
      <text x="50" y="22" font-size="15" text-anchor="middle" fill="#f6c945">∞</text>
      <circle cx="50" cy="46" r="8" fill="#f4d0a4"/><path d="M43 43 q7 -7 14 0 l-2 4 -10 0z" fill="#3a2f5a"/>
      <path d="M40 54 Q50 50 60 54 L62 100 L38 100 Z" fill="#c0392b"/>
      <path d="M40 54 L34 80 L40 82 Z" fill="#d04a3a"/><path d="M60 54 L66 80 L60 82 Z" fill="#a83228"/>
      <rect x="36" y="98" width="28" height="6" fill="#f0e7c8"/>
      <rect x="48" y="22" width="2.4" height="22" fill="#f6e7b0"/><line x1="49" y1="20" x2="49" y2="12" stroke="#f6e7b0" stroke-width="2.6"/>
      <rect x="18" y="100" width="64" height="9" rx="2" fill="#8a6a3a"/><rect x="18" y="100" width="64" height="3" fill="#a3854a"/>
      <path d="M26 100 l4 -10 l4 10 z" fill="#d4af6a"/>
      <rect x="40" y="92" width="8" height="8" rx="1" fill="#e0c060"/>
      <path d="M58 100 l6 -6 l2 6 z" fill="#cfd6e8"/>
      <circle cx="72" cy="96" r="4" fill="#f6c945"/><text x="72" y="98.5" font-size="5" text-anchor="middle" fill="#8a6a14">★</text>
      <g fill="#5fb27a"><ellipse cx="14" cy="40" rx="4" ry="8"/><ellipse cx="86" cy="40" rx="4" ry="8"/></g>
      <g fill="#e0506a"><circle cx="14" cy="118" r="3"/><circle cx="86" cy="118" r="3"/></g>`, "#f2e6c0", "#d9c79a")
  },
  {
    name:"女祭司", arcana:"大阿卡那 · II", kw:"直觉 · 潜意识 · 神秘",
    up:"答案藏在你的内心。静下来倾听直觉，耐心等待，真相会自然浮现。",
    rev:"你可能忽略了内在声音，或被表象迷惑。重新与自己的感受连接。",
    detail:"女祭司端坐于黑白双柱之间，头戴月冠，手持律法卷轴，身后垂帘绣着石榴。她象征潜意识、直觉与未被言说的智慧。",
    svg:()=>frame(`
      <rect x="20" y="28" width="13" height="92" fill="#1a1a30"/><rect x="67" y="28" width="13" height="92" fill="#e2dcec"/>
      <text x="26.5" y="50" font-size="9" text-anchor="middle" fill="#cfc8e0">J</text><text x="73.5" y="50" font-size="9" text-anchor="middle" fill="#2a2a45">B</text>
      <rect x="33" y="40" width="34" height="80" fill="#2c3f6e"/>
      <circle cx="50" cy="22" r="6" fill="#f3e7ad"/><path d="M44 22 a6 6 0 0 0 12 0 a4 4 0 0 1 -12 0z" fill="#f3e7ad"/>
      <circle cx="50" cy="46" r="8" fill="#f4d0a4"/><path d="M42 44 q8 -8 16 0 l-1 5 -14 0z" fill="#cfe3ee"/>
      <path d="M40 54 Q50 50 60 54 L64 116 L36 116 Z" fill="#5b8fb0"/>
      <path d="M50 56 Q46 86 50 116 Q54 86 50 56" fill="#cfe3ee"/>
      <path d="M44 64 l12 0 l-2 8 l-8 0z" fill="#e6eef5"/><text x="50" y="71" font-size="5" text-anchor="middle" fill="#3a5b86">+</text>
      <circle cx="50" cy="38" r="2.4" fill="#f6c945"/>
      <rect x="52" y="92" width="12" height="16" rx="1" fill="#e6dcc0" transform="rotate(8 58 100)"/>`, "#243a6a", "#16243f")
  },
  {
    name:"恋人", arcana:"大阿卡那 · VI", kw:"爱 · 结合 · 选择",
    up:"和谐的关系与重要的选择。跟随内心，真诚的连接会带来圆满。",
    rev:"关系中出现失衡或价值观分歧，需要更坦诚的沟通与重新审视。",
    detail:"亚当与夏娃立于伊甸园中，天使拉斐尔在金色阳光中赐福。背后是知识之树与生命之树。象征爱、结合，以及价值观层面的重要抉择。",
    svg:()=>frame(`
      <path d="M0 120 L100 120 L100 150 L0 150 Z" fill="#3a5a3a"/>
      <circle cx="50" cy="22" r="9" fill="#f6e7b0"/><path d="M50 13 q7 4 7 9 q-7 0 -7 -9z" fill="#fff4cf"/>
      <g stroke="#f0c24a" stroke-width="1" opacity=".6"><line x1="50" y1="8" x2="50" y2="34"/><line x1="36" y1="22" x2="64" y2="22"/><line x1="40" y1="12" x2="60" y2="32"/><line x1="60" y1="12" x2="40" y2="32"/></g>
      <circle cx="30" cy="62" r="7" fill="#f4d0a4"/><path d="M23 72 Q30 66 37 72 L39 112 L21 112 Z" fill="#5fb27a"/><path d="M30 69 L30 112" stroke="#4a9a64" stroke-width="1"/>
      <circle cx="70" cy="62" r="7" fill="#f6dcc0"/><path d="M63 72 Q70 66 77 72 L79 112 L61 112 Z" fill="#c75b9a"/>
      <path d="M50 82 l-7 -7 a4 4 0 0 1 7 -2 a4 4 0 0 1 7 2z" fill="#e04060"/>
      <rect x="14" y="80" width="3" height="34" fill="#6a8a4a"/><circle cx="15.5" cy="78" r="7" fill="#5fb27a"/>
      <rect x="83" y="80" width="3" height="34" fill="#9a5a2a"/><g fill="#f0a040"><circle cx="80" cy="78" r="3"/><circle cx="88" cy="76" r="3"/><circle cx="84" cy="70" r="3"/></g>`, "#7fb0d8", "#4a7faa")
  },
  {
    name:"力量", arcana:"大阿卡那 · VIII", kw:"勇气 · 温柔 · 内在力量",
    up:"以柔克刚。用耐心与善意驯服内心的躁动，你比想象中更强大。",
    rev:"自我怀疑或情绪失控正在消耗你，先与内在的恐惧温柔和解。",
    detail:"身着白袍、头戴花环的女子温柔地合上雄狮之口，头顶悬着无限符号。她以慈爱而非暴力驯服野性，象征内在的勇气、耐心与精神力量。",
    svg:()=>frame(`
      <path d="M0 118 L100 118 L100 150 L0 150 Z" fill="#cfa84a"/>
      <text x="50" y="20" font-size="13" text-anchor="middle" fill="#e8a93b">∞</text>
      <circle cx="40" cy="44" r="8" fill="#f4d0a4"/><path d="M32 42 q8 -7 16 0" fill="none" stroke="#5fb27a" stroke-width="2"/>
      <g fill="#e0506a"><circle cx="34" cy="34" r="1.6"/><circle cx="40" cy="32" r="1.6"/><circle cx="46" cy="34" r="1.6"/></g>
      <path d="M32 52 Q40 48 48 52 L50 102 L30 102 Z" fill="#f4efe0"/>
      <path d="M40 52 L40 102" stroke="#e0d8c0" stroke-width="1"/>
      <ellipse cx="66" cy="84" rx="20" ry="15" fill="#e0a23a"/>
      <circle cx="80" cy="78" r="11" fill="#e8b04a"/>
      <g fill="#c9871e"><path d="M70 70 l-4 -5 5 3z"/><path d="M90 70 l4 -5 -5 3z"/><path d="M80 66 l0 -6 2 6z"/></g>
      <circle cx="76" cy="76" r="1.5" fill="#5a3a12"/><circle cx="84" cy="76" r="1.5" fill="#5a3a12"/>
      <path d="M74 84 q6 4 12 0" fill="none" stroke="#a3691a" stroke-width="1.4"/>
      <path d="M48 76 q12 4 20 6" stroke="#e0a23a" stroke-width="2" fill="none"/>`, "#f3e6bf", "#dcc78f")
  },
  {
    name:"命运之轮", arcana:"大阿卡那 · X", kw:"转机 · 循环 · 机遇",
    up:"命运的齿轮开始转动，好运正在靠近。顺势而为，把握当下的机遇。",
    rev:"遭遇阻滞或坏运的循环，提醒你接受变化，别与无常硬碰硬。",
    detail:"巨轮悬于空中，四角的天使、鹰、狮、牛各自研读经书，轮上有神秘字母与炼金符号。它象征命运的循环、转折与不可抗拒的变化。",
    svg:()=>frame(`
      <circle cx="50" cy="66" r="32" fill="#3a2f7a" stroke="#f6c945" stroke-width="3"/>
      <circle cx="50" cy="66" r="22" fill="none" stroke="#e9cf9a" stroke-width="1.4"/>
      <circle cx="50" cy="66" r="12" fill="none" stroke="#e8a93b" stroke-width="1.6"/>
      <g stroke="#d4af6a" stroke-width="2"><line x1="50" y1="34" x2="50" y2="98"/><line x1="18" y1="66" x2="82" y2="66"/><line x1="27" y1="43" x2="73" y2="89"/><line x1="73" y1="43" x2="27" y2="89"/></g>
      <circle cx="50" cy="66" r="5" fill="#f6c945"/>
      <g fill="#e9cf9a"><rect x="8" y="10" width="12" height="9" rx="1"/><rect x="80" y="10" width="12" height="9" rx="1"/><rect x="8" y="120" width="12" height="9" rx="1"/><rect x="80" y="120" width="12" height="9" rx="1"/></g>
      <text x="14" y="17" font-size="6" text-anchor="middle" fill="#3a2f5a">☁</text>
      <path d="M84 96 q8 4 6 14 q-8 -4 -6 -14z" fill="#e0a23a"/>`, "#2a2160", "#171040")
  },
  {
    name:"星星", arcana:"大阿卡那 · XVII", kw:"希望 · 疗愈 · 灵感",
    up:"风雨之后的宁静与希望。心怀信念，宇宙正温柔地指引你疗愈与重生。",
    rev:"暂时的失望或信心动摇，别放弃希望，光芒只是被乌云遮住了。",
    detail:"裸身少女单膝跪于水边，将两壶清水分别倾入池中与大地，天空一颗大星与七颗小星闪耀。象征希望、疗愈、灵感与心灵的宁静。",
    svg:()=>frame(`
      <path d="M0 108 Q50 96 100 108 L100 150 L0 150 Z" fill="#2a5a6e"/>
      <ellipse cx="50" cy="118" rx="44" ry="8" fill="#357088"/>
      <path d="M50 12 l2.4 7 7.2 .6 -5.5 4.7 1.7 7 -5.8 -3.8 -5.8 3.8 1.7 -7 -5.5 -4.7 7.2 -.6z" fill="#f6e7b0"/>
      <g fill="#dfe9f6"><path d="M24 30 l1 3 3 .3 -2.4 2 .7 3 -2.3 -1.6 -2.3 1.6 .7 -3 -2.4 -2 3 -.3z"/><path d="M76 26 l1 3 3 .3 -2.4 2 .7 3 -2.3 -1.6 -2.3 1.6 .7 -3 -2.4 -2 3 -.3z"/><circle cx="34" cy="18" r="1.4"/><circle cx="66" cy="42" r="1.4"/><circle cx="18" cy="46" r="1.4"/><circle cx="84" cy="48" r="1.4"/></g>
      <circle cx="50" cy="74" r="8" fill="#f4d0a4"/><path d="M42 84 Q50 78 58 84 L60 108 L40 108 Z" fill="#f6dcc0"/>
      <path d="M40 98 q-8 4 -10 12" stroke="#aee0ee" stroke-width="2" fill="none"/>
      <path d="M60 98 q8 4 10 12" stroke="#aee0ee" stroke-width="2" fill="none"/>
      <path d="M30 110 q4 4 0 8 M70 110 q-4 4 0 8" stroke="#cfeaf2" stroke-width="1.4" fill="none"/>
      <rect x="74" y="64" width="3" height="20" fill="#7a9a5a"/><circle cx="75.5" cy="62" r="5" fill="#5fb27a"/>`, "#163850", "#0e2438")
  },
  {
    name:"月亮", arcana:"大阿卡那 · XVIII", kw:"潜意识 · 迷惑 · 直觉",
    up:"潜意识浮现，情绪与想象格外丰富。穿过迷雾，倾听内心真实的声音。",
    rev:"迷雾正在散去，误会与不安逐渐澄清，你重新看清了方向。",
    detail:"月亮高悬，洒下露珠，一犬一狼对月嗥叫，小龙虾从池中爬出，远处双塔守着未知之路。象征潜意识、幻象、恐惧与直觉的深海。",
    svg:()=>frame(`
      <path d="M0 96 Q30 80 50 90 Q70 80 100 96 L100 120 L0 120 Z" fill="#2b3b60"/>
      <circle cx="50" cy="38" r="24" fill="#fff6d0" opacity=".18"/>
      <circle cx="50" cy="38" r="15" fill="#f5ecbf"/><path d="M50 23 a15 15 0 0 0 0 30 a11 11 0 0 1 0 -30" fill="#fbf6d8"/>
      <circle cx="45" cy="34" r="1.4" fill="#b3a368"/><path d="M43 42 q3 2 5 .3" stroke="#b3a368" fill="none" stroke-width="1"/>
      <g fill="#f5ecbf"><path d="M50 60 l1.2 3 1.2 -3 -1.2 -3z"/><path d="M34 66 l1 2.4 1 -2.4 -1 -2.2z"/><path d="M66 66 l1 2.4 1 -2.4 -1 -2.2z"/></g>
      <rect x="9" y="68" width="14" height="42" fill="#3c4668"/><path d="M9 68 L16 56 L23 68 Z" fill="#4d5984"/><rect x="13" y="78" width="6" height="9" rx="1" fill="#16264a"/>
      <rect x="77" y="68" width="14" height="42" fill="#3c4668"/><path d="M77 68 L84 56 L91 68 Z" fill="#4d5984"/><rect x="81" y="78" width="6" height="9" rx="1" fill="#16264a"/>
      <path d="M44 150 L48 112 L52 112 L56 150 Z" fill="#c9b27a"/>
      <path d="M30 110 q-2 -11 3 -15 q1.5 -3 3 0 q3.5 6 1 15 z" fill="#1c2c50" stroke="#34466e" stroke-width=".5"/>
      <path d="M70 110 q2 -12 -3 -16 q-1.5 -3 -3 0 q-3.5 7 -1 16 z" fill="#243a64" stroke="#34466e" stroke-width=".5"/>
      <ellipse cx="50" cy="134" rx="20" ry="8" fill="#274a6a"/>
      <ellipse cx="50" cy="132" rx="5" ry="3.2" fill="#8aa0b4"/><path d="M45 132 l-3 2.5 M55 132 l3 2.5 M47 130 l-1 -2.5 M53 130 l1 -2.5" stroke="#8aa0b4" stroke-width="1" stroke-linecap="round"/>`, "#2a3f6e", "#16264a")
  },
  {
    name:"太阳", arcana:"大阿卡那 · XIX", kw:"喜悦 · 成功 · 光明",
    up:"最明亮的祝福。坦诚地表达自己，喜悦、成功与温暖正向你走来。",
    rev:"快乐被暂时遮蔽，或过于乐观。调整心态，光明依旧在前方。",
    detail:"灿烂的太阳放射光芒，一个戴花冠的孩子骑着白马，举着红色旗帜，身后是向日葵盛开的花墙。象征喜悦、成功、生命力与纯真的幸福。",
    svg:()=>frame(`
      <g stroke="#ef9f17" stroke-linecap="round">
        <g stroke-width="2.4"><line x1="50" y1="50" x2="50" y2="6"/><line x1="50" y1="50" x2="94" y2="50"/><line x1="50" y1="50" x2="50" y2="94"/><line x1="50" y1="50" x2="6" y2="50"/><line x1="50" y1="50" x2="81" y2="19"/><line x1="50" y1="50" x2="81" y2="81"/><line x1="50" y1="50" x2="19" y2="81"/><line x1="50" y1="50" x2="19" y2="19"/></g>
        <g stroke-width="1.1" opacity=".8"><line x1="50" y1="50" x2="68" y2="10"/><line x1="50" y1="50" x2="90" y2="32"/><line x1="50" y1="50" x2="90" y2="68"/><line x1="50" y1="50" x2="68" y2="90"/><line x1="50" y1="50" x2="32" y2="90"/><line x1="50" y1="50" x2="10" y2="68"/><line x1="50" y1="50" x2="10" y2="32"/><line x1="50" y1="50" x2="32" y2="10"/></g>
      </g>
      <circle cx="50" cy="50" r="21" fill="#ffd24a" stroke="#cf8c1c" stroke-width="1.2"/>
      <circle cx="43" cy="47" r="2.2" fill="#9c6b12"/><circle cx="57" cy="47" r="2.2" fill="#9c6b12"/>
      <path d="M41 56 Q50 63 59 56" stroke="#9c6b12" stroke-width="2" fill="none" stroke-linecap="round"/>
      <rect y="110" width="100" height="40" fill="#d97b3a"/><rect y="108" width="100" height="4" fill="#b5601f"/>
      <g><circle cx="32" cy="86" r="4.5" fill="#fff2d0"/><circle cx="38" cy="82" r="5.5" fill="#fff2d0"/><circle cx="44" cy="86" r="4.5" fill="#fff2d0"/><circle cx="38" cy="84" r="3" fill="#e0a23a"/></g>
      <g><circle cx="62" cy="92" r="3.6" fill="#fff2d0"/><circle cx="67" cy="89" r="4.4" fill="#fff2d0"/><circle cx="62" cy="90" r="2.4" fill="#e0a23a"/></g>
      <ellipse cx="50" cy="126" rx="13" ry="13" fill="#f0e7d8"/>
      <circle cx="50" cy="104" r="6.5" fill="#f4d0a4"/>
      <g fill="#e8a93b"><path d="M50 97 l1 -5 1 5z"/><path d="M44 100 l-4 -3 4 4z"/><path d="M56 100 l4 -3 -4 4z"/></g>
      <path d="M50 110 l-3 3 3 3 3 -3z" fill="#d23b3b"/>
      <path d="M56 114 L68 110 L68 122 L56 120 Z" fill="#e23b3b"/><line x1="56" y1="112" x2="56" y2="126" stroke="#9c4a1a" stroke-width="1.6"/>`, "#fbe39a", "#f4c34e")
  },
  {
    name:"高塔", arcana:"大阿卡那 · XVI", kw:"剧变 · 觉醒 · 释放",
    up:"突如其来的变动打破旧有结构。看似破坏，实则是为新生扫清障碍。",
    rev:"你正努力避免一场必要的崩塌，或灾难已渐平息，重建的时刻来临。",
    detail:"闪电击中高塔，王冠被掀飞，两人从塔上坠落。象征旧结构的骤然瓦解、幻象的破灭，以及随之而来的觉醒与释放。",
    svg:()=>frame(`
      <rect x="38" y="46" width="24" height="74" fill="#6a6a82"/><rect x="38" y="46" width="24" height="74" fill="none" stroke="#4a4a60" stroke-width="1"/>
      <g stroke="#4a4a60" stroke-width=".8"><line x1="38" y1="64" x2="62" y2="64"/><line x1="38" y1="84" x2="62" y2="84"/><line x1="38" y1="104" x2="62" y2="104"/><line x1="50" y1="46" x2="50" y2="120"/></g>
      <path d="M36 46 L64 46 L58 32 L42 32 Z" fill="#8a6a3a"/>
      <path d="M20 18 L36 44 L30 46 L44 64 L34 50 L40 48 Z" fill="#f6e7b0"/>
      <rect x="44" y="56" width="5" height="9" fill="#f6c945"/><rect x="51" y="56" width="5" height="9" fill="#f6c945"/>
      <circle cx="28" cy="92" r="5" fill="#f4d0a4"/><path d="M24 96 L32 96 L34 110 L22 110 Z" fill="#5b6a9a"/>
      <circle cx="72" cy="86" r="5" fill="#f4d0a4"/><path d="M68 90 L76 90 L74 104 L66 104 Z" fill="#9a5a5a"/>
      <g fill="#f0c24a"><path d="M18 70 l1.4 4 1.4 -4 -1.4 -3z"/><path d="M82 64 l1.4 4 1.4 -4 -1.4 -3z"/><path d="M66 108 l1.4 4 1.4 -4 -1.4 -3z"/><path d="M30 118 l1.2 3 1.2 -3 -1.2 -2.6z"/></g>`, "#241830", "#120a1c")
  },
  {
    name:"死神", arcana:"大阿卡那 · XIII", kw:"结束 · 转化 · 重生",
    up:"一段旅程的终结，正是另一段的开始。放下过去，迎接必然的蜕变。",
    rev:"你在抗拒改变，停滞不前。允许旧的离开，新的才有空间生长。",
    detail:"身披黑甲的骷髅骑士手持白玫瑰旗帜前行，无论国王、孩童或主教皆无法阻挡。远方双塔间太阳升起。象征终结、转化与必然的重生。",
    svg:()=>frame(`
      <path d="M0 116 L100 116 L100 150 L0 150 Z" fill="#3a2f4a"/>
      <circle cx="50" cy="34" r="10" fill="#e8e6f5"/>
      <ellipse cx="46" cy="33" rx="2" ry="2.6" fill="#2a1c3a"/><ellipse cx="54" cy="33" rx="2" ry="2.6" fill="#2a1c3a"/>
      <path d="M44 40 l2 4 2 -4 2 4 2 -4" fill="none" stroke="#2a1c3a" stroke-width="1"/>
      <path d="M40 48 Q50 44 60 48 L62 110 L38 110 Z" fill="#2a2a3a"/>
      <path d="M40 48 L34 78 L40 80 Z" fill="#3a3a4a"/><path d="M60 48 L66 78 L60 80 Z" fill="#1e1e2e"/>
      <rect x="46" y="54" width="8" height="50" fill="#4a4a5e"/>
      <rect x="70" y="14" width="3" height="98" fill="#9c9cb0" transform="rotate(6 71 60)"/>
      <path d="M70 16 q16 4 13 20 q-13 -6 -13 -20z" fill="#f0ece0"/>
      <path d="M14 28 l8 14 8 -14z" fill="#f6c945"/>
      <path d="M20 100 q6 -8 14 -2" stroke="#f6e7b0" fill="none" stroke-width="1.6"/>`, "#1c1428", "#0c0814")
  },

  /* ===== 小阿卡那 ===== */
  {
    name:"星币三", arcana:"小阿卡那 · 星币", kw:"协作 · 用心 · 打磨",
    up:"你的努力与用心正在被看见。与他人协作共建，将打下坚实的基础。",
    rev:"协作出现分歧或敷衍，提醒你重视细节、重新投入真诚。",
    detail:"年轻的石匠在修道院中展示作品，僧侣与设计师手持图纸与他商讨。三枚星币嵌于拱顶。象征技艺、协作、用心打磨与初步的成就认可。",
    svg:()=>frame(`
      <path d="M14 92 L14 50 Q50 8 86 50 L86 92 Z" fill="#4a4566"/>
      <path d="M20 92 L20 53 Q50 18 80 53 L80 92 Z" fill="#2b2742"/>
      <g stroke="#6a6488" stroke-width="1" opacity=".8"><path d="M50 22 L50 50"/><path d="M34 27 L42 52"/><path d="M66 27 L58 52"/><path d="M24 38 L36 56"/><path d="M76 38 L64 56"/></g>
      <circle cx="50" cy="40" r="9" fill="#3a4f7a" stroke="#7d86ad" stroke-width="1"/>
      <g stroke="#7d86ad" stroke-width=".7"><line x1="41" y1="40" x2="59" y2="40"/><line x1="50" y1="31" x2="50" y2="49"/></g>
      <g><circle cx="50" cy="64" r="6.5" fill="#f6c945" stroke="#8a6a14" stroke-width=".8"/><path d="M50 60 l1.2 2.6 2.8 .2 -2.1 1.8 .7 2.8 -2.6 -1.6 -2.6 1.6 .7 -2.8 -2.1 -1.8 2.8 -.2z" fill="#8a6a14"/></g>
      <g><circle cx="37" cy="80" r="6" fill="#f6c945" stroke="#8a6a14" stroke-width=".8"/><path d="M37 76.3 l1.1 2.4 2.6 .2 -2 1.6 .6 2.6 -2.3 -1.5 -2.3 1.5 .6 -2.6 -2 -1.6 2.6 -.2z" fill="#8a6a14"/></g>
      <g><circle cx="63" cy="80" r="6" fill="#f6c945" stroke="#8a6a14" stroke-width=".8"/><path d="M63 76.3 l1.1 2.4 2.6 .2 -2 1.6 .6 2.6 -2.3 -1.5 -2.3 1.5 .6 -2.6 -2 -1.6 2.6 -.2z" fill="#8a6a14"/></g>
      <rect y="116" width="100" height="34" fill="#3a3454"/>
      <rect x="20" y="104" width="20" height="12" fill="#6a5a3a"/>
      <circle cx="30" cy="92" r="4.5" fill="#e8c39a"/><path d="M26 104 L26 96 Q30 93 34 96 L34 104 Z" fill="#7a4a8a"/>
      <path d="M34 98 L42 92" stroke="#e8c39a" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="60" cy="96" r="4" fill="#e8c39a"/><path d="M56 108 L56 99 Q60 96 64 99 L64 108 Z" fill="#324f6e"/>
      <circle cx="74" cy="98" r="4" fill="#e8c39a"/><path d="M70 110 L70 101 Q74 98 78 101 L78 110 Z" fill="#6a4a8a"/>
      <rect x="58" y="103" width="13" height="8" rx="1" fill="#d8c9a0" stroke="#9c8a5a" stroke-width=".6" transform="rotate(-8 64 107)"/>`, "#3a3556", "#272340")
  },
  {
    name:"圣杯二", arcana:"小阿卡那 · 圣杯", kw:"结合 · 互信 · 情感连接",
    up:"两颗心的真诚连接，象征和谐的伴侣关系或合作，彼此滋养。",
    rev:"关系失衡或信任受损，需要修复沟通，找回平等与尊重。",
    detail:"一男一女举杯相对，杯上盘绕着赫尔墨斯之杖与狮首。象征平等的情感交流、承诺、伙伴关系与心灵的相互滋养。",
    svg:()=>frame(`
      <path d="M0 118 L100 118 L100 150 L0 150 Z" fill="#3a6a5a"/>
      <circle cx="32" cy="56" r="7" fill="#f4d0a4"/><path d="M25 66 Q32 60 39 66 L41 104 L23 104 Z" fill="#5fb27a"/>
      <circle cx="68" cy="56" r="7" fill="#f6dcc0"/><path d="M61 66 Q68 60 75 66 L77 104 L59 104 Z" fill="#c75b9a"/>
      <path d="M38 74 L46 74 L45 84 L39 84 Z" fill="#f6c945"/><rect x="40" y="84" width="3" height="8" fill="#e0a23a"/><rect x="36" y="92" width="11" height="3" fill="#e0a23a"/>
      <path d="M54 74 L62 74 L61 84 L55 84 Z" fill="#f6c945"/><rect x="57" y="84" width="3" height="8" fill="#e0a23a"/><rect x="53" y="92" width="11" height="3" fill="#e0a23a"/>
      <path d="M50 50 l-5 -5 a3 3 0 0 1 5 -1.6 a3 3 0 0 1 5 1.6z" fill="#e04060"/>
      <path d="M44 50 q6 -10 12 0 q-6 6 -12 0z" fill="#f0c24a"/>`, "#2c5a6e", "#163a48")
  },
  {
    name:"宝剑三", arcana:"小阿卡那 · 宝剑", kw:"心碎 · 释放 · 真相",
    up:"难免的伤痛与失落，但痛过之后是清明。允许自己哀伤，再重新出发。",
    rev:"你正从伤痛中复原，愿意原谅与放下，乌云即将散去。",
    detail:"三柄长剑穿透一颗红心，背景是阴云密布的暴雨天空。象征心碎、悲伤、被真相刺痛，以及哀伤之后所带来的清明与释放。",
    svg:()=>frame(`
      <g fill="#5a6480" opacity=".6"><ellipse cx="30" cy="34" rx="16" ry="8"/><ellipse cx="68" cy="38" rx="18" ry="9"/><ellipse cx="50" cy="28" rx="20" ry="9"/></g>
      <path d="M50 52 q-17 6 -19 28 q19 9 19 9 q0 0 19 -9 q-2 -22 -19 -28z" fill="#c0394b"/>
      <path d="M50 52 q-17 6 -19 28 q19 9 19 9" fill="#a82e3e"/>
      <g stroke="#cfd6e8" stroke-width="3.4"><line x1="50" y1="40" x2="50" y2="104"/><line x1="32" y1="46" x2="68" y2="94"/><line x1="68" y1="46" x2="32" y2="94"/></g>
      <g fill="#9aa6c0"><circle cx="50" cy="38" r="2.4"/><circle cx="31" cy="45" r="2.4"/><circle cx="69" cy="45" r="2.4"/></g>
      <g stroke="#7a86a0" stroke-width="1.4"><line x1="22" y1="106" x2="26" y2="118"/><line x1="40" y1="108" x2="44" y2="120"/><line x1="58" y1="108" x2="62" y2="120"/><line x1="76" y1="106" x2="80" y2="118"/></g>`, "#5a6480", "#3a4258")
  },
  {
    name:"权杖王牌", arcana:"小阿卡那 · 权杖", kw:"灵感 · 行动 · 新机会",
    up:"一股全新的创造力与热情涌现，大胆开始，火花将燃成燎原之势。",
    rev:"动力受阻或方向不明，先找回最初的热情，再重新点火。",
    detail:"云中伸出一只手，紧握一根新生嫩芽的权杖，叶片纷纷飘落。象征灵感的火花、创造的冲动、全新的机会与原始的生命动力。",
    svg:()=>frame(`
      <path d="M0 116 Q40 108 60 116 L100 110 L100 150 L0 150z" fill="#3a5a3a"/>
      <ellipse cx="68" cy="42" rx="22" ry="11" fill="#e6eef5" opacity=".9"/>
      <ellipse cx="80" cy="48" rx="14" ry="8" fill="#dbe5f0" opacity=".8"/>
      <rect x="44" y="28" width="7" height="86" rx="3.5" fill="#8a5a2a"/>
      <path d="M44 40 q-6 -4 -10 -12 M51 36 q6 -4 10 -12 M47 30 q0 -8 0 -14" stroke="#9a6a3a" stroke-width="2" fill="none"/>
      <g fill="#5fb27a"><ellipse cx="34" cy="30" rx="5" ry="9" transform="rotate(-30 34 30)"/><ellipse cx="64" cy="26" rx="5" ry="9" transform="rotate(30 64 26)"/><ellipse cx="48" cy="18" rx="5" ry="9"/></g>
      <circle cx="40" cy="76" r="9" fill="#f4d0a4"/><path d="M31 80 q9 -8 18 0" fill="none" stroke="#e6eef5" stroke-width="2.4"/>
      <g fill="#6fb84a"><ellipse cx="22" cy="96" rx="3" ry="6" transform="rotate(-40 22 96)"/><ellipse cx="60" cy="100" rx="3" ry="6" transform="rotate(30 60 100)"/></g>`, "#4a6a8a", "#2a4560")
  },
  {
    name:"圣杯十", arcana:"小阿卡那 · 圣杯", kw:"圆满 · 幸福 · 家庭",
    up:"情感的圆满与家庭的和乐。你所珍视的关系正绽放出温暖的光彩。",
    rev:"表面和谐下藏着小裂痕，用心经营，幸福需要持续地呵护。",
    detail:"一对夫妇张开双臂仰望天空，彩虹中浮现十只金杯，孩子在一旁欢快玩耍，远处是温馨的家园。象征圆满的幸福、家庭的和谐与情感的丰盈。",
    svg:()=>frame(`
      <path d="M0 118 L100 118 L100 150 L0 150 Z" fill="#4a7a4a"/>
      <path d="M18 44 Q50 18 82 44" fill="none" stroke="#e0506a" stroke-width="3"/>
      <path d="M18 44 Q50 22 82 44" fill="none" stroke="#f0a040" stroke-width="3" opacity=".8"/>
      <path d="M18 44 Q50 26 82 44" fill="none" stroke="#5fb27a" stroke-width="3" opacity=".7"/>
      <g fill="#f6c945"><path d="M26 38 l5 0 -1 6 -3 0z"/><path d="M37 32 l5 0 -1 6 -3 0z"/><path d="M48 30 l5 0 -1 6 -3 0z"/><path d="M59 32 l5 0 -1 6 -3 0z"/><path d="M70 38 l5 0 -1 6 -3 0z"/></g>
      <circle cx="38" cy="74" r="7" fill="#f4d0a4"/><path d="M31 84 Q38 78 45 84 L40 114 Q38 100 36 114 Z" fill="#5b8fb0"/><path d="M31 84 L26 70 24 72z" fill="#5b8fb0"/>
      <circle cx="62" cy="74" r="7" fill="#f6dcc0"/><path d="M55 84 Q62 78 69 84 L64 114 Q62 100 60 114 Z" fill="#c75b9a"/><path d="M69 84 L74 70 76 72z" fill="#c75b9a"/>
      <circle cx="22" cy="100" r="4" fill="#f4d0a4"/><path d="M19 104 L25 104 L24 116 L20 116 Z" fill="#e0a23a"/>
      <circle cx="80" cy="102" r="3.6" fill="#f4d0a4"/><path d="M77 106 L83 106 L82 116 L78 116 Z" fill="#7fc5d8"/>`, "#7fb0d8", "#4a7faa")
  },
  {
    name:"圣杯八", arcana:"小阿卡那 · 圣杯", kw:"离开 · 追寻 · 转身",
    up:"你已意识到当前的不再适合自己，鼓起勇气转身，去追寻更深的意义。",
    rev:"在去留之间徘徊不定，听从内心，别因留恋而困住自己。",
    detail:"一个披红袍的人拄杖背对八只排列整齐的金杯，向月夜中的群山走去。象征主动的放下、对更高意义的追寻，以及离开舒适区的勇气。",
    svg:()=>frame(`
      <path d="M0 110 L30 96 L60 108 L100 94 L100 150 L0 150 Z" fill="#2a3a52"/>
      <circle cx="44" cy="32" r="13" fill="#f3e7ad"/><path d="M44 19 a13 13 0 0 0 0 26 a9 9 0 0 1 0 -26" fill="#fbf4cf"/>
      <g fill="#e0c060"><rect x="22" y="96" width="9" height="11" rx="1"/><rect x="33" y="96" width="9" height="11" rx="1"/><rect x="44" y="96" width="9" height="11" rx="1"/><rect x="28" y="84" width="9" height="11" rx="1"/><rect x="39" y="84" width="9" height="11" rx="1"/></g>
      <circle cx="72" cy="58" r="5" fill="#e8c39a"/>
      <path d="M65 66 Q72 60 79 66 L82 116 L62 116 Z" fill="#b04a3a"/>
      <path d="M65 66 L60 90 65 92z" fill="#c05a4a"/>
      <rect x="82" y="60" width="2.4" height="56" fill="#9c7f44"/>`, "#1c2c44", "#0e1a2e")
  },
  {
    name:"星币十", arcana:"小阿卡那 · 星币", kw:"富足 · 传承 · 稳定",
    up:"长久的富足与稳定。家业、财富与传承的圆满，回报你过往的耕耘。",
    rev:"对稳定的过度执着或财务的小波动，提醒你平衡物质与情感。",
    detail:"白发长者坐于拱门下，身旁有伴侣、孩童与忠犬，十枚星币如生命之树般排布，背景是繁荣的家宅。象征财富的积累、家族传承与长久的稳定。",
    svg:()=>frame(`
      <path d="M16 44 L16 120 L36 120 L36 44 Q26 36 16 44z" fill="#6a5a3a"/><rect x="18" y="50" width="16" height="20" fill="#3a2f2a"/>
      <path d="M64 44 L64 120 L84 120 L84 44 Q74 36 64 44z" fill="#6a5a3a"/><rect x="66" y="50" width="16" height="20" fill="#3a2f2a"/>
      <rect x="0" y="120" width="100" height="30" fill="#4a3f2a"/>
      <g fill="#f6c945" stroke="#8a6a14" stroke-width=".5"><circle cx="42" cy="40" r="4.5"/><circle cx="58" cy="40" r="4.5"/><circle cx="50" cy="52" r="4.5"/><circle cx="40" cy="60" r="4.5"/><circle cx="60" cy="60" r="4.5"/><circle cx="50" cy="72" r="4.5"/><circle cx="42" cy="84" r="4.5"/><circle cx="58" cy="84" r="4.5"/><circle cx="46" cy="98" r="4.5"/><circle cx="58" cy="100" r="4.5"/></g>
      <circle cx="48" cy="92" r="6" fill="#e8c39a"/><path d="M42 100 Q48 94 54 100 L54 118 L42 118 Z" fill="#8a4a8a"/>
      <ellipse cx="30" cy="108" rx="6" ry="4" fill="#d8c0a0"/><path d="M24 108 l-4 6 4 0z" fill="#d8c0a0"/>`, "#2a3a22", "#161e10")
  }
];

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
  { t:"正位与逆位", c:"牌面正立为「正位」，通常表达该牌能量的正向流动；牌面颠倒为「逆位」，可能代表能量受阻、内化或过度。逆位并非「坏」，而是提醒我们换一个角度看待问题。" },
  { t:"如何提出好问题", c:"塔罗擅长回答「开放式」而非「是非题」。把「我会复合吗」换成「我该如何面对这段关系」，聚焦在自己能掌控的部分，会得到更有启发的指引。" },
  { t:"塔罗的正确心态", c:"塔罗揭示的是「当下能量的趋势」，而非不可改变的命运。它是一面镜子，帮助你更清晰地认识自己，最终的选择权始终在你手中。" }
];
