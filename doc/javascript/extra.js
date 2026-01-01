function isIPad() {
  return (
    navigator.platform === 'MacIntel' &&
    navigator.maxTouchPoints > 1
  );
}

// Select mobile/desktop tab automatically
document.addEventListener("DOMContentLoaded", () => {
  let tabIndex = 0;

  if (isIPad())
  {
    tabIndex = 2;
  }
  else if (window.innerWidth < 768) 
  {
    tabIndex = 1;
  }

  document.querySelectorAll(".tabbed-set").forEach(set => 
  {
    const radios = set.querySelectorAll('input[type="radio"]');
    radios[Math.min(tabIndex, radios.length - 1)].checked = true;
  });
});
