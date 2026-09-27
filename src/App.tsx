import { useState } from 'react';

// ============================================
// НАСТРОЙКИ ЯНДЕКС МЕТРИКИ
// ============================================
const YANDEX_METRIKA_ID = 'XXXXXXXX';
const TARGET_GOAL_NAME = 'cta_button_click';

// ============================================
// НАСТРОЙКИ TELEGRAM БОТА
// ============================================
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // <-- Токен от @BotFather
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';     // <-- Ваш chat_id (узнать у @userinfobot)

function sendMetrikaGoal(goalName: string) {
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(YANDEX_METRIKA_ID, 'reachGoal', goalName);
    console.log(`[Метрика] Цель отправлена: ${goalName}`);
  } else {
    console.log(`[Метрика] Счётчик не инициализирован. Цель: ${goalName}`);
  }
}

async function sendToTelegram(email: string): Promise<boolean> {
  try {
    // Собираем дополнительную информацию
    const timestamp = new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      dateStyle: 'short',
      timeStyle: 'short'
    });
    const userAgent = navigator.userAgent;
    const referrer = document.referrer || 'Прямой заход';
    const url = window.location.href;
    
    // Определяем устройство
    let device = 'Десктоп';
    if (/Mobile|Android|iPhone|iPad/i.test(userAgent)) {
      device = /iPhone|iPad/i.test(userAgent) ? 'iOS' : 'Android';
    }
    
    // Формируем сообщение
    const message = `
🔔 <b>Новая заявка Опора!</b>

📧 <b>Email:</b> <code>${email}</code>
🕐 <b>Время:</b> ${timestamp}
📱 <b>Устройство:</b> ${device}
🔗 <b>Источник:</b> ${referrer}
🌐 <b>URL:</b> ${url}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );

    if (!response.ok) {
      throw new Error('Ошибка отправки в Telegram');
    }

    console.log('[Telegram] Заявка успешно отправлена');
    return true;
  } catch (error) {
    console.error('[Telegram] Ошибка отправки:', error);
    return false;
  }
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCtaClick = () => {
    sendMetrikaGoal(TARGET_GOAL_NAME);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Отправляем в Telegram
    const telegramSuccess = await sendToTelegram(email);
    
    // Отправляем цель в Метрику
    sendMetrikaGoal('email_submit');

    if (telegramSuccess) {
      setSubmitStatus('success');
      setEmail('');
      // Закрываем модальное окно через 2 секунды
      setTimeout(() => {
        setShowModal(false);
        setSubmitStatus('idle');
      }, 2000);
    } else {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-['Inter',sans-serif] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-amber-100/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-100/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-yellow-100/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl z-50 border-b border-orange-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo_.png" alt="Опора" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold text-stone-800">Опора</span>
          </div>
          <button
            onClick={handleCtaClick}
            className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-200/60 hover:-translate-y-0.5"
          >
            Оставить заявку
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto relative">
          {/* Floating decorative elements */}
          <div className="absolute top-10 left-10 text-4xl animate-float opacity-60 hidden sm:block">🌿</div>
          <div className="absolute top-20 right-16 text-3xl animate-float-slow opacity-50 hidden sm:block">✨</div>
          <div className="absolute bottom-10 left-1/4 text-3xl animate-float opacity-40 hidden sm:block" style={{ animationDelay: '1s' }}>🤍</div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 rounded-full px-5 py-2 mb-8 shadow-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-stone-600 font-medium">Безопасное пространство для вашего ребёнка</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-stone-800 leading-[1.1] mb-6 tracking-tight">
              Забота о ребёнке{' '}
              <span className="warm-gradient-text">
                начинается с внимания
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-stone-500 leading-relaxed mb-10 max-w-2xl mx-auto">
              Профессиональные психологи для подростков. 
              Вы создаёте возможность — ребёнок получает поддержку. 
              Всё содержание бесед остаётся между ними.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleCtaClick}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-orange-200/60 hover:-translate-y-0.5"
              >
                Узнать подробнее
              </button>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto text-stone-600 hover:text-stone-800 px-8 py-4 rounded-2xl text-lg font-medium bg-white/60 backdrop-blur-sm border border-orange-100 hover:border-orange-200 transition-all duration-300 text-center"
              >
                Как это работает
              </a>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-br from-orange-100 via-rose-50 to-amber-100 rounded-full flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <div className="text-7xl sm:text-8xl mb-2">🫂</div>
                  <p className="text-stone-500 text-sm font-medium">Поддержка рядом</p>
                </div>
              </div>
              {/* Floating icons around */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float">
                <span className="text-2xl">💛</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float-slow">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="absolute top-1/2 -right-8 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                <span className="text-xl">🎧</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-xl">🔒</span>
                </div>
                <div className="text-2xl font-bold text-stone-800 mb-1">100%</div>
                <div className="text-stone-500 text-sm">Конфиденциальность</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-xl">👩‍⚕️</span>
                </div>
                <div className="text-2xl font-bold text-stone-800 mb-1">50+</div>
                <div className="text-stone-500 text-sm">Проверенных специалистов</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-xl">🕐</span>
                </div>
                <div className="text-2xl font-bold text-stone-800 mb-1">24/7</div>
                <div className="text-stone-500 text-sm">Доступ к платформе</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 mb-5">
              <span className="text-sm">💭</span>
              <span className="text-sm text-orange-700 font-medium">Почему это важно</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4 tracking-tight">
              Подросткам нужна опора
            </h2>
            <p className="text-stone-500 text-lg">
              Возраст, когда мир кажется сложным, а поддержка — необходимой
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-3xl">😰</span>
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Тревожность и стресс</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Учебная нагрузка, экзамены, отношения со сверстниками — подростки сталкиваются с давлением, с которым не всегда справляются сами.
              </p>
            </div>
            <div className="glass-card rounded-3xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤐</span>
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Не с кем поговорить</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Подросткам часто нужен нейтральный взрослый, который выслушает без осуждения и поможет разобраться в чувствах.
              </p>
            </div>
            <div className="glass-card rounded-3xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Своевременная помощь</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Ранняя работа с психологом помогает предотвратить серьёзные проблемы и формирует здоровые привычки на всю жизнь.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 mb-5">
              <span className="text-sm">🗺️</span>
              <span className="text-sm text-orange-700 font-medium">Простой процесс</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4 tracking-tight">
              Как это работает
            </h2>
            <p className="text-stone-500 text-lg">
              Четыре простых шага к спокойствию вашего ребёнка
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                num: '01',
                icon: '🔍',
                title: 'Выберите психолога',
                desc: 'Изучите профили специалистов, их подход и опыт. Найдите того, кто подойдёт именно вашему ребёнку.',
                color: 'from-orange-400 to-amber-400'
              },
              {
                num: '02',
                icon: '📅',
                title: 'Определите лимит сессий',
                desc: 'Укажите количество консультаций в месяц. Ребёнок сам решит, когда записаться на встречу.',
                color: 'from-rose-400 to-pink-400'
              },
              {
                num: '03',
                icon: '💳',
                title: 'Привяжите карту',
                desc: 'Безопасная оплата. Вы контролируете бюджет, а ребёнок — свой график в рамках лимита.',
                color: 'from-amber-400 to-orange-400'
              },
              {
                num: '04',
                icon: '🌟',
                title: 'Ребёнок получает поддержку',
                desc: 'Подросток записывается на сессии. Вы получаете общие рекомендации — без деталей разговоров.',
                color: 'from-pink-400 to-rose-400'
              }
            ].map((step) => (
              <div key={step.num} className="glass-card rounded-3xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-400 mb-1 tracking-wider">ШАГ {step.num}</div>
                    <h3 className="font-semibold text-stone-800 mb-1.5 text-lg">{step.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500 rounded-[2.5rem] p-8 sm:p-12 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
                  <span className="text-lg">🔐</span>
                  <span className="text-sm font-medium text-white">Конфиденциальность</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                  Доверие — основа всего
                </h2>
                <p className="text-white/90 leading-relaxed mb-7">
                  Подросток может быть полностью откровенен с психологом. 
                  Содержание сессий никогда не передаётся родителям. 
                  Вы получаете только общие рекомендации — без конкретных деталей.
                </p>
                <ul className="space-y-4">
                  {[
                    'Полная анонимность содержания сессий',
                    'Общие рекомендации для родителей',
                    'Соответствие закону о персональных данных',
                    'Шифрование всех коммуникаций'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/95 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-52 h-52 sm:w-64 sm:h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-40 h-40 sm:w-52 sm:h-52 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl sm:text-7xl mb-2">🛡️</div>
                        <div className="text-sm font-medium text-white/90">Защита данных</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-float">
                    <span className="text-xl">🔑</span>
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-float-slow">
                    <span className="text-xl">🤝</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Parents Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 mb-5">
              <span className="text-sm">👨‍👩‍👧</span>
              <span className="text-sm text-orange-700 font-medium">Для родителей</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4 tracking-tight">
              Что получаете вы
            </h2>
            <p className="text-stone-500 text-lg">
              Участвуйте в процессе, не нарушая личные границы ребёнка
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: '📊', title: 'Общий прогресс', desc: 'Информация о динамике без деталей' },
              { icon: '💬', title: 'Рекомендации', desc: 'Советы по поддержке ребёнка' },
              { icon: '💳', title: 'Контроль бюджета', desc: 'Вы определяете лимит сессий' },
              { icon: '👩‍⚕️', title: 'Выбор специалиста', desc: 'Подбор психолога из каталога' }
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-3xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-semibold text-stone-800 text-sm mb-1">{item.title}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-4 left-6 text-6xl text-orange-200 font-serif">"</div>
            <div className="relative z-10">
              <p className="text-xl sm:text-2xl text-stone-700 leading-relaxed font-medium mb-6 italic">
                Когда ребёнок знает, что его переживания важны для вас, но при этом остаются его личным пространством — это даёт ему силу открыться и расти.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-rose-300 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💛</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-stone-700">Философия Опоры</div>
                  <div className="text-xs text-stone-400">Баланс заботы и доверия</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 mb-5">
              <span className="text-sm">❓</span>
              <span className="text-sm text-orange-700 font-medium">Ответы на вопросы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: 'Ребёнок точно захочет общаться с психологом?',
                a: 'Мы не гарантируем, что подросток сразу захочет воспользоваться сервисом. Но мы создаём максимально комфортные условия: анонимность, выбор психолога, гибкий график. Статистика показывает, что подростки ценят возможность говорить с нейтральным взрослым.'
              },
              {
                q: 'Я точно не узнаю, о чём говорит мой ребёнок?',
                a: 'Именно так. Конфиденциальность — ключевой принцип сервиса. Психолог может поделиться только общими рекомендациями по поддержке ребёнка, без раскрытия содержания бесед. Исключение — ситуации, угрожающие жизни и здоровью.'
              },
              {
                q: 'Как проходит оплата?',
                a: 'Вы привязываете банковскую карту и определяете лимит сессий в месяц. Оплата происходит автоматически по факту проведённых консультаций. Вы всегда видите, сколько сессий использовано и сколько осталось.'
              },
              {
                q: 'Формат консультаций — онлайн или офлайн?',
                a: 'Сервис работает в формате онлайн-консультаций через защищённую видеосвязь. Это удобно для подростков — они могут общаться с психологом из любого комфортного места.'
              }
            ].map((item, i) => (
              <details key={i} className="group glass-card rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer font-medium text-stone-800 hover:bg-orange-50/50 transition-colors">
                  <span className="pr-4">{item.q}</span>
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-stone-500 text-sm leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-[2.5rem] p-10 sm:p-16 text-center border border-orange-100/50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 text-4xl opacity-30 animate-float">🌸</div>
            <div className="absolute bottom-6 right-6 text-4xl opacity-30 animate-float-slow">🌿</div>
            <div className="absolute top-1/2 right-10 text-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>✨</div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-5">🤗</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4 tracking-tight">
                Начните заботиться о ребёнке уже сегодня
              </h2>
              <p className="text-stone-500 text-lg mb-8 max-w-xl mx-auto">
                Оставьте заявку, и мы свяжемся с вами, чтобы подобрать психолога 
                и рассказать подробнее о том, как работает сервис.
              </p>
              <button
                onClick={handleCtaClick}
                className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-orange-200/60 hover:-translate-y-0.5"
              >
                Оставить заявку
              </button>
              <p className="text-stone-400 text-sm mt-4">
                Мы свяжемся с вами в течение рабочего дня
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-orange-100/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo_.png" alt="Опора" className="w-7 h-7 object-contain" />
            <span className="text-sm font-semibold text-stone-700">Опора</span>
          </div>
          <p className="text-stone-400 text-sm">
            © 2026 Опора. Психологическая помощь подросткам.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-[2rem] p-8 sm:p-10 max-w-md w-full shadow-2xl animate-fadeIn border border-orange-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-orange-50 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-2">Заявка принята!</h3>
              <p className="text-stone-500 mb-6 text-sm leading-relaxed">
                Оставьте email, и мы свяжемся с вами, чтобы рассказать подробнее 
                о сервисе и помочь подобрать психолога для вашего ребёнка.
              </p>
              {submitStatus === 'success' ? (
                <div className="py-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-2">Готово!</h3>
                  <p className="text-stone-500 text-sm">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3.5 bg-orange-50/50 border border-orange-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent placeholder:text-stone-400 disabled:opacity-60"
                  />
                  {submitStatus === 'error' && (
                    <div className="text-rose-600 text-xs px-1">
                      Не удалось отправить. Попробуйте ещё раз или напишите нам позже.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-200/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Отправляем...
                      </>
                    ) : (
                      'Получить консультацию'
                    )}
                  </button>
                </form>
              )}
              <p className="text-stone-400 text-xs mt-4">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
