// Pesquisa do Tá na Lista: envia as respostas para o e-mail da Geise (FormSubmit) sem sair da página.
(function () {
  var form = document.getElementById('pesquisa');
  if (!form) return;
  var aviso = form.querySelector('.pesquisa__aviso');
  var botao = form.querySelector('button[type="submit"]');
  var obrigada = document.getElementById('pesquisa-obrigada');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form._honey && form._honey.value) return;   // robô
    // confere se as 5 perguntas foram respondidas
    for (var n = 1; n <= 5; n++) {
      if (!form.querySelector('input[name="p' + n + '"]:checked')) {
        aviso.textContent = 'Falta responder a pergunta ' + n + '.';
        form.querySelector('input[name="p' + n + '"]').focus();
        return;
      }
    }
    var dados = { _subject: 'Tá na Lista: nova resposta da pesquisa', _template: 'table', _captcha: 'false' };
    form.querySelectorAll('fieldset').forEach(function (f, i) {
      var marcada = f.querySelector('input:checked');
      dados[(i + 1) + '. ' + f.querySelector('legend').textContent.replace(/^\d/, '').trim()] = marcada.value;
    });
    dados['6. Sugestão'] = form.sugestao.value.trim() || '(sem sugestão)';

    botao.disabled = true; aviso.textContent = 'Enviando...';
    fetch('https://formsubmit.co/ajax/' + form.getAttribute('data-email'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(dados)
    }).then(function (r) { return r.json(); }).then(function (r) {
      if (r.success === 'false' || r.success === false) throw new Error(r.message);
      form.hidden = true; obrigada.hidden = false;
      obrigada.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }).catch(function () {
      botao.disabled = false;
      aviso.textContent = 'Não consegui enviar agora. Tente de novo em instantes.';
    });
  });

  // ao marcar uma opção, some o aviso
  form.addEventListener('change', function () { aviso.textContent = ''; });
})();
