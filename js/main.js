(function () {
  const contentPanels = document.querySelectorAll('.tab-panels > .content-panel');
  const subTabButtons = document.querySelectorAll('.sub-tab-btn');
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

  function showPanel(panelId) {
    contentPanels.forEach(function (panel) {
      panel.setAttribute('aria-hidden', panel.id === panelId ? 'false' : 'true');
    });
    subTabButtons.forEach(function (btn) {
      const controlsId = btn.getAttribute('aria-controls');
      btn.setAttribute('aria-selected', controlsId === panelId ? 'true' : 'false');
    });
  }

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
})();
