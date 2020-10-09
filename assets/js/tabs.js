class ContentTabs extends HTMLElement {
  connectedCallback() {
    this.setup();
  }

  activateTabId(id) {
    const neededTabs = this.querySelectorAll(
      `[data-contentid=content_${id}], [data-tabholder=tab_${id}]`
    );

    if (!neededTabs.length) return;

    const activeTabs = this.querySelectorAll(
      ".tab-content.is-active, .tabs li.is-active"
    );
    Array.from(activeTabs).forEach((c) => c.classList.remove("is-active"));

    Array.from(neededTabs).forEach((c) => c.classList.add("is-active"));
  }

  initialRequest(request) {
    if (!request) return;

    const arequest = request.split("/");

    if (!arequest.length) return;

    const id = arequest[0];
    this.activateTabId(id);

    if (arequest.length > 1) {
      return this.querySelector(`#${arequest[1]}`).parentNode;
    }
    return true;
  }

  changeRequest(request) {
    return this.initialRequest(request);
  }

  createHrefForChild(child) {
    const tabcontent = child.closest("[data-tabid]");
    const tabid = tabcontent.dataset.tabid;
    const compid = this.id;
    return `#${compid}/${tabid}/${child.dataset.originalid}`;
  }

  setup() {
    const tabsSection = this.querySelector(".tabs");
    const contentSection = this.querySelector(".contents");
    const id = this.getAttribute("id");

    this.dataset.aredir = "createHrefForChild";

    // move tabs contents to contents section (for lazy creating support)
    let contents = tabsSection.querySelectorAll(".tab-content");
    Array.from(contents).forEach((t) => contentSection.appendChild(t));

    // setup tabs
    const clickedHandler = (e) => {
      if (!id) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
      const tab = e.currentTarget;
      this.activateTabId(tab.dataset.tabid);
    };

    const tabs = tabsSection.querySelectorAll("a[data-tabid]");
    this.defaultTab = tabs[0];
    Array.from(tabs).forEach((t) => {
      t.addEventListener("click", clickedHandler);
    });

    this.tabsSection = tabsSection;
    this.contentSection = contentSection;

    this.activateTabId(tabs[0].dataset.tabid);
  }
}
