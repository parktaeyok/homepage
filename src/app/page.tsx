import styles from "./page.module.css";

const services = [
  {
    number: "01",
    title: "업무 분석·시스템 설계",
    description: "현재 사용하는 문서와 업무 절차를 살펴보고, 고객사별 관리 기준과 담당자별 처리 흐름을 설계합니다.",
  },
  {
    number: "02",
    title: "QMS 맞춤 개발·구축",
    description: "문서, 심사 일정, 부적합 및 시정조치 등 필요한 관리 기능을 업무 우선순위에 맞춰 개발합니다.",
  },
  {
    number: "03",
    title: "운영·유지보수",
    description: "구축 후 사용 과정에서 필요한 수정과 기능 개선을 지원합니다. 구체적인 지원 범위는 계약 시 정합니다.",
  },
];

const features = [
  ["문서·승인 관리", "품질 문서의 개정 이력과 검토·승인 상태를 함께 확인하도록 구성합니다."],
  ["심사·인증 업무 관리", "심사 일정, 체크리스트, 증빙 자료와 후속 조치를 연결해 관리하도록 구성합니다."],
  ["부적합·시정조치 관리", "문제 등록부터 원인 분석, 개선 조치와 효과 확인까지 진행 상태를 관리하도록 구성합니다."],
  ["고객사·협력사 대응", "고객사별 요청과 대응 이력, 담당자 및 처리 기한을 정리하도록 구성합니다."],
  ["고객사별 현황 관리", "고객사별 일정과 미완료 업무, 주요 관리 항목을 한눈에 확인하도록 구성합니다."],
];

