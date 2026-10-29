// Borboleta rosa que voa pelas laterais do estudo de caso, pela página inteira.
// Desce pela margem direita da página; some quando sai da vista e reaparece no alto da tela.
// O fundo não tem bolinhas: elas só aparecem, em rosa, por onde ela passa, e somem devagar (um rastro).
// Clicou nela? Ela para um pouquinho e solta um brilho rosa.
(function () {
  var voo = document.querySelector('.voo');
  if (!voo) return;
  var pagina = voo.closest('.estudo') || document.querySelector('main');
  var canvas = voo.querySelector('.voo__rastro');
  var borboleta = voo.querySelector('.voo__borboleta');
  var ctx = canvas.getContext('2d');
  var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PASSO = 32;           // mesmo espaço da grade pontilhada do CSS
  var RAIO = 34;            // até onde a borboleta "acende" as bolinhas
  var VELOCIDADE = 55;      // pixels por segundo
  var SUMIR = 900;          // tempo para sumir / aparecer (ms)
  var PAUSA = 2600;         // quanto tempo ela fica parada depois do clique (ms)
  var BRILHOS = ['#FF8FC2', '#F0548A', '#FF1F7A', '#FFD1E4'];
  var ROSA = [240, 84, 138];
  var CINZA = [210, 210, 203];

  var W, H, margem, topoPagina, fimPagina, brancas = [], luzes = {};

  function medir() {
    var dpr = window.devicePixelRatio || 1;
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var conteudo = pagina.querySelector('.container');
    var r = conteudo.getBoundingClientRect();
    margem = r.left + parseFloat(getComputedStyle(conteudo).paddingLeft) * 0.5;  // margem livre ao lado do texto
    var pr = pagina.getBoundingClientRect();
    topoPagina = pr.top + window.scrollY; fimPagina = pr.bottom + window.scrollY;
    // as bolinhas rosa podem aparecer em qualquer fundo; só não passam por cima do slider
    brancas = Array.prototype.map.call(pagina.querySelectorAll('.telas__janela'), function (s) {
      var b = s.getBoundingClientRect();
      return { t: b.top + window.scrollY, b: b.bottom + window.scrollY, l: b.left, r: b.right };
    });
  }

  function temBolinha(x, yPagina) {
    if (yPagina < topoPagina || yPagina > fimPagina) return false;
    for (var i = 0; i < brancas.length; i++) {
      var s = brancas[i];
      if (yPagina >= s.t && yPagina <= s.b && x >= s.l && x <= s.r) return false;
    }
    return true;
  }

  // A borboleta voa NA PÁGINA (não na tela): quando a pessoa rola, ela fica onde está,
  // junto com as bolinhas, em vez de "correr" atrás da rolagem.
  // Quando sai da vista (lá embaixo, ou porque a pessoa rolou), some e reaparece no alto da tela.
  var lado = 1;
  var pausadaDesde = null, atual = { x: -100, y: -100 }, faiscas = [], anel = null;
  var yVoo = null, percorrido = 0, luzVoo = 0, ultimo = null, renascendo = false;

  function xNa(dist) {   // zigue-zague suave conforme a distância voada
    var amplitude = Math.max(6, Math.min(margem - 24, 36));
    return (W - margem) + Math.sin(dist / 140) * amplitude;
  }

  function quadro(agora) {
    var dt = ultimo === null ? 16 : Math.min(64, agora - ultimo);
    ultimo = agora;
    var pausada = pausadaDesde !== null;
    if (pausada && agora - pausadaDesde > PAUSA) { pausadaDesde = null; pausada = false; }   // volta a voar de onde parou

    if (yVoo === null) yVoo = window.scrollY - 30;            // começa no alto da tela
    if (!pausada) { var d = VELOCIDADE * dt / 1000; yVoo += d; percorrido += d; }

    var yTela = yVoo - window.scrollY;
    var foraDaVista = yTela > H + 30 || yTela < -40;
    // aparece e some com suavidade (luzVoo vai de 0 a 1)
    if (foraDaVista && !renascendo) renascendo = true;
    if (renascendo) {
      luzVoo -= dt / SUMIR;
      if (luzVoo <= 0) { luzVoo = 0; yVoo = window.scrollY - 30; renascendo = false; }   // volta lá em cima da tela
    } else {
      luzVoo = Math.min(1, luzVoo + dt / SUMIR);
      if (yTela > H - 60) luzVoo = Math.min(luzVoo, Math.max(0, (H + 30 - yTela) / 90));   // vai sumindo perto do fim da tela
    }
    yTela = yVoo - window.scrollY;
    var p = { x: xNa(percorrido), y: yTela }, q = { x: xNa(percorrido + 4), y: yTela + 4 };
    var visivel = luzVoo;
    var yPagina = yVoo;
    if (yPagina > fimPagina || yPagina < topoPagina) visivel = 0;   // não voa sobre o rodapé

    var inclina = Math.atan2(q.x - p.x, q.y - p.y) * -0.35 + (lado === -1 ? Math.PI : 0);
    if (pausada) inclina = 0;                                       // parada, de pé
    var bate = 0.55 + 0.45 * Math.abs(Math.sin(agora / (pausada ? 420 : 110)));  // asas: devagar quando parada
    var tamanho = 0.6 + 0.4 * visivel;
    atual = { x: p.x, y: p.y, visivel: visivel };
    borboleta.style.opacity = visivel;
    borboleta.style.transform = 'translate(' + (p.x - 15) + 'px,' + (p.y - 15) + 'px) rotate(' + inclina + 'rad) scale(' + (bate * tamanho) + ',' + tamanho + ')';

    // acende as bolinhas embaixo dela (guardadas na posição da página, não da tela)
    if (visivel > 0.3) {
      var gx0 = Math.floor((p.x - RAIO) / PASSO), gx1 = Math.ceil((p.x + RAIO) / PASSO);
      var gy0 = Math.floor((yPagina - topoPagina - RAIO) / PASSO), gy1 = Math.ceil((yPagina - topoPagina + RAIO) / PASSO);
      for (var gx = gx0; gx <= gx1; gx++) for (var gy = gy0; gy <= gy1; gy++) {
        var bx = gx * PASSO, by = gy * PASSO + topoPagina;
        var d = Math.hypot(bx - p.x, by - yPagina);
        if (d < RAIO && temBolinha(bx, by)) {
          var k = gx + ',' + gy;
          luzes[k] = Math.max(luzes[k] || 0, 1 - d / RAIO * 0.4);
        }
      }
    }

    ctx.clearRect(0, 0, W, H);
    for (var chave in luzes) {
      var luz = luzes[chave] *= 0.99;   // apaga devagar, deixando um rastro
      if (luz < 0.02) { delete luzes[chave]; continue; }
      var partes = chave.split(',');
      var x = partes[0] * PASSO, y = partes[1] * PASSO + topoPagina - window.scrollY;
      if (y < -10 || y > H + 10) continue;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + ROSA.join(',') + ',' + Math.min(1, luz * 1.1).toFixed(3) + ')';   // rosa que vai ficando transparente
      ctx.arc(x, y, 1.4 + luz * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    desenharBrilho();
    requestAnimationFrame(quadro);
  }

  // ---------- o brilho rosa do clique ----------
  function estrela(x, y, r, giro) {   // estrelinha de 4 pontas
    ctx.beginPath();
    for (var i = 0; i < 8; i++) {
      var a = giro + i * Math.PI / 4, raio = i % 2 ? r * 0.32 : r;
      ctx.lineTo(x + Math.cos(a) * raio, y + Math.sin(a) * raio);
    }
    ctx.closePath(); ctx.fill();
  }
  // o brilho toma a tela toda: estrelinhas saem da borboleta, outras piscam espalhadas pela tela
  function soltarBrilho(x, y) {
    anel = { x: x, y: y, vida: 1, alcance: Math.hypot(Math.max(x, W - x), Math.max(y, H - y)) };
    for (var i = 0; i < 60; i++) {   // explosão saindo dela, chegando longe
      var a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 11;
      faiscas.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, atrito: 0.975,
        r: 3 + Math.random() * 5, giro: Math.random() * Math.PI, vida: 1, atraso: 0,
        cor: BRILHOS[i % BRILHOS.length], apaga: 0.006 + Math.random() * 0.006 });
    }
    for (var k = 0; k < 120; k++) {   // estrelinhas que acendem pela tela inteira, uma depois da outra
      faiscas.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: 0.2 + Math.random() * 0.5, atrito: 1,
        r: 3 + Math.random() * 6, giro: Math.random() * Math.PI, vida: 1, atraso: 4 + Math.random() * 110, piscar: true,
        cor: BRILHOS[k % BRILHOS.length], apaga: 0.007 + Math.random() * 0.008 });
    }
  }
  function desenharBrilho() {
    if (anel) {   // uma onda rosa bem leve que atravessa a tela
      var raio = 20 + (1 - anel.vida) * anel.alcance;
      var g = ctx.createRadialGradient(anel.x, anel.y, raio * 0.55, anel.x, anel.y, raio);
      g.addColorStop(0, 'rgba(255, 143, 194, 0)');
      g.addColorStop(0.8, 'rgba(255, 143, 194,' + 0.18 * anel.vida + ')');
      g.addColorStop(1, 'rgba(255, 31, 122, 0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      anel.vida -= 0.016; if (anel.vida <= 0) anel = null;
    }
    for (var i = faiscas.length - 1; i >= 0; i--) {
      var f = faiscas[i];
      if (f.atraso > 0) { f.atraso--; continue; }
      f.x += f.vx; f.y += f.vy; f.vx *= f.atrito; f.vy = f.vy * f.atrito + 0.03; f.giro += 0.04; f.vida -= f.apaga;
      if (f.vida <= 0 || f.y > H + 20) { faiscas.splice(i, 1); continue; }
      // as que piscam crescem e diminuem; as da explosão vão encolhendo
      var escala = f.piscar ? Math.sin(f.vida * Math.PI) : (0.5 + f.vida * 0.5);
      ctx.globalAlpha = Math.min(1, f.vida * 1.6);
      ctx.fillStyle = f.cor;
      ctx.shadowColor = '#FF1F7A'; ctx.shadowBlur = 10;
      estrela(f.x, f.y, f.r * escala, f.giro);
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  }

  // clique perto da borboleta (a área de toque é maior que ela, porque ela está voando)
  // enquanto o brilho ainda está na tela (ou ela está parada), novos cliques não fazem nada
  function animando() { return pausadaDesde !== null || anel !== null || faiscas.length > 0; }
  function perto(e) {
    return !animando() && atual.visivel > 0.5 && Math.hypot(e.clientX - atual.x, e.clientY - atual.y) < 30;
  }
  document.addEventListener('mousemove', function (e) {
    document.documentElement.style.cursor = perto(e) ? 'pointer' : '';
  });
  // clicar duas vezes perto da borboleta não pode "selecionar" a imagem ou o texto de trás (ficava tudo azul)
  document.addEventListener('mousedown', function (e) {
    if (atual.visivel > 0.3 && Math.hypot(e.clientX - atual.x, e.clientY - atual.y) < 40) e.preventDefault();
  });
  document.addEventListener('click', function (e) {
    if (!perto(e)) return;
    pausadaDesde = performance.now();
    soltarBrilho(atual.x, atual.y);
  });

  medir();
  window.addEventListener('resize', medir);
  window.addEventListener('load', medir);
  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(pagina);

  if (parado) {   // quem prefere menos movimento vê a borboleta parada no alto, à direita
    var p0 = { x: xNa(0), y: H * 0.2 };
    borboleta.style.opacity = 1;
    borboleta.style.transform = 'translate(' + (p0.x - 15) + 'px,' + (p0.y - 15) + 'px)';
    return;
  }
  requestAnimationFrame(quadro);
})();
