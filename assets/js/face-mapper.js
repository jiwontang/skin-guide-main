document.addEventListener('DOMContentLoaded', () => {
  const areas = document.querySelectorAll('.fm-area');
  const reportSection = document.getElementById('trouble-report');
  const reportTitle = document.getElementById('report-title');
  const reportContent = document.getElementById('report-content');

  const dummyData = {
    forehead: {
      title: 'Lorem Ipsum - Forehead',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id neque vitae neque.',
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      ]
    },
    nose: {
      title: 'Lorem Ipsum - Nose',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non pulvinar sapien, non scelerisque sem.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ]
    },
    cheeks: {
      title: 'Lorem Ipsum - Cheeks',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo.',
        'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.',
        'Nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
      ]
    },
    chin: {
      title: 'Lorem Ipsum - Chin',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor.',
        'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.',
        'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'
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
