/**
 * menu.js
 * - PC: GNB 드롭다운 (hover + 키보드 Escape)
 * - Mobile: 슬라이드 패널 + 아코디언 서브메뉴
 */

(function () {
  'use strict';

  /* =============================================
     PC GNB — 드롭다운 (hover는 CSS, 키보드 보조)
     ============================================= */
  function initGnbDropdown() {
    const items = document.querySelectorAll('.gnb__item--has-dropdown');

    items.forEach(function (item) {
      const btn = item.querySelector('.gnb__btn');
      const dropdown = item.querySelector('.gnb__dropdown');
      if (!btn || !dropdown) return;

      // 마우스 진입/이탈은 CSS :hover로 처리
      // aria-expanded 동기화
      item.addEventListener('mouseenter', function () {
        btn.setAttribute('aria-expanded', 'true');
      });
      item.addEventListener('mouseleave', function () {
        btn.setAttribute('aria-expanded', 'false');
      });

      // 키보드: Enter/Space로 드롭다운 토글
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isOpen = btn.getAttribute('aria-expanded') === 'true';
          closeAllDropdowns();
          if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.pointerEvents = 'auto';
            dropdown.style.transform = 'translateX(-50%) translateY(0)';
          }
        }
        if (e.key === 'Escape') {
          closeAllDropdowns();
          btn.focus();
        }
      });
    });

    // 외부 클릭 시 닫기
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.gnb__item--has-dropdown')) {
        closeAllDropdowns();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAllDropdowns();
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.gnb__btn[aria-expanded="true"]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
    // inline style 초기화 (CSS hover 상태로 복귀)
    document.querySelectorAll('.gnb__dropdown').forEach(function (dd) {
      dd.style.opacity = '';
      dd.style.visibility = '';
      dd.style.pointerEvents = '';
      dd.style.transform = '';
    });
  }

  /* =============================================
     Mobile Menu — 슬라이드 패널 열기/닫기
     ============================================= */
  function initMobileMenu() {
    const hamburgerBtn  = document.getElementById('hamburger-btn');
    const mobileMenu    = document.getElementById('mobile-menu');
    const backdrop      = document.getElementById('mobile-menu-backdrop');
    const closeBtn      = document.getElementById('menu-close-btn');

    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('click', openMenu);
    if (closeBtn)  closeBtn.addEventListener('click', closeMenu);
    if (backdrop)  backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    function openMenu() {
      mobileMenu.classList.add('active');
      mobileMenu.setAttribute('aria-hidden', 'false');
      if (backdrop) backdrop.classList.add('active');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.classList.remove('active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      if (backdrop) backdrop.classList.remove('active');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  /* =============================================
     Mobile Menu — 아코디언 서브메뉴
     ============================================= */
  function initMobileAccordion() {
    const accordionBtns = document.querySelectorAll('.mobile-menu__accordion-btn');

    accordionBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault(); // 페이지 이동 방지 (필요 시)

        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        const sub = btn.nextElementSibling; // .mobile-menu__sub
        if (!sub) return;

        if (isOpen) {
          // 닫기
          btn.setAttribute('aria-expanded', 'false');
          if (window.gsap) {
            gsap.to(sub, {
              height: 0,
              duration: 0.3,
              ease: 'power2.inOut',
              onComplete: () => {
                sub.classList.remove('open');
                sub.style.display = 'none';
              }
            });
          } else {
            sub.classList.remove('open');
            sub.style.display = 'none';
            sub.style.height = '0';
          }
        } else {
          // 다른 열린 항목 닫기 (하나만 열리게)
          document.querySelectorAll('.mobile-menu__accordion-btn[aria-expanded="true"]').forEach(function (other) {
            other.setAttribute('aria-expanded', 'false');
            const otherSub = other.nextElementSibling;
            if (otherSub) {
              if (window.gsap) {
                gsap.to(otherSub, {
                  height: 0,
                  duration: 0.3,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    otherSub.classList.remove('open');
                    otherSub.style.display = 'none';
                  }
                });
              } else {
                otherSub.classList.remove('open');
                otherSub.style.display = 'none';
                otherSub.style.height = '0';
              }
            }
          });

          // 현재 열기
          btn.setAttribute('aria-expanded', 'true');
          sub.style.display = 'block';
          sub.classList.add('open');

          if (window.gsap) {
            gsap.fromTo(sub, 
              { height: 0 }, 
              { height: 'auto', duration: 0.4, ease: 'back.out(1.2)' }
            );
          } else {
            sub.style.height = 'auto';
          }
        }
      });
    });
  }

  /* =============================================
     초기화
     ============================================= */
  document.addEventListener('DOMContentLoaded', function () {
    initGnbDropdown();
    initMobileMenu();
    initMobileAccordion();
  });

})();
