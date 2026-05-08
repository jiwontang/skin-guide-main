// Contact Form Modal Handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form[name="contact"]');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const confirmBtn = document.getElementById('modal-confirm-btn');

  if (!form || !modal) return;

  // Show modal
  function showModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Hide modal
  function hideModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);

    // Submit to Netlify
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      // Reset form
      form.reset();
      // Show modal
      showModal();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
  });

  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
  }

  // Close modal on confirm button click
  if (confirmBtn) {
    confirmBtn.addEventListener('click', hideModal);
  }

  // Close modal on outside click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      hideModal();
    }
  });
});
