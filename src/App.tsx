import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Heart, ShieldCheck, MessageCircle, Users, X, Plus } from 'lucide-react';

const steps = [
  ['Вы выбираете круг специалистов', 'Изучаете образование, опыт работы с подростками и подход психологов. Добавляете в список тех, кому готовы доверить ребёнка.'],
  ['Согласовываете количество встреч', 'Вы определяете пакет сессий и бюджет. Условия и стоимость обсуждаются до оплаты.'],
  ['Подросток делает свой выбор', 'Ребёнок выбирает психолога из вашего списка и удобное время в пределах согласованного количества сессий.'],
  ['У него появляется своя опора', 'На личных встречах можно говорить о том, что волнует, искать решения и постепенно учиться понимать себя.'],
];
const questions = [
  ['Для какого возраста подходит этот формат?', 'Прежде всего для подростков. Оставьте возраст ребёнка в заявке: подход и формат встреч важно подбирать с учётом возраста и запроса семьи. Для детей младшего возраста участие родителей обсуждается отдельно.'],
  ['Что, если ребёнок не хочет идти к психологу?', 'Начните с предложения, а не требования. Объясните, что это возможность поговорить с человеком, которого он выберет сам. Готовность подростка важна: встречу не стоит превращать в наказание или проверку.'],
  ['Буду ли я знать содержание разговоров?', 'Личные разговоры не становятся отчётом для родителей. До начала встреч вы, подросток и психолог согласовываете границы конфиденциальности. При угрозе жизни или безопасности ребёнка может потребоваться участие родителей и других специалистов.'],
  ['Как устроены выбор и оплата?', 'Вы формируете список подходящих психологов и согласовываете количество сессий и их стоимость. Подросток выбирает специалиста из этого списка. Условия переноса, отмены и смены психолога нужно согласовать до оплаты.'],
  ['Можно ли получить помощь самому родителю?', 'В заявке можно выбрать консультацию для родителя или поддержку для всей семьи. Это отдельное пространство, чтобы обсудить свои переживания и найти способы поддержать ребёнка без давления.'],
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const close = () => { setShowForm(false); trigger.current?.focus(); };
  useEffect(() => {
    if (showForm) { dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else { dialog.current?.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [showForm]);
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdqtEcXjOWyPAd-nIpt84tgDJGyktM7y9TdHT06i88Fl5QKcw/viewform';
  const open = () => {
    const ym = (window as unknown as { ym?: (id: number, action: string, goal: string) => void }).ym;
    ym?.(113105745, 'reachGoal', 'cta_button_click');
    trigger.current = document.activeElement as HTMLElement;
    setShowForm(true);
  };
  return <>
    <header className="header wrap">
      <a className="brand" href="#" aria-label="Опора — главная"><span className="brand-mark"><Heart size={23} /></span>опора<span className="brand-dot">.</span></a>
      <nav aria-label="Основная навигация"><a href="#how">Как это работает</a><a href="#trust">О доверии</a><a href="#faq">Вопросы</a></nav>
      <button className="button small" onClick={open}>Подобрать поддержку <ArrowUpRight size={16}/></button>
    </header>
    <main>
      <section className="hero wrap">
        <div className="hero-copy"><div className="eyebrow"><span/> ДЛЯ ПОДРОСТКОВ. С ЗАБОТОЙ РОДИТЕЛЕЙ.</div>
          <h1>Быть рядом.<br/>Даже когда<br/><em>трудно говорить.</em></h1>
          <p className="intro">Иногда ребёнку проще открыться не родителю, а психологу. Вы можете дать ему эту возможность — с заботой, без давления и лишних вопросов.</p>
          <button className="button" onClick={open}>Найти опору для ребёнка <ArrowUpRight size={20}/></button>
          <p className="hero-note">Вы выбираете специалистов и бюджет.<br/>Подросток — с кем и о чём говорить.</p>
        </div>
        <div className="hero-art" aria-label="Иллюстрация: у каждого есть пространство для разговора">
          <div className="art-top"><span>У каждого — свой внутренний мир</span><span>↗</span></div>
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
          <div className="figure adult"><div className="head"/><div className="body"/></div><div className="figure teen"><div className="head"/><div className="body"/></div>
          <div className="speech speech-one">«Я рядом, если понадоблюсь»</div><div className="speech speech-two">«Здесь меня слышат» <Heart size={15}/></div>
          <div className="art-bottom"><span className="little-star">✳</span><span>Забота оставляет<br/>место для доверия.</span><span className="art-label">опора / для семьи</span></div>
        </div>
      </section>
      <div className="principles wrap"><span><Users size={19}/> Выбор вместе с ребёнком</span><span><ShieldCheck size={19}/> Личные границы важны</span><span><MessageCircle size={19}/> Разговор без осуждения</span></div>
      <section className="section wrap situations"><div className="section-heading"><div><span className="eyebrow">ЗНАКОМО МНОГИМ РОДИТЕЛЯМ</span><h2>«Всё нормально».<br/><em>А вы чувствуете — не всё.</em></h2></div><p>Не каждый разговор легко начать дома.<br/>Иногда нужен другой взрослый, который<br/>поможет разобраться в переживаниях.</p></div>
        <div className="cards">{[
          ['01', 'Слишком много напряжения', 'Экзамены, ожидания, страх ошибиться. Когда кажется, что нужно справляться со всем сразу.', 'Тревога и учёба'],
          ['02', 'Сложно найти своих', 'Ссоры с друзьями, одиночество, отношения. То, о чём бывает неловко рассказывать даже самым близким.', 'Друзья и отношения'],
          ['03', 'Трудно понять себя', 'Меняются чувства, тело, представления о себе. Хочется быть услышанным, а не получить ещё один совет.', 'Самооценка и взросление'],
        ].map(([n,title,description,tag])=><article className="situation-card" key={n}><span className="card-number">{n}<ArrowUpRight size={21}/></span><h3>{title}</h3><p>{description}</p><span className="tag">{tag}</span></article>)}</div>
      </section>
      <section className="process section" id="how"><div className="wrap"><div className="section-heading"><div><span className="eyebrow">КАК УСТРОЕНА ОПОРА</span><h2>Забота — ваша.<br/><em>Выбор — его.</em></h2></div><p>Вы создаёте условия для помощи.<br/>Ребёнок сохраняет самостоятельность.</p></div><div className="steps">{steps.map(([title,description],i)=><article key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="process-footer"><span>Список психологов + согласованный пакет встреч + личный выбор подростка</span><button className="text-button" onClick={open}>Обсудить подбор <ArrowRight size={18}/></button></div></div></section>
      <section className="section wrap trust" id="trust"><div className="trust-art"><div className="trust-symbol"><Heart size={72} strokeWidth={1}/></div><span>Доверие нельзя потребовать.<br/>Для него можно создать пространство.</span></div><div><span className="eyebrow">БЛИЗОСТЬ БЕЗ КОНТРОЛЯ</span><h2>Вам не нужно знать<br/><em>каждое слово.</em><br/>Важно, что его слышат.</h2><p>Психолог — не посредник для проверки ребёнка. Это человек, с которым подросток может обсудить свои мысли и чувства в личном разговоре.</p><ul className="check-list"><li><Check size={18}/> Вы участвуете в выборе специалистов и определяете бюджет.</li><li><Check size={18}/> Содержание бесед не превращается в отчёт родителям.</li><li><Check size={18}/> Границы конфиденциальности и исключения при угрозе безопасности обсуждаются заранее.</li></ul></div></section>
      <section className="parent-band wrap"><span className="parent-icon"><Users size={32}/></span><div><h3>Родителям тоже нужна опора</h3><p>Как начать разговор? Как поддержать и не давить? Можно обратиться за отдельной консультацией для себя.</p></div><button className="text-button" onClick={open}>Обсудить свой запрос <ArrowUpRight size={19}/></button></section>
      <section className="section wrap faq" id="faq"><div><span className="eyebrow">ПРОСТО О ВАЖНОМ</span><h2>Можно<br/><em>спросить.</em></h2><p>Вы доверяете самое дорогое.<br/>Вопросы — естественная часть выбора.</p></div><div>{questions.map(([q,a])=><details key={q}><summary>{q}<Plus size={20}/></summary><p>{a}</p></details>)}</div></section>
      <section className="final-cta wrap"><span className="eyebrow">НАЧНИТЕ С ОДНОГО ШАГА</span><h2>Не все разговоры — с вами.<br/><em>Но поддержка начинается с вас.</em></h2><p>Расскажите, какая помощь нужна вашей семье.<br/>Заполните заявку прямо здесь — без перехода на другую страницу.</p><button className="button" onClick={open}>Подобрать поддержку <ArrowUpRight size={20}/></button><span className="cta-note">Без оплаты на этом шаге</span></section>
    </main>
    <footer className="wrap footer"><a className="brand" href="#"><span className="brand-mark"><Heart size={23}/></span>опора.</a><span>Больше доверия. Больше пространства быть собой.</span><span>© {new Date().getFullYear()} Опора</span></footer>

    <dialog ref={dialog} className="form-dialog" aria-labelledby="form-title" onCancel={close} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="form-dialog-header"><div><span className="eyebrow">ПЕРВЫЙ ШАГ К ПОДДЕРЖКЕ</span><h2 id="form-title">Заявка для вашей семьи</h2></div><button className="form-close" onClick={close} aria-label="Закрыть форму"><X size={23}/></button></div>
      <p className="form-dialog-note">Заполните поля и нажмите «Отправить» внизу формы. Ответы поступят через Google Формы.</p>
      {showForm && <iframe className="google-form" src={`${formUrl}?embedded=true`} title="Форма заявки на психологическую поддержку" referrerPolicy="strict-origin-when-cross-origin" />}
    </dialog>
  </>;
}
export default App;
