/* ═══════════════════════════════════════════════════════════════════
   ATOS2 · MOTOR DE IDIOMAS (i18n.js)
   ───────────────────────────────────────────────────────────────────
   Um só lugar para TODOS os textos do produto, em todos os idiomas.
   Toda página carrega este arquivo e marca os textos traduzíveis assim:

     <h1 data-i18n="hero.title"></h1>               → troca o texto
     <input data-i18n-attr="placeholder:form.email"> → troca um atributo
     <p data-i18n-html="footer.legal"></p>          → texto com <b>, <a> etc.

   No JavaScript de uma página:
     Atos2I18N.t('hero.title') · setLang('es') · getLang() · apply(el)
     document.addEventListener('atos2:langchange', fn)

   ADICIONAR UM IDIOMA NOVO (princípio universal — um lugar só):
     1) crie a chave do idioma no DICT (ex.: es: { ... })
     2) inclua o código em SUPPORTED (ex.: 'es')
     A detecção e o seletor passam a reconhecê-lo automaticamente.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var STORAGE_KEY = 'atos2_lang';
  var DEFAULT_LANG = 'en';                 // fallback (quem não for pt nem es)
  var SUPPORTED = ['pt', 'en', 'es'];      // idiomas oficiais do produto

  /* ── DICIONÁRIO CENTRAL ──────────────────────────────────────────
     Semente inicial. Cresce conforme construímos cada página.
     Os nomes dos idiomas ficam SEMPRE no próprio idioma (endônimos). */
  var DICT = {
    pt: {
      'lang.pt': 'Português', 'lang.en': 'English', 'lang.es': 'Español',
      'nav.login': 'Entrar', 'nav.signup': 'Criar conta',

      'test.kicker': 'TESTE DO MOTOR DE IDIOMAS',
      'test.title': 'Cada um irá ouvir em sua própria língua.',
      'test.body': 'Se você está lendo isto em português, a detecção pelo navegador funcionou. Use o seletor acima: o conteúdo todo troca na hora, sem recarregar. Recarregue depois — ele deve lembrar a sua última escolha.',
      'test.field': 'Digite o nome da sua igreja',
      'test.cta': 'Criar conta · 4 horas grátis'
    },
    en: {
      'lang.pt': 'Português', 'lang.en': 'English', 'lang.es': 'Español',
      'nav.login': 'Sign in', 'nav.signup': 'Create account',

      'test.kicker': 'LANGUAGE ENGINE TEST',
      'test.title': 'Everyone will hear in their own language.',
      'test.body': 'If you are reading this in English, browser detection worked. Use the selector above: all content switches instantly, with no reload. Reload afterwards — it should remember your last choice.',
      'test.field': 'Type your church name',
      'test.cta': 'Create account · 4 hours free'
    },
    es: {
      'lang.pt': 'Português', 'lang.en': 'English', 'lang.es': 'Español',
      'nav.login': 'Iniciar sesión', 'nav.signup': 'Crear cuenta',

      'test.kicker': 'PRUEBA DEL MOTOR DE IDIOMAS',
      'test.title': 'Cada uno escuchará en su propio idioma.',
      'test.body': 'Si estás leyendo esto en español, la detección por navegador funcionó. Usa el selector de arriba: todo el contenido cambia al instante, sin recargar. Recarga después — debería recordar tu última elección.',
      'test.field': 'Escribe el nombre de tu iglesia',
      'test.cta': 'Crear cuenta · 4 horas gratis'
    }
  };

  /* ── Detecção genérica ───────────────────────────────────────────
     1) escolha salva  2) idioma do navegador (qualquer um suportado)
     3) fallback. Adicionar idioma a SUPPORTED já habilita a detecção. */
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
      for (var j = 0; j < SUPPORTED.length; j++) {
        if (code.indexOf(SUPPORTED[j]) === 0) return SUPPORTED[j]; // pt, pt-BR, en-GB, es-419…
      }
    }
    return DEFAULT_LANG;
  }

  var current = detect();

  function t(key) {
    var table = DICT[current] || {};
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    var fb = DICT[DEFAULT_LANG] || {};
    if (Object.prototype.hasOwnProperty.call(fb, key)) return fb[key];
    return key; // último recurso: mostra a chave (ajuda a localizar o que falta)
  }

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
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });

    document.documentElement.setAttribute('lang',
      current === 'pt' ? 'pt-BR' : (current === 'es' ? 'es' : 'en'));

    each.call(root.querySelectorAll('[data-i18n-switch]'), function (el) {
      var on = el.getAttribute('data-i18n-switch') === current;
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.classList.toggle('active', on);
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1 || lang === current) return;
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* segue sem lembrar */ }
    apply(document);
    document.dispatchEvent(new CustomEvent('atos2:langchange', { detail: { lang: current } }));
  }

  function getLang() { return current; }

  window.Atos2I18N = {
    t: t, apply: apply, setLang: setLang, getLang: getLang,
    supported: SUPPORTED, dict: DICT
  };

  function wireSwitchers() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-switch]'), function (el) {
      el.addEventListener('click', function () { setLang(el.getAttribute('data-i18n-switch')); });
    });
  }

  function boot() { apply(document); wireSwitchers(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
