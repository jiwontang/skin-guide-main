/**
 * match-logic.js
 * 성분 매칭 — 드래그앤드롭 + 클릭 인터랙션 & 결과 출력
 *
 * ── 데이터 추가 방법 ──────────────────────────────────
 * ingredientData 객체에 키를 추가하면 됩니다.
 * 키 규칙: 두 성분 ID를 알파벳 오름차순으로 정렬 후 '+' 연결
 *   예) 비타민C(VC) + 레티놀(RT) → 'RT+VC'
 *       나이아신아마이드(NA) + 히알루론산(HA) → 'HA+NA'
 *
 * 성분 ID 목록:
 *   VC  까칠한 비타민C
 *   RT  밤의 레티놀
 *   NA  만능 나이아신아마이드
 *   AB  날카로운 AHA/BHA
 *   HA  수분자석 히알루론산
 *   PE  조용한 펩타이드
 * ─────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════
     1. 성분 메타데이터
     ═══════════════════════════════════════════════════ */
  var INGREDIENTS = {
    VC: { nick: '까칠한 비타민C',        icon: '🍋' },
    RT: { nick: '밤의 레티놀',           icon: '🌙' },
    NA: { nick: '만능 나이아신아마이드',  icon: '💎' },
    AB: { nick: '날카로운 AHA/BHA',      icon: '⚗️' },
    HA: { nick: '수분자석 히알루론산',   icon: '💧' },
    PE: { nick: '조용한 펩타이드',       icon: '🔬' },
  };

  /* ═══════════════════════════════════════════════════
     2. 조합 결과 데이터
        ── 여기에 조합을 추가하세요 ──
     ═══════════════════════════════════════════════════ */
  var ingredientData = {

    /* ── 샘플 조합 1개: 비타민C(VC) + 히알루론산(HA) ── */
    'HA+VC': {
      grade:   'great',
      badge:   '✨ 천생연분 조합',
      title:   '까칠한 비타민C + 수분자석 히알루론산',
      summary: '어떤 누구와 만나도 다 받아주는 바다 같은 마음의 소유자, 최고의 파트너!',
      principle: '히알루론산은 자기 몸무게의 1,000배에 달하는 수분을 끌어당기는 \'수분 자석\'입니다. 성격이 매우 온화하고 중립적이라 비타민C, 레티놀, AHA 등 어떤 까다로운 성분과 만나도 그들의 자극을 부드럽게 감싸 안아줍니다.',
      skinEffect: '강력한 기능성 성분들은 피부를 건조하게 만들기 쉬운데, 히알루론산이 옆에서 즉각적으로 수분을 공급해주면 장벽 손상을 최소화할 수 있습니다. 피부의 수분 통로를 열어주어 다른 유효 성분들이 더 깊숙이 흡수되도록 돕는 \'길잡이\' 역할까지 수행합니다.',
      prescription: [
        { time: '루틴', desc: '모든 스킨케어 단계에 히알루론산을 배치하세요.' },
        { time: '팁',   desc: '비타민C를 바르기 전후에 히알루론산 앰플을 사용하면, 자극은 줄이고 보습감은 꽉 채운 완벽한 루틴을 완성할 수 있습니다.' },
      ],
    },

    /* ── 비타민C(VC) + 레티놀(RT) 조합 ── */
    'RT+VC': {
      grade:   'avoid',
      badge:   '⚡ 불꽃 튀는 상극 조합',
      title:   '까칠한 비타민C + 밤의 레티놀',
      summary: '이 관계, 한마디로 정의하자면 "자존심 센 두 천재의 파멸적인 만남"입니다. 각자의 분야에서는 독보적인 1등이지만, 한 공간에 두면 서로를 갉아먹는 전형적인 상극이죠. 비타민C는 낮의 태양 아래서 빛나는 화려한 인플루언서 같고, 레티놀은 밤의 어둠 속에서 조용히 세상을 바꾸는 철학자 같습니다. 둘이 동시에 데이트를 즐기려다간 피부라는 소중한 공간이 아수라장이 될 수 있으니 주의가 필요해요!',
      principle: '두 사람의 성향(pH) 차이가 너무 큽니다. 비타민C는 pH 3.5 이하의 아주 차갑고 날카로운 "산성" 분위기에서만 본인의 능력을 100% 발휘하는 예민한 성격이에요. 반면 레티놀은 pH 5.5~6.5 정도의 편안하고 중성적인 대화를 선호하죠. 이 둘을 같은 시간에 만나게 하면 비타민C는 레티놀의 철학을 비웃고, 레티놀은 비타민C의 날카로움에 상처받아 결국 둘 다 아무런 효능도 보여주지 못한 채 퇴장해버립니다. 효율 0%의 최악의 미팅이 되는 셈이죠.',
      skinEffect: '이 커플이 억지로 손을 잡고 피부 장벽에 나타나면, 피부 장벽은 "비상사태"를 선포합니다. 비타민C의 강력한 산성과 레티놀의 거침없는 세포 재생(턴오버) 압박이 만나면, 피부는 과부하가 걸려 붉게 달아오르거나 각질이 일어나고 따가운 통증을 호소하게 됩니다. 피부 장벽이라는 든든한 울타리가 순식간에 무너져 내려 예민 보스 피부로 변할 수 있어요. 아름다워지려다 오히려 피부 건강을 해치는 "독이 든 성배" 같은 관계입니다.',
      prescription: [
        { time: '아침', desc: '비타민C는 "낮의 수호자"로 임명하세요. 자외선으로부터 피부를 보호하도록 아침 루틴에 배치하고, 반드시 자외선 차단제로 마무리하세요.' },
        { time: '저녁', desc: '레티놀은 "밤의 마법사"입니다. 해가 진 뒤, 비타민C와의 피로한 관계에서 벗어나 홀로 피부를 재생시킬 수 있도록 저녁 루틴에만 초대하세요.' },
        { time: '팁',   desc: '꼭 두 성분을 모두 쓰고 싶다면 "아침 비타민C, 저녁 레티놀" 공식을 지키거나, 요일을 나누어 사용하는 "거리두기 데이트"를 강력 추천합니다.' },
      ],
    },
 
    /* ── 비타민C(VC) + 나이아신아마이드(NA) 조합 ── */
    'NA+VC': {
      grade:   'caution',
      badge:   '⚠️ 주의 깊은 시너지',
      title:   '까칠한 비타민C + 만능 나이아신아마이드',
      summary: '열정적인 두 분, 하지만 너무 뜨거우면 서로를 밀어낼지도 몰라요!',
      principle: '비타민C(L-아스코르브산)는 아주 까칠한 산성 환경(pH 3.5 이하)을 좋아하지만, 나이아신아마이드는 평온한 중성 환경(pH 5.0~7.0)에서 가장 행복해합니다. 두 사람이 한 공간에 있으면 비타민C의 산성 성분이 나이아신아마이드를 자극해 \'나이아신\'이라는 성분으로 변하게 하여, 피부를 붉고 따갑게 만드는 \'플러싱 현상\'을 유도할 수 있습니다.',
      skinEffect: '최근 연구에 따르면 두 성분을 같이 쓴다고 해서 효과가 사라지는 것은 아니지만, 예민한 피부라면 일시적인 붉은기와 열감을 경험할 수 있습니다. 특히 비타민C의 효능이 반감될 수 있어 주의가 필요합니다.',
      prescription: [
        { time: '아침', desc: '항산화 효과가 좋은 비타민C를 사용하여 낮 동안의 외부 자극으로부터 피부를 보호하세요.' },
        { time: '저녁', desc: '피부 장벽을 튼튼하게 해주는 나이아신아마이드를 사용하여 피부를 진정시키고 회복하세요.' },
        { time: '팁',   desc: '만약 꼭 같이 쓰고 싶다면 비타민C를 먼저 바르고 15분 정도 충분히 흡수시킨 뒤 나이아신아마이드를 얹어주는 매너를 발휘해 보세요.' },
      ],
    },
 
    /* ── AHA/BHA(AB) + 레티놀(RT) 조합 ── */
    'AB+RT': {
      grade:   'avoid',
      badge:   '🔥 폭발 주의 조합',
      title:   '날카로운 AHA/BHA + 밤의 레티놀',
      summary: '각자의 개성이 너무 강해요! 만나면 폭발할 위험이 있는 불꽃 조합입니다.',
      principle: 'AHA/BHA는 피부 겉면의 죽은 세포를 걷어내는 \'청소부\' 역할을 하고, 레티놀은 피부 깊숙한 곳에서 새로운 세포를 만들어내는 \'공사 현장 소장님\' 역할을 합니다. 둘 다 피부에 아주 강력한 자극을 주는 성분이기 때문에, 동시에 만나면 피부는 쉴 틈 없이 공격받는 기분을 느끼게 됩니다.',
      skinEffect: '이 두 성분이 한꺼번에 몰아치면 피부 장벽이 급격히 얇아지면서 극심한 건조함, 각질 일어남, 심지어는 접촉성 피부염으로 이어질 수 있습니다. 피부 건강을 지키기 위한 핵심은 바로 이 과도한 자극을 피하는 것입니다.',
      prescription: [
        { time: '주의', desc: '이 두 성분은 절대로 같은 날 사용하지 마세요. 피부가 쉴 틈이 필요합니다.' },
        { time: '루틴', desc: '각질 제거(AHA/BHA)를 한 뒤에는 최소 1~2일의 휴식기를 갖고 레티놀을 사용하세요.' },
        { time: '팁',   desc: '\'격일 사용\' 혹은 \'주 1~2회 사용\' 루틴을 통해 피부가 스스로 회복할 시간을 충분히 주는 것이 고수의 비결입니다.' },
      ],
    },

    /* ── 히알루론산(HA) + 기타 성분 조합 ── */
    'HA+RT': {
      grade:   'great',
      badge:   '✨ 천생연분 조합',
      title:   '밤의 레티놀 + 수분자석 히알루론산',
      summary: '어떤 누구와 만나도 다 받아주는 바다 같은 마음의 소유자, 최고의 파트너!',
      principle: '히알루론산은 자기 몸무게의 1,000배에 달하는 수분을 끌어당기는 \'수분 자석\'입니다. 성격이 매우 온화하고 중립적이라 비타민C, 레티놀, AHA 등 어떤 까다로운 성분과 만나도 그들의 자극을 부드럽게 감싸 안아줍니다.',
      skinEffect: '레티놀은 피부를 건조하게 만들기 쉬운데, 히알루론산이 옆에서 즉각적으로 수분을 공급해주면 장벽 손상을 최소화할 수 있습니다. 피부의 수분 통로를 열어주어 레티놀이 더 건강하게 흡수되도록 돕습니다.',
      prescription: [
        { time: '루틴', desc: '레티놀 사용 전후에 히알루론산을 듬뿍 발라주세요.' },
        { time: '팁',   desc: '레티놀의 자극이 걱정된다면 히알루론산 세럼과 레티놀을 믹스해서 사용하는 것도 좋은 방법입니다.' },
      ],
    },

    'HA+NA': {
      grade:   'great',
      badge:   '✨ 천생연분 조합',
      title:   '만능 나이아신아마이드 + 수분자석 히알루론산',
      summary: '어떤 누구와 만나도 다 받아주는 바다 같은 마음의 소유자, 최고의 파트너!',
      principle: '히알루론산은 수분을 끌어당기고, 나이아신아마이드는 피부 장벽을 튼튼하게 하여 수분이 빠져나가지 않게 가두어줍니다. 두 성분은 완벽한 보습 시너지를 냅니다.',
      skinEffect: '두 성분 모두 자극이 적어 민감성 피부도 안심하고 사용할 수 있으며, 피부 결 개선과 수분 광채 효과를 동시에 기대할 수 있습니다.',
      prescription: [
        { time: '루틴', desc: '히알루론산 토너 후 나이아신아마이드 세럼 순으로 사용하세요.' },
        { time: '팁',   desc: '속건조가 심한 날에는 두 성분이 포함된 제품을 레이어링하면 효과가 배가됩니다.' },
      ],
    },

    'AB+HA': {
      grade:   'great',
      badge:   '✨ 천생연분 조합',
      title:   '날카로운 AHA/BHA + 수분자석 히알루론산',
      summary: '어떤 누구와 만나도 다 받아주는 바다 같은 마음의 소유자, 최고의 파트너!',
      principle: 'AHA/BHA가 각질을 제거하면 피부가 일시적으로 건조해질 수 있는데, 이때 히알루론산이 즉각적으로 수분을 채워주어 피부를 진정시킵니다.',
      skinEffect: '각질 제거 후 민감해진 피부를 히알루론산이 부드럽게 감싸주어 자극을 줄이고, 정돈된 피부 결 사이로 수분이 더 잘 스며들게 돕습니다.',
      prescription: [
        { time: '루틴', desc: 'AHA/BHA로 각질을 정돈한 직후 히알루론산 제품으로 수분을 공급하세요.' },
        { time: '팁',   desc: '필링 후에는 평소보다 더 많은 양의 히알루론산을 사용하여 피부를 진정시키는 것이 중요합니다.' },
      ],
    },

    'HA+PE': {
      grade:   'great',
      badge:   '✨ 천생연분 조합',
      title:   '조용한 펩타이드 + 수분자석 히알루론산',
      summary: '어떤 누구와 만나도 다 받아주는 바다 같은 마음의 소유자, 최고의 파트너!',
      principle: '펩타이드는 피부 탄력을 지원하고, 히알루론산은 수분 볼륨을 채워줍니다. 탄력과 수분의 만남은 안티에이징 루틴의 정석입니다.',
      skinEffect: '피부 속 탄력(펩타이드)과 겉 수분(히알루론산)을 동시에 케어하여 탱탱하고 촉촉한 피부 바탕을 완성합니다.',
      prescription: [
        { time: '루틴', desc: '펩타이드와 히알루론산은 어느 순서에 사용해도 무방하며, 함께 사용 시 흡수력이 좋아집니다.' },
        { time: '팁',   desc: '고농축 펩타이드 제품 사용 전 히알루론산으로 피부 길을 열어주면 더욱 효과적입니다.' },
      ],
    },

  };

  /* ═══════════════════════════════════════════════════
     3. 상태 변수
     ═══════════════════════════════════════════════════ */
  var slotA      = null;   // 슬롯 A에 배치된 성분 ID
  var slotB      = null;   // 슬롯 B에 배치된 성분 ID
  var draggingId = null;   // 현재 드래그 중인 성분 ID

  /* ═══════════════════════════════════════════════════
     4. DOM 참조 (Null 방어 포함)
     ═══════════════════════════════════════════════════ */
  var sourceEl   = document.getElementById('im-source');
  var slotAEl    = document.getElementById('im-slot-a');
  var slotBEl    = document.getElementById('im-slot-b');
  var iconAEl    = document.getElementById('im-slot-a-icon');
  var nameAEl    = document.getElementById('im-slot-a-name');
  var iconBEl    = document.getElementById('im-slot-b-icon');
  var nameBEl    = document.getElementById('im-slot-b-name');
  var removeABtn = document.getElementById('im-remove-a');
  var removeBBtn = document.getElementById('im-remove-b');
  var analyzeBtn = document.getElementById('im-analyze-btn');
  var resultEl   = document.getElementById('result-text');
  var resetWrap  = document.getElementById('im-reset-wrap');
  var resetBtn   = document.getElementById('im-reset-btn');

  // 필수 요소가 하나라도 없으면 조용히 종료
  if (!sourceEl || !slotAEl || !slotBEl || !analyzeBtn || !resultEl) {
    console.warn('[match-logic] 필수 DOM 요소를 찾을 수 없습니다. ingredient-match.html에서만 동작합니다.');
    return;
  }

  /* ═══════════════════════════════════════════════════
     5. 드래그앤드롭 — 성분 카드 → 슬롯
     ═══════════════════════════════════════════════════ */

  // 5-1. 드래그 시작
  sourceEl.addEventListener('dragstart', function (e) {
    var card = e.target.closest('.ingredient-card');
    if (!card || card.classList.contains('is-used')) {
      e.preventDefault();
      return;
    }
    draggingId = card.dataset.ingredient;
    card.classList.add('is-dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggingId);
  });

  // 5-2. 드래그 종료 (카드 원위치 스타일 복원)
  sourceEl.addEventListener('dragend', function (e) {
    var card = e.target.closest('.ingredient-card');
    if (card) card.classList.remove('is-dragging');
    draggingId = null;
  });

  // 5-3. 슬롯 dragover / dragleave / drop
  [slotAEl, slotBEl].forEach(function (slot) {

    slot.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      slot.classList.add('drag-over');
    });

    slot.addEventListener('dragleave', function (e) {
      // 자식 요소로 이동할 때 오발 방지
      if (!slot.contains(e.relatedTarget)) {
        slot.classList.remove('drag-over');
      }
    });

    slot.addEventListener('drop', function (e) {
      e.preventDefault();
      slot.classList.remove('drag-over');
      var id = e.dataTransfer.getData('text/plain') || draggingId;
      if (!id) return;
      placeIngredient(slot === slotAEl ? 'a' : 'b', id);
    });
  });

  /* ═══════════════════════════════════════════════════
     6. 클릭 배치 (모바일 / 터치 대응)
     ═══════════════════════════════════════════════════ */
  sourceEl.addEventListener('click', function (e) {
    var card = e.target.closest('.ingredient-card');
    if (!card || card.classList.contains('is-used')) return;
    var id = card.dataset.ingredient;
    if (!slotA) {
      placeIngredient('a', id);
    } else if (!slotB && slotA !== id) {
      placeIngredient('b', id);
    }
  });

  // 키보드 접근성 (Enter / Space)
  sourceEl.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.ingredient-card');
    if (!card || card.classList.contains('is-used')) return;
    e.preventDefault();
    var id = card.dataset.ingredient;
    if (!slotA) {
      placeIngredient('a', id);
    } else if (!slotB && slotA !== id) {
      placeIngredient('b', id);
    }
  });

  /* ═══════════════════════════════════════════════════
     7. 슬롯 배치 / 제거 헬퍼
     ═══════════════════════════════════════════════════ */
  function placeIngredient(slot, id) {
    var ing = INGREDIENTS[id];
    if (!ing) return;

    if (slot === 'a') {
      slotA = id;
      if (iconAEl) iconAEl.textContent = ing.icon;
      if (nameAEl) nameAEl.textContent = ing.nick;
      slotAEl.classList.add('has-card');
      slotAEl.setAttribute('aria-label', '슬롯 A — ' + ing.nick);
    } else {
      slotB = id;
      if (iconBEl) iconBEl.textContent = ing.icon;
      if (nameBEl) nameBEl.textContent = ing.nick;
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
      if (iconAEl) iconAEl.textContent = '';
      if (nameAEl) nameAEl.textContent = '';
      slotAEl.classList.remove('has-card');
      slotAEl.setAttribute('aria-label', '슬롯 A — 비어있음');
    } else {
      slotB = null;
      if (iconBEl) iconBEl.textContent = '';
      if (nameBEl) nameBEl.textContent = '';
      slotBEl.classList.remove('has-card');
      slotBEl.setAttribute('aria-label', '슬롯 B — 비어있음');
    }
    syncCardStates();
    syncAnalyzeBtn();
    hideResult();
  }

  // 제거 버튼
  if (removeABtn) {
    removeABtn.addEventListener('click', function (e) {
      e.stopPropagation();
      removeSlot('a');
    });
  }
  if (removeBBtn) {
    removeBBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      removeSlot('b');
    });
  }

  /* ═══════════════════════════════════════════════════
     8. 카드 상태 동기화 (사용 중 카드 dim 처리)
     ═══════════════════════════════════════════════════ */
  function syncCardStates() {
    var cards = sourceEl.querySelectorAll('.ingredient-card');
    cards.forEach(function (card) {
      var id = card.dataset.ingredient;
      card.classList.toggle('is-used', id === slotA || id === slotB);
    });
  }

  /* ═══════════════════════════════════════════════════
     9. 분석 버튼 활성/비활성 제어
        두 슬롯이 모두 채워져야만 활성화
     ═══════════════════════════════════════════════════ */
  function syncAnalyzeBtn() {
    var ready = !!(slotA && slotB);
    analyzeBtn.classList.toggle('is-ready', ready);
    analyzeBtn.setAttribute('aria-disabled', ready ? 'false' : 'true');
    analyzeBtn.disabled = !ready;
  }

  /* ═══════════════════════════════════════════════════
     10. 결과 렌더링
     ═══════════════════════════════════════════════════ */
  analyzeBtn.addEventListener('click', function () {
    if (!slotA || !slotB) return;

    // 키 생성: 알파벳 오름차순 정렬
    var key  = [slotA, slotB].sort().join('+');
    var data = ingredientData[key] || buildDefaultResult(slotA, slotB);

    renderResult(data);

    // 결과 영역으로 부드럽게 스크롤
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // 등록되지 않은 조합의 기본 결과
  function buildDefaultResult(a, b) {
    var nameA = (INGREDIENTS[a] || {}).nick || a;
    var nameB = (INGREDIENTS[b] || {}).nick || b;
    return {
      grade:   'neutral',
      badge:   '🤝 일반 조합',
      title:   nameA + ' + ' + nameB,
      summary: '아직 분석 데이터가 준비되지 않은 조합입니다. 기본 원칙에 따라 사용하세요.',
      principle: '두 성분 사이에 알려진 직접적인 pH 충돌이나 산화 반응은 없습니다. 각 성분의 최적 pH 범위를 확인하고, 가벼운 제형부터 무거운 제형 순서로 적용하는 기본 레이어링 원칙을 따르세요.',
      skinEffect: '각 성분의 고유한 효능은 유지됩니다. 새로운 성분 조합을 처음 시도할 때는 반드시 팔 안쪽에 패치 테스트를 48시간 진행한 후 이상 반응이 없을 때 얼굴에 적용하세요.',
      prescription: [
        { time: '기본 원칙', desc: '가벼운 제형(토너·세럼) → 무거운 제형(크림·오일) 순서로 적용합니다.' },
        { time: '팁',        desc: '한 번에 여러 새 성분을 추가하지 말고, 한 가지씩 루틴에 편입해 피부 반응을 확인하세요.' },
      ],
    };
  }

  function renderResult(data) {
    if (!resultEl) return;

    var g = data.grade || 'neutral';

    // 처방전 타임라인 HTML 생성
    var timelineHTML = '';
    if (Array.isArray(data.prescription)) {
      data.prescription.forEach(function (step) {
        timelineHTML +=
          '<div class="im-timeline__step">' +
            '<span class="im-timeline__time">' + escapeHTML(step.time) + '</span>' +
            '<span class="im-timeline__desc">' + escapeHTML(step.desc) + '</span>' +
          '</div>';
      });
    }

    // 면책 조항
    var disclaimerHTML =
      '<div class="im-result__disclaimer">' +
        '<p>⚠️ <strong>의료 면책 조항:</strong> 본 결과는 의학적 진단을 대신하지 않으며, ' +
        '개인의 피부 상태에 따라 다를 수 있습니다. 피부 질환·알레르기·민감 반응이 있는 경우 ' +
        '반드시 피부과 전문의와 상담하시기 바랍니다.</p>' +
      '</div>';

    resultEl.innerHTML =
      '<div class="im-result__head im-result__head--' + g + '">' +
        '<span class="im-result__badge im-result__badge--' + g + '">' + (data.badge || '') + '</span>' +
        '<h2 class="im-result__title">' + escapeHTML(data.title || '') + '</h2>' +
      '</div>' +
      '<div class="im-result__body im-result__body--' + g + '">' +

        '<div class="im-result__block">' +
          '<h3 class="im-result__block-title">💬 조합 총평</h3>' +
          '<p class="im-result__block-text">' + escapeHTML(data.summary || '') + '</p>' +
        '</div>' +

        '<div class="im-result__block">' +
          '<h3 class="im-result__block-title">🔬 원리 분석 (pH · 산화 반응)</h3>' +
          '<p class="im-result__block-text">' + escapeHTML(data.principle || '') + '</p>' +
        '</div>' +

        '<div class="im-result__block">' +
          '<h3 class="im-result__block-title">🛡️ 피부 장벽에 미치는 영향</h3>' +
          '<p class="im-result__block-text">' + escapeHTML(data.skinEffect || '') + '</p>' +
        '</div>' +

        '<div class="im-result__block">' +
          '<h3 class="im-result__block-title">📋 전문가 처방전</h3>' +
          '<div class="im-timeline">' + timelineHTML + '</div>' +
        '</div>' +

        disclaimerHTML +

      '</div>';

    resultEl.classList.add('is-visible');
    if (resetWrap) resetWrap.classList.add('is-visible');
  }

  function hideResult() {
    if (!resultEl) return;
    resultEl.classList.remove('is-visible');
    resultEl.innerHTML = '';
    if (resetWrap) resetWrap.classList.remove('is-visible');
  }

  /* ═══════════════════════════════════════════════════
     11. 리셋
     ═══════════════════════════════════════════════════ */
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      removeSlot('a');
      removeSlot('b');
      window.scrollTo({ behavior: 'smooth', top: 0 });
    });
  }

  /* ═══════════════════════════════════════════════════
     12. 유틸 — XSS 방지용 HTML 이스케이프
     ═══════════════════════════════════════════════════ */
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

})();
