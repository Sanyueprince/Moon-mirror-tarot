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
  }

  // 返回上一页：栈空时停留在首页（绝不退出小程序）
  function goBack(){
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
  function trapHistory(){ history.pushState({ mm:true }, ''); }
  window.addEventListener('popstate', () => {
    trapHistory();   // 立即补一个历史记录，防止真正退出
    goBack();        // 执行内部返回逻辑
  });
  trapHistory();     // 初始化时放置一个「陷阱」历史记录


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

  // ---------- 抽牌：扇形 ----------
  function renderFan(){
    const need = state.spread.positions.length;
    const fan = $('#fan');
    const total = Math.min(13, Math.max(7, need*2+5)); // 展示的牌背数量
    // 洗一副完整且不重复的 78 张牌，每个牌背位置对应牌堆里的一张牌
    state._fanDeck = shuffleArray(TAROT.slice());
    state.drawn = [];
    fan.innerHTML = '';
    const spread = 120; // 总角度
    for(let i=0;i<total;i++){
      const f = document.createElement('div');
      f.className = 'f';
      const angle = -spread/2 + (spread/(total-1))*i;
      f.style.transform = `rotate(${angle}deg)`;
      f.dataset.idx = i;
      fan.appendChild(f);
    }
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
            <div class="flip-face flip-back">☾</div>
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

    // 能量关系
    $('#energyText').textContent = ENERGY_HINTS[Math.floor(Math.random()*ENERGY_HINTS.length)];

    // 行动建议（根据牌生成）
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

  function buildAdvice(){
    const pool = [
      '主动而坦诚地沟通一次，把心里的想法说开。',
      '给自己和他人一点时间，别被一时情绪带跑。',
      '回顾你已经拥有的美好，重拾内心的信心。',
      '把注意力放回自己身上，先照顾好自己的状态。',
      '顺应当下的节奏，不必强求立刻有答案。',
      '记录此刻的感受，过一段时间再回看会更清晰。',
      '勇敢迈出小小的第一步，行动会带来新的转机。'
    ];
    const hasReversed = state.drawn.some(d=>d.reversed);
    const list = shuffleArray(pool).slice(0,3);
    list.push(hasReversed ? '逆位提醒：放慢脚步，先处理内在的不安，再做决定。'
                          : '牌面整体积极，把握当下，大胆去争取你想要的。');
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
    const EDGE = 40;     // 从屏幕左缘起手的判定区域(px)
    const DIST = 70;     // 触发返回所需的水平滑动距离(px)
    const app = document.getElementById('app');
    if(!app) return;

    app.addEventListener('touchstart', (e)=>{
      if(e.touches.length !== 1){ tracking = false; return; }
      const t = e.touches[0];
      // 仅当从屏幕左缘起手时才识别为返回手势，避免与页面内横向滑动冲突
      tracking = t.clientX <= EDGE;
      startX = t.clientX;
      startY = t.clientY;
    }, { passive:true });

    app.addEventListener('touchend', (e)=>{
      if(!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      // 向右滑动且以水平方向为主
      if(dx > DIST && Math.abs(dx) > Math.abs(dy) * 1.5){
        goBack();
      }
    }, { passive:true });
  })();

  // ---------- 初始化 ----------
  initHome();


})();
