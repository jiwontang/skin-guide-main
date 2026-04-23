window.addEventListener('load', () => {
  const loaderIcon = document.getElementById('wx-loader-icon');
  const loaderSub  = document.getElementById('wx-loader-sub');
  const revealBtn  = document.getElementById('wx-reveal-btn');
  const resultWrap = document.getElementById('wx-result-wrap');
  const blurOverlay = document.getElementById('wx-blur-overlay');
  const resultCard  = document.getElementById('wx-result-card');

  // ── 계절 데이터 ──────────────────────────────────────────
  const seasonData = {
    spring: {
      icon: '🌸',
      season: '봄',
      months: '3 · 4 · 5월',
      alert: '환절기 미세먼지 및 건조 경보',
      alertLevel: 'warn',
      desc: '겨울 동안 손상된 피부 장벽이 회복되는 시기이지만, 미세먼지와 황사로 인한 산화 스트레스가 극대화됩니다. 지금 피부는 가볍고 촉촉한 레이어링이 필요합니다.',
      routines: [
        {
          step: 'STEP 1',
          title: '약산성 클렌징',
          text: 'pH 5.5 약산성 클렌저로 미세먼지를 부드럽게 제거하세요. 강한 세정력은 오히려 장벽을 무너뜨립니다.',
          color: 'accent',
        },
        {
          step: 'STEP 2',
          title: '가벼운 수분 레이어링',
          text: '에센스 → 세럼 → 가벼운 젤 크림 순으로 얇게 레이어링하여 수분을 단계적으로 채워주세요.',
          color: 'accent',
        },
        {
          step: 'STEP 3',
          title: '진정 & 장벽 강화',
          text: '판테놀, 마데카소사이드 함유 제품으로 환절기 민감 반응을 진정시키고 장벽을 재건하세요.',
          color: 'mint',
        },
      ],
      avoid: '고농도 레티놀, 강산성 AHA 제품은 환절기 민감 피부에 자극을 줄 수 있으니 사용 빈도를 줄이세요.',
      tip: '미세먼지가 심한 날은 이중 세안(오일 클렌저 → 약산성 폼) 후 즉시 수분 공급을 시작하세요.',
    },
    summer: {
      icon: '☀️',
      season: '여름',
      months: '6 · 7 · 8월',
      alert: '폭발하는 유분과 열감 주의보',
      alertLevel: 'danger',
      desc: '고온다습한 환경에서 피지 분비가 폭발적으로 증가합니다. 무거운 크림은 잠시 내려두고, 가볍고 시원한 제형으로 피부 온도를 낮춰주세요.',
      routines: [
        {
          step: 'STEP 1',
          title: '피지 컨트롤 토너',
          text: 'BHA(살리실산) 함유 토너로 모공 속 피지를 관리하고 피부결을 정돈하세요. 화장솜보다 손으로 가볍게 두드려 흡수시키는 것이 효과적입니다.',
          color: 'accent',
        },
        {
          step: 'STEP 2',
          title: '쿨링 젤 크림',
          text: '알로에베라, 녹차 추출물 함유 젤 크림으로 열감을 진정시키고 수분을 공급하세요. 냉장 보관하면 쿨링 효과가 배가됩니다.',
          color: 'accent',
        },
        {
          step: 'STEP 3',
          title: 'SPF 50+ 자외선 차단',
          text: '여름 피부 관리의 핵심. 2~3시간마다 덧바르는 습관이 광노화와 색소 침착을 예방하는 가장 확실한 방법입니다.',
          color: 'mint',
        },
      ],
      avoid: '무거운 오일 제품, 고함량 미네랄 오일 — 여름철 지성·복합성 피부의 모공을 막아 트러블을 유발할 수 있습니다.',
      tip: '나이아신아마이드 성분은 피지 조절과 미백 효과를 동시에 제공하여 여름 피부에 최적의 성분입니다.',
    },
    autumn: {
      icon: '🍂',
      season: '가을',
      months: '9 · 10 · 11월',
      alert: '급격한 수분 증발 주의보',
      alertLevel: 'warn',
      desc: '여름 동안 자외선과 피지 과잉으로 지친 피부가 급격한 기온 하강을 맞이합니다. 지금이 겨울 극건조를 예방할 수 있는 골든 타임입니다.',
      routines: [
        {
          step: 'STEP 1',
          title: '세라마이드 장벽 크림',
          text: '세라마이드 NP/AP/EOP 복합 성분이 함유된 장벽 크림을 도입하세요. 피부 지질 구조를 복원하여 수분 증발을 차단합니다.',
          color: 'accent',
        },
        {
          step: 'STEP 2',
          title: '히알루론산 레이어링',
          text: '저분자·고분자 히알루론산을 함께 사용하면 피부 표면과 깊은 층 모두 수분을 채울 수 있습니다.',
          color: 'accent',
        },
        {
          step: 'STEP 3',
          title: '각질 케어 (주 1~2회)',
          text: '여름 동안 두꺼워진 각질층을 PHA 또는 저농도 AHA로 부드럽게 정리하면 이후 보습 성분의 흡수율이 높아집니다.',
          color: 'mint',
        },
      ],
      avoid: '강한 알코올 성분 토너, 과도한 클렌징 — 가을 건조 피부의 수분막을 파괴하여 민감도를 높입니다.',
      tip: '실내 습도를 50~60%로 유지하는 것만으로도 피부 수분 손실을 크게 줄일 수 있습니다.',
    },
    winter: {
      icon: '❄️',
      season: '겨울',
      months: '12 · 1 · 2월',
      alert: '극한 건조 및 실내외 온도차 경보',
      alertLevel: 'danger',
      desc: '실내외 온도차와 난방으로 인한 건조함이 극대화됩니다. 피부 장벽이 가장 취약해지는 시기로, 고보습 레이어링과 오일 밀봉이 핵심입니다.',
      routines: [
        {
          step: 'STEP 1',
          title: '고보습 영양 크림',
          text: '시어버터, 스쿠알란, 글리세린이 함유된 리치한 크림으로 피부 표면에 두꺼운 보호막을 형성하세요.',
          color: 'accent',
        },
        {
          step: 'STEP 2',
          title: '페이스 오일 밀봉',
          text: '크림 위에 로즈힙 오일 또는 아르간 오일을 2~3방울 덧바르면 수분 증발을 막는 밀봉 효과를 얻을 수 있습니다.',
          color: 'accent',
        },
        {
          step: 'STEP 3',
          title: '세안 후 3분 룰',
          text: '세안 후 3분 이내에 스킨케어를 완료하세요. 물기가 증발하면서 피부 수분까지 함께 빼앗아 갑니다.',
          color: 'mint',
        },
      ],
      avoid: '뜨거운 물 세안, 강한 스크럽 — 겨울 피부의 얇아진 지질막을 직접적으로 손상시킵니다.',
      tip: '립밤과 핸드크림을 침대 옆에 두고 자기 전 마지막으로 바르는 습관이 겨울 피부 관리의 마무리입니다.',
    },
  };

  // ── 계절 판별 ─────────────────────────────────────────────
  function getSeason() {
    const month = new Date().getMonth() + 1; // 1~12
    if (month >= 3 && month <= 5)  return 'spring';
    if (month >= 6 && month <= 8)  return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  }

  function getMonthLabel() {
    return new Date().getMonth() + 1;
  }

  // ── 결과 렌더링 ───────────────────────────────────────────
  function renderResult(season) {
    const d = seasonData[season];
    const month = getMonthLabel();

    const alertClass = d.alertLevel === 'danger' ? 'wx-alert--danger' : 'wx-alert--warn';

    const routineHTML = d.routines.map(r => {
      const borderColor = r.color === 'mint'
        ? 'rgba(77, 233, 171, 0.6)'
        : 'rgba(126, 193, 255, 0.5)';
      const titleColor = r.color === 'mint' ? '#4DE9AB' : '#7EC1FF';
      return `
        <div class="wx-routine-step" style="border-left-color:${borderColor};">
          <span class="wx-routine-step__badge">${r.step}</span>
          <h4 class="wx-routine-step__title" style="color:${titleColor};">${r.title}</h4>
          <p class="wx-routine-step__text">${r.text}</p>
        </div>
      `;
    }).join('');

    resultCard.innerHTML = `
      <div class="wx-result__month">${month}월의 피부 기상도</div>

      <div class="wx-result__hero">
        <span class="wx-result__season-icon">${d.icon}</span>
        <div>
          <p class="wx-result__season-name">${d.season} · ${d.months}</p>
          <h3 class="wx-result__alert ${alertClass}">[${d.alert}]</h3>
        </div>
      </div>

      <p class="wx-result__desc">${d.desc}</p>

      <div class="wx-routine-grid">
        ${routineHTML}
      </div>

      <div class="wx-result__footer-grid">
        <div class="wx-footer-section wx-footer-section--warn">
          <h4 class="wx-footer-section__title">⛔ 지금 피해야 할 것</h4>
          <p class="wx-footer-section__text">${d.avoid}</p>
        </div>
        <div class="wx-footer-section wx-footer-section--tip">
          <h4 class="wx-footer-section__title">💡 오늘의 스킨케어 팁</h4>
          <p class="wx-footer-section__text">${d.tip}</p>
        </div>
      </div>

      <p class="wx-disclaimer">※ 본 예보는 접속 월 기준으로 제공되는 계절 가이드이며, 개인 피부 상태에 따라 다를 수 있습니다.</p>
    `;
  }

  // ── 초기 로딩 시퀀스 ─────────────────────────────────────
  const season = getSeason();
  const icons = { spring: '🌸', summer: '☀️', autumn: '🍂', winter: '❄️' };
  const labels = { spring: '봄 피부 데이터 감지됨', summer: '여름 피부 데이터 감지됨', autumn: '가을 피부 데이터 감지됨', winter: '겨울 피부 데이터 감지됨' };

  // 1초 후 아이콘 교체 + 버튼 노출
  setTimeout(() => {
    loaderIcon.textContent = icons[season];
    loaderSub.textContent  = labels[season];
    revealBtn.style.display = 'inline-flex';
  }, 1000);

  // ── 버튼 클릭 → 블러 리빌 ────────────────────────────────
  revealBtn.addEventListener('click', () => {
    renderResult(season);

    resultWrap.style.display = 'block';
    revealBtn.style.display  = 'none';

    // 두 프레임 후 블러 제거 시작 (CSS transition 1.5s)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        blurOverlay.classList.add('is-revealed');
      });
    });

    setTimeout(() => {
      resultWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  });
});
