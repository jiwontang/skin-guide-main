// ── 오늘의 피부 일기예보 (Skin Weather Forecast) ──────────────────────────
(function () {
  'use strict';

  // ── 4가지 기상 주의보 데이터 ──────────────────────────────────────────────
  var forecastMessages = [
    {
      emoji: '☀️',
      alertLabel: '자외선 주의보',
      title: '강력한 광노화 레이더 포착',
      text: '자외선 차단막 전개 필수. 피부 장벽이 UV 공격에 노출되어 있습니다.',
      cardBg: 'linear-gradient(160deg, #1a1200 0%, #0f172a 60%, #1a1200 100%)',
      cardBorder: 'rgba(251, 191, 36, 0.45)',
      reportAccent: '#FCD34D',
      scienceReport: '자외선 지수가 높은 환경에서는 UVA(파장 320~400nm)와 UVB(파장 280~320nm)가 피부 깊숙이 침투하여 피부 세포의 DNA를 직접적으로 손상시키고 활성 산소(ROS, Reactive Oxygen Species)를 대량 생성합니다. UVA는 진피층까지 도달하여 피부 탄력을 유지하는 콜라겐과 엘라스틴 섬유를 파괴하는 효소인 MMP-1(Matrix Metalloproteinase-1)의 분비를 촉진하여 조기 노화, 즉 광노화(Photoaging)를 유발합니다. UVB는 표피층에서 멜라닌 세포를 과도하게 자극하여 기미, 잡티 같은 색소 침착을 심화시키고, 피부 장벽의 지질층을 산화시켜 장벽 고유의 방어 기능을 상실하게 만듭니다. 이는 만성적인 염증 반응과 붉은 기로 이어질 수 있습니다. 자외선에 의한 피부 장벽 손상은 경피수분손실(TEWL)을 증가시켜 피부를 더욱 건조하고 예민하게 만드는 악순환을 초래합니다. 이를 극복하기 위해서는 외출 30분 전 자외선 차단제를 정량(500원 동전 크기)으로 바르고, 2~3시간마다 덧바르는 것이 과학적으로 입증된 유일한 해결책입니다. 저녁에는 자외선에 의해 열감이 오른 피부를 진정시키기 위해 알로에베라나 센텔라아시아티카 성분을 활용한 쿨링 케어를 병행하여 피부 온도를 낮추고 장벽 회복 속도를 높여야 합니다.',
      ingredients: [
        { name: 'SPF 50+ PA++++ 선크림', desc: '자외선 차단의 최전선. 물리적(산화아연, 이산화티타늄) + 화학적 차단제 복합 제품이 광범위 차단에 효과적입니다.' },
        { name: '비타민C (아스코르브산)', desc: '강력한 항산화 성분으로 자외선에 의해 생성된 활성 산소를 중화합니다. 선크림 아래에 레이어링하면 광보호 효과가 배가됩니다.' },
        { name: '나이아신아마이드', desc: '멜라닌 전달을 억제하여 자외선에 의한 색소 침착을 예방합니다. 피부 장벽 강화에도 기여합니다.' },
        { name: '알로에베라 & 센텔라아시아티카', desc: '자외선 노출 후 열감과 붉은 기를 진정시키는 쿨링 성분. 저녁 루틴에 필수입니다.' }
      ],
      routine: [
        '아침: 항산화 세럼(비타민C) → 보습제 → SPF 50+ 선크림',
        '외출 중: 2~3시간마다 선크림 덧바르기 (파우더 선크림 활용)',
        '저녁: 이중 세안 → 진정 토너 → 나이아신아마이드 세럼 → 세라마이드 크림'
      ]
    },
    {
      emoji: '🌧️',
      alertLabel: '습도 폭격기',
      title: '피지 과부하 경보 발령',
      text: '산뜻한 수분 젤로 기압 조절 필요. 피지와 수분의 균형이 무너지고 있습니다.',
      cardBg: 'linear-gradient(160deg, #001a2e 0%, #0f172a 60%, #001a2e 100%)',
      cardBorder: 'rgba(56, 189, 248, 0.45)',
      reportAccent: '#38BDF8',
      scienceReport: '고습도 환경(습도 70% 이상)에서는 피부 표면의 수분 증발이 억제되는 대신, 피지선이 과도하게 활성화되어 피지 분비량이 급증합니다. 이렇게 과잉 분비된 피지는 대기 중의 수분과 뒤섞여 모공 입구를 막는 피지 플러그(Sebum Plug)를 형성하고, 여드름균(Cutibacterium acnes)이 번식하기 좋은 혐기성 환경을 조성합니다. 특히 고습도 환경에서는 피부 표면의 pH가 상승하여 피부 상재균의 균형이 무너지고, 이는 염증성 여드름과 모낭염으로 이어질 수 있습니다. 또한 높은 습도는 피부 각질층의 수분 결합 단백질인 필라그린(Filaggrin)의 분해를 촉진하여 장벽 기능을 오히려 약화시키는 역설적인 현상을 일으킵니다. 이를 관리하기 위해서는 유분기가 많은 크림 타입 보습제 대신 수분 공급에 집중하는 가벼운 젤 타입 제품을 선택하고, 히알루론산처럼 수분을 끌어당기는 흡습성(Humectant) 성분을 활용하는 것이 핵심입니다. 세안 후 피부 pH를 약산성(4.5~5.5)으로 빠르게 회복시키는 약산성 토너를 사용하면 피지 분비 조절과 피부 상재균 균형 유지에 도움이 됩니다.',
      ingredients: [
        { name: '히알루론산 (Hyaluronic Acid)', desc: '자기 무게의 1,000배 수분을 끌어당기는 흡습성 성분. 유분 없이 수분만 채워 피지 과부하를 방지합니다.' },
        { name: '나이아신아마이드', desc: '피지선 활동을 조절하고 모공을 수렴하는 효과가 있습니다. 고습도 환경에서 피지 과부하를 억제하는 핵심 성분입니다.' },
        { name: '위치하젤 (Witch Hazel)', desc: '천연 수렴 성분으로 모공을 조여주고 과잉 피지를 흡수합니다. 토너나 미스트 형태로 활용하세요.' },
        { name: '살리실산 (BHA)', desc: '지용성 성분으로 모공 속 피지를 직접 용해합니다. 주 1~2회 사용으로 피지 플러그 형성을 예방합니다.' }
      ],
      routine: [
        '아침: 약산성 폼 클렌저 → 히알루론산 젤 에센스 → 가벼운 젤 보습제 → 선크림',
        '낮: 기름종이로 피지 제거 후 파우더 선크림 덧바르기',
        '저녁: 이중 세안 → 나이아신아마이드 토너 → 수분 젤 크림 (크림 생략 가능)'
      ]
    },
    {
      emoji: '🌫️',
      alertLabel: '미세먼지 안개',
      title: '오염 물질 침투 주의보',
      text: '이중 세안 정화 시스템 가동. 피부 장벽이 대기 오염에 노출되어 있습니다.',
      cardBg: 'linear-gradient(160deg, #0d1a0d 0%, #0f172a 60%, #0d1a0d 100%)',
      cardBorder: 'rgba(134, 239, 172, 0.35)',
      reportAccent: '#86EFAC',
      scienceReport: '대기 오염도가 높거나 미세먼지(PM2.5, PM10)가 짙은 날에는 초미세 입자가 피부 표면의 피지와 엉겨 붙어 모공을 막기 쉽습니다. 미세먼지에 포함된 다환방향족탄화수소(PAHs, Polycyclic Aromatic Hydrocarbons), 중금속(납, 카드뮴), 내분비 교란 물질은 피부 장벽을 통과하여 만성적인 미세 염증(Chronic Low-grade Inflammation)을 유발하고, 피부의 항산화 방어 체계를 무너뜨립니다. 특히 PAHs는 피부 세포의 아릴 탄화수소 수용체(AhR)를 활성화하여 산화 스트레스를 증가시키고, 이는 피부 장벽 기능 저하, 색소 침착, 조기 노화로 이어집니다. 또한 미세먼지는 피부 표면의 pH를 변화시켜 피부 상재균의 균형을 무너뜨리고, 이는 여드름과 아토피 피부염 악화의 원인이 됩니다. 오늘 같은 날은 외출 후 즉시 약산성 클렌저를 사용하여 피부 pH 균형을 깨뜨리지 않으면서 오염 물질만 선택적으로 제거하는 것이 중요합니다. 세안 시 너무 강한 마찰은 이미 예민해진 피부 장벽에 추가 손상을 줄 수 있으므로, 풍부한 거품을 활용해 부드럽게 닦아내고 비타민C나 E와 같은 항산화 성분이 포함된 스킨케어로 피부 자생력을 보강해주는 것이 과학적인 피부 보호 전략입니다.',
      ingredients: [
        { name: '클렌징 밤 / 오일 클렌저', desc: '미세먼지와 결합된 피지, 선크림을 효과적으로 녹여내는 1차 세안 필수템. 오일이 오염 물질을 감싸 제거합니다.' },
        { name: '비타민E (토코페롤)', desc: '지용성 항산화 성분으로 미세먼지에 의한 지질 과산화를 억제합니다. 비타민C와 함께 사용하면 시너지 효과가 납니다.' },
        { name: '판테놀 (Panthenol, 비타민B5)', desc: '오염 물질로 손상된 피부 장벽을 빠르게 회복시키는 진정·재생 성분. 예민해진 피부를 즉각 안정시킵니다.' },
        { name: '세라마이드 (Ceramide)', desc: '피부 장벽의 핵심 구성 성분. 오염 물질 침투로 손상된 장벽 지질층을 보충하여 방어막을 재건합니다.' }
      ],
      routine: [
        '아침: 항산화 세럼 → 세라마이드 보습제 → 선크림 (물리적 차단제 권장)',
        '외출 중: 마스크 착용으로 미세먼지 직접 접촉 최소화',
        '저녁: 클렌징 밤(1차) → 약산성 폼 클렌저(2차) → 판테놀 토너 → 세라마이드 크림'
      ]
    },
    {
      emoji: '🍂',
      alertLabel: '건조 주의보',
      title: '피부 가뭄 지수 위험 단계',
      text: '오일 한 방울로 긴급 보습막 형성. 경피수분손실이 가속화되고 있습니다.',
      cardBg: 'linear-gradient(160deg, #1a0a00 0%, #0f172a 60%, #1a0a00 100%)',
      cardBorder: 'rgba(251, 146, 60, 0.45)',
      reportAccent: '#FB923C',
      scienceReport: '대기 중 습도가 40% 이하로 급격히 떨어지는 초저습도 환경은 피부 장벽에 치명적인 스트레스를 유발합니다. 공기가 건조해지면 피부 표면의 수분이 공기 중으로 빼앗기는 경피수분손실(TEWL, Trans-Epidermal Water Loss) 현상이 가속화되며, 이는 각질층의 세라마이드와 콜레스테롤, 지방산으로 구성된 지질 이중층의 결합력을 약화시킵니다. 결과적으로 피부 보호막이 얇아지며 외부 자극에 취약한 상태가 됩니다. 특히 건조한 공기는 피부 재생 주기(Turn-over)를 방해하여 죽은 각질이 탈락하지 못하고 표면에 쌓이게 만들어 피부를 거칠고 칙칙하게 만듭니다. 또한 피부 장벽이 손상되면 외부 알레르겐과 자극 물질이 쉽게 침투하여 아토피 피부염, 접촉성 피부염 등의 염증 반응이 악화될 수 있습니다. 이를 방지하기 위해서는 단순히 수분을 보충하는 것을 넘어, 피부 장벽 구성 성분인 세라마이드나 스쿠알란이 함유된 제품으로 수분 증발을 물리적으로 차단하는 밀폐 케어(Occlusive Care)가 필수적입니다. 오늘 같은 날씨에는 실내 가습기를 활용해 적정 습도(50~60%)를 유지하고, 세안 후 3분 이내에 보습제를 발라 피부 수분을 가두는 것이 가장 과학적인 대응 방법입니다.',
      ingredients: [
        { name: '세라마이드 (Ceramide NP/AP/EOP)', desc: '피부 장벽 지질층의 핵심 구성 성분. 건조로 손상된 장벽을 직접 보충하여 수분 증발을 차단합니다.' },
        { name: '스쿠알란 (Squalane)', desc: '피부 친화적인 오일 성분으로 수분 증발을 막는 밀폐막을 형성합니다. 가볍고 끈적임이 없어 모든 피부 타입에 적합합니다.' },
        { name: '히알루론산 (Hyaluronic Acid)', desc: '다층 분자량 히알루론산이 피부 표면부터 진피층까지 수분을 채웁니다. 보습제 전 단계에 사용하세요.' },
        { name: '판테놀 & 글리세린', desc: '흡습성 성분으로 공기 중 수분을 피부로 끌어당깁니다. 건조 주의보 날 보습 루틴의 기본 베이스입니다.' }
      ],
      routine: [
        '아침: 크리미 클렌저(폼 클렌저 대신) → 히알루론산 에센스 → 세라마이드 크림 → 선크림',
        '낮: 보습 미스트 수시 분사 후 손으로 가볍게 눌러 흡수',
        '저녁: 저자극 클렌저 → 히알루론산 토너 레이어링(3회) → 스쿠알란 오일 → 세라마이드 크림 → 수면팩'
      ]
    }
  ];

  // ── 3장 랜덤 선택 ──────────────────────────────────────────────────────────
  function pickThree() {
    var shuffled = forecastMessages.slice().sort(function () { return Math.random() - 0.5; });
    return shuffled.slice(0, 3);
  }

  var assigned = pickThree();
  var selected = false;

  var cards = [
    document.getElementById('tarot-card-0'),
    document.getElementById('tarot-card-1'),
    document.getElementById('tarot-card-2')
  ];
  var fronts = [
    document.getElementById('tarot-front-0'),
    document.getElementById('tarot-front-1'),
    document.getElementById('tarot-front-2')
  ];
  var retryWrap   = document.getElementById('tarot-retry-wrap');
  var retryBtn    = document.getElementById('tarot-retry-btn');
  var reportArea  = document.getElementById('forecast-report-area');
  var reportTitle = document.getElementById('forecast-report-title');
  var reportContent    = document.getElementById('forecast-report-content');
  var reportIngredients = document.getElementById('forecast-report-ingredients');
  var reportRoutine    = document.getElementById('forecast-report-routine');

  // ── 카드 앞면 콘텐츠 주입 ──────────────────────────────────────────────────
  function updateCardContents() {
    assigned.forEach(function (msg, i) {
      // 카드 뒷면 테마 색상 적용
      var cardEl = cards[i];
      var backEl = cardEl.querySelector('.tarot-card__back');
      var backIconEls = cardEl.querySelectorAll('.tarot-card__back-icon');
      if (backEl) {
        backEl.style.background = msg.cardBg;
        backEl.style.borderColor = msg.cardBorder;
      }
      backIconEls.forEach(function (el) {
        el.textContent = msg.emoji;
        el.style.color = msg.reportAccent;
      });

      // 앞면 콘텐츠
      fronts[i].innerHTML =
        '<span class="tarot-front__emoji">' + msg.emoji + '</span>' +
        '<span class="forecast-alert-label" style="background:' + msg.reportAccent + ';color:#0f172a;">' + msg.alertLabel + '</span>' +
        '<strong class="tarot-front__title" style="color:' + msg.reportAccent + ';">' + msg.title + '</strong>' +
        '<p class="tarot-front__text">' + msg.text + '</p>';

      // 앞면 테마 색상 적용
      var frontEl = cardEl.querySelector('.tarot-card__front');
      if (frontEl) {
        frontEl.style.background = msg.cardBg;
        frontEl.style.borderColor = msg.cardBorder;
      }
    });
  }

  updateCardContents();

  // ── 카드 클릭 핸들러 ──────────────────────────────────────────────────────
  function handleCardClick(index) {
    if (selected) return;
    selected = true;

    var msg = assigned[index];

    cards.forEach(function (card, i) {
      if (i === index) {
        card.classList.add('tarot-card--flipped');
      } else {
        card.classList.add('tarot-card--fade');
      }
    });

    // 상세 리포트 렌더링
    setTimeout(function () {
      if (!reportArea) return;

      // 헤더 타이틀
      reportTitle.innerHTML =
        '<span style="color:' + msg.reportAccent + ';">' + msg.emoji + ' ' + msg.alertLabel + '</span> — ' + msg.title;

      // 장벽 분석 본문
      reportContent.textContent = msg.scienceReport;

      // 추천 성분 블록
      var ingHtml = '<div class="forecast-report__block">' +
        '<p class="forecast-report__label" style="color:' + msg.reportAccent + ';">💊 오늘의 추천 성분 (Recommended Ingredients)</p>' +
        '<ul class="forecast-ingredients-list">';
      msg.ingredients.forEach(function (ing) {
        ingHtml += '<li class="forecast-ingredient-item">' +
          '<strong class="forecast-ingredient-name" style="color:' + msg.reportAccent + ';">' + ing.name + '</strong>' +
          '<span class="forecast-ingredient-desc">' + ing.desc + '</span>' +
          '</li>';
      });
      ingHtml += '</ul></div>';
      reportIngredients.innerHTML = ingHtml;

      // 오늘의 루틴 블록
      var routineHtml = '<div class="forecast-report__block">' +
        '<p class="forecast-report__label" style="color:' + msg.reportAccent + ';">📋 오늘의 기상 대응 루틴 (Daily Routine)</p>' +
        '<ul class="forecast-routine-list">';
      msg.routine.forEach(function (step) {
        routineHtml += '<li class="forecast-routine-item">' + step + '</li>';
      });
      routineHtml += '</ul></div>';
      reportRoutine.innerHTML = routineHtml;

      // 리포트 테마 색상 적용
      reportArea.style.borderColor = msg.reportAccent;
      var headerEl = reportArea.querySelector('.forecast-report__header');
      if (headerEl) headerEl.style.borderBottomColor = msg.reportAccent + '33';

      reportArea.style.display = 'block';
      reportArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      retryWrap.style.display = 'block';
    }, 650);
  }

  cards.forEach(function (card, i) {
    card.addEventListener('click', function () { handleCardClick(i); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(i);
      }
    });
  });

  // ── 다시 예보 받기 ─────────────────────────────────────────────────────────
  retryBtn.addEventListener('click', function () {
    selected = false;
    assigned = pickThree();

    cards.forEach(function (card) {
      card.classList.remove('tarot-card--flipped', 'tarot-card--fade');
    });

    updateCardContents();

    if (reportArea) reportArea.style.display = 'none';
    retryWrap.style.display = 'none';

    var toolArea = document.getElementById('tool-area');
    if (toolArea) {
      window.scrollTo({ top: toolArea.offsetTop - 100, behavior: 'smooth' });
    }
  });

}());
