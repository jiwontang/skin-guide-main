window.addEventListener('load', () => {
  // ── DOM refs ──────────────────────────────────────────────
  const sliderMoisture = document.getElementById('slider-moisture');
  const sliderOil      = document.getElementById('slider-oil');
  const sliderCooling  = document.getElementById('slider-cooling');
  const valMoisture    = document.getElementById('val-moisture');
  const valOil         = document.getElementById('val-oil');
  const valCooling     = document.getElementById('val-cooling');
  const fillMoisture   = document.getElementById('fill-moisture');
  const fillOil        = document.getElementById('fill-oil');
  const fillCooling    = document.getElementById('fill-cooling');
  const findBtn        = document.getElementById('tx-find-btn');
  const retryBtn       = document.getElementById('tx-retry-btn');
  const resultWrap     = document.getElementById('tx-result-wrap');
  const blurOverlay    = document.getElementById('tx-blur-overlay');
  const resultCard     = document.getElementById('tx-result-card');

  // ── 슬라이더 트랙 채우기 + 썸 위치 업데이트 ─────────────
  function updateFill(slider, fill, valueEl) {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    fill.style.width = pct + '%';
    valueEl.textContent = slider.value;
    // CSS 변수로 썸 위치 전달
    slider.closest('.tx-slider-track-wrap').style.setProperty('--thumb-pct', pct + '%');
  }

  [
    [sliderMoisture, fillMoisture, valMoisture],
    [sliderOil,      fillOil,      valOil],
    [sliderCooling,  fillCooling,  valCooling],
  ].forEach(([s, f, v]) => {
    updateFill(s, f, v);
    s.addEventListener('input', () => updateFill(s, f, v));
  });

  // ── 결과 데이터 ──────────────────────────────────────────
  const routineDB = [
    // ── 고수분 + 저유분 + 고쿨링 → 여름 수분 폭탄
    {
      match: (m, o, c) => m >= 65 && o < 40 && c >= 55,
      title: '여름 수분 폭탄 루틴',
      subtitle: 'Hydra-Cooling Layer · 고수분 쿨링 집중',
      icon: '💦',
      desc: '열감이 있는 피부에 수분을 집중 공급하는 쿨링 레이어링입니다. 가볍고 시원한 제형으로 피부 온도를 낮추면서 수분을 채워줍니다.',
      steps: [
        { step: 'STEP 1', name: '쿨링 미스트 토너', text: '냉장 보관한 쿨링 토너를 화장솜 없이 손으로 가볍게 두드려 흡수시키세요. 피부 온도를 즉각 낮춰줍니다.' },
        { step: 'STEP 2', name: '히알루론산 앰플', text: '저분자·고분자 히알루론산 복합 앰플로 피부 깊은 층까지 수분을 채워주세요. 촉촉한 피부막이 형성됩니다.' },
        { step: 'STEP 3', name: '알로에 쿨링 젤', text: '알로에베라 95% 이상 함유 젤을 넉넉하게 발라 마무리하세요. 수분을 가두면서 열감을 진정시킵니다.' },
      ],
      avoid: '무거운 크림, 오일 제품 — 여름 고온 환경에서 모공을 막아 트러블을 유발할 수 있습니다.',
      tip: '젤 제품을 냉장 보관하면 쿨링 효과가 2배로 높아집니다.',
    },
    // ── 고수분 + 고유분 + 저쿨링 → 겨울 극보습
    {
      match: (m, o, c) => m >= 65 && o >= 55 && c < 40,
      title: '겨울 극보습 배리어 루틴',
      subtitle: 'Rich Barrier Layer · 고보습 장벽 강화',
      icon: '🧴',
      desc: '극건조 피부를 위한 풍부한 보습 레이어링입니다. 수분과 유분을 겹겹이 쌓아 피부 장벽을 완벽하게 복원합니다.',
      steps: [
        { step: 'STEP 1', name: '세라마이드 토너', text: '세라마이드 함유 토너로 피부 지질 구조를 복원하는 첫 단계를 시작하세요. 건조한 피부에 즉각적인 편안함을 줍니다.' },
        { step: 'STEP 2', name: '영양 크림', text: '시어버터, 스쿠알란 함유 리치 크림을 충분히 발라 두꺼운 보습막을 형성하세요. 수분 증발을 효과적으로 차단합니다.' },
        { step: 'STEP 3', name: '페이스 오일 밀봉', text: '로즈힙 또는 아르간 오일 2~3방울을 크림 위에 덧발라 완벽한 밀봉 효과를 완성하세요.' },
      ],
      avoid: '알코올 함유 토너, 강한 AHA 제품 — 건조한 피부의 수분막을 파괴합니다.',
      tip: '세안 후 3분 이내에 모든 스킨케어를 완료하면 수분 손실을 최소화할 수 있습니다.',
    },
    // ── 저수분 + 고유분 + 저쿨링 → 오일 클렌징 후 복구
    {
      match: (m, o, c) => m < 40 && o >= 55 && c < 40,
      title: '오일 밸런싱 복구 루틴',
      subtitle: 'Oil Balance Layer · 유분 중심 장벽 복구',
      icon: '✨',
      desc: '피부 지질 구조 복원에 집중하는 루틴입니다. 수분보다 유분 보호막이 더 필요한 피부 상태에 최적화되어 있습니다.',
      steps: [
        { step: 'STEP 1', name: '발란싱 에센스', text: '가벼운 오일 에센스로 피부 지질 밸런스를 맞춰주세요. 번들거림 없이 흡수되는 드라이 오일 타입을 선택하세요.' },
        { step: 'STEP 2', name: '리페어 크림', text: '세라마이드와 콜레스테롤이 함유된 리페어 크림으로 손상된 피부 지질 구조를 복원하세요.' },
        { step: 'STEP 3', name: '스쿠알란 오일', text: '스쿠알란 오일을 마지막에 소량 덧발라 피부 표면을 매끄럽게 마무리하세요.' },
      ],
      avoid: '강한 클렌징, 알코올 토너 — 이미 부족한 피부 유분을 더 제거합니다.',
      tip: '스쿠알란은 피부 친화성이 가장 높은 오일로, 지성 피부도 부담 없이 사용할 수 있습니다.',
    },
    // ── 중간 수분 + 중간 유분 + 고쿨링 → 진정 루틴
    {
      match: (m, o, c) => c >= 60,
      title: '민감 진정 쿨링 루틴',
      subtitle: 'Soothing Cool Layer · 열감 진정 집중',
      icon: '❄️',
      desc: '피부 열감과 붉음증을 진정시키는 데 집중하는 루틴입니다. 자극을 최소화하면서 피부 온도를 낮춰줍니다.',
      steps: [
        { step: 'STEP 1', name: '진정 토너', text: '판테놀, 마데카소사이드 함유 진정 토너를 냉장 보관 후 사용하세요. 즉각적인 열감 완화 효과가 있습니다.' },
        { step: 'STEP 2', name: '쿨링 세럼', text: '녹차 추출물, 센텔라 아시아티카 함유 세럼으로 피부 속 열감을 진정시키세요. 붉음증 완화에도 효과적입니다.' },
        { step: 'STEP 3', name: '가벼운 젤 크림', text: '오일 프리 젤 크림으로 가볍게 마무리하세요. 피부에 부담을 주지 않으면서 수분을 유지합니다.' },
      ],
      avoid: '레티놀, 고농도 AHA/BHA — 민감해진 피부에 추가 자극을 줄 수 있습니다.',
      tip: '냉장 보관한 제품을 사용하면 쿨링 효과가 극대화됩니다. 특히 여름철 자외선 노출 후 효과적입니다.',
    },
    // ── 고수분 + 중간 유분 + 중간 쿨링 → 봄 환절기
    {
      match: (m, o, c) => m >= 55 && o >= 35 && o < 65 && c >= 30 && c < 60,
      title: '봄 환절기 밸런싱 루틴',
      subtitle: 'Balance Layer · 수분·유분 균형 케어',
      icon: '🌸',
      desc: '수분과 유분의 균형을 맞추는 올라운드 레이어링입니다. 환절기 피부 변화에 유연하게 대응하는 루틴입니다.',
      steps: [
        { step: 'STEP 1', name: '약산성 토너', text: 'pH 5.5 약산성 토너로 피부 산도를 정상화하고 다음 제품의 흡수를 준비하세요.' },
        { step: 'STEP 2', name: '히알루론산 세럼', text: '저분자 히알루론산 세럼으로 피부 깊은 층에 수분을 공급하세요. 가볍게 흡수되어 끈적임이 없습니다.' },
        { step: 'STEP 3', name: '밸런싱 크림', text: '수분과 유분이 균형 잡힌 밸런싱 크림으로 마무리하세요. 지성과 건성 부위 모두에 적합합니다.' },
      ],
      avoid: '너무 무거운 오일 크림 — 환절기 피부의 피지 분비를 자극할 수 있습니다.',
      tip: '아침에는 가벼운 젤 크림, 저녁에는 영양 크림으로 AM/PM 루틴을 다르게 구성하면 더욱 효과적입니다.',
    },
    // ── 기본 (매칭 없음) → 기본 데일리 루틴
    {
      match: () => true,
      title: '데일리 에센셜 루틴',
      subtitle: 'Daily Essential Layer · 기본 수분 케어',
      icon: '💎',
      desc: '어떤 피부 상태에도 적합한 기본 레이어링 루틴입니다. 피부 장벽을 건강하게 유지하는 핵심 단계로 구성되어 있습니다.',
      steps: [
        { step: 'STEP 1', name: '수분 토너', text: '글리세린, 베타인 함유 수분 토너로 피부 기초 수분을 채워주세요. 화장솜보다 손으로 두드려 흡수시키는 것이 효과적입니다.' },
        { step: 'STEP 2', name: '나이아신아마이드 세럼', text: '피지 조절과 미백 효과를 동시에 제공하는 나이아신아마이드 세럼을 바르세요. 모든 피부 타입에 적합합니다.' },
        { step: 'STEP 3', name: '데일리 모이스처라이저', text: '피부 타입에 맞는 보습제로 마무리하세요. 지성은 젤 타입, 건성은 크림 타입을 선택하세요.' },
      ],
      avoid: '여러 활성 성분의 동시 사용 — 처음에는 단순한 루틴으로 시작하여 피부 반응을 확인하세요.',
      tip: '스킨케어의 핵심은 꾸준함입니다. 복잡한 루틴보다 간단하더라도 매일 지속하는 것이 더 중요합니다.',
    },
  ];

  // ── 결과 매칭 ─────────────────────────────────────────────
  function findRoutine(m, o, c) {
    return routineDB.find(r => r.match(m, o, c)) || routineDB[routineDB.length - 1];
  }

  // ── 결과 렌더링 ───────────────────────────────────────────
  function renderResult(routine, m, o, c) {
    const stepsHTML = routine.steps.map(s => `
      <div class="tx-step">
        <span class="tx-step__badge">${s.step}</span>
        <h4 class="tx-step__name">${s.name}</h4>
        <p class="tx-step__text">${s.text}</p>
      </div>
    `).join('');

    resultCard.innerHTML = `
      <div class="tx-result__header">
        <span class="tx-result__icon">${routine.icon}</span>
        <div>
          <h3 class="tx-result__title">${routine.title}<br><small class="tx-result__subtitle">${routine.subtitle}</small></h3>
        </div>
      </div>

      <div class="tx-result__meters">
        <div class="tx-meter">
          <span class="tx-meter__label">💧 수분감</span>
          <div class="tx-meter__bar"><div class="tx-meter__fill" style="width:${m}%"></div></div>
          <span class="tx-meter__val">${m}</span>
        </div>
        <div class="tx-meter">
          <span class="tx-meter__label">✨ 유분감</span>
          <div class="tx-meter__bar"><div class="tx-meter__fill" style="width:${o}%"></div></div>
          <span class="tx-meter__val">${o}</span>
        </div>
        <div class="tx-meter">
          <span class="tx-meter__label">❄️ 쿨링감</span>
          <div class="tx-meter__bar"><div class="tx-meter__fill" style="width:${c}%"></div></div>
          <span class="tx-meter__val">${c}</span>
        </div>
      </div>

      <p class="tx-result__desc">${routine.desc}</p>

      <div class="tx-steps-grid">${stepsHTML}</div>

      <div class="tx-result__footer">
        <div class="tx-footer-box tx-footer-box--warn">
          <h4 class="tx-footer-box__title">⛔ 피해야 할 제형</h4>
          <p class="tx-footer-box__text">${routine.avoid}</p>
        </div>
        <div class="tx-footer-box tx-footer-box--tip">
          <h4 class="tx-footer-box__title">💡 레이어링 팁</h4>
          <p class="tx-footer-box__text">${routine.tip}</p>
        </div>
      </div>

      <p class="tx-disclaimer">※ 본 추천은 슬라이더 값 기반의 참고 가이드이며, 개인 피부 상태에 따라 다를 수 있습니다.</p>
    `;
  }

  // ── 조합 찾기 버튼 ────────────────────────────────────────
  findBtn.addEventListener('click', () => {
    const m = parseInt(sliderMoisture.value);
    const o = parseInt(sliderOil.value);
    const c = parseInt(sliderCooling.value);
    const routine = findRoutine(m, o, c);

    renderResult(routine, m, o, c);

    resultWrap.style.display = 'block';
    findBtn.style.display    = 'none';
    retryBtn.style.display   = 'block';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        blurOverlay.classList.add('is-revealed');
      });
    });

    setTimeout(() => {
      resultWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  });

  // ── 다시 조절하기 버튼 ────────────────────────────────────
  retryBtn.addEventListener('click', () => {
    resultWrap.style.display = 'none';
    blurOverlay.classList.remove('is-revealed');
    resultCard.innerHTML = '';
    findBtn.style.display  = 'block';
    retryBtn.style.display = 'none';
    document.getElementById('tool-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
