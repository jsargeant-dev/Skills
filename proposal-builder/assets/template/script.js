const caseStudyOneSlides = [
        {
          title: 'Company name or description',
          body: 'Body copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
          statValue: '1230',
          statCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.'
        },
        {
          title: 'Operations transformation story',
          body: 'Body copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
          statValue: '870',
          statCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.'
        },
        {
          title: 'Customer growth case study',
          body: 'Body copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Aenean lacinia bibendum nulla sed consectetur.',
          statValue: '640',
          statCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.'
        }
      ];

      const caseStudyOneTitle = document.getElementById('case-study-one-title');
      const caseStudyOneBody = document.getElementById('case-study-one-body');
      const caseStudyOneStatValue = document.getElementById('case-study-one-stat-value');
      const caseStudyOneStatCopy = document.getElementById('case-study-one-stat-copy');
      const caseStudyOnePrev = document.getElementById('case-study-one-prev');
      const caseStudyOneNext = document.getElementById('case-study-one-next');
      const caseStudyOneDots = [...document.querySelectorAll('#case-study-one-dots .carousel-dot')];
      let caseStudyOneIndex = 0;

      function renderCaseStudyOne(index) {
        const slide = caseStudyOneSlides[index];
        caseStudyOneTitle.textContent = slide.title;
        caseStudyOneBody.textContent = slide.body;
        caseStudyOneStatValue.textContent = slide.statValue;
        caseStudyOneStatCopy.textContent = slide.statCopy;
        caseStudyOneDots.forEach((dot, dotIndex) => {
          dot.classList.toggle('is-active', dotIndex === index);
        });
      }

      caseStudyOnePrev.addEventListener('click', () => {
        caseStudyOneIndex = (caseStudyOneIndex - 1 + caseStudyOneSlides.length) % caseStudyOneSlides.length;
        renderCaseStudyOne(caseStudyOneIndex);
      });

      caseStudyOneNext.addEventListener('click', () => {
        caseStudyOneIndex = (caseStudyOneIndex + 1) % caseStudyOneSlides.length;
        renderCaseStudyOne(caseStudyOneIndex);
      });

      caseStudyOneDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          caseStudyOneIndex = index;
          renderCaseStudyOne(caseStudyOneIndex);
        });
      });

      const caseStudyTwoSlides = [
        {
          title: 'Company name or description',
          body: 'Body copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
          statOneValue: '1230',
          statOneCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.',
          statTwoValue: '1230',
          statTwoCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.'
        },
        {
          title: 'Digital modernization engagement',
          body: 'Body copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
          statOneValue: '980',
          statOneCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.',
          statTwoValue: '245',
          statTwoCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.'
        },
        {
          title: 'Platform acceleration initiative',
          body: 'Body copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in.',
          statOneValue: '760',
          statOneCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.',
          statTwoValue: '315',
          statTwoCopy: 'Infographic descriptor is IBM Plex Sans Mono Regular 18pt.'
        }
      ];

      const caseStudyTwoTitle = document.getElementById('case-study-two-title');
      const caseStudyTwoBody = document.getElementById('case-study-two-body');
      const caseStudyTwoStatOneValue = document.getElementById('case-study-two-stat-one-value');
      const caseStudyTwoStatOneCopy = document.getElementById('case-study-two-stat-one-copy');
      const caseStudyTwoStatTwoValue = document.getElementById('case-study-two-stat-two-value');
      const caseStudyTwoStatTwoCopy = document.getElementById('case-study-two-stat-two-copy');
      const caseStudyTwoPrev = document.getElementById('case-study-two-prev');
      const caseStudyTwoNext = document.getElementById('case-study-two-next');
      const caseStudyTwoDots = [...document.querySelectorAll('#case-study-two-dots .carousel-dot')];
      let caseStudyTwoIndex = 0;

      function renderCaseStudyTwo(index) {
        const slide = caseStudyTwoSlides[index];
        caseStudyTwoTitle.textContent = slide.title;
        caseStudyTwoBody.textContent = slide.body;
        caseStudyTwoStatOneValue.textContent = slide.statOneValue;
        caseStudyTwoStatOneCopy.textContent = slide.statOneCopy;
        caseStudyTwoStatTwoValue.textContent = slide.statTwoValue;
        caseStudyTwoStatTwoCopy.textContent = slide.statTwoCopy;
        caseStudyTwoDots.forEach((dot, dotIndex) => {
          dot.classList.toggle('is-active', dotIndex === index);
        });
      }

      caseStudyTwoPrev.addEventListener('click', () => {
        caseStudyTwoIndex = (caseStudyTwoIndex - 1 + caseStudyTwoSlides.length) % caseStudyTwoSlides.length;
        renderCaseStudyTwo(caseStudyTwoIndex);
      });

      caseStudyTwoNext.addEventListener('click', () => {
        caseStudyTwoIndex = (caseStudyTwoIndex + 1) % caseStudyTwoSlides.length;
        renderCaseStudyTwo(caseStudyTwoIndex);
      });

      caseStudyTwoDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          caseStudyTwoIndex = index;
          renderCaseStudyTwo(caseStudyTwoIndex);
        });
      });

      const timelinePhases = [
        {
          phaseLabel: 'Phase 1',
          summaryTitle: 'Phase 1 (Weeks 1-3)',
          summaryBody: 'Summary copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Excepteur sint occaecat non proident.',
          deliverablesTitle: 'Deliverables',
          deliverablesBody: 'Summary copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed incididunt ut labore et dolore magna. Excepteur sint occaecat non proident do eiusmod tempor incididunt ut labore et dolore magna.',
          deliverables: [
            'Excepteur sint occaecat non proident',
            'Sunt in culpa qui officia deserunt',
            'Amollit anim id est laborum ereasquez'
          ]
        },
        {
          phaseLabel: 'Phase 2',
          summaryTitle: 'Phase 2 (Weeks 4-5)',
          summaryBody: 'Summary copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
          deliverablesTitle: 'Key outputs',
          deliverablesBody: 'Summary copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.',
          deliverables: [
            'Current-state findings synthesis',
            'Priority workflow shortlist',
            'Decision criteria and KPI framing'
          ]
        },
        {
          phaseLabel: 'Phase 3',
          summaryTitle: 'Phase 3 (Weeks 6-7)',
          summaryBody: 'Summary copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.',
          deliverablesTitle: 'Work products',
          deliverablesBody: 'Summary copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla.',
          deliverables: [
            'Prototype concepts and walkthroughs',
            'Governance and risk guardrails',
            'Target-state workflow implications'
          ]
        },
        {
          phaseLabel: 'Phase 4',
          summaryTitle: 'Phase 4 (Weeks 8-9)',
          summaryBody: 'Summary copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
          deliverablesTitle: 'Final deliverables',
          deliverablesBody: 'Summary copy is 18pt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
          deliverables: [
            'Roadmap and sequencing decisions',
            'Executive readout materials',
            'Next-step implementation recommendations'
          ]
        }
      ];

      const timelinePhaseButtons = [...document.querySelectorAll('#timeline-phase-tabs .timeline-phase')];
      const timelineSummaryTitle = document.getElementById('timeline-summary-title');
      const timelineSummaryBody = document.getElementById('timeline-summary-body');
      const timelineDeliverablesTitle = document.getElementById('timeline-deliverables-title');
      const timelineDeliverablesBody = document.getElementById('timeline-deliverables-body');
      const timelineDeliverablesList = document.getElementById('timeline-deliverables-list');

      function renderTimelinePhase(index) {
        const phase = timelinePhases[index];
        timelineSummaryTitle.textContent = phase.summaryTitle;
        timelineSummaryBody.textContent = phase.summaryBody;
        timelineDeliverablesTitle.textContent = phase.deliverablesTitle;
        timelineDeliverablesBody.textContent = phase.deliverablesBody;
        timelineDeliverablesList.innerHTML = phase.deliverables.map((item) => `<li>${item}</li>`).join('');
        timelinePhaseButtons.forEach((button, buttonIndex) => {
          button.classList.toggle('active', buttonIndex === index);
        });
      }

      timelinePhaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          renderTimelinePhase(index);
        });
      });
