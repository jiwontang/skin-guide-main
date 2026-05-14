// ── 오늘의 피부 일기예보 (Skin Forecast) ──────────────────────────────────
(function () {
  'use strict';

  // 5가지 피부 일기예보 메시지 및 과학적 분석 리포트
  var forecastMessages = [
    {
      emoji: '☀️',
      title: '고농도 자외선 장벽 파괴 경보',
      text: '강한 자외선이 피부 장벽을 직접 타격하는 날입니다. 고기능성 자외선 차단제로 방어막을 구축하세요.',
      scienceReport: '자외선 지수가 높은 환경에서는 UVA와 UVB가 피부 깊숙이 침투하여 피부 세포의 DNA를 직접적으로 손상시키고 활성 산소를 대량 생성합니다. 자외선은 피부 탄력을 유지하는 콜라겐과 엘라스틴 섬유를 파괴하는 효소인 MMP-1의 분비를 촉진하여 조기 노화(광노화)를 유발합니다. 또한, 피부 장벽의 지질층을 산화시켜 장벽 고유의 방어 기능을 상실하게 만들며, 이는 만성적인 염증 반응과 붉은 기로 이어질 수 있습니다. 멜라닌 세포가 과도하게 자극받아 기미나 잡티 같은 색소 침착이 심화되는 것도 이 시기의 특징입니다. 이를 극복하기 위해서는 외출 30분 전 자외선 차단제를 정량(500원 동전 크기)으로 바르고, 2~3시간마다 덧바르는 것이 과학적으로 입증된 유일한 해결책입니다. 저녁에는 자외선에 의해 열감이 오른 피부를 진정시키기 위해 알로에베라나 센텔라아시아티카 성분을 활용한 쿨링 케어를 병행하여 피부 온도를 낮추고 장벽 회복 속도를 높여야 합니다.'
    },
    {
      emoji: '💧',
      title: '초저습도 피부 가뭄 주의보',
      text: '공기 중 습도가 낮아 수분이 급격히 증발하고 있습니다. 보습막을 형성하는 오일 케어가 필요합니다.',
      scienceReport: '대기 중 습도가 40% 이하로 급격히 떨어지는 초저습도 환경은 피부 장벽에 치명적인 스트레스를 유발합니다. 공기가 건조해지면 피부 표면의 수분이 공기 중으로 빼앗기는 경피수분손실(TEWL) 현상이 가속화되며, 이는 각질층의 세라마이드와 콜레스테롤 성분의 결합력을 약화시킵니다. 결과적으로 피부 보호막이 얇아지며 외부 자극에 취약한 상태가 됩니다. 특히 건조한 공기는 피부 재생 주기(Turn-over)를 방해하여 죽은 각질이 탈락하지 못하고 표면에 쌓이게 만들어 피부를 거칠고 칙칙하게 만듭니다. 이를 방지하기 위해서는 단순히 수분을 보충하는 것을 넘어, 피부 장벽 구성 성분인 판테놀이나 스쿠알란이 함유된 제품으로 수분 증발을 물리적으로 차단하는 밀폐 케어가 필수적입니다. 오늘 같은 날씨에는 실내 가습기를 활용해 적정 습도를 유지하고, 세안 후 3분 이내에 보습제를 발라 피부 수분을 가두는 것이 가장 과학적인 대응 방법입니다.'
    },
    {
      emoji: '☁️',
      title: '미세먼지 장벽 오염 주의보',
      text: '흐린 날씨 속 미세먼지가 모공을 막고 염증을 유발할 수 있습니다. 꼼꼼한 약산성 세안이 핵심입니다.',
      scienceReport: '대기 오염도가 높거나 습도가 높은 흐린 날씨에는 미세먼지와 대기 중의 중금속 입자가 피부 표면의 피지와 엉겨 붙어 모공을 막기 쉽습니다. 이러한 오염 물질은 피부 장벽을 통과하여 만성적인 미세 염증을 유발하고, 피부의 항산화 방어 체계를 무너뜨립니다. 특히 미세먼지에 포함된 다환방향족탄화수소(PAHs)는 피부 세포의 산화 스트레스를 증가시켜 장벽 기능을 저하시킵니다. 오늘 같은 날은 외출 후 즉시 약산성 클렌저를 사용하여 피부 pH 균형을 깨뜨리지 않으면서 오염 물질만 선택적으로 제거하는 것이 중요합니다. 세안 시 너무 강한 마찰은 이미 예민해진 피부 장벽에 추가 손상을 줄 수 있으므로, 풍부한 거품을 활용해 부드럽게 닦아내고 비타민 C나 E와 같은 항산화 성분이 포함된 스킨케어로 피부 자생력을 보강해주는 것이 과학적인 피부 보호 전략입니다.'
    },
    {
      emoji: '🌡️',
      title: '열감 폭주 피지 과다 경보',
      text: '높은 기온으로 피부 온도가 상승하고 피지 분비가 폭발합니다. 수분 공급과 온도 조절에 집중하세요.',
      scienceReport: '피부 온도가 1도 상승할 때마다 피지 분비량은 약 10%씩 증가한다는 연구 결과가 있습니다. 높은 기온은 피지선을 자극할 뿐만 아니라 모공을 확장시키고 피부 장벽 내의 수분 결합력을 약화시킵니다. 열감에 노출된 피부는 혈관이 확장되면서 안면 홍조가 심해지고, 열 노화 과정이 가속화되어 탄력이 저하됩니다. 또한 과도하게 분비된 유분은 피부 표면의 유수분 밸런스를 무너뜨려 여드름균이 번식하기 좋은 환경을 조성합니다. 이를 관리하기 위해서는 냉장 보관된 시트 마스크나 쿨링 디바이스를 활용해 피부 온도를 즉각적으로 낮추어주는 것이 중요합니다. 유분기가 많은 크림보다는 가벼운 젤 타입의 보습제를 사용하여 수분은 채우되 모공이 막히지 않도록 관리해야 하며, 위치하젤이나 로즈마리 추출물처럼 모공 수렴과 진정 효과가 있는 성분을 적절히 활용하는 것이 필요합니다.'
    },
    {
      emoji: '🌀',
      title: '기온 변동성 장벽 균형 주의보',
      text: '급격한 일교차로 피부가 갈피를 못 잡고 있습니다. 유수분 밸런스를 맞추는 층별 레이어링이 답입니다.',
      scienceReport: '일교차가 큰 환절기나 변덕스러운 날씨는 피부의 항상성을 무너뜨리는 주요 원인입니다. 기온이 급격히 변하면 피부 혈관은 수축과 이완을 반복하며 스트레스를 받고, 이는 영양 공급 불균형과 피부 장벽 약화로 이어집니다. 특히 아침의 찬 공기와 낮의 따뜻한 공기 사이에서 피부는 피지 분비량을 조절하는 데 실패하여 속건조와 겉번들거림이 동시에 나타나는 유수분 불균형 상태에 빠지기 쉽습니다. 이러한 시기에는 한 번에 무거운 제품을 바르기보다 얇은 수분 토너를 여러 번 레이어링하여 흡수시키고, 그 위에 세라마이드 보습제를 덧발라 장벽을 튼튼하게 유지하는 레이어링 기법이 과학적으로 효과적입니다. 피부가 스스로 변화에 적응할 수 있도록 자극적인 각질 제거는 피하고, 피부 친화적인 지질 성분이 포함된 제품으로 외부 변화에 흔들리지 않는 견고한 방어벽을 세워주는 것이 무엇보다 중요합니다.'
    }
  ];

  // 메시지 중복 없이 3개 선택
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
  var retryWrap = document.getElementById('tarot-retry-wrap');
  var retryBtn  = document.getElementById('tarot-retry-btn');
  var reportArea = document.getElementById('forecast-report-area');
  var reportTitle = document.getElementById('forecast-report-title');
  var reportContent = document.getElementById('forecast-report-content');

  // 앞면 콘텐츠 주입
  function updateCardContents() {
    assigned.forEach(function (msg, i) {
      fronts[i].innerHTML =
        '<span class="tarot-front__emoji">' + msg.emoji + '</span>' +
        '<strong class="tarot-front__title">' + msg.title + '</strong>' +
        '<p class="tarot-front__text">' + msg.text + '</p>';
    });
  }

  updateCardContents();

  // 카드 클릭 핸들러
  function handleCardClick(index) {
    if (selected) return;
    selected = true;

    var selectedMsg = assigned[index];

    cards.forEach(function (card, i) {
      if (i === index) {
        card.classList.add('tarot-card--flipped');
      } else {
        card.classList.add('tarot-card--fade');
      }
    });

    // 상세 리포트 표시
    setTimeout(function () {
      if (reportArea) {
        reportTitle.innerText = selectedMsg.emoji + ' ' + selectedMsg.title + ' 분석';
        reportContent.innerText = selectedMsg.scienceReport;
        reportArea.style.display = 'block';
        reportArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      retryWrap.style.display = 'block';
    }, 600);
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

  // 다시하기
  retryBtn.addEventListener('click', function () {
    selected = false;
    assigned = pickThree();

    cards.forEach(function (card) {
      card.classList.remove('tarot-card--flipped', 'tarot-card--fade');
    });

    updateCardContents();

    if (reportArea) reportArea.style.display = 'none';
    retryWrap.style.display = 'none';
    window.scrollTo({ top: document.getElementById('tool-area').offsetTop - 100, behavior: 'smooth' });
  });
}());
