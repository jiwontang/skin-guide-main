document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.fm-area');
  const reportSection = document.getElementById('trouble-report');
  const reportTitle = document.getElementById('report-title');
  const reportContent = document.getElementById('report-content');

  const dummyData = {
    forehead: {
      title: '열과 마찰이 만드는 트러블 존, 이마',
      paragraphs: [
        '<strong>원인:</strong> 이마는 T존에 속해 기본적으로 피지선이 발달한 곳이지만, 외부 자극에 가장 취약한 부위이기도 합니다. 샴푸나 헤어 에센스의 잔여물(실리콘 성분 등)이 모공을 막아 발생하는 \'코메도제닉(Comedogenic)\' 트러블이 흔합니다. 또한 스트레스로 인한 코르티솔 호르몬 분비나 열이 머리로 달아오르는 현상도 피지 분비를 촉진합니다.',
        '<strong>처방:</strong> 헤어 제품이 이마에 닿지 않도록 꼼꼼히 헹궈내는 약산성 클렌징이 우선입니다. 열감이 느껴질 때는 알로에 베라나 병풀 추출물(시카)이 함유된 쿨링 젤을 얇게 도포하여 피부 표면의 온도를 낮추고 모공 확장을 막아주세요.'
      ]
    },
    nose: {
      title: '피지선의 폭발적 활동, 코 주변부',
      paragraphs: [
        '<strong>원인:</strong> 코와 미간은 얼굴에서 피지선 분포도가 가장 높은 곳입니다. 과다 분비된 피지가 공기와 만나 산화되면서 블랙헤드가 되고, 여기에 각질이 엉겨 붙어 모공을 막으면 화농성 여드름으로 발전합니다. 잦은 수정 화장이나 코를 만지는 습관 역시 2차 세균 감염의 주된 원인이 됩니다.',
        '<strong>처방:</strong> 물리적인 압출(코팩 등)은 모공벽을 손상시켜 오히려 피지 분비를 늘립니다. 대신 지용성 각질 제거 성분인 BHA(살리실산)를 0.5% 이하로 함유한 토너로 닦아내어 모공 속 고인 피지를 부드럽게 녹여내는 화학적 각질 제거 방식을 추천합니다.'
      ]
    },
    cheeks: {
      title: '무너진 피부 장벽의 신호, 양볼',
      paragraphs: [
        '<strong>원인:</strong> 볼은 상대적으로 피지 분비가 적어 건조해지기 쉽고, 그만큼 피부 장벽(각질층)이 얇아 외부 자극에 민감합니다. 수면 중 베개와의 마찰, 스마트폰 표면의 세균 접촉, 심한 실내외 온도 차이로 인한 모세혈관 확장 등이 주요 원인입니다. 속건조가 심해지면 피부는 이를 보완하기 위해 억지로 유분을 뿜어내며 트러블을 유발합니다.',
        '<strong>처방:</strong> 세라마이드, 콜레스테롤, 지방산이 3:1:1 비율로 배합된 장벽 강화 크림을 사용해 무너진 지질막을 보수해야 합니다. 또한, 일상생활에서 얼굴에 손이나 스마트폰이 닿지 않도록 주의하고, 베개 커버를 자주 교체하는 위생 관리가 필수입니다.'
      ]
    },
    chin: {
      title: '호르몬과 순환 정체의 경고음, 턱',
      paragraphs: [
        '<strong>원인:</strong> 턱과 입 주변은 \'성인 여드름\'의 단골 발생 부위입니다. 생리 주기 전 프로게스테론(황체호르몬) 수치가 급증하면 피지선이 자극받아 염증성 트러블이 올라옵니다. 또한, 목과 턱으로 이어지는 림프 순환이 정체되어 노폐물이 배출되지 못하거나, 엎드려 자는 습관, 면도로 인한 미세 상처도 큰 영향을 미칩니다.',
        '<strong>처방:</strong> 화장품만으로는 단기간에 해결하기 어렵습니다. 염증이 크게 잡혔을 때는 억지로 짜지 말고 하이드로콜로이드 소재의 습윤 밴드를 붙여 2차 감염을 막으세요. 평소 나이아신아마이드(비타민 B3) 성분이 포함된 앰플을 사용하여 항염 효과를 주고 피지 분비 밸런스를 맞추는 것이 좋습니다.'
      ]
    }
  };

  areas.forEach(area => {
    area.addEventListener('click', () => {
      // Remove active class from all areas
      areas.forEach(a => a.classList.remove('active'));
      
      // Add active class to clicked area
      area.classList.add('active');

      const areaKey = area.getAttribute('data-area');
      const data = dummyData[areaKey];

      if (data) {
        // Update content
        reportTitle.textContent = data.title;
        reportContent.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join('');

        // Fade-in animation
        if (!reportSection.classList.contains('visible')) {
          reportSection.classList.add('visible');
          // small delay to allow display block to apply before opacity transition
          setTimeout(() => {
            reportSection.classList.add('show');
          }, 10);
        } else {
          // Restart animation if already visible
          reportSection.classList.remove('show');
          setTimeout(() => {
            reportSection.classList.add('show');
          }, 50);
        }
      }
    });
  });
});
