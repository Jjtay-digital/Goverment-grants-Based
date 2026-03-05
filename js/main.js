(function () {
  const contentPanels = document.querySelectorAll('.tab-panels > .content-panel');
  const subTabButtons = document.querySelectorAll('.sub-tab-btn');
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  const mobileTabIcons = document.querySelectorAll('.mobile-tab-icon');
  const mobileSubMenu = document.getElementById('mobile-sub-menu');
  const mobileSubOptions = document.querySelectorAll('.mobile-sub-option');

  function showPanel(panelId) {
    contentPanels.forEach(function (panel) {
      panel.setAttribute('aria-hidden', panel.id === panelId ? 'false' : 'true');
    });
    subTabButtons.forEach(function (btn) {
      const controlsId = btn.getAttribute('aria-controls');
      btn.setAttribute('aria-selected', controlsId === panelId ? 'true' : 'false');
    });
    updateMobileTabBar(panelId);
  }

  function updateMobileTabBar(panelId) {
    var category = 'monetary';
    if (panelId === 'panel-operations') category = 'operations';
    else if (panelId === 'panel-business-cost') category = 'business-cost';
    else if (panelId === 'panel-psg' || panelId === 'panel-eci' || panelId === 'panel-startup-sg') category = 'monetary';
    mobileTabIcons.forEach(function (btn) {
      btn.setAttribute('aria-selected', btn.getAttribute('data-category') === category ? 'true' : 'false');
    });
  }

  function openMobileSubMenu() {
    if (mobileSubMenu) {
      var isOpen = mobileSubMenu.classList.contains('is-open');
      if (isOpen) {
        closeMobileSubMenu();
      } else {
        mobileSubMenu.classList.add('is-open');
        mobileSubMenu.setAttribute('aria-hidden', 'false');
      }
    }
  }

  function closeMobileSubMenu() {
    if (mobileSubMenu) {
      mobileSubMenu.classList.remove('is-open');
      mobileSubMenu.setAttribute('aria-hidden', 'true');
    }
  }

  // Mobile: 3 horizontal icons
  mobileTabIcons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-category');
      if (cat === 'monetary') {
        openMobileSubMenu();
      } else if (cat === 'operations') {
        showPanel('panel-operations');
        closeMobileSubMenu();
      } else if (cat === 'business-cost') {
        showPanel('panel-business-cost');
        closeMobileSubMenu();
      }
    });
  });

  mobileSubOptions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panelId = btn.getAttribute('data-panel');
      if (panelId) showPanel(panelId);
      closeMobileSubMenu();
    });
  });

  document.addEventListener('click', function (e) {
    if (mobileSubMenu && mobileSubMenu.classList.contains('is-open')) {
      var wrapper = document.querySelector('.mobile-tab-bar-wrapper');
      if (wrapper && !wrapper.contains(e.target)) closeMobileSubMenu();
    }
  });

  // Dropdown trigger (main category): click toggles for keyboard; hover handled by CSS
  dropdownTriggers.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
    });
  });

  // Sub-category click: show that panel
  subTabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const panelId = btn.getAttribute('aria-controls');
      if (panelId) showPanel(panelId);
    });
  });

  // Back to top: show when scrolled, scroll to top on click
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    var scrollThreshold = 280;
    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
