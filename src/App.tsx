import { useState } from 'react';

// ============================================
// НАСТРОЙКИ ЯНДЕКС МЕТРИКИ
// Замените на ваш ID счётчика
// ============================================
const YANDEX_METRIKA_ID = 'XXXXXXXX'; // <-- Замените на ваш номер счётчика
const TARGET_GOAL_NAME = 'cta_button_click'; // <-- Название цели в Яндекс.Метрике

// Функция отправки цели в Яндекс.Метрику
function sendMetrikaGoal(goalName: string) {
  if (typeof window !== 'undefined' && (window as any).ym) {
    (window as any).ym(YANDEX_METRIKA_ID, 'reachGoal', goalName);
    console.log(`[Метрика] Цель отправлена: ${goalName}`);
  } else {
    console.log(`[Метрика] Счётчик не инициализирован. Цель: ${goalName}`);
  }
}

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleCtaClick = () => {
    sendMetrikaGoal(TARGET_GOAL_NAME);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TeenTalk</span>
          </div>
          <button
            onClick={handleCtaClick}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-violet-200"
          >
            Оставить заявку
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-violet-700 font-medium">Безопасное пространство для подростков</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Ваш ребёнок заслуживает{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                поддержку
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Профессиональные консультации психолога для подростков. 
              Вы оплачиваете — ваш ребёнок получает помощь. 
              Полная конфиденциальность содержания сессий.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleCtaClick}
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-violet-200 hover:-translate-y-0.5"
              >
                Узнать подробнее
              </button>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto text-gray-600 hover:text-gray-900 px-8 py-4 rounded-2xl text-lg font-medium border border-gray-200 hover:border-gray-300 transition-all duration-200 text-center"
              >
                Как это работает →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-violet-600 mb-1">100%</div>
            <div className="text-gray-600 text-sm">Конфиденциальность сессий</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-violet-600 mb-1">50+</div>
            <div className="text-gray-600 text-sm">Проверенных психологов</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-violet-600 mb-1">24/7</div>
            <div className="text-gray-600 text-sm">Доступ к платформе</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Почему это важно
            </h2>
            <p className="text-gray-600 text-lg">
              Подростковый возраст — время, когда поддержка специалиста может изменить жизнь
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">😰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Тревожность и стресс</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Учебная нагрузка, экзамены, социальное давление — подростки сталкиваются со стрессом, с которым не всегда могут справиться самостоятельно.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Не с кем поговорить</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Подростки часто не готовы обсуждать свои переживания с родителями. Им нужен нейтральный взрослый, который выслушает без осуждения.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ранняя помощь</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Своевременная работа с психологом помогает предотвратить серьёзные проблемы и формирует здоровые паттерны поведения на всю жизнь.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Как это работает
            </h2>
            <p className="text-gray-600 text-lg">
              Простой процесс, который даёт результат
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Выберите психолога</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Изучите профили специалистов, их подход и специализацию. Выберите того, кто подходит вашему ребёнку.
                </p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Определите лимит сессий</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Укажите, сколько консультаций в месяц вы готовы оплачивать. Ребёнок сам решит, когда записаться.
                </p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Привяжите карту</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Безопасная оплата. Вы контролируете бюджет, а ребёнок — график сессий в рамках лимита.
                </p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Ребёнок получает помощь</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Подросток записывается на сессии и общается с психологом. Вы получаете общие рекомендации без деталей.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
                  <span className="text-lg">🔒</span>
                  <span className="text-sm font-medium">Конфиденциальность</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Доверие — основа всего
                </h2>
                <p className="text-violet-100 leading-relaxed mb-6">
                  Подросток может быть полностью откровенен с психологом. 
                  Содержание сессий никогда не передаётся родителям. 
                  Вы получаете только общие рекомендации и информацию о прогрессе — без конкретных деталей разговоров.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Полная анонимность содержания сессий</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Общие рекомендации для родителей</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Соответствие закону о персональных данных</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl sm:text-6xl mb-2">🛡️</div>
                        <div className="text-sm font-medium text-violet-100">Защита данных</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Parents Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Что получают родители
            </h2>
            <p className="text-gray-600 text-lg">
              Вы участвуете в процессе, не нарушая личные границы ребёнка
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Общий прогресс</h3>
              <p className="text-gray-500 text-xs">Информация о динамике без деталей</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Рекомендации</h3>
              <p className="text-gray-500 text-xs">Советы по поддержке ребёнка</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Контроль бюджета</h3>
              <p className="text-gray-500 text-xs">Вы определяете лимит сессий</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
              <div className="text-3xl mb-3">👨‍⚕️</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Выбор специалиста</h3>
              <p className="text-gray-500 text-xs">Подбор психолога из каталога</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            Частые вопросы
          </h2>
          <div className="space-y-4">
            <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                Ребёнок точно захочет общаться с психологом?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                Мы не гарантируем, что подросток сразу захочет воспользоваться сервисом. Но мы создаём максимально комфортные условия: анонимность, выбор психолога, гибкий график. Статистика показывает, что подростки ценят возможность говорить с нейтральным взрослым.
              </div>
            </details>
            <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                Я точно не узнаю, о чём говорит мой ребёнок?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                Именно так. Конфиденциальность — ключевой принцип сервиса. Психолог может поделиться только общими рекомендациями по поддержке ребёнка, без раскрытия содержания бесед. Исключение — ситуации, угрожающие жизни и здоровью.
              </div>
            </details>
            <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                Как проходит оплата?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                Вы привязываете банковскую карту и определяете лимит сессий в месяц. Оплата происходит автоматически по факту проведённых консультаций. Вы всегда видите, сколько сессий использовано и сколько осталось.
              </div>
            </details>
            <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                Формат консультаций — онлайн или офлайн?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                Сервис работает в формате онлайн-консультаций через защищённую видеосвязь. Это удобно для подростков — они могут общаться с психологом из любого комфортного места.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Готовы дать ребёнку поддержку?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Оставьте заявку, чтобы узнать о запуске сервиса первым. 
            Мы уведомим вас, когда TeenTalk будет доступен.
          </p>
          <button
            onClick={handleCtaClick}
            className="bg-violet-600 hover:bg-violet-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-violet-200 hover:-translate-y-0.5"
          >
            Заинтересовало — оставить заявку
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Это не обязывает вас ни к чему. Мы просто хотим понять спрос.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">T</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">TeenTalk</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2026 TeenTalk. Психологическая помощь подросткам.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Спасибо за интерес!</h3>
              <p className="text-gray-600 mb-6">
                Мы рады, что эта идея вам откликается. Сервис находится в стадии разработки. 
                Оставьте email, чтобы узнать о запуске первым.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMetrikaGoal('email_submit');
                  setShowModal(false);
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  placeholder="Ваш email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Уведомить о запуске
                </button>
              </form>
              <p className="text-gray-400 text-xs mt-3">
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
