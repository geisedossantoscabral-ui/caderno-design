// Slider das telas da landing page (estudo de caso)
// setas, bolinhas, teclado (← →) e arrastar com o dedo
document.querySelectorAll('.telas').forEach(function (raiz) {
  var trilho = raiz.querySelector('.telas__trilho');
  var slides = raiz.querySelectorAll('.telas__slide');
  var anterior = raiz.querySelector('[data-telas="anterior"]');
  var proxima = raiz.querySelector('[data-telas="proxima"]');
  var pontos = raiz.querySelector('.telas__pontos');
  var atual = 0;

  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Tela ' + (i + 1));
    b.addEventListener('click', function () { ir(i); });
    pontos.appendChild(b);
  });

  function ir(i) {
    atual = Math.max(0, Math.min(slides.length - 1, i));
    trilho.style.transform = 'translateX(' + (-100 * atual) + '%)';
    pontos.querySelectorAll('button').forEach(function (b, j) {
      b.setAttribute('aria-selected', j === atual ? 'true' : 'false');
    });
    slides.forEach(function (s, j) { s.setAttribute('aria-hidden', j === atual ? 'false' : 'true'); });
    anterior.disabled = atual === 0;
    proxima.disabled = atual === slides.length - 1;
  }

  anterior.addEventListener('click', function () { ir(atual - 1); });
  proxima.addEventListener('click', function () { ir(atual + 1); });
  raiz.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') ir(atual - 1);
    if (e.key === 'ArrowRight') ir(atual + 1);
  });

  // arrastar para o lado (celular)
  var inicioX = null, inicioY = null;
  trilho.addEventListener('touchstart', function (e) {
    inicioX = e.touches[0].clientX; inicioY = e.touches[0].clientY;
  }, { passive: true });
  trilho.addEventListener('touchend', function (e) {
    if (inicioX === null) return;
    var dx = e.changedTouches[0].clientX - inicioX;
    var dy = e.changedTouches[0].clientY - inicioY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) ir(atual + (dx < 0 ? 1 : -1));
    inicioX = null;
  });

  ir(0);
});
