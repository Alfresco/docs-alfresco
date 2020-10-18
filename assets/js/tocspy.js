// why we don't use the ovserver?
// because it will not help us to handle the situation,
// when at the very bottom we will have more than one heading
// then we will not separate them for toc spy
const TocSpy = (headers, container, tocspy) => {
  if (!container) return;

  // some helpers from fp, because of a lot of data transformations
  const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
  const map = (f) => (e) => e.map((v, i, a) => f(v, i, a));

  const setActiveSection = (lis) => {
    let stored = null;
    return (i) => {
      const li = lis[i];
      if (li !== stored) {
        li.classList.add("is-selected");
        if (stored) stored.classList.remove("is-selected");
        stored = li;
      }
    };
  };

  // throttled
  function registerScrollHandler(handler) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handler(window.scrollY);
          ticking = false;
        });

        ticking = true;
      }
    });
  }

  const registerResizeHandler = ((container) => (handler) => {
    const resizeObserver = new ResizeObserver((entries) => handler());
    resizeObserver.observe(container);
  })(container);

  // last possible heading for detection
  const getLastPossibleTop = (tops, waterLine) => {
    for (let i = tops.length - 1; i >= 0; i--) {
      if (tops[i] < waterLine) return tops[i];
    }
  };

  // last heading
  const getLastTop = (tops) => (tops.length ? tops[tops.length - 1] : 0);

  // IF heading is placed lower than (scroll height - window height),
  // let's think that their top is higher
  const correctTop = (
    top,
    lastPossibleTop,
    contentBottom,
    scrollHeight,
    windowHeight
  ) => {
    let y = top;
    if (y > scrollHeight - windowHeight) {
      const actualFrame = scrollHeight - lastPossibleTop - windowHeight;
      const realFrame = contentBottom - lastPossibleTop;
      const k = actualFrame / realFrame;
      return lastPossibleTop + (y - lastPossibleTop) * k;
    }
    return y;
  };

  const getAbsoluteTopValues = (scrollY) =>
    map((s) => ({
      top: s.getBoundingClientRect().top + scrollY,
      section: s,
    }));

  const getEnvTopValues = (sections, scrollData) =>
    pipe(
      map((s) => s.top),
      (tops) => ({
        sections,
        tops,
        lastPossibleTop: getLastPossibleTop(
          tops,
          scrollData.scrollHeight - scrollData.windowHeight
        ),
        lastTop: getLastTop(tops),
      })
    );

  const getVisibleSections = ({ sections, setActiveSection, scrollData }) => (
    scrollY
  ) =>
    pipe(
      // get section bounds with absolute top values
      getAbsoluteTopValues(scrollY),
      getEnvTopValues(sections, scrollData),
      // correct top position
      ({ sections, tops, lastPossibleTop, lastTop }) =>
        map((s, i) => ({
          ...s,
          top: correctTop(
            tops[i],
            lastPossibleTop,
            scrollData.contentBottom,
            scrollData.scrollHeight,
            scrollData.windowHeight
          ),
          realTop: s.top,
        }))(sections),
      // bottom line for every section is the top line of next section
      map(({ top, section, realTop }, i, a) => ({
        section,
        top,
        i,
        bottom: i + 1 < a.length ? a[i + 1].top : scrollData.contentBottom,
        realTop,
        realBottom:
          i + 1 < a.length ? a[i + 1].realTop : scrollData.contentBottom,
      })),
      // final result
      (sections) => ({
        mostUpper: sections.find((s) => s.bottom > scrollY),
        sections,
      }),
      ({ mostUpper }) => {
        setActiveSection(mostUpper && mostUpper.i ? mostUpper.i : 0);
      }
    )(sections);

  const scrollData = {
    get scrollHeight() {
      return document.documentElement.scrollHeight;
    },
    get contentBottom() {
      return (
        container.getBoundingClientRect().top +
        window.scrollY +
        container.getBoundingClientRect().height
      );
    },

    get windowHeight() {
      return window.innerHeight;
    },
    get scrollY() {
      return window.scrollY;
    },
  };

  const getSectionTop = (({ sections, scrollData }) => (i) =>
    pipe(
      getAbsoluteTopValues(scrollData.scrollY),
      getEnvTopValues(sections, scrollData),
      // correct top position
      ({ lastPossibleTop, tops }) => {
        return Math.ceil(
          correctTop(
            tops[i],
            lastPossibleTop,
            scrollData.contentBottom,
            scrollData.scrollHeight,
            scrollData.windowHeight
          )
        );
      }
    )(headers))({
    sections: headers,
    scrollData,
  });

  // toc building

  const setTocItem = (id, title, i) => (el) => {
    const a = el.querySelector("a");
    a.href = `#${id}`;
    a.innerText = title;
    return el;
  };

  const liT = tocspy.querySelector("li");
  const liParent = liT.parentNode;

  const drawToc = map((s, i) =>
    pipe(setTocItem(s.dataset.originalid, s.innerText, i), (t) => {
      liParent.append(t);
      return t;
    })(liT.cloneNode(true))
  );

  liT.remove();

  const lis = drawToc(headers);

  // register handlers

  const _handler = getVisibleSections({
    sections: headers,
    setActiveSection: setActiveSection(lis),
    scrollData,
  });
  _handler(window.scrollY);

  registerResizeHandler(() => {
    return _handler(window.scrollY);
  });

  registerScrollHandler(_handler);

  return {
    // will be used for external position using
    getSectionTopFromHeader: pipe(
      (header) => headers.indexOf(header),
      getSectionTop
    ),
  };
};
