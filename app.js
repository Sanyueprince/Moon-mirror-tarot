/* ========= 月镜言 · 交互逻辑 ========= */
(function(){
  'use strict';

  // 占卜会话状态
  const state = {
    question: '',
    category: '',
    spread: SPREADS[1],   // 默认时间之流
    drawn: [],            // [{card, reversed, position}]
  };

  // ---------- 工具 ----------
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // ---------- 页面历史栈（实现返回上一页，而非退出小程序） ----------
  const navStack = [];                 // 记录访问过的页面，用于返回
  const ROOT = 's-home';               // 应用根页面
  // 这些页面视为「根/入口」，到达它们时清空历史栈（避免返回到启动/登录页）
  const ROOTS = ['s-launch','s-login','s-home'];

  function currentScreen(){
    const el = document.querySelector('.screen.active');
    return el ? el.id : null;
  }

  // 仅负责切换显示，不处理历史栈
  function showScreen(id){
    $$('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if(el){ el.classList.add('active'); el.querySelector('.scroll') && (el.querySelector('.scroll').scrollTop = 0); }
    if(id === 'onShow') return;
    onShow(id);
  }

  // 前进导航：记录来源页，压入历史栈
  function go(id){
    const cur = currentScreen();
    if(cur && cur !== id){
      if(ROOTS.includes(id)){
        navStack.length = 0;           // 到达根页面：清空历史栈
      }else{
        navStack.push(cur);
      }
    }
    showScreen(id);
    // 每次前进都补一条浏览器历史，使历史深度与页面深度匹配，
    // 这样系统返回/侧滑返回都会被 popstate 捕获，绝不会退出小程序
    trapHistory();
  }

  // 关闭当前打开的弹层/遮罩，返回 true 表示「本次返回已被弹层消费」
  function closeOverlays(){
    let closed = false;
    document.querySelectorAll('.privacy-mask:not(.hidden), .mask.show, .modal.show, .sheet.show').forEach(el=>{
      el.classList.add('hidden'); el.classList.remove('show'); closed = true;
    });
    return closed;
  }

  // 返回上一页：栈空时停留在首页（绝不退出小程序）
  function goBack(){
    // 先关弹层（若有），关掉就不再切换页面
    if(closeOverlays()) return;
    if(navStack.length){
      const prev = navStack.pop();
      showScreen(prev);
    }else{
      const cur = currentScreen();
      if(cur && cur !== ROOT) showScreen(ROOT);
      // 已在根页面则不做任何事（停留，不退出）
    }
  }

  // 拦截浏览器/系统返回（含侧滑返回），改为返回上一页而非退出
  function trapHistory(){ try{ history.pushState({ mm:true }, ''); }catch(e){} }
  window.addEventListener('popstate', () => {
    trapHistory();   // 立即补一个历史记录，防止真正退出（任何页面都不退出）
    goBack();        // goBack 内部会优先关闭弹层，否则返回上一页
  });
  // 初始化时多放置几个「陷阱」历史记录，进一步降低被系统直接退出的概率
  trapHistory(); trapHistory(); trapHistory();


  function toast(msg){
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(()=>t.classList.remove('show'), 1600);
  }

  function shuffleArray(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  // ---------- 进入各页面时的逻辑 ----------
  function onShow(id){
    if(id === 's-ask') resetAsk();
    if(id === 's-spread') renderSpreads();
    if(id === 's-shuffle') resetShuffle();
    if(id === 's-draw') renderFan();
    if(id === 's-reveal') renderReveal();
    if(id === 's-result') renderResult();
    if(id === 's-history') renderHistory();
    if(id === 's-wiki') renderWiki();
    if(id === 's-mine') renderMine();
  }

  // 每次进入提问页都重置输入与分类选择
  function resetAsk(){
    const input = $('#askInput');
    if(input){ input.value = ''; input.setAttribute('placeholder','输入你的问题…（选填）'); }
    $$('.chip', $('#askChips')).forEach(c=>c.classList.remove('on'));
    state.category = '';
    state.question = '';
  }


  // ---------- 全局点击：data-go 导航 ----------
  document.addEventListener('click', (e) => {
    // 返回键统一走历史栈返回（而非写死跳转）
    const backEl = e.target.closest('.nav-back');
    if(backEl){
      e.stopPropagation();
      goBack();
      return;
    }
    const goEl = e.target.closest('[data-go]');
    if(goEl){

      const target = goEl.getAttribute('data-go');
      // 提问页的“跳过”：直接用每日一牌
      if(goEl.getAttribute('data-skip')){
        state.question = '今日指引';
        state.category = '综合';
        state.spread = SPREADS[0];
      }
      // 离开提问页时记录问题
      if($('#s-ask').classList.contains('active') && target === 's-spread' && !goEl.getAttribute('data-skip')){
        const input = $('#askInput').value.trim();
        state.question = input || (state.category ? state.category + '运势' : '我此刻的指引');
      }
      go(target);
      return;
    }
  });

  // ---------- 启动页 → 登录 ----------
  setTimeout(()=>{ if($('#s-launch').classList.contains('active')) go('s-login'); }, 1800);

  // ---------- 首页：日期 + 每日一牌 ----------
  function initHome(){
    const d = new Date();
    $('#todayDate').textContent = (d.getMonth()+1) + '月' + d.getDate() + '日';
    // 用日期做种子，保证一天内每日一牌固定
    const seed = d.getFullYear()*1000 + (d.getMonth()+1)*50 + d.getDate();
    const card = TAROT[seed % TAROT.length];
    const reversed = (seed % 3 === 0);
    $('#dailyCardImg').innerHTML = card.svg();
    if(reversed) $('#dailyCardImg').querySelector('svg').style.transform = 'rotate(180deg)';
    $('#dailyCardName').textContent = card.name + ' · ' + (reversed ? '逆位' : '正位');
    $('#dailyCardDesc').textContent = reversed ? card.rev : card.up;
  }

  // ---------- 提问页：分类选择 ----------
  $('#askChips').addEventListener('click', (e)=>{
    const chip = e.target.closest('.chip');
    if(!chip) return;
    $$('.chip', $('#askChips')).forEach(c=>c.classList.remove('on'));
    chip.classList.add('on');
    state.category = chip.getAttribute('data-q');
    // 给输入框一个引导占位
    const placeholders = {
      '感情':'这段感情接下来会如何发展？','事业':'我目前的事业方向对吗？',
      '财运':'近期我的财运状况如何？','学业':'这次的学习/考试会顺利吗？',
      '人际':'我和TA的关系该如何相处？','综合':'我近期整体的运势如何？'
    };
    $('#askInput').setAttribute('placeholder', placeholders[state.category] || '输入你的问题…（选填）');
  });

  // ---------- 选牌阵 ----------
  function renderSpreads(){
    const list = $('#spreadList');
    list.innerHTML = SPREADS.map((s,i)=>`
      <div class="spread ${s.id===state.spread.id?'on':''}" data-spread="${i}">
        <div class="s-ic">${s.ic}</div>
        <div><b>${s.name}</b><div class="s-desc">${s.desc}</div></div>
        <span class="s-tag">免费</span>
      </div>`).join('');
    $$('.spread', list).forEach(el=>{
      el.addEventListener('click', ()=>{
        $$('.spread', list).forEach(x=>x.classList.remove('on'));
        el.classList.add('on');
        state.spread = SPREADS[+el.getAttribute('data-spread')];
      });
    });
  }

  // ---------- 洗牌 ----------
  let shuffled = false;
  function resetShuffle(){
    shuffled = false;
    // 给三张叠牌注入马赛风格牌背（仅注入一次）
    if(typeof cardBackSVG === 'function'){
      $$('.deck-c').forEach(c=>{ if(!c.querySelector('svg')) c.innerHTML = cardBackSVG(); });
    }
    $('#deck').classList.remove('shuffling');
    $('#shuffleDone').classList.add('hidden');
    $('#shuffleHint').innerHTML = '<svg class="ico"><use href="#i-orb"/></svg> 点击牌堆洗牌　|　摇一摇手机';
  }
  function doShuffle(){
    if(shuffled) return;
    const deck = $('#deck');
    deck.classList.add('shuffling');
    $('#shuffleHint').textContent = '正在洗牌……让心意融入牌中';
    if(navigator.vibrate) navigator.vibrate(40);
    setTimeout(()=>{
      deck.classList.remove('shuffling');
      shuffled = true;
      $('#shuffleHint').textContent = '✨ 洗牌完成，准备好了吗？';
      $('#shuffleDone').classList.remove('hidden');
    }, 2200);
  }
  $('#deck').addEventListener('click', doShuffle);
  // 摇一摇
  window.addEventListener('devicemotion', (e)=>{
    if(!$('#s-shuffle').classList.contains('active') || shuffled) return;
    const a = e.accelerationIncludingGravity;
    if(a && (Math.abs(a.x)+Math.abs(a.y)+Math.abs(a.z) > 38)) doShuffle();
  });

  // ---------- 抽牌：完整 78 张牌带（可横向滑动浏览） ----------
  function renderFan(){
    const fan = $('#fan');
    const total = TAROT.length; // 铺满完整 78 张牌背
    // 洗一副完整且不重复的 78 张牌，每个牌背位置对应牌堆里的一张牌
    state._fanDeck = shuffleArray(TAROT.slice());
    state.drawn = [];
    fan.innerHTML = '';
    const backSVG = (typeof cardBackSVG === 'function') ? cardBackSVG() : '';
    for(let i=0;i<total;i++){
      const f = document.createElement('div');
      f.className = 'f';
      f.dataset.idx = i;
      f.innerHTML = backSVG;   // 注入马赛风格牌背
      fan.appendChild(f);
    }
    // ===== 弧形扇面布局 =====
    // 78 张沿一条大圆弧排布：一屏约露出 23 张呈扇形，可左右滑动浏览全部
    const STEP = 26;        // 相邻牌背沿弧的水平步距(px)
    const CARD_W = 60;      // 单张牌背宽度(px)
    const PER_DEG = 2.0;    // 每张牌相对相邻牌的夹角(度)
    const ARC_DROP = 0.42;  // 弧面下沉系数（角度越大，沿弧下沉越多）
    fan.style.width = (STEP*(total-1) + CARD_W) + 'px';
    $$('.f', fan).forEach((f,i)=>{
      // 以「当前一屏的中心」为基准计算角度：用每 23 张为一个可视窗口，
      // 让整条牌带呈连续弧形（中间凸、两端略垂）
      const ang = (i - (total-1)/2) * PER_DEG;          // 该牌的旋转角度
      const drop = Math.abs(ang) * ARC_DROP;            // 离中心越远，越往下沉
      f.style.left = (i*STEP) + 'px';
      f.style.transformOrigin = '50% 150%';             // 旋转中心在牌底下方，形成扇面
      f.style.transform = `rotate(${ang.toFixed(2)}deg) translateY(${drop.toFixed(1)}px)`;
      f.dataset.ang = ang.toFixed(2);
      f.dataset.drop = drop.toFixed(1);
    });
    // 进入时把滚动条复位到最左
    const sc = $('.fan-scroll');
    if(sc) sc.scrollLeft = 0;
    updateCounter();
    $('#drawDone').classList.add('hidden');

    fan.addEventListener('click', onPickCard);
  }

  function onPickCard(e){
    const f = e.target.closest('.f');
    if(!f || f.classList.contains('sel')) return;
    const need = state.spread.positions.length;
    if(state.drawn.length >= need) return;
    f.classList.add('sel');
    // 沿当前扇面角度方向把牌抽起高亮
    const ang = parseFloat(f.dataset.ang || '0');
    const drop = parseFloat(f.dataset.drop || '0');
    f.style.transform = `rotate(${ang}deg) translateY(${(drop-26).toFixed(1)}px)`;
    if(navigator.vibrate) navigator.vibrate(20);
    // 你点击的牌背位置 ↔ 牌堆中对应的那一张牌（不重复，正逆位随机）
    const idx = parseInt(f.dataset.idx, 10) || 0;
    const card = state._fanDeck[idx % state._fanDeck.length];
    const reversed = Math.random() < 0.35;
    state.drawn.push({ card, reversed, position: state.spread.positions[state.drawn.length] });
    updateCounter();
    if(state.drawn.length >= need){
      setTimeout(()=> go('s-reveal'), 500);
    }
  }
  function updateCounter(){
    const need = state.spread.positions.length;
    const left = need - state.drawn.length;
    $('#drawCounter').innerHTML = left>0
      ? `还需选择 <b>${left}</b> 张　（已选 ${state.drawn.length}/${need}）`
      : `已选满 ${need} 张，正在揭晓…`;
  }

  // ---------- 翻牌揭晓 ----------
  function renderReveal(){
    const wrap = $('#revealCards');
    wrap.innerHTML = state.drawn.map((d,i)=>`
      <div class="reveal-item">
        <div class="flip" data-i="${i}">
          <div class="flip-inner">
            <div class="flip-face flip-back">${(typeof cardBackSVG==='function')?cardBackSVG():'☾'}</div>
            <div class="flip-face flip-front ${d.reversed?'rev':''}">${d.card.svg()}</div>
          </div>
        </div>
        <div class="reveal-pos">${d.position}</div>
        <div class="reveal-nm">${d.card.name}${d.reversed?'<span class="revtag">逆</span>':''}</div>
      </div>`).join('');
    $('#revealDone').classList.add('hidden');
    let flippedCount = 0;
    $$('.flip', wrap).forEach(fl=>{
      fl.addEventListener('click', ()=>{
        if(fl.classList.contains('done')) return;
        fl.classList.add('done');
        if(navigator.vibrate) navigator.vibrate(15);
        flippedCount++;
        if(flippedCount >= state.drawn.length){
          setTimeout(()=> $('#revealDone').classList.remove('hidden'), 500);
        }
      });
    });
  }

  // ---------- 解说 ----------
  function renderResult(){
    // 卡牌缩略
    $('#resultCards').innerHTML = state.drawn.map(d=>`
      <div class="rc">
        <div class="rc-img ${d.reversed?'rev':''}">${d.card.svg()}</div>
        <div class="rc-pos">${d.position} · ${d.card.name}</div>
      </div>`).join('');

    // 概要解读
    const parts = state.drawn.map(d=>{
      const txt = d.reversed ? d.card.rev : d.card.up;
      return `${d.position}是「${d.card.name}${d.reversed?'·逆位':''}」，${txt}`;
    });
    const qLine = state.question ? `关于你的提问「${state.question}」——` : '';
    $('#summaryText').textContent = qLine + parts.join(' ');

    // 重置深层解读
    $('#deepContent').classList.add('hidden');
    $('#deepBtn').classList.remove('hidden');
    $('#deepHint').classList.remove('hidden');

    state._saved = false;
  }

  // 深层解读：点击解锁
  $('#deepBtn').addEventListener('click', ()=>{
    // 逐牌位
    $('#deepCards').innerHTML = '<div class="rb-title"><svg class="ico"><use href="#i-orb"/></svg> 完整深度解读 <span class="free-tag">已解锁 · 免费</span></div>'
      + state.drawn.map((d,i)=>{
        const txt = d.reversed ? d.card.rev : d.card.up;
        return `<div class="sub-card">${['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'][i]||'•'} ${d.position} · ${d.card.name}（${d.reversed?'逆位':'正位'}）</div>
                <p>关键词：${d.card.kw}。${txt}</p>`;
      }).join('');

    // 能量关系（结合本次牌面动态生成）
    $('#energyText').textContent = buildEnergy();

    // 行动建议（结合各牌位含义动态生成）
    const advices = buildAdvice();

    $('#adviceList').innerHTML = advices.map((a,i)=>`<div class="li"><span class="b">${i+1}.</span><span>${a}</span></div>`).join('');

    // 幸运提示
    const pick = arr => arr[Math.floor(Math.random()*arr.length)];
    $('#luckyColor').textContent = pick(LUCKY.colors);
    $('#luckyWord').textContent  = pick(LUCKY.words);
    $('#luckyTime').textContent  = pick(LUCKY.times);

    $('#deepContent').classList.remove('hidden');
    $('#deepBtn').classList.add('hidden');
    $('#deepHint').classList.add('hidden');
    if(navigator.vibrate) navigator.vibrate(30);
    $('#deepContent').scrollIntoView({behavior:'smooth', block:'start'});
  });

  // ---------- 牌面分析工具 ----------
  // 判断大阿卡那
  function isMajor(card){ return /^大阿卡那/.test(card.arcana || ''); }
  // 取得小阿卡那花色（权杖/圣杯/宝剑/星币），大阿卡那返回 null
  function suitOf(card){
    const m = (card.arcana || '').match(/小阿卡那\s*·\s*(\S+)/);
    return m ? m[1] : null;
  }
  // 花色对应的能量领域描述
  const SUIT_FIELD = {
    '权杖':{ ele:'火', field:'行动、热情与事业开拓' },
    '圣杯':{ ele:'水', field:'情感、关系与内心感受' },
    '宝剑':{ ele:'风', field:'思绪、沟通与现实抉择' },
    '星币':{ ele:'土', field:'金钱、健康与现实根基' }
  };

  // ---------- 牌阵能量关系（结合本次实际牌面动态生成） ----------
  function buildEnergy(){
    const drawn = state.drawn;
    const n = drawn.length;
    const revCount = drawn.filter(d=>d.reversed).length;
    const majorCount = drawn.filter(d=>isMajor(d.card)).length;
    // 统计花色分布
    const suitCount = {};
    drawn.forEach(d=>{ const s=suitOf(d.card); if(s) suitCount[s]=(suitCount[s]||0)+1; });
    const suits = Object.keys(suitCount);

    const seg = [];

    // 1) 大/小阿卡那比例
    if(majorCount === 0){
      seg.push('本次抽到的全是小阿卡那，说明此事更多落在具体的日常细节与当下情境中，主动调整就能改善，无需过度担忧。');
    }else if(majorCount === n){
      seg.push('本次抽到的全是大阿卡那，提示此事正触及你较深层的人生主题与重要转折，值得你认真对待、用心抉择。');
    }else if(majorCount >= n/2){
      seg.push(`牌阵中大阿卡那偏多（${majorCount}/${n}），说明命运层面的力量较为活跃，外部趋势对结果影响较大，顺势而为更为关键。`);
    }else{
      seg.push(`牌阵以小阿卡那为主、辅以大阿卡那，意味着事情主要由你的日常选择推动，同时也有一两个关键节点值得把握。`);
    }

    // 2) 逆位占比
    if(revCount === 0){
      seg.push('全部为正位，能量流动顺畅、方向清晰，是积极推进的好时机。');
    }else if(revCount === n){
      seg.push('全部为逆位，提示当前能量多在内在酝酿或受阻，宜先向内梳理、休整蓄力，不必急于向外求成。');
    }else if(revCount >= n/2){
      seg.push(`逆位偏多（${revCount}/${n}），说明你内心或外部存在一些尚未理顺的阻滞，先处理这些卡点，事情会更顺。`);
    }else{
      seg.push(`出现 ${revCount} 张逆位，整体偏顺但仍有局部需要留意与调整。`);
    }

    // 3) 花色分布
    if(suits.length === 1 && suitCount[suits[0]] >= 2){
      const info = SUIT_FIELD[suits[0]];
      if(info) seg.push(`牌面能量集中在「${suits[0]}」（${info.ele}元素），核心议题明确落在${info.field}上，可重点围绕这一面着力。`);
    }else if(suits.length >= 3){
      seg.push('多种花色同时出现，说明此事牵涉面较广，需要兼顾情感、思考、行动与现实多个层面，保持平衡最为重要。');
    }

    return seg.join('');
  }

  // ---------- 行动建议（结合各牌位含义动态生成） ----------
  function buildAdvice(){
    const drawn = state.drawn;
    const list = [];
    // 取最具代表性的牌位生成针对性建议（最多取前 3 个牌位）
    const focus = drawn.slice(0, Math.min(3, drawn.length));
    focus.forEach(d=>{
      const kw = (d.card.kw || '').split(' · ')[0] || d.card.name;
      const suit = suitOf(d.card);
      const field = suit && SUIT_FIELD[suit] ? SUIT_FIELD[suit].field.split('、')[0] : '当下';
      if(d.reversed){
        list.push(`在「${d.position}」上，${d.card.name}逆位提醒你：${kw}的能量受阻，先放慢节奏、向内梳理，别急于在${field}方面下结论。`);
      }else{
        list.push(`在「${d.position}」上，${d.card.name}正位鼓励你：把握「${kw}」的力量，在${field}方面主动迈出踏实的一步。`);
      }
    });
    // 整体收尾建议：依据逆位占比
    const revCount = drawn.filter(d=>d.reversed).length;
    if(revCount === 0){
      list.push('整体牌面积极顺畅，信任自己的判断，大胆去争取你想要的。');
    }else if(revCount >= drawn.length/2){
      list.push('逆位较多，近期更适合休整与沉淀；先照顾好自己的状态，再谈推进。');
    }else{
      list.push('保持开放与耐心，顺应当下节奏，答案会随时间逐渐清晰。');
    }
    return list;
  }


  // ---------- 保存 / 历史记录 ----------
  const HKEY = 'moonmirror_history';
  function loadHistory(){ try{ return JSON.parse(localStorage.getItem(HKEY)||'[]'); }catch(e){ return []; } }
  function saveCurrent(){
    if(state._saved){ toast('已经保存过啦'); return; }
    const list = loadHistory();
    list.unshift({
      time: Date.now(),
      question: state.question || '今日指引',
      spread: state.spread.name,
      cards: state.drawn.map(d=>`${d.position}·${d.card.name}${d.reversed?'(逆)':''}`)
    });
    localStorage.setItem(HKEY, JSON.stringify(list.slice(0,50)));
    state._saved = true;
    toast('已保存到我的记录 ✨');
  }
  $('#saveBtn').addEventListener('click', saveCurrent);
  $('#shareBtn').addEventListener('click', ()=> toast('分享卡片功能开发中 🪄'));

  function renderHistory(){
    const list = loadHistory();
    const wrap = $('#historyList');
    if(!list.length){
      wrap.innerHTML = `<div class="empty"><div class="e-ic"><svg class="ico" style="width:40px;height:40px;color:var(--gold-soft)"><use href="#i-moon"/></svg></div>还没有占卜记录<br>去抽一次牌，记录此刻的心境吧</div>`;
      return;
    }
    wrap.innerHTML = list.map(h=>{
      const d = new Date(h.time);
      const tstr = `${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
      return `<div class="hist-item">
        <div class="hist-top"><span class="hist-q">${h.question}</span><span class="hist-time">${tstr}</span></div>
        <div class="hist-meta">${h.spread}</div>
        <div class="hist-cards">${h.cards.join('　·　')}</div>
      </div>`;
    }).join('');
  }

  // ---------- 塔罗百科 ----------
  function renderWiki(){
    // 入门知识
    if(!$('#wikiIntro').dataset.done){
      $('#wikiIntro').innerHTML = WIKI_INTRO.map(w=>`
        <div class="wiki-intro">
          <div class="wi-t">${w.t}</div>
          <p class="wi-c">${w.c}</p>
        </div>`).join('');
      $('#wikiIntro').dataset.done = '1';
    }
    // 牌库网格
    if(!$('#wikiGrid').dataset.done){
      $('#wikiGrid').innerHTML = TAROT.map((c,i)=>`
        <div class="wiki-card" data-card="${i}">
          <div class="wc-img">${c.svg()}</div>
          <div class="wc-name">${c.name}</div>
        </div>`).join('');
      $('#wikiGrid').dataset.done = '1';
      $$('.wiki-card', $('#wikiGrid')).forEach(el=>{
        el.addEventListener('click', ()=> openCardDetail(+el.getAttribute('data-card')));
      });
    }
  }
  function openCardDetail(i){
    const c = TAROT[i];
    $('#wdImg').innerHTML = c.svg();
    $('#wdName').textContent = c.name;
    $('#wdArcana').textContent = c.arcana;
    $('#wdKw').innerHTML = c.kw.split(' · ').map(k=>`<span class="kw-tag">${k}</span>`).join('');
    $('#wdDetail').textContent = c.detail;
    $('#wdUp').textContent = c.up;
    $('#wdRev').textContent = c.rev;
    go('s-wiki-detail');
  }

  // ---------- 我的 ----------
  function renderMine(){
    const list = loadHistory();
    $('#statCount').textContent = list.length;
    $('#statCards').textContent = TAROT.length;
    // 陪伴天数：以首次使用时间为准
    let first = localStorage.getItem('moonmirror_since');
    if(!first){ first = String(Date.now()); localStorage.setItem('moonmirror_since', first); }
    const days = Math.max(1, Math.ceil((Date.now() - (+first)) / 86400000));
    $('#statDays').textContent = days;
  }

  // ---------- 设置交互 ----------
  document.addEventListener('click', (e)=>{
    // 开关切换
    const sw = e.target.closest('.switch');
    if(sw){
      sw.classList.toggle('on');
      const name = sw.getAttribute('data-switch');
      if(name === 'notify') toast(sw.classList.contains('on') ? '已开启每日提醒' : '已关闭每日提醒');
      if(name === 'vibrate'){ settings.vibrate = sw.classList.contains('on'); toast(settings.vibrate ? '已开启震动反馈' : '已关闭震动反馈'); }
      return;
    }
    // 清除记录
    if(e.target.closest('#clearHistory')){
      if(confirm('确定清除全部占卜记录吗？此操作不可恢复。')){
        localStorage.removeItem(HKEY);
        toast('占卜记录已清空');
      }
      return;
    }
    // 通用 toast 行
    const tEl = e.target.closest('[data-toast]');
    if(tEl){ toast(tEl.getAttribute('data-toast')); return; }
  });

  // 全局震动开关
  const settings = { vibrate: true };

  // ---------- 右滑手势返回上一页 ----------
  (function initSwipeBack(){
    let startX = 0, startY = 0, tracking = false;
    const DIST = 60;     // 触发返回所需的水平滑动距离(px)
    const app = document.getElementById('app');
    if(!app) return;

    app.addEventListener('touchstart', (e)=>{
      if(e.touches.length !== 1){ tracking = false; return; }
      const t = e.touches[0];
      // 屏幕任意位置向右滑动都可返回；但若手指落在横向滚动区域（如抽牌牌带）内，
      // 则不识别为返回手势，避免与该区域的横向滚动冲突
      if(t.target.closest && t.target.closest('.fan-scroll, .no-swipe-back')){
        tracking = false; return;
      }
      tracking = true;
      startX = t.clientX;
      startY = t.clientY;
    }, { passive:true });

    app.addEventListener('touchend', (e)=>{
      if(!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      // 向右滑动且以水平方向为主（水平位移明显大于垂直位移）
      if(dx > DIST && Math.abs(dx) > Math.abs(dy) * 1.4){
        goBack();
      }
    }, { passive:true });
  })();

  // ---------- 登录 / 授权 / 隐私合规 ----------
  const PKEY = 'moonmirror_privacy_agreed';   // 是否已同意隐私
  const UKEY = 'moonmirror_user';             // 登录态：{type:'wx'|'phone'|'guest', name}

  function hasPrivacy(){ return localStorage.getItem(PKEY) === '1'; }
  function setUser(u){ localStorage.setItem(UKEY, JSON.stringify(u)); }
  function getUser(){ try{ return JSON.parse(localStorage.getItem(UKEY)||'null'); }catch(e){ return null; } }

  // 首次进入：隐私同意弹窗
  function maybeShowPrivacy(){
    if(hasPrivacy()) return;
    const mask = $('#privacyMask');
    if(mask) mask.classList.remove('hidden');
  }
  const privacyAgreeBtn = $('#privacyAgree');
  if(privacyAgreeBtn){
    privacyAgreeBtn.addEventListener('click', ()=>{
      localStorage.setItem(PKEY, '1');
      $('#privacyMask').classList.add('hidden');
      toast('感谢你的信任 🌙');
    });
  }
  const privacyRejectBtn = $('#privacyReject');
  if(privacyRejectBtn){
    privacyRejectBtn.addEventListener('click', ()=>{
      toast('需同意后方可使用，你可随时查看协议');
    });
  }

  // 登录页：必须先勾选协议
  function ensureAgreed(){
    const box = $('#agreeBox');
    if(box && !box.checked){
      toast('请先阅读并勾选同意协议');
      const label = box.closest('.agree');
      if(label){ label.classList.add('shake'); setTimeout(()=>label.classList.remove('shake'), 600); }
      return false;
    }
    return true;
  }
  function doLogin(type, name){
    if(!ensureAgreed()) return;
    setUser({ type, name, since: Date.now() });
    localStorage.setItem(PKEY, '1');  // 登录即视为已同意
    toast('登录成功，欢迎你 🌙');
    go('s-home');
  }
  const loginWxBtn = $('#loginWx');
  if(loginWxBtn) loginWxBtn.addEventListener('click', ()=>{ if(ensureAgreed()) go('s-auth'); });
  const loginPhoneBtn = $('#loginPhone');
  if(loginPhoneBtn) loginPhoneBtn.addEventListener('click', ()=> doLogin('phone', '星语者'));
  const loginGuestBtn = $('#loginGuest');
  if(loginGuestBtn) loginGuestBtn.addEventListener('click', ()=>{
    // 游客模式无需勾选，但不保存身份
    setUser({ type:'guest', name:'游客', since: Date.now() });
    toast('已进入游客模式，记录仅存于本机');
    go('s-home');
  });
  // 微信授权弹层「允许」→ 视为微信登录成功
  const authAllow = document.querySelector('#s-auth .btn.wx');
  if(authAllow){
    authAllow.addEventListener('click', ()=>{ setUser({ type:'wx', name:'微信用户', since: Date.now() }); });
  }

  // 退出登录
  const logoutBtn = $('#logoutBtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
      if(confirm('确定退出登录吗？')){
        localStorage.removeItem(UKEY);
        toast('已退出登录');
        go('s-login');
      }
    });
  }
  // 撤回隐私同意并清空数据
  const revokeBtn = $('#revokePrivacy');
  if(revokeBtn){
    revokeBtn.addEventListener('click', ()=>{
      if(confirm('撤回隐私同意将清空全部本地数据（占卜记录、登录态等），且需重新同意协议才能继续使用。确定吗？')){
        localStorage.removeItem(PKEY);
        localStorage.removeItem(UKEY);
        localStorage.removeItem(HKEY);
        localStorage.removeItem('moonmirror_since');
        toast('已撤回同意并清空数据');
        go('s-login');
        setTimeout(maybeShowPrivacy, 300);
      }
    });
  }

  // 我的页：根据登录态展示昵称
  const _renderMine = renderMine;
  renderMine = function(){
    _renderMine();
    const u = getUser();
    const nameEl = document.querySelector('.mine-name');
    const idEl = document.querySelector('.mine-id');
    if(u && nameEl){ nameEl.textContent = u.name || '星语者'; }
    if(u && idEl){
      const tag = u.type==='wx'?'微信用户':(u.type==='phone'?'手机号登录':'游客');
      idEl.textContent = 'ID: 202606 · ' + tag;
    }
  };

  // ---------- 初始化 ----------
  initHome();
  maybeShowPrivacy();


})();