const steps = [
  ["01", "상담·업무 분석", "현재 관리 방식과 필요한 기능을 확인합니다."],
  ["02", "시스템 설계", "화면, 관리 항목과 업무 처리 흐름을 정리합니다."],
  ["03", "개발", "합의한 기능과 우선순위에 따라 시스템을 구현합니다."],
  ["04", "검증", "실제 사용 흐름에 맞춰 기능을 점검하고 수정합니다."],
  ["05", "교육·운영", "사용 방법을 안내하고 합의한 범위에서 운영을 지원합니다."],
];

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="인지아이앤에스, 페이지 맨 위로">
          <span className={styles.brandMark} aria-hidden="true">I</span>
          <span>(주)인지아이앤에스</span>
        </a>
        <nav className={styles.desktopNav} aria-label="주 메뉴">
          <a href="#service">서비스</a>
          <a href="#features">주요 기능</a>
          <a href="#process">구축 절차</a>
          <a href="#company">회사 소개</a>
        </nav>
        <a className={styles.headerCta} href="#contact">도입 상담 <span aria-hidden="true">↗</span></a>
        <details className={styles.mobileNav}>
          <summary>메뉴 <span aria-hidden="true">☰</span></summary>
          <nav aria-label="모바일 주 메뉴">
            <a href="#service">서비스</a>
            <a href="#features">주요 기능</a>
            <a href="#process">구축 절차</a>
            <a href="#company">회사 소개</a>
            <a href="#contact">도입 상담</a>
          </nav>
        </details>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}><span className={styles.dot} />품질관리 기업을 위한 QMS 맞춤 개발</div>
              <p className={styles.standard}>ISO 9001 <span /> IATF 16949</p>
              <h1 id="hero-title">품질관리 업무를<br /><em>하나의 QMS로</em></h1>
              <p className={styles.heroDescription}>
                고객사별 문서, 심사 일정, 부적합과 시정조치를 연결합니다.
                (주)인지아이앤에스가 귀사의 업무 흐름에 맞춰 QMS(품질경영시스템)를 설계하고 개발합니다.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.lightButton} href="#contact">QMS 도입 상담 <span aria-hidden="true">↗</span></a>
                <a className={styles.outlineButton} href="#features">주요 기능 보기 <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <div className={styles.heroVisual} aria-label="고객사별 품질 업무 구성 예시">
              <div className={styles.visualTop}><span>QMS / WORKFLOW</span><span className={styles.liveDot}>맞춤 개발 구성 예시</span></div>
              <div className={styles.visualTitle}>고객사별 품질 업무</div>
              <div className={styles.visualLine}><span className={styles.visualNumber}>01</span><strong>문서 · 검토 · 승인</strong><span aria-hidden="true">↗</span></div>
              <div className={styles.visualLine}><span className={styles.visualNumber}>02</span><strong>심사 일정 · 증빙 자료</strong><span aria-hidden="true">↗</span></div>
              <div className={styles.visualLine}><span className={styles.visualNumber}>03</span><strong>부적합 · 원인 분석 · 시정조치</strong><span aria-hidden="true">↗</span></div>
              <div className={styles.visualLine}><span className={styles.visualNumber}>04</span><strong>대응 이력 · 진행 현황</strong><span aria-hidden="true">↗</span></div>
              <div className={styles.visualFoot}>각 업무의 흐름을 연결하는 시스템을 설계합니다.</div>
            </div>
          </div>
          <div className={styles.heroBottom}><span>QUALITY MANAGEMENT SYSTEM</span><a href="#service">서비스 살펴보기 <span aria-hidden="true">↓</span></a></div>
        </section>

        <section id="service" className={styles.section} aria-labelledby="service-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}><div><p className={styles.kicker}>OUR SERVICE / 01</p><h2 id="service-title">업무 분석부터<br />구축 후 운영까지</h2></div><p>기업마다 다른 품질관리 업무를 이해하고,<br />필요한 시스템을 단계적으로 만듭니다.</p></div>
            <div className={styles.serviceGrid}>{services.map((item) => <article className={styles.serviceCard} key={item.number}><span className={styles.cardNumber}>{item.number} / SERVICE</span><h3>{item.title}</h3><p>{item.description}</p><span className={styles.cardArrow} aria-hidden="true">↗</span></article>)}</div>
          </div>
        </section>

        <section id="features" className={styles.features} aria-labelledby="features-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}><div><p className={styles.kicker}>CAPABILITIES / 02</p><h2 id="features-title">귀사의 품질 업무에 맞춰<br />구성하는 관리 기능</h2></div><p>필요한 관리 항목과 처리 절차를 확인하고,<br />업무에 맞는 기능을 설계합니다.</p></div>
            <div className={styles.featureList}>{features.map(([title, description], index) => <div className={styles.featureRow} key={title}><span className={styles.featureIndex}>0{index + 1}</span><h3>{title}</h3><p>{description}</p><span className={styles.featurePlus} aria-hidden="true">＋</span></div>)}</div>
            <p className={styles.featureNote}>실제 개발 범위는 상담을 통해 결정합니다.</p>
          </div>
        </section>

        <section id="process" className={styles.section} aria-labelledby="process-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}><div><p className={styles.kicker}>PROCESS / 03</p><h2 id="process-title">QMS 구축,<br />이렇게 진행합니다</h2></div><p>업무를 이해하는 일에서 시작해<br />실제 사용과 운영까지 함께합니다.</p></div>
            <ol className={styles.stepGrid}>{steps.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
          </div>
        </section>

        <section id="company" className={styles.company} aria-labelledby="company-title">
          <div className={styles.container}><div className={styles.companyInner}><div><p className={styles.kicker}>ABOUT US / 04</p><h2 id="company-title">(주)인지아이앤에스</h2></div><p>품질관리 기업을 위한 QMS 맞춤 개발과 운영 관리를 제공합니다. ISO 9001 및 자동차 분야 IATF 16949 관련 품질 업무를 중심으로, 기업별 관리 방식에 맞는 시스템을 설계합니다.</p></div></div>
        </section>

        <section id="contact" className={styles.contact} aria-labelledby="contact-title">
          <div className={styles.container}><div className={styles.contactInner}><div><p className={styles.kicker}>CONTACT / 05</p><h2 id="contact-title">어떤 품질 업무를<br />관리하고 싶으신가요?</h2><p>현재 관리 방식과 필요한 기능을 알려주시면 QMS 구축 범위를 함께 정리하겠습니다.</p></div><div className={styles.contactCard}><span>도입 상담</span><strong>귀사의 업무에 맞는<br />QMS를 함께 고민합니다.</strong><a href="tel:01041031467">010-4103-1467 <span aria-hidden="true">↗</span></a><small>온라인 문의는 준비 중입니다. 전화로 상담해 주세요.</small></div></div></div>
        </section>
      </main>

      <footer className={styles.footer}><div className={styles.container}><strong>(주)인지아이앤에스</strong><a href="tel:01041031467">상담 전화 010-4103-1467</a><span>품질 업무에 맞춘 QMS 개발·운영</span></div></footer>
    </>
  );
}
