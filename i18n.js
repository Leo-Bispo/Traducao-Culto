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
      'about.kicker': 'Quem somos',
      'about.lema': 'Somos. Cremos. Fazemos.',
      'about.lema_line': 'Só fazemos porque cremos naquilo que somos: irmãos que amam servir a Cristo.',
      'about.why': 'A Palavra precisa ser compreendida para edificar. Em 1 Coríntios 14, Paulo ensina que, na igreja, de nada adianta falar se ninguém entende. Por muito tempo, a barreira do idioma calou parte da mensagem — e exigia do pregador anos de estudo para alcançar quem falava outra língua. Com o Atos2, essa barreira deixa de existir.',
      'about.name_intro': 'No dia de Pentecostes, o Espírito desceu e cada pessoa ouviu as maravilhas de Deus em sua própria língua.',
      'about.verse': '"cada um os ouvia falar em seu próprio idioma."',
      'about.verse_ref': 'Atos 2.6',
      'about.name_close': 'É desse milagre que vem o nosso nome — e é esse milagre que levamos para o culto de hoje: agora, todos podem ouvir as maravilhas de Deus em seu próprio idioma.',
      'stats.title': 'Simples como um culto deve ser',
      'stats.languages_n': '19',
      'stats.languages_l': 'idiomas de tradução, e crescendo',
      'stats.apps_n': '0',
      'stats.apps_l': 'aplicativos para instalar',
      'stats.qr_n': '1',
      'stats.qr_l': 'QR Code para entrar',
      'stats.time_n': '< 1 min',
      'stats.time_l': 'do início à tradução no ar',
      'how.title': 'Como funciona',
      'how.sub': 'Três passos. Nada para o ouvinte instalar, nada para configurar.',
      'how.s1_t': 'O pregador fala',
      'how.s1_b': 'A pessoa no púlpito prega normalmente, no idioma de sempre. O som do culto entra no Atos2.',
      'how.s2_t': 'Atos2 traduz ao vivo',
      'how.s2_b': 'A fala é transcrita e traduzida em tempo real, com cuidado para o vocabulário bíblico.',
      'how.s3_t': 'Cada um lê no celular',
      'how.s3_b': 'A congregação aponta a câmera para um QR Code e acompanha — em texto, e se quiser ouvindo — no seu idioma.',
      'nav.about': 'Sobre',
      'nav.how': 'Como funciona',
      'hero.kicker': 'Tradução do culto · em tempo real',
      'hero.title': 'Cada um irá ouvir em sua própria língua.',
      'hero.lead': 'O Atos2 transcreve e traduz a pregação ao vivo e entrega direto no celular de cada pessoa — em texto e, se quiser, em voz. Em quantos idiomas a sua congregação precisar.',
      'hero.cta': 'Criar conta · 4 horas grátis',
      'hero.whatsapp': 'Falar no WhatsApp',
      'hero.trial': 'Comece testando gratuitamente · sem instalar nada · presencial e remoto.',
      'demo.live': 'Tradução ao vivo',
      'demo.pulpit': 'No púlpito',
      'demo.spoken': '"Sejam bem-vindos à casa do Senhor."',
      'demo.flow': '↓ traduzido em tempo real ↓',
      'feat.title': 'Tudo o que o culto precisa',
      'feat.sub': 'Pensado para igrejas com gente de muitos lugares.',
      'feat.1_t': 'Vários idiomas ao mesmo tempo',
      'feat.1_d': 'Cada pessoa escolhe o seu.',
      'feat.2_t': 'Texto e voz',
      'feat.2_d': 'Ler na tela ou ouvir no fone.',
      'feat.3_t': 'Só um QR Code',
      'feat.3_d': 'Sem instalar nada no celular.',
      'feat.4_t': 'Presencial ou remoto',
      'feat.4_d': 'No templo ou em outra cidade.',
      'feat.5_t': 'Vocabulário bíblico',
      'feat.5_d': 'Traduções fiéis ao contexto do culto.',
      'feat.6_t': 'Suporte de gente de verdade',
      'feat.6_d': 'Ajudamos na primeira configuração.',
      'partner.kicker': 'Seja um parceiro fundador',
      'partner.title': 'O Atos2 está na reta final',
      'partner.body': 'Estamos concluindo o produto com igrejas reais. Em vez de preços, abrimos as portas para igrejas parceiras: traga o Atos2 para o seu culto, teste com horas gratuitas e ajude a moldar a ferramenta. Os planos chegam em breve — quem entra agora entra como fundador.',
      'partner.b1': 'Horas gratuitas para testar de verdade',
      'partner.b2': 'Acompanhamento pessoal na configuração',
      'partner.b3': 'Voz ativa no que vamos construir',
      'cta.title': 'Que ninguém fique de fora',
      'cta.body': 'Crie a sua conta e teste no próximo culto, com horas gratuitas. Quer ver funcionando antes? Fale comigo no WhatsApp.',
      'cta.button': 'Criar conta · 4 horas grátis',
      'cta.whatsapp': 'Falar no WhatsApp',
      'foot.tagline': 'Para que todos ouçam as maravilhas de Deus em seu próprio idioma.',
      'foot.rights': '© 2026 Atos2 · atos2live.com',
      'proof.label': 'Em uso em',
      'auth.email': 'E-mail',
      'auth.email_ph': 'voce@igreja.com',
      'auth.password': 'Senha',
      'auth.forgot': 'Esqueci a senha',
      'auth.or': 'ou',
      'auth.google_login': 'Entrar com Google',
      'auth.google_signup': 'Continuar com Google',
      'auth.no_account': 'Não tem conta?',
      'auth.have_account': 'Já tem conta?',
      'auth.acct_type': 'Tipo de conta',
      'auth.church': 'Igreja',
      'auth.church_sub': 'cultos e ministérios',
      'auth.event': 'Evento',
      'auth.event_sub': 'conferências',
      'auth.org': 'Nome da organização',
      'auth.org_ph': 'Igreja Brasileira de Londres',
      'auth.your_name': 'Seu nome',
      'auth.your_name_ph': 'Seu nome completo',
      'auth.pass_ph': 'Mínimo de 6 caracteres',
      'auth.welcome_default': 'Bem-vindo!',
      'auth.welcome_tag': 'A casa está pronta. O painel é o próximo passo.',
      'auth.logout': 'Sair',
      'auth.err_org': 'Informe o nome da organização.',
      'auth.err_name': 'Informe o seu nome.',
      'auth.err_email': 'E-mail inválido.',
      'auth.err_pass_short': 'A senha precisa de pelo menos 6 caracteres.',
      'auth.err_pass_req': 'Informe a sua senha.',
      'auth.creating': 'Criando...',
      'auth.signing_in': 'Entrando...',
      'auth.created_title': 'Conta criada!',
      'auth.created_text': 'A sua organização e o seu acesso foram criados com sucesso.',
      'auth.created_confirm': 'Conta criada! Verifique o seu e-mail para confirmar o acesso e depois entre.',
      'auth.login_title': 'Login realizado!',
      'auth.login_text': 'Você entrou com sucesso na sua conta.',
      'auth.forgot_need_email': 'Digite o seu e-mail acima para enviarmos o link.',
      'auth.forgot_sent': 'Enviamos um link de redefinição para o seu e-mail.',
      'auth.e_exists': 'Este e-mail já tem conta. Tente entrar.',
      'auth.e_invalid': 'E-mail ou senha incorretos.',
      'auth.e_unconfirmed': 'Confirme o seu e-mail antes de entrar (veja a caixa de entrada).',
      'auth.e_google': 'O acesso com Google ainda não foi ativado no Supabase.',
      'auth.e_rate': 'Muitas tentativas. Aguarde um pouco e tente de novo.',
      'auth.session_title': 'Você já está conectado',
      'auth.session_text': 'Sessão ativa encontrada neste navegador.',

      'test.kicker': 'TESTE DO MOTOR DE IDIOMAS',
      'test.title': 'Cada um irá ouvir em sua própria língua.',
      'test.body': 'Se você está lendo isto em português, a detecção pelo navegador funcionou. Use o seletor acima: o conteúdo todo troca na hora, sem recarregar. Recarregue depois — ele deve lembrar a sua última escolha.',
      'test.field': 'Digite o nome da sua igreja',
      'test.cta': 'Criar conta · 4 horas grátis'
    },
    en: {
      'lang.pt': 'Português', 'lang.en': 'English', 'lang.es': 'Español',
      'nav.login': 'Sign in', 'nav.signup': 'Create account',
      'about.kicker': 'Who we are',
      'about.lema': 'We are. We believe. We do.',
      'about.lema_line': 'We only do because we believe in who we are: brothers and sisters who love to serve Christ.',
      'about.why': 'The Word must be understood to build people up. In 1 Corinthians 14, Paul teaches that, in church, speaking is worthless if no one understands. For too long, the language barrier silenced part of the message — and asked preachers for years of study to reach those who spoke another tongue. With Atos2, that barrier falls.',
      'about.name_intro': 'On the day of Pentecost, the Spirit came and each person heard the wonders of God in their own language.',
      'about.verse': '"each one heard them speaking in his own language."',
      'about.verse_ref': 'Acts 2:6',
      'about.name_close': 'That miracle is where our name comes from — and it is that miracle we bring to worship today: now everyone can hear the wonders of God in their own language.',
      'stats.title': 'As simple as worship should be',
      'stats.languages_n': '19',
      'stats.languages_l': 'translation languages, and growing',
      'stats.apps_n': '0',
      'stats.apps_l': 'apps to install',
      'stats.qr_n': '1',
      'stats.qr_l': 'QR Code to join',
      'stats.time_n': '< 1 min',
      'stats.time_l': 'from start to live translation',
      'how.title': 'How it works',
      'how.sub': 'Three steps. Nothing for the listener to install, nothing to set up.',
      'how.s1_t': 'The preacher speaks',
      'how.s1_b': 'The person at the pulpit preaches as usual, in their own language. The service audio goes into Atos2.',
      'how.s2_t': 'Atos2 translates live',
      'how.s2_b': 'Speech is transcribed and translated in real time, with care for biblical vocabulary.',
      'how.s3_t': 'Everyone reads on their phone',
      'how.s3_b': 'The congregation points their camera at a QR Code and follows along — in text, and if they wish, by audio — in their own language.',
      'nav.about': 'About',
      'nav.how': 'How it works',
      'hero.kicker': 'Worship translation · in real time',
      'hero.title': 'Everyone will hear in their own language.',
      'hero.lead': 'Atos2 transcribes and translates the sermon live and delivers it straight to each person\'s phone — in text and, if they wish, in voice. In as many languages as your congregation needs.',
      'hero.cta': 'Create account · 4 hours free',
      'hero.whatsapp': 'Chat on WhatsApp',
      'hero.trial': 'Start with a free trial · nothing to install · in person and remote.',
      'demo.live': 'Live translation',
      'demo.pulpit': 'At the pulpit',
      'demo.spoken': '"Welcome to the house of the Lord."',
      'demo.flow': '↓ translated in real time ↓',
      'feat.title': 'Everything the service needs',
      'feat.sub': 'Built for churches with people from many places.',
      'feat.1_t': 'Many languages at once',
      'feat.1_d': 'Each person picks their own.',
      'feat.2_t': 'Text and voice',
      'feat.2_d': 'Read on screen or listen on earphones.',
      'feat.3_t': 'Just a QR Code',
      'feat.3_d': 'Nothing to install on the phone.',
      'feat.4_t': 'In person or remote',
      'feat.4_d': 'In the building or in another city.',
      'feat.5_t': 'Biblical vocabulary',
      'feat.5_d': 'Translations faithful to the service context.',
      'feat.6_t': 'Support from real people',
      'feat.6_d': 'We help with the first setup.',
      'partner.kicker': 'Become a founding partner',
      'partner.title': 'Atos2 is in its final stretch',
      'partner.body': 'We are completing the product with real churches. Instead of pricing, we are opening our doors to partner churches: bring Atos2 to your service, test it with free hours, and help shape the tool. Plans are coming soon — those who join now join as founders.',
      'partner.b1': 'Free hours to truly test it',
      'partner.b2': 'Personal help with setup',
      'partner.b3': 'A real voice in what we build',
      'cta.title': 'Let no one be left out',
      'cta.body': 'Create your account and test it at your next service, with free hours. Want to see it working first? Chat with me on WhatsApp.',
      'cta.button': 'Create account · 4 hours free',
      'cta.whatsapp': 'Chat on WhatsApp',
      'foot.tagline': 'So that everyone may hear the wonders of God in their own language.',
      'foot.rights': '© 2026 Atos2 · atos2live.com',
      'proof.label': 'In use at',
      'auth.email': 'Email',
      'auth.email_ph': 'you@church.com',
      'auth.password': 'Password',
      'auth.forgot': 'Forgot password',
      'auth.or': 'or',
      'auth.google_login': 'Sign in with Google',
      'auth.google_signup': 'Continue with Google',
      'auth.no_account': 'No account yet?',
      'auth.have_account': 'Already have an account?',
      'auth.acct_type': 'Account type',
      'auth.church': 'Church',
      'auth.church_sub': 'services and ministries',
      'auth.event': 'Event',
      'auth.event_sub': 'conferences',
      'auth.org': 'Organization name',
      'auth.org_ph': 'Your church or ministry',
      'auth.your_name': 'Your name',
      'auth.your_name_ph': 'Your full name',
      'auth.pass_ph': 'At least 6 characters',
      'auth.welcome_default': 'Welcome!',
      'auth.welcome_tag': 'The house is ready. The dashboard is the next step.',
      'auth.logout': 'Sign out',
      'auth.err_org': 'Please enter the organization name.',
      'auth.err_name': 'Please enter your name.',
      'auth.err_email': 'Invalid email.',
      'auth.err_pass_short': 'Password must be at least 6 characters.',
      'auth.err_pass_req': 'Please enter your password.',
      'auth.creating': 'Creating...',
      'auth.signing_in': 'Signing in...',
      'auth.created_title': 'Account created!',
      'auth.created_text': 'Your organization and your access were created successfully.',
      'auth.created_confirm': 'Account created! Check your email to confirm access, then sign in.',
      'auth.login_title': 'Signed in!',
      'auth.login_text': 'You have successfully signed in to your account.',
      'auth.forgot_need_email': 'Enter your email above so we can send the link.',
      'auth.forgot_sent': 'We sent a reset link to your email.',
      'auth.e_exists': 'This email already has an account. Try signing in.',
      'auth.e_invalid': 'Incorrect email or password.',
      'auth.e_unconfirmed': 'Confirm your email before signing in (check your inbox).',
      'auth.e_google': 'Google sign-in is not yet enabled in Supabase.',
      'auth.e_rate': 'Too many attempts. Please wait a moment and try again.',
      'auth.session_title': 'You are already signed in',
      'auth.session_text': 'An active session was found in this browser.',

      'test.kicker': 'LANGUAGE ENGINE TEST',
      'test.title': 'Everyone will hear in their own language.',
      'test.body': 'If you are reading this in English, browser detection worked. Use the selector above: all content switches instantly, with no reload. Reload afterwards — it should remember your last choice.',
      'test.field': 'Type your church name',
      'test.cta': 'Create account · 4 hours free'
    },
    es: {
      'lang.pt': 'Português', 'lang.en': 'English', 'lang.es': 'Español',
      'nav.login': 'Iniciar sesión', 'nav.signup': 'Crear cuenta',
      'about.kicker': 'Quiénes somos',
      'about.lema': 'Somos. Creemos. Hacemos.',
      'about.lema_line': 'Solo hacemos porque creemos en lo que somos: hermanos que aman servir a Cristo.',
      'about.why': 'La Palabra necesita ser comprendida para edificar. En 1 Corintios 14, Pablo enseña que, en la iglesia, de nada sirve hablar si nadie entiende. Durante mucho tiempo, la barrera del idioma silenció parte del mensaje — y exigía del predicador años de estudio para alcanzar a quien hablaba otra lengua. Con Atos2, esa barrera deja de existir.',
      'about.name_intro': 'En el día de Pentecostés, el Espíritu descendió y cada persona oyó las maravillas de Dios en su propia lengua.',
      'about.verse': '"cada uno los oía hablar en su propio idioma."',
      'about.verse_ref': 'Hechos 2:6',
      'about.name_close': 'De ese milagro viene nuestro nombre — y es ese milagro el que llevamos al culto de hoy: ahora todos pueden oír las maravillas de Dios en su propia lengua.',
      'stats.title': 'Tan simple como debe ser un culto',
      'stats.languages_n': '19',
      'stats.languages_l': 'idiomas de traducción, y creciendo',
      'stats.apps_n': '0',
      'stats.apps_l': 'aplicaciones para instalar',
      'stats.qr_n': '1',
      'stats.qr_l': 'código QR para entrar',
      'stats.time_n': '< 1 min',
      'stats.time_l': 'del inicio a la traducción en vivo',
      'how.title': 'Cómo funciona',
      'how.sub': 'Tres pasos. Nada que instalar para el oyente, nada que configurar.',
      'how.s1_t': 'El predicador habla',
      'how.s1_b': 'La persona en el púlpito predica con normalidad, en su propio idioma. El audio del culto entra en Atos2.',
      'how.s2_t': 'Atos2 traduce en vivo',
      'how.s2_b': 'El habla se transcribe y traduce en tiempo real, con cuidado por el vocabulario bíblico.',
      'how.s3_t': 'Cada uno lee en su celular',
      'how.s3_b': 'La congregación apunta la cámara a un código QR y sigue el mensaje — en texto, y si quiere por audio — en su propio idioma.',
      'nav.about': 'Acerca de',
      'nav.how': 'Cómo funciona',
      'hero.kicker': 'Traducción del culto · en tiempo real',
      'hero.title': 'Cada uno escuchará en su propio idioma.',
      'hero.lead': 'Atos2 transcribe y traduce la predicación en vivo y la entrega directo al celular de cada persona — en texto y, si quiere, en voz. En cuantos idiomas necesite tu congregación.',
      'hero.cta': 'Crear cuenta · 4 horas gratis',
      'hero.whatsapp': 'Hablar por WhatsApp',
      'hero.trial': 'Empieza con una prueba gratis · sin instalar nada · presencial y remoto.',
      'demo.live': 'Traducción en vivo',
      'demo.pulpit': 'En el púlpito',
      'demo.spoken': '"Bienvenidos a la casa del Señor."',
      'demo.flow': '↓ traducido en tiempo real ↓',
      'feat.title': 'Todo lo que el culto necesita',
      'feat.sub': 'Pensado para iglesias con gente de muchos lugares.',
      'feat.1_t': 'Varios idiomas a la vez',
      'feat.1_d': 'Cada persona elige el suyo.',
      'feat.2_t': 'Texto y voz',
      'feat.2_d': 'Leer en pantalla o escuchar con auriculares.',
      'feat.3_t': 'Solo un código QR',
      'feat.3_d': 'Sin instalar nada en el celular.',
      'feat.4_t': 'Presencial o remoto',
      'feat.4_d': 'En el templo o en otra ciudad.',
      'feat.5_t': 'Vocabulario bíblico',
      'feat.5_d': 'Traducciones fieles al contexto del culto.',
      'feat.6_t': 'Soporte de gente de verdad',
      'feat.6_d': 'Ayudamos en la primera configuración.',
      'partner.kicker': 'Sé un socio fundador',
      'partner.title': 'Atos2 está en la recta final',
      'partner.body': 'Estamos terminando el producto con iglesias reales. En lugar de precios, abrimos las puertas a iglesias asociadas: lleva Atos2 a tu culto, pruébalo con horas gratuitas y ayuda a dar forma a la herramienta. Los planes llegan pronto — quien entra ahora entra como fundador.',
      'partner.b1': 'Horas gratuitas para probarlo de verdad',
      'partner.b2': 'Acompañamiento personal en la configuración',
      'partner.b3': 'Voz activa en lo que vamos a construir',
      'cta.title': 'Que nadie quede afuera',
      'cta.body': 'Crea tu cuenta y pruébalo en tu próximo culto, con horas gratuitas. ¿Quieres verlo funcionando antes? Háblame por WhatsApp.',
      'cta.button': 'Crear cuenta · 4 horas gratis',
      'cta.whatsapp': 'Hablar por WhatsApp',
      'foot.tagline': 'Para que todos oigan las maravillas de Dios en su propio idioma.',
      'foot.rights': '© 2026 Atos2 · atos2live.com',
      'proof.label': 'En uso en',
      'auth.email': 'Correo electrónico',
      'auth.email_ph': 'tu@iglesia.com',
      'auth.password': 'Contraseña',
      'auth.forgot': 'Olvidé mi contraseña',
      'auth.or': 'o',
      'auth.google_login': 'Iniciar sesión con Google',
      'auth.google_signup': 'Continuar con Google',
      'auth.no_account': '¿No tienes cuenta?',
      'auth.have_account': '¿Ya tienes cuenta?',
      'auth.acct_type': 'Tipo de cuenta',
      'auth.church': 'Iglesia',
      'auth.church_sub': 'cultos y ministerios',
      'auth.event': 'Evento',
      'auth.event_sub': 'conferencias',
      'auth.org': 'Nombre de la organización',
      'auth.org_ph': 'Tu iglesia o ministerio',
      'auth.your_name': 'Tu nombre',
      'auth.your_name_ph': 'Tu nombre completo',
      'auth.pass_ph': 'Mínimo de 6 caracteres',
      'auth.welcome_default': '¡Bienvenido!',
      'auth.welcome_tag': 'La casa está lista. El panel es el siguiente paso.',
      'auth.logout': 'Salir',
      'auth.err_org': 'Indica el nombre de la organización.',
      'auth.err_name': 'Indica tu nombre.',
      'auth.err_email': 'Correo inválido.',
      'auth.err_pass_short': 'La contraseña necesita al menos 6 caracteres.',
      'auth.err_pass_req': 'Indica tu contraseña.',
      'auth.creating': 'Creando...',
      'auth.signing_in': 'Entrando...',
      'auth.created_title': '¡Cuenta creada!',
      'auth.created_text': 'Tu organización y tu acceso se crearon con éxito.',
      'auth.created_confirm': '¡Cuenta creada! Revisa tu correo para confirmar el acceso y luego inicia sesión.',
      'auth.login_title': '¡Sesión iniciada!',
      'auth.login_text': 'Has iniciado sesión en tu cuenta con éxito.',
      'auth.forgot_need_email': 'Escribe tu correo arriba para enviarte el enlace.',
      'auth.forgot_sent': 'Enviamos un enlace de restablecimiento a tu correo.',
      'auth.e_exists': 'Este correo ya tiene cuenta. Intenta iniciar sesión.',
      'auth.e_invalid': 'Correo o contraseña incorrectos.',
      'auth.e_unconfirmed': 'Confirma tu correo antes de iniciar sesión (revisa tu bandeja de entrada).',
      'auth.e_google': 'El acceso con Google aún no está activado en Supabase.',
      'auth.e_rate': 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
      'auth.session_title': 'Ya has iniciado sesión',
      'auth.session_text': 'Se encontró una sesión activa en este navegador.',

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
/* ═══════════════════════════════════════════════════════════════════
   SELETOR DE IDIOMAS (dropdown) — componente do motor
   Monte em qualquer página colocando:  <div data-i18n-dropdown></div>
   Mostra os idiomas de SUPPORTED pelos nomes (lang.<código>).
   Escala para quantos idiomas houver; pronto para busca no futuro.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (!window.Atos2I18N) return;
  var I = window.Atos2I18N;

  function injectCSS() {
    if (document.getElementById('a2lang-css')) return;
    var s = document.createElement('style');
    s.id = 'a2lang-css';
    s.textContent = [
      ".a2lang{position:relative;display:inline-block;font-family:'Inter',sans-serif}",
      ".a2lang-btn{display:inline-flex;align-items:center;gap:.45rem;cursor:pointer;background:var(--cream2,#f1ead9);border:1px solid var(--line,#e7e0cf);border-radius:9px;padding:.4rem .7rem;font-size:.82rem;font-weight:600;color:var(--ink,#2c2820);transition:.15s}",
      ".a2lang-btn:hover{border-color:var(--gold,#c9a84c)}",
      ".a2lang-btn svg{width:14px;height:14px;flex:none;stroke:currentColor}",
      ".a2lang-chev{transition:transform .15s}",
      ".a2lang.open .a2lang-chev{transform:rotate(180deg)}",
      ".a2lang-menu{position:absolute;top:calc(100% + 6px);right:0;min-width:160px;z-index:60;background:#fff;border:1px solid var(--line,#e7e0cf);border-radius:11px;box-shadow:0 12px 30px rgba(120,100,50,.16);padding:.3rem;margin:0;list-style:none;max-height:300px;overflow:auto}",
      ".a2lang-menu[hidden]{display:none}",
      ".a2lang-opt{padding:.5rem .7rem;border-radius:8px;font-size:.88rem;color:var(--ink,#2c2820);cursor:pointer;white-space:nowrap}",
      ".a2lang-opt:hover{background:var(--cream,#f8f4ea)}",
      ".a2lang-opt.active{background:rgba(201,168,76,.14);font-weight:600}"
    ].join('');
    document.head.appendChild(s);
  }

  var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z"/></svg>';
  var CHEV = '<svg class="a2lang-chev" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

  function build(mount) {
    var wrap = document.createElement('div');
    wrap.className = 'a2lang';
    var btn = document.createElement('button');
    btn.className = 'a2lang-btn';
    btn.type = 'button';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = GLOBE + '<span class="a2lang-current"></span>' + CHEV;

    var menu = document.createElement('ul');
    menu.className = 'a2lang-menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;
    menu.addEventListener('click', function (e) { e.stopPropagation(); });

    function open() { menu.hidden = false; wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { menu.hidden = true; wrap.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }

    I.supported.forEach(function (code) {
      var li = document.createElement('li');
      li.className = 'a2lang-opt';
      li.setAttribute('role', 'option');
      li.setAttribute('data-lang', code);
      li.textContent = I.t('lang.' + code);
      li.addEventListener('click', function () { I.setLang(code); close(); });
      menu.appendChild(li);
    });

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.hidden) open(); else close();
    });
    document.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    mount.innerHTML = '';
    mount.appendChild(wrap);
  }

  function refresh() {
    var cur = I.getLang();
    Array.prototype.forEach.call(document.querySelectorAll('.a2lang'), function (wrap) {
      var label = wrap.querySelector('.a2lang-current');
      if (label) label.textContent = I.t('lang.' + cur);
      Array.prototype.forEach.call(wrap.querySelectorAll('.a2lang-opt'), function (opt) {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === cur);
      });
    });
  }

  function mountAll() {
    injectCSS();
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-dropdown]'), function (m) {
      if (!m.querySelector('.a2lang')) build(m);
    });
    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
  document.addEventListener('atos2:langchange', refresh);
})();
