/* ═══════════════════════════════════════════════════════════════════
   ATOS2 · MOTOR DE IDIOMAS (i18n.js)
   ───────────────────────────────────────────────────────────────────
   Um só lugar para TODOS os textos do produto, nos dois idiomas.
   Toda página carrega este arquivo e marca os textos traduzíveis assim:

     <h1 data-i18n="hero.title"></h1>              → troca o texto
     <input data-i18n-attr="placeholder:form.email"> → troca um atributo
     <p data-i18n-html="footer.legal"></p>         → texto com <b>, <a> etc.

   Para usar dentro do JavaScript de uma página:
     Atos2I18N.t('hero.title')        → devolve o texto no idioma atual
     Atos2I18N.setLang('en')          → troca o idioma (e lembra)
     Atos2I18N.getLang()              → 'pt' ou 'en'
     Atos2I18N.apply(elemento)        → re-traduz conteúdo criado por JS
     document.addEventListener('atos2:langchange', fn)  → reagir à troca

   Adicionar um idioma novo no futuro (ex.: 'es'): basta criar a chave
   no DICT abaixo e incluí-lo em SUPPORTED. Vale para o produto inteiro.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var STORAGE_KEY = 'atos2_lang';
  var DEFAULT_LANG = 'en';          // fallback quando não for português
  var SUPPORTED = ['pt', 'en'];

  /* ── DICIONÁRIO CENTRAL ──────────────────────────────────────────
     Semente inicial. Cresce conforme construímos cada página.
     Os nomes dos idiomas ficam SEMPRE no próprio idioma (endônimos). */
  var DICT = {
    pt: {
      'lang.pt': 'Português',
      'lang.en': 'English',
      'nav.login': 'Entrar',
      'nav.signup': 'Criar conta',

      /* chaves de teste (só para a página de verificação) */
      'test.kicker': 'TESTE DO MOTOR DE IDIOMAS',
      'test.title': 'Cada um irá ouvir em sua própria língua.',
      'test.body': 'Se você está lendo isto em português, a detecção pelo navegador funcionou. Use o seletor acima: o conteúdo todo troca na hora, sem recarregar a página. Recarregue depois — ele deve lembrar a sua última escolha.',
      'test.field': 'Digite o nome da sua igreja',
      'test.cta': 'Criar conta · 4 horas grátis'
    },
    en: {
      'lang.pt': 'Português',
      'lang.en': 'English',
      'nav.login': 'Sign in',
      'nav.signup': 'Create account',

      'test.kicker': 'LANGUAGE ENGINE TEST',
      'test.title': 'Everyone will hear in their own language.',
      'test.body': 'If you are reading this in English, browser detection worked. Use the selector above: all content switches instantly, with no page reload. Reload afterwards — it should remember your last choice.',
      'test.field': 'Type your church name',
      'test.cta': 'Create account · 4 hours free'
    }
  };

  /* ── Detecção do idioma ──────────────────────────────────────────
     1) escolha salva (se houver)  2) idioma do navegador  3) fallback */
  function detect() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) { /* armazenamento indisponível: segue para detecção */ }

    var list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ''];

    for (var i = 0; i < list.length; i++) {
      var code = (list[i] || '').toLowerCase();
      if (code.indexOf('pt') === 0) return 'pt';   // pt, pt-BR, pt-PT…
    }
    return DEFAULT_LANG;
  }

  var current = detect();

  /* ── Tradução de uma chave ─────────────────────────────────────── */
  function t(key) {
    var table = DICT[current] || {};
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    var fb = DICT[DEFAULT_LANG] || {};
    if (Object.prototype.hasOwnProperty.call(fb, key)) return fb[key];
    return key; // último recurso: mostra a própria chave (ajuda a achar o que falta)
  }

  /* ── Aplica as traduções a um trecho da página ─────────────────── */
  function apply(root) {
    root = root || document;
    var each = Array.prototype.forEach;

    each.call(root.querySelectorAll('[data-i18n]'), function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    each.call(root.querySelectorAll('[data-i18n-html]'), function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });

    each.call(root.querySelectorAll('[data-i18n-attr]'), function (el) {
      // formato: "placeholder:form.email; title:form.tip"
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) {
          el.setAttribute(parts[0].trim(), t(parts[1].trim()));
        }
      });
    });

    document.documentElement.setAttribute('lang', current === 'pt' ? 'pt-BR' : 'en');

    // marca o seletor ativo, se a página tiver um
    each.call(root.querySelectorAll('[data-i18n-switch]'), function (el) {
      var on = el.getAttribute('data-i18n-switch') === current;
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.classList.toggle('active', on);
    });
  }

  /* ── Troca de idioma (e lembra a escolha) ──────────────────────── */
  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1 || lang === current) return;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ok seguir sem lembrar */ }
    apply(document);
    document.dispatchEvent(new CustomEvent('atos2:langchange', { detail: { lang: current } }));
  }

  function getLang() { return current; }

  /* ── API pública ───────────────────────────────────────────────── */
  window.Atos2I18N = {
    t: t,
    apply: apply,
    setLang: setLang,
    getLang: getLang,
    supported: SUPPORTED,
    dict: DICT
  };

  // Liga qualquer botão com data-i18n-switch="pt|en" automaticamente.
  function wireSwitchers() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-switch]'), function (el) {
      el.addEventListener('click', function () { setLang(el.getAttribute('data-i18n-switch')); });
    });
  }

  // Auto-início: traduz assim que a página estiver pronta.
  function boot() { apply(document); wireSwitchers(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
