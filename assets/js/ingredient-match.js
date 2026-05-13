/**
 * ingredient-match.js
 * 드래그앤드롭 + 클릭 양방향 성분 매칭 인터랙션
 * ─────────────────────────────────────────────
 * 1. 성분 카드 → 드래그 또는 클릭으로 슬롯 A/B에 배치
 * 2. 두 슬롯이 채워지면 '궁합 분석하기' 버튼 활성화
 * 3. 버튼 클릭 시 COMBOS 데이터로 결과 렌더링
 */
(function () {
  'use strict';

  /* ── 성분 메타데이터 ── */
  const INGREDIENTS = {
    VC: { nick: '까칠한 비타민C',       icon: '🍋' },
    RT: { nick: '밤의 레티놀',          icon: '🌙' },
    NA: { nick: '만능 나이아신아마이드', icon: '💎' },
    AB: { nick: '날카로운 AHA/BHA',     icon: '⚗️' },
    HA: { nick: '수분자석 히알루론산',  icon: '💧' },
    PE: { nick: '조용한 펩타이드',      icon: '🔬' },
  };

  /* ── 조합 결과 데이터 ──
     key: 두 id를 알파벳 오름차순으로 정렬 후 '+' 연결
     grade: 'great' | 'caution' | 'avoid' | 'neutral'
  */
  const COMBOS = {
    'RT+VC': {
      grade: 'avoid',
      badge: '⚠️ 충돌 주의',
      title: '까칠한 비타민C + 밤의 레티놀',
      principle: `비타민C(L-아스코르브산)는 <strong>pH 2.5~3.5</strong>의 강산성 환경에서 흡수율이 최대화됩니다. 레티놀은 <strong>pH 5.5~7</strong>의 중성 환경에서 활성을 유지합니다. 두 성분을 동시에 사용하면 서로의 최적 pH 범위를 방해해 <em>두 성분 모두 효능이 크게 저하</em>됩니다. 또한 비타민C는 산화에 취약해 레티놀과 함께 사용 시 산화 반응이 가속화됩니다.`,
      skinEffect: `비타민C의 항산화·미백 효과와 레티놀의 세포 재생·주름 개선 효과가 <strong>모두 반감</strong>됩니다. 민감성 피부는 두 성분이 동시에 각질층을 자극해 <em>홍조, 따가움, 박피 현상</em>이 나타날 수 있습니다.`,
      usage: [
        { time: '아침', desc: '비타민C 세럼 → 보습제 → 자외선 차단제 (SPF 30 이상 필수)' },
        { time: '저녁', desc: '보습 크림 → 레티놀 (버퍼링 기법으로 자극 완화)' },
        { time: '주기', desc: '레티놀 초보자는 주 2~3회부터 시작, 4~6주 후 빈도 증가' },
      ],
    },

    'AB+RT': {
      grade: 'avoid',
      badge: '⚠️ 충돌 주의',
      title: '날카로운 AHA/BHA + 밤의 레티놀',
      principle: `AHA/BHA는 각질층을 화학적으로 용해하는 <strong>산성 각질 제거제</strong>입니다. 레티놀은 세포 회전율을 높여 새 피부 세포 생성을 촉진합니다. 동시에 사용하면 각질 제거와 세포 재생이 과도하게 일어나 <em>피부 장벽이 급격히 얇아집니다.</em>`,
      skinEffect: `AHA/BHA가 각질을 제거한 직후 레티놀을 사용하면 레티놀이 예상보다 깊은 층까지 침투해 <strong>과도한 자극 반응</strong>을 유발합니다. 극심한 건조함, 홍조, 접촉성 피부염으로 이어질 수 있습니다.`,
      usage: [
        { time: '월·수·금', desc: 'AHA/BHA 각질 제거 (저녁 루틴)' },
        { time: '화·목·토', desc: '레티놀 적용 (AHA/BHA 사용 다음 날)' },
        { time: '공통', desc: '두 성분 사용 후 세라마이드·판테놀 보습제로 장벽 보충' },
      ],
    },

    'NA+VC': {
      grade: 'neutral',
      badge: '🤝 조건부 병용 가능',
      title: '까칠한 비타민C + 만능 나이아신아마이드',
      principle: `과거 연구에서 두 성분이 반응해 <strong>니코틴산</strong>을 생성한다는 우려가 있었습니다. 그러나 이 반응은 <em>고온(50°C 이상)·고농도 환경</em>에서만 유의미하게 발생합니다. 현대 화장품 제형 기술과 일반 사용 조건에서는 거의 일어나지 않는다는 것이 최신 피부과학의 결론입니다.`,
      skinEffect: `두 성분은 오히려 <strong>시너지 효과</strong>를 낼 수 있습니다. 비타민C의 항산화·콜라겐 합성 촉진 효과와 나이아신아마이드의 미백·피부 장벽 강화 효과가 상호 보완적으로 작용합니다.`,
      usage: [
        { time: '아침', desc: '비타민C 세럼 → 2~3분 흡수 대기 → 나이아신아마이드 세럼 → 자외선 차단제' },
        { time: '저녁', desc: '나이아신아마이드 세럼 → 보습 크림' },
        { time: '팁', desc: '비타민C 완전 흡수 후 나이아신아마이드 적용 시 자극 최소화' },
      ],
    },

    'HA+VC': {
      grade: 'great',
      badge: '✨ 최고의 조합',
      title: '까칠한 비타민C + 수분자석 히알루론산',
      principle: `비타민C는 강산성 환경에서 흡수율이 높지만 일시적 자극을 줄 수 있습니다. 히알루론산은 <strong>pH 중립적인 수분 보유 성분</strong>으로, 자기 무게의 1,000배 수분을 각질층에 붙잡아 둡니다. 두 성분은 pH 간섭 없이 각자의 역할을 완벽하게 수행합니다.`,
      skinEffect: `비타민C가 콜라겐 합성을 촉진하고 산화 스트레스를 방어하는 동안, 히알루론산은 <em>피부 수분 장벽을 강화</em>해 비타민C 사용 후 건조함을 즉각 보완합니다. <strong>탄력·광채·수분감</strong>이 동시에 개선됩니다.`,
      usage: [
        { time: '아침', desc: '비타민C 세럼 → 히알루론산 세럼 (촉촉한 피부에 적용 시 흡수율 UP) → 자외선 차단제' },
        { time: '저녁', desc: '히알루론산 토너/세럼 → 보습 크림' },
        { time: '팁', desc: '히알루론산은 피부가 약간 촉촉한 상태에서 적용해야 수분 보유 효과 극대화' },
      ],
    },

    'HA+NA': {
      grade: 'great',
      badge: '✨ 최고의 조합',
      title: '만능 나이아신아마이드 + 수분자석 히알루론산',
      principle: `두 성분은 <strong>pH 범위가 유사(pH 5~7)</strong>해 서로 간섭 없이 함께 사용할 수 있습니다. 나이아신아마이드는 세라마이드 합성을 촉진하고, 히알루론산은 각질층 수분을 직접 보충합니다.`,
      skinEffect: `나이아신아마이드의 <em>미백·모공 축소·피지 조절</em> 효과와 히알루론산의 <em>즉각적인 수분 공급</em> 효과가 결합되어, 피부 톤이 균일해지면서 촉촉하고 탄탄한 피부 결을 만들어 줍니다.`,
      usage: [
        { time: '아침', desc: '히알루론산 토너 → 나이아신아마이드 세럼 → 가벼운 보습제 → 자외선 차단제' },
        { time: '저녁', desc: '히알루론산 토너 → 나이아신아마이드 세럼 → 보습 크림' },
        { time: '팁', desc: '두 성분 모두 자극이 적어 민감성 피부도 매일 사용 가능' },
      ],
    },

    'PE+RT': {
      grade: 'caution',
      badge: '🌤 조건부 사용',
      title: '밤의 레티놀 + 조용한 펩타이드',
      principle: `레티놀의 산성 환경(pH 4~5)이 일부 펩타이드의 <strong>구조적 안정성을 저하</strong>시킬 수 있습니다. 특히 구리 펩타이드(Copper Peptide)는 레티놀과 함께 사용 시 레티놀을 분해할 수 있어 주의가 필요합니다.`,
      skinEffect: `일반 신호 펩타이드는 레티놀과 함께 사용해도 큰 문제가 없지만, <em>구리 펩타이드는 반드시 분리 사용</em>해야 합니다. 두 성분을 함께 사용하면 레티놀의 효능이 저하될 수 있습니다.`,
      usage: [
        { time: '아침', desc: '펩타이드 세럼 → 보습제 → 자외선 차단제' },
        { time: '저녁', desc: '레티놀 세럼 → 보습 크림 (펩타이드와 레티놀은 다른 시간대 사용 권장)' },
        { time: '주의', desc: '구리 펩타이드 제품은 레티놀과 절대 같은 날 사용 금지' },
      ],
    },

    'AB+HA': {
      grade: 'great',
      badge: '✨ 황금 조합',
      title: '날카로운 AHA/BHA + 수분자석 히알루론산',
      principle: `AHA/BHA는 각질층을 제거하지만 이 과정에서 <strong>피부 수분이 손실</strong>될 수 있습니다. 히알루론산은 각질 제거 후 노출된 새 피부에 즉각적인 수분을 공급해 장벽 회복을 돕습니다.`,
      skinEffect: `AHA/BHA 사용 후 히알루론산을 적용하면 <em>건조함과 당김 현상이 크게 완화</em>됩니다. 새로 드러난 피부 세포에 수분이 충분히 공급되어 피부 재생이 빠르게 이루어집니다.`,
      usage: [
        { time: '저녁', desc: 'AHA/BHA 토너/세럼 (5~10분 흡수) → 히알루론산 세럼 → 보습 크림' },
        { time: '아침', desc: '히알루론산 토너 → 보습제 → 자외선 차단제 (AHA/BHA 다음 날 자외선 차단 필수)' },
        { time: '팁', desc: 'AHA/BHA 사용 후 히알루론산 외 다른 활성 성분은 당일 사용 자제' },
      ],
    },

    'NA+PE': {
      grade: 'great',
      badge: '✨ 최고의 조합',
      title: '만능 나이아신아마이드 + 조용한 펩타이드',
      principle: `두 성분은 <strong>pH 범위가 동일(pH 5~7)</strong>하고 작용 메커니즘이 상호 보완적입니다. 나이아신아마이드는 세라마이드 합성을 촉진하고, 펩타이드는 콜라겐·엘라스틴 합성을 신호 전달 방식으로 촉진합니다.`,
      skinEffect: `<em>피부 장벽 강화 + 탄력 개선 + 미백</em>이 동시에 이루어지는 이상적인 안티에이징 조합입니다. 두 성분 모두 자극이 없어 민감성 피부에도 안전합니다.`,
      usage: [
        { time: '아침', desc: '나이아신아마이드 세럼 → 펩타이드 크림 → 자외선 차단제' },
        { time: '저녁', desc: '나이아신아마이드 세럼 → 펩타이드 크림 (매일 사용 가능)' },
        { time: '팁', desc: '레티놀·AHA/BHA 사용 후 피부 회복기에도 안심하고 사용 가능' },
      ],
    },
  };

  /* ── 상태 ── */
  let slotA = null; // 슬롯 A에 배치된 ingredient id
  let slotB = null; // 슬롯 B에 배치된 ingredient id
  let draggingId = null; // 현재 드래그 중인 id

  /* ── DOM 참조 ── */
  const source     = document.getElementById('im-source');
  const slotAEl    = document.getElementById('im-slot-a');
  const slotBEl    = document.getElementById('im-slot-b');
  const removeABtn = document.getElementById('im-remove-a');
  const removeBBtn = document.getElementById('im-remove-b');
  const analyzeBtn = document.getElementById('im-analyze-btn');
  const resultEl   = document.getElementById('result-text');
  const resetWrap  = document.getElementById('im-reset-wrap');
  const resetBtn   = document.getElementById('im-reset-btn');

  if (!source || !slotAEl || !slotBEl || !analyzeBtn || !resultEl) return;

  /* ════════════════════════════════════════
     드래그앤드롭 — 성분 카드
     ════════════════════════════════════════ */
  source.addEventListener('dragstart', function (e) {
    const card = e.target.closest('.ingredient-card');
    if (!card || card.classList.contains('is-used')) { e.preventDefault(); return; }
    draggingId = card.dataset.ingredient;
    card.classList.add('is-dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggingId);
  });

  source.addEventListener('dragend', function (e) {
    const card = e.target.closest('.ingredient-card');
    if (card) card.classList.remove('is-dragging');
    draggingId = null;
  });

  /* 슬롯 드롭 이벤트 */
  [slotAEl, slotBEl].forEach(function (slot) {
    slot.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      slot.classList.add('drag-over');
    });

    slot.addEventListener('dragleave', function () {
      slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', function (e) {
      e.preventDefault();
      slot.classList.remove('drag-over');
      const id = e.dataTransfer.getData('text/plain') || draggingId;
      if (!id) return;
      const which = slot === slotAEl ? 'a' : 'b';
      placeIngredient(which, id);
    });
  });

  /* ════════════════════════════════════════
     클릭 — 성분 카드 (모바일 대응)
     ════════════════════════════════════════ */
  source.addEventListener('click', function (e) {
    const card = e.target.closest('.ingredient-card');
    if (!card || card.classList.contains('is-used')) return;
    const id = card.dataset.ingredient;
    // 빈 슬롯에 순서대로 배치
    if (!slotA) placeIngredient('a', id);
    else if (!slotB && slotA !== id) placeIngredient('b', id);
  });

  /* 키보드 접근성 (Enter/Space) */
  source.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.ingredient-card');
    if (!card || card.classList.contains('is-used')) return;
    e.preventDefault();
    const id = card.dataset.ingredient;
    if (!slotA) placeIngredient('a', id);
    else if (!slotB && slotA !== id) placeIngredient('b', id);
  });

  /* ════════════════════════════════════════
     슬롯 배치 / 제거
     ════════════════════════════════════════ */
  function placeIngredient(slot, id) {
    const ing = INGREDIENTS[id];
    if (!ing) return;

    if (slot === 'a') {
      slotA = id;
      document.getElementById('im-slot-a-icon').textContent = ing.icon;
      document.getElementById('im-slot-a-name').textContent = ing.nick;
      slotAEl.classList.add('has-card');
      slotAEl.setAttribute('aria-label', '슬롯 A — ' + ing.nick);
    } else {
      slotB = id;
      document.getElementById('im-slot-b-icon').textContent = ing.icon;
      document.getElementById('im-slot-b-name').textContent = ing.nick;
      slotBEl.classList.add('has-card');
      slotBEl.setAttribute('aria-label', '슬롯 B — ' + ing.nick);
    }

    syncCardStates();
    syncAnalyzeBtn();
    hideResult();
  }

  function removeSlot(slot) {
    if (slot === 'a') {
      slotA = null;
      document.getElementById('im-slot-a-icon').textContent = '';
      document.getElementById('im-slot-a-name').textContent = '';
      slotAEl.classList.remove('has-card');
      slotAEl.setAttribute('aria-label', '슬롯 A — 비어있음');
    } else {
      slotB = null;
      document.getElementById('im-slot-b-icon').textContent = '';
      document.getElementById('im-slot-b-name').textContent = '';
      slotBEl.classList.remove('has-card');
      slotBEl.setAttribute('aria-label', '슬롯 B — 비어있음');
    }
    syncCardStates();
    syncAnalyzeBtn();
    hideResult();
  }

  removeABtn.addEventListener('click', function (e) { e.stopPropagation(); removeSlot('a'); });
  removeBBtn.addEventListener('click', function (e) { e.stopPropagation(); removeSlot('b'); });

  /* ── 카드 상태 동기화 ── */
  function syncCardStates() {
    source.querySelectorAll('.ingredient-card').forEach(function (card) {
      const id = card.dataset.ingredient;
      card.classList.remove('is-used');
      if (id === slotA || id === slotB) card.classList.add('is-used');
    });
  }

  /* ── 분석 버튼 활성화 ── */
  function syncAnalyzeBtn() {
    const ready = !!(slotA && slotB);
    analyzeBtn.classList.toggle('is-ready', ready);
    analyzeBtn.setAttribute('aria-disabled', ready ? 'false' : 'true');
  }

  /* ════════════════════════════════════════
     궁합 분석 — 결과 렌더링
     ════════════════════════════════════════ */
  analyzeBtn.addEventListener('click', function () {
    if (!slotA || !slotB) return;
    const key  = [slotA, slotB].sort().join('+');
    const data = COMBOS[key] || buildDefault(slotA, slotB);
    renderResult(data);
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function buildDefault(a, b) {
    return {
      grade: 'neutral',
      badge: '🤝 일반 조합',
      title: INGREDIENTS[a].nick + ' + ' + INGREDIENTS[b].nick,
      principle: `<strong>${INGREDIENTS[a].nick}</strong>와 <strong>${INGREDIENTS[b].nick}</strong>는 직접적인 pH 충돌이나 산화 반응을 일으키지 않는 조합입니다. 두 성분 모두 피부 장벽에 이로운 성분으로, 함께 사용해도 큰 문제가 없습니다.`,
      skinEffect: `각 성분의 고유한 효능이 유지됩니다. 새로운 성분 조합을 처음 시도할 때는 반드시 <em>패치 테스트</em>를 먼저 진행하세요.`,
      usage: [
        { time: '기본 원칙', desc: '가벼운 제형(세럼·토너) → 무거운 제형(크림·오일) 순서로 적용' },
        { time: '팁', desc: '한 번에 여러 새 성분을 추가하지 말고, 한 가지씩 루틴에 편입하여 피부 반응을 확인하세요' },
      ],
    };
  }

  function renderResult(data) {
    const g = data.grade;
    const timelineHTML = data.usage.map(function (s) {
      return `<div class="im-timeline__step">
        <span class="im-timeline__time">${s.time}</span>
        <span class="im-timeline__desc">${s.desc}</span>
      </div>`;
    }).join('');

    resultEl.innerHTML = `
      <div class="im-result__head im-result__head--${g}">
        <span class="im-result__badge im-result__badge--${g}">${data.badge}</span>
        <h2 class="im-result__title">${data.title}</h2>
      </div>
      <div class="im-result__body im-result__body--${g}">
        <div class="im-result__block">
          <h3 class="im-result__block-title">🔬 충돌·시너지 원리</h3>
          <p class="im-result__block-text">${data.principle}</p>
        </div>
        <div class="im-result__block">
          <h3 class="im-result__block-title">🛡️ 피부 장벽에 미치는 영향</h3>
          <p class="im-result__block-text">${data.skinEffect}</p>
        </div>
        <div class="im-result__block">
          <h3 class="im-result__block-title">📅 올바른 사용법</h3>
          <div class="im-timeline">${timelineHTML}</div>
        </div>
      </div>`;

    resultEl.classList.add('is-visible');
    resetWrap.classList.add('is-visible');
  }

  function hideResult() {
    resultEl.classList.remove('is-visible');
    resultEl.innerHTML = '';
    resetWrap.classList.remove('is-visible');
  }

  /* ── 리셋 ── */
  resetBtn.addEventListener('click', function () {
    removeSlot('a');
    removeSlot('b');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
