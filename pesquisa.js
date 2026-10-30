// Pesquisa do Tá na Lista: confere as respostas e envia para o e-mail da Geise pelo FormSubmit.
// O envio é o "normal" do formulário (vai até o FormSubmit e volta para cá com ?enviado=1).
// Antes era por AJAX (fetch), mas o navegador bloqueava por CORS e as respostas não chegavam.
(function () {
  var form = document.getElementById('pesquisa');
  if (!form) return;
  var aviso = form.querySelector('.pesquisa__aviso');
  var botao = form.querySelector('button[type="submit"]');
  var obrigada = document.getElementById('pesquisa-obrigada');

  // voltou do FormSubmit: mostra o "obrigada" no lugar do formulário
  if (/[?&]enviado=1/.test(location.search)) {
    form.hidden = true; obrigada.hidden = false;
    obrigada.scrollIntoView({ block: 'center' });
    return;
  }

  form.addEventListener('submit', function (e) {
    if (form._honey && form._honey.value) { e.preventDefault(); return; }   // robô
    for (var n = 1; n <= 5; n++) {
      if (!form.querySelector('input[name="p' + n + '"]:checked')) {
        e.preventDefault();
        aviso.textContent = 'Falta responder a pergunta ' + n + '.';
        form.querySelector('input[name="p' + n + '"]').focus();
        return;
      }
    }
    // no e-mail, cada resposta aparece com o texto da pergunta (e não "p1", "p2"...)
    form.querySelectorAll('fieldset').forEach(function (f, i) {
      var marcada = f.querySelector('input:checked');
      var campo = document.createElement('input');
      campo.type = 'hidden';
      campo.name = (i + 1) + '. ' + f.querySelector('legend').textContent.replace(/^\d/, '').trim();
      campo.value = marcada.value;
      form.appendChild(campo);
      f.querySelectorAll('input').forEach(function (r) { r.disabled = true; });   // não manda o "p1" repetido
    });
    var sug = form.sugestao;
    if (!sug.value.trim()) sug.value = '(sem sugestão)';
    sug.name = '6. Sugestão';
    botao.disabled = true; aviso.textContent = 'Enviando...';
  });

  form.addEventListener('change', function () { aviso.textContent = ''; });

  // se a pessoa voltar para a página pelo botão "voltar" do navegador, destrava o formulário
  window.addEventListener('pageshow', function () {
    botao.disabled = false; aviso.textContent = '';
    form.querySelectorAll('fieldset input').forEach(function (r) { r.disabled = false; });
    form.querySelectorAll('input[type="hidden"][name^="1."],input[type="hidden"][name^="2."],input[type="hidden"][name^="3."],input[type="hidden"][name^="4."],input[type="hidden"][name^="5."]').forEach(function (h) { h.remove(); });
    if (form.sugestao) { form.sugestao.name = 'sugestao'; if (form.sugestao.value === '(sem sugestão)') form.sugestao.value = ''; }
  });
})();
