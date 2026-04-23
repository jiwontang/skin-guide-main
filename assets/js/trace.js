window.addEventListener('load', () => {
  const grid = document.getElementById('trace-concern-grid');
  const prescriptionArea = document.getElementById('trace-prescription');
  if (!grid || !prescriptionArea) return;

  const prescriptions = {
    red: {
      catchphrase: '🔴 혈관이 남긴 붉은 기억',
      typename: 'PIE Care · 붉은 자국(혈관성 홍반) 루틴',
      desc: '붉은 자국(PIE)은 손상된 혈관이 피부 표면에 비쳐 보이는 상태입니다. 진정과 혈관 재생에 집중하세요.',
      ingredients: '센텔라 아시아티카 · 나이아신아마이드(2~5%) · 판테놀 — 혈관 재생과 진정을 동시에 잡아줍니다.',
      routine: '저녁: 진정 토너 → 나이아신아마이드 앰플 → 시카 크림 / 아침: 반드시 SPF 50+ 선크림',
      tip: '유리컵으로 눌렀을 때 색이 옅어지면 PIE입니다. 평균 6개월~1년, 꾸준함이 핵심입니다.'
    },
    brown: {
      catchphrase: '🟤 멜라닌이 새긴 갈색 흔적',
      typename: 'PIH Care · 갈색 자국(색소침착) 루틴',
      desc: '갈색 자국(PIH)은 멜라닌 색소가 과다 침착된 상태입니다. 미백 성분과 자외선 차단이 핵심입니다.',
      ingredients: '비타민C(저녁 전용) · 트라넥삼산 · 나이아신아마이드 — 멜라닌 생성을 억제하는 3대 성분입니다.',
      routine: '저녁: 비타민C 앰플(격일) 또는 트라넥삼산 → 보습 크림 / 아침: SPF 50+ 선크림 필수 (자외선 차단 없이는 역효과)',
      tip: '비타민C와 레티놀은 같은 날 사용 금지. 격일로 나눠 쓰거나 아침/저녁으로 분리하세요.'
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
              <h4 class="prescription-section__title">💊 핵심 성분</h4>
              <p class="prescription-section__text">${p.ingredients}</p>
            </div>
            <div class="prescription-section prescription-section--warn">
              <h4 class="prescription-section__title">📋 전용 루틴</h4>
              <p class="prescription-section__text">${p.routine}</p>
            </div>
            <div class="prescription-section prescription-section--tip">
              <h4 class="prescription-section__title">💡 주의사항</h4>
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
