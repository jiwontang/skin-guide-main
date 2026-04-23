window.addEventListener('load', () => {
  const answers = { q1: null, q2: null, q3: null };
  const revealBtn = document.getElementById('pc-reveal-btn');
  const resultWrap = document.getElementById('pc-result-wrap');
  const blurOverlay = document.getElementById('pc-blur-overlay');
  const resultCard = document.getElementById('pc-result-card');
  const retryBtn = document.getElementById('pc-retry-btn');

  // ── 결과 데이터 ──────────────────────────────────────────
  const results = {
    spring: {
      persona: '☀️ 햇살을 머금은 코랄 듀이',
      typename: 'Spring Warm Tone · 봄 웜톤',
      desc: '생기 넘치는 복숭아빛 피부에 빛이 스며드는 듯한 글로우 제형이 가장 잘 어울립니다. 선명하고 따뜻한 컬러가 얼굴을 환하게 밝혀줍니다.',
      palette: [
        { color: '#F4A460', label: '코랄 피치' },
        { color: '#FF7F7F', label: '살몬 레드' },
        { color: '#FFB347', label: '망고 오렌지' },
        { color: '#FFDAB9', label: '피치 누드' },
      ],
      lip: '글로우 틴트 · 워터 틴트',
      lipDesc: '입술에 물기를 머금은 듯한 글로우 틴트 제형을 추천합니다. 코랄·피치·살몬 계열이 피부를 환하게 살려줍니다.',
      blusher: '코랄 · 피치 블러셔',
      blusherDesc: '광택감 있는 크림 블러셔를 광대뼈 위에 가볍게 올려 생기를 더하세요.',
      avoid: '차가운 버건디, 짙은 플럼, 블루 베이스 핑크 계열은 피부를 칙칙하게 만들 수 있습니다.',
      tip: '하이라이터는 샴페인 골드 계열을 선택하면 봄 웜톤 특유의 빛나는 피부를 극대화할 수 있습니다.',
    },
    autumn: {
      persona: '🍂 낙엽 위의 테라코타 무드',
      typename: 'Autumn Warm Tone · 가을 웜톤',
      desc: '깊고 따뜻한 어스 톤이 피부의 고급스러운 분위기를 살려줍니다. 매트하고 벨벳감 있는 제형이 가장 잘 어울립니다.',
      palette: [
        { color: '#C0622A', label: '테라코타' },
        { color: '#8B4513', label: '브릭 레드' },
        { color: '#D2691E', label: '번트 오렌지' },
        { color: '#BC8F5F', label: '카멜 누드' },
      ],
      lip: '매트 립스틱 · 벨벳 틴트',
      lipDesc: '벨벳처럼 부드럽게 밀착되는 매트 제형을 추천합니다. 테라코타·브릭·번트 오렌지 계열이 가을 웜톤의 깊이를 살려줍니다.',
      blusher: '테라코타 · 브릭 블러셔',
      blusherDesc: '파우더 블러셔를 광대뼈 아래에서 위로 쓸어 올리듯 바르면 입체감이 살아납니다.',
      avoid: '차가운 핫핑크, 라벤더, 실버 계열은 피부를 어둡고 탁하게 보이게 합니다.',
      tip: '브론저를 이마와 턱선에 가볍게 쓸어주면 가을 웜톤 특유의 건강한 태닝 느낌을 연출할 수 있습니다.',
    },
    summer: {
      persona: '🌸 안개 속의 라벤더 블러',
      typename: 'Summer Cool Tone · 여름 쿨톤',
      desc: '부드럽고 안개 낀 듯한 뮤트 쿨 컬러가 피부의 섬세한 아름다움을 살려줍니다. 촉촉하고 투명한 워터 제형이 가장 잘 어울립니다.',
      palette: [
        { color: '#C8A0C8', label: '라벤더 핑크' },
        { color: '#B0C4DE', label: '파우더 블루' },
        { color: '#DDA0DD', label: '소프트 플럼' },
        { color: '#E8D5E8', label: '로즈 누드' },
      ],
      lip: '워터 틴트 · 쉬어 립스틱',
      lipDesc: '촉촉하게 스며드는 워터 틴트 제형을 추천합니다. 라벤더 핑크·로즈·소프트 플럼 계열이 여름 쿨톤의 청순함을 극대화합니다.',
      blusher: '로즈 · 라벤더 블러셔',
      blusherDesc: '가루처럼 가벼운 파우더 블러셔를 광대뼈 전체에 넓게 펴 발라 안개 낀 듯한 무드를 연출하세요.',
      avoid: '강렬한 오렌지, 코랄, 골드 계열은 피부를 붉고 탁하게 보이게 합니다.',
      tip: '실버 하이라이터를 눈 아래 삼각존에 가볍게 올리면 여름 쿨톤 특유의 투명한 피부 표현이 완성됩니다.',
    },
    winter: {
      persona: '❄️ 서리 내린 체리 블라썸',
      typename: 'Winter Cool Tone · 겨울 쿨톤',
      desc: '선명하고 강렬한 쿨 컬러가 겨울 쿨톤의 날카로운 아름다움을 완성합니다. 크리미하고 발색력 강한 제형이 가장 잘 어울립니다.',
      palette: [
        { color: '#C71585', label: '딥 로즈' },
        { color: '#8B0000', label: '버건디' },
        { color: '#4B0082', label: '플럼' },
        { color: '#F0F0F5', label: '아이시 누드' },
      ],
      lip: '크리미 립스틱 · 글로시 틴트',
      lipDesc: '선명한 발색의 크리미 립스틱을 추천합니다. 버건디·딥 로즈·플럼 계열이 겨울 쿨톤의 강렬한 존재감을 살려줍니다.',
      blusher: '딥 로즈 · 버건디 블러셔',
      blusherDesc: '크림 블러셔를 광대뼈 위에 소량만 올려 자연스럽게 블렌딩하면 세련된 인상을 줍니다.',
      avoid: '따뜻한 피치, 코랄, 골드 계열은 피부를 칙칙하고 노랗게 보이게 합니다.',
      tip: '아이시 실버 하이라이터를 코끝과 큐피드 보우에 포인트로 올리면 겨울 쿨톤 특유의 차갑고 선명한 피부가 완성됩니다.',
    },
  };

  // ── 진단 로직 ─────────────────────────────────────────────
  function determineType() {
    const { q1, q2, q3 } = answers;
    const warmScore =
      (q1 === 'warm' ? 1 : 0) +
      (q2 === 'warm' ? 1 : 0);
    const isWarm = warmScore >= 1;

    if (isWarm) {
      return q3 === 'vivid' || q3 === 'muted' ? 'spring' : 'autumn';
    } else {
      return q3 === 'pastel' || q3 === 'muted' ? 'summer' : 'winter';
    }
  }

  // ── 결과 렌더링 ───────────────────────────────────────────
  function renderResult(type) {
    const r = results[type];

    const paletteHTML = r.palette.map(p => `
      <div class="pc-palette__block">
        <div class="pc-palette__color" style="background:${p.color};"></div>
        <div class="pc-palette__label">${p.label}</div>
      </div>
    `).join('');

    resultCard.innerHTML = `
      <div class="pc-result__header" style="margin-bottom:2.4rem;">
        <h3 class="pc-result__persona">${r.persona}<br><small class="pc-result__typename">${r.typename}</small></h3>
        <p class="pc-result__desc">${r.desc}</p>
      </div>

      <div class="pc-palette">${paletteHTML}</div>

      <div class="pc-recommend-grid">
        <div class="pc-rec-section">
          <h4 class="pc-rec-section__title">💄 추천 립 제형</h4>
          <p class="pc-rec-section__text"><strong>${r.lip}</strong><br>${r.lipDesc}</p>
        </div>
        <div class="pc-rec-section">
          <h4 class="pc-rec-section__title">🌸 추천 블러셔</h4>
          <p class="pc-rec-section__text"><strong>${r.blusher}</strong><br>${r.blusherDesc}</p>
        </div>
        <div class="pc-rec-section pc-rec-section--tip">
          <h4 class="pc-rec-section__title">💡 하이라이터 팁</h4>
          <p class="pc-rec-section__text">${r.tip}</p>
        </div>
      </div>

      <div class="pc-rec-section pc-rec-section--warn" style="margin-top:1.6rem;">
        <h4 class="pc-rec-section__title">⛔ 피해야 할 컬러</h4>
        <p class="pc-rec-section__text">${r.avoid}</p>
      </div>

      <p class="pc-disclaimer">※ 본 결과는 참고용 가이드이며, 전문 퍼스널 컬러 진단사의 진단을 대신하지 않습니다.</p>
    `;
  }

  // ── 칩 카드 클릭 ──────────────────────────────────────────
  document.querySelectorAll('.chip-card').forEach(card => {
    card.addEventListener('click', () => {
      const q = card.dataset.q;
      const val = card.dataset.value;

      // 같은 질문의 다른 칩 비활성화
      document.querySelectorAll(`.chip-card[data-q="${q}"]`).forEach(c => {
        c.classList.remove('is-selected');
      });
      card.classList.add('is-selected');
      answers[q] = val;

      // 모두 선택됐으면 버튼 활성화
      if (answers.q1 && answers.q2 && answers.q3) {
        revealBtn.classList.add('is-ready');
        revealBtn.disabled = false;
      }
    });
  });

  // ── 결과 열기 버튼 ────────────────────────────────────────
  revealBtn.addEventListener('click', () => {
    const type = determineType();
    renderResult(type);

    resultWrap.classList.add('is-visible');
    revealBtn.style.display = 'none';
    retryBtn.style.display = 'block';

    // 블러 오버레이 → 1.5초 후 서서히 제거
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        blurOverlay.classList.add('is-revealed');
      });
    });

    setTimeout(() => {
      resultWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  });

  // ── 재진단 버튼 ───────────────────────────────────────────
  retryBtn.addEventListener('click', () => {
    answers.q1 = null;
    answers.q2 = null;
    answers.q3 = null;

    document.querySelectorAll('.chip-card').forEach(c => c.classList.remove('is-selected'));

    revealBtn.classList.remove('is-ready');
    revealBtn.disabled = true;
    revealBtn.style.display = 'block';
    retryBtn.style.display = 'none';

    resultWrap.classList.remove('is-visible');
    blurOverlay.classList.remove('is-revealed');
    resultCard.innerHTML = '';

    document.getElementById('tool-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
