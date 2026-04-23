window.addEventListener('load', () => {
  const grid = document.getElementById('d1-concern-grid');
  const prescriptionArea = document.getElementById('d1-prescription');
  if (!grid || !prescriptionArea) return;

  const prescriptions = {
    trouble: {
      catchphrase: '🔴 붉게 화난 응급 피부',
      typename: 'Emergency Care · 트러블 긴급 처방',
      desc: '갑작스러운 트러블은 짜거나 건드리지 않는 것이 최우선입니다. 오늘 밤 딱 이것만 하세요.',
      recommend: '스팟 패치 부착 → 알코올 프리 진정 토너 팩(센텔라·판테놀) → 시카 크림 얇게 마무리',
      avoid: '여드름 압출, 스크럽, 고농도 AHA/BHA, 새 제품 시도 — 모두 내일 이후로 미루세요.',
      tip: '냉장 보관한 스푼을 붉은 부위에 5초씩 대고 떼기를 반복하면 열감이 빠르게 내려갑니다.'
    },
    dryness: {
      catchphrase: '🌵 수분이 증발한 사막 피부',
      typename: 'Hydration SOS · 각질·건조 긴급 처방',
      desc: '각질과 건조함은 장벽이 무너진 신호입니다. 오늘 밤은 수분 코팅에만 집중하세요.',
      recommend: '저분자 히알루론산 에센스 → 세라마이드 크림 도톰하게 → 수면팩으로 마무리 코팅',
      avoid: '각질 제거 제품, 알코올 토너, 뽀득한 폼 클렌저 — 장벽을 더 무너뜨립니다.',
      tip: '세안 직후 물기가 마르기 전 30초 이내에 에센스를 바르면 흡수율이 2배 높아집니다.'
    },
    dull: {
      catchphrase: '🌫️ 생기를 잃은 안개 피부',
      typename: 'Brightening SOS · 칙칙함 긴급 처방',
      desc: '칙칙함은 대부분 수면 부족과 혈액순환 저하가 원인입니다. 오늘 밤 루틴을 단순하게 가져가세요.',
      recommend: '나이아신아마이드 앰플 → 가벼운 수분 크림 → 내일 아침 SPF 50+ 선크림 필수',
      avoid: '과도한 레이어링, 무거운 영양 크림, 새로운 기능성 성분 — 피부에 부담만 줍니다.',
      tip: '세안 후 얼굴을 가볍게 두드리는 마사지 1분이 혈액순환을 촉진해 다음날 아침 피부톤을 밝혀줍니다.'
    }
  };

  grid.querySelectorAll('.concern-card').forEach(card => {
    card.addEventListener('click', () => {
      grid.querySelectorAll('.concern-card').forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');

      const type = card.dataset.type;
      const p = prescriptions[type];

      prescriptionArea.innerHTML = `
        <div class="prescription-card">
          <div class="prescription-card__header">
            <h3 class="prescription-card__catchphrase">${p.catchphrase}<br><small class="prescription-card__typename">${p.typename}</small></h3>
            <p class="prescription-card__desc">${p.desc}</p>
          </div>
          <div class="prescription-sections">
            <div class="prescription-section">
              <h4 class="prescription-section__title">👍 오늘 밤 루틴</h4>
              <p class="prescription-section__text">${p.recommend}</p>
            </div>
            <div class="prescription-section prescription-section--warn">
              <h4 class="prescription-section__title">⛔ 절대 금지</h4>
              <p class="prescription-section__text">${p.avoid}</p>
            </div>
            <div class="prescription-section prescription-section--tip">
              <h4 class="prescription-section__title">💡 꿀팁</h4>
              <p class="prescription-section__text">${p.tip}</p>
            </div>
          </div>
          <p class="prescription-disclaimer">※ 본 처방전은 정보 제공 목적이며 피부과 진단을 대신하지 않습니다. 증상이 지속되면 전문의 상담을 권장합니다.</p>
        </div>
      `;

      prescriptionArea.classList.remove('hidden');
      setTimeout(() => {
        prescriptionArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    });
  });
});
