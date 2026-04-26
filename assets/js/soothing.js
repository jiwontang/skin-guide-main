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

// ── 쿨링 버튼 리플 + 모달 ──
(function () {
  const STEPS = {
    1: {
      badge: 'Step 1 · 0~5분',
      icon: '🧊',
      title: '즉시 쿨링',
      desc: '<strong>냉장고에 보관한 스푼</strong>이나 <strong>얼음을 감싼 거즈</strong>를 붉은 부위에 5초씩 대고 떼기를 반복하세요. 직접 얼음을 피부에 대면 동상 위험이 있으니 반드시 천으로 감싸야 합니다. 피부 온도를 낮춰 염증 반응을 억제하는 것이 최우선입니다.'
    },
    2: {
      badge: 'Step 2 · 5~15분',
      icon: '💧',
      title: '진정 토너 팩',
      desc: '<strong>알코올 프리 진정 토너</strong>를 화장솜에 충분히 적셔 얼굴 전체에 올려두세요. <strong>센텔라 아시아티카</strong>, <strong>알란토인</strong>, <strong>판테놀</strong> 성분이 포함된 제품이 효과적입니다. 10분 후 화장솜을 제거하고 가볍게 두드려 흡수시키세요.'
    },
    3: {
      badge: 'Step 3 · 15~20분',
      icon: '🌿',
      title: '진정 세럼 도포',
      desc: '피부가 어느 정도 진정되면 <strong>시카 세럼</strong>이나 <strong>나이아신아마이드 함유 앰플</strong>을 얇게 펴 발라주세요. 문지르지 말고 손바닥으로 가볍게 눌러 흡수시키는 것이 중요합니다. 과도한 마찰은 염증을 악화시킬 수 있습니다.'
    },
    4: {
      badge: 'Step 4 · 20~25분',
      icon: '🛡️',
      title: '수분 장벽 코팅',
      desc: '마지막으로 <strong>세라마이드</strong>나 <strong>히알루론산</strong>이 풍부한 수분 크림을 얇게 펴 발라 장벽을 보호하세요. 유분기가 많은 크림은 피하고 젤 타입이나 수분 크림을 선택하는 것이 좋습니다. 이후 최소 30분은 피부를 만지지 마세요.'
    }
  };

  const overlay = document.getElementById('coolingModalOverlay');
  const modalBody = document.getElementById('coolingModalBody');
  const closeBtn = document.getElementById('coolingModalClose');
  if (!overlay || !modalBody) return;

  function openModal(step) {
    const s = STEPS[step];
    modalBody.innerHTML = `
      <span class="cooling-modal__step-badge">${s.badge}</span>
      <span class="cooling-modal__icon">${s.icon}</span>
      <h3 class="cooling-modal__title">${s.title}</h3>
      <p class="cooling-modal__desc">${s.desc}</p>
    `;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // 버튼 클릭 — 리플 → 모달
  document.querySelectorAll('.cooling-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // 리플 생성
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'cooling-ripple';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px;`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());

      // 리플 끝난 직후 모달 오픈
      const step = parseInt(btn.dataset.step, 10);
      setTimeout(() => openModal(step), 420);
    });
  });

  // 닫기
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
