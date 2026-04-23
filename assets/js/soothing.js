window.addEventListener('load', () => {
  const grid = document.getElementById('soothing-concern-grid');
  const prescriptionArea = document.getElementById('soothing-prescription');
  if (!grid || !prescriptionArea) return;

  const prescriptions = {
    product: {
      catchphrase: '🧴 성분이 쏜 화학 자극',
      typename: 'Product Reaction · 제품 자극 쿨링 처방',
      desc: '새 제품이나 강한 성분에 반응한 피부입니다. 지금 당장 해당 제품 사용을 중단하고 장벽 회복에 집중하세요.',
      ingredients: '판테놀(Panthenol) · 알란토인(Allantoin) · 마데카소사이드(Madecassoside) — 이 세 가지가 핵심입니다.',
      avoid: '레티놀, AHA/BHA, 비타민C, 향료 함유 제품 — 자극 원인 성분을 즉시 배제하세요.',
      tip: '알코올 프리 진정 토너를 냉장 보관 후 화장솜에 적셔 10분 팩. 열감이 빠르게 내려갑니다.'
    },
    environment: {
      catchphrase: '🌡️ 환경에 데인 민감 피부',
      typename: 'Environmental Stress · 환경 자극 쿨링 처방',
      desc: '자외선, 온도 변화, 건조한 공기가 피부 장벽을 약화시킨 상태입니다. 수분 보충과 차단이 우선입니다.',
      ingredients: '알로에 베라(Aloe Vera) · 히알루론산(Hyaluronic Acid) · 세라마이드(Ceramide) — 수분 장벽을 즉시 채워주세요.',
      avoid: '뜨거운 물 세안, 사우나, 강한 마찰 — 이미 달아오른 피부에 열을 더하지 마세요.',
      tip: '냉장 보관한 스푼을 붉은 부위에 5초씩 대고 떼기를 반복하면 피부 온도가 빠르게 내려갑니다.'
    },
    physical: {
      catchphrase: '🤲 마찰로 무너진 장벽 피부',
      typename: 'Barrier Damage · 물리적 자극 쿨링 처방',
      desc: '과도한 세안, 마찰, 압출로 장벽이 손상된 상태입니다. 오늘 밤은 최소한의 루틴으로 회복에만 집중하세요.',
      ingredients: '시카(Cica) · 판테놀(Panthenol) · 세라마이드(Ceramide) — 손상된 장벽을 복구하는 3대 성분입니다.',
      avoid: '스크럽, 이중 세안, 압출, 마사지 — 물리적 자극을 완전히 차단하세요.',
      tip: '세안은 미온수로 30초 이내 가볍게. 수건으로 문지르지 말고 가볍게 눌러 물기를 제거하세요.'
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
              <h4 class="prescription-section__title">🌿 핵심 쿨링 성분</h4>
              <p class="prescription-section__text">${p.ingredients}</p>
            </div>
            <div class="prescription-section prescription-section--warn">
              <h4 class="prescription-section__title">⛔ 지금 당장 금지</h4>
              <p class="prescription-section__text">${p.avoid}</p>
            </div>
            <div class="prescription-section prescription-section--tip">
              <h4 class="prescription-section__title">💡 즉각 처치법</h4>
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
